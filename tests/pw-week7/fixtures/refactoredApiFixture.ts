import { test as base, expect } from '@playwright/test';

type MockResponse = {
    status?: number;
    contentType?: string;
    body?: any;
    headers?: Record<string, string>;
};

type MockAPI = {
    /** Intercepts a URL (string or Regex) and returns a custom response */
    mockRoute: (url: string | RegExp, response: MockResponse | any) => Promise<void>;
    /** Forces a specific error status and optional error body */
    mockError: (url: string | RegExp, status: number, body?: any) => Promise<void>;
    /** Returns all requests caught by a specific pattern */
    getRequests: (urlPattern: string | RegExp) => InterceptedRequest[];
    /** Clears the history—essential for multi-step tests */
    clearHistory: () => void;
};

type InterceptedRequest = {
    url: string;
    method: string;
    headers: Record<string, string>;
    payload: any;
};

export const test = base.extend<{ mockAPI: MockAPI }>({
    mockAPI: async ({ page }, use) => {
        const history: InterceptedRequest[] = [];

        const api: MockAPI = {
            mockRoute: async (url, response) => {
                await page.route(url, async (route) => {
                    // Record the request before fulfilling
                    const req = route.request();
                    history.push({
                        url: req.url(),
                        method: req.method(),
                        headers: req.headers(),
                        payload: req.postDataJSON() || req.postData(),
                    });

                    // Flexible response: if they passed just an object, assume 200 OK
                    const isFullResponse = response?.body !== undefined || response?.status !== undefined;
                    
                    await route.fulfill({
                        status: isFullResponse ? (response.status ?? 200) : 200,
                        contentType: response?.contentType ?? 'application/json',
                        body: JSON.stringify(isFullResponse ? response.body : response),
                        headers: response?.headers,
                    });
                });
            },

            mockError: async (url, status, body = { error: 'Internal Server Error' }) => {
                await api.mockRoute(url, { status, body });
            },

            getRequests: (urlPattern) => {
                return history.filter(req => 
                    typeof urlPattern === 'string' ? req.url.includes(urlPattern) : urlPattern.test(req.url)
                );
            },

            clearHistory: () => {
                history.length = 0;
            }
        };

        await use(api);
        // Playwright handles page.unroute() automatically when the context closes. 
        // No need for that messy for-loop teardown.
    },
});
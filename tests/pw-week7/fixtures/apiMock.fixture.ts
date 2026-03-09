import { test as base, Page, Route } from '@playwright/test';

    type MockAPI = {
        mockRoute: (url: string, responseData: object, status?: number) => Promise<void>;
        mockError: (url: string, errorCode: number) => Promise<void>;
        getInterceptedRequests: (url: string) => InterceptedRequest[];
    };

    type InterceptedRequest = {
        url: string;
        method: string;
        postData: string | null;
    };

    export const test = base.extend<{ mockAPI: MockAPI }>({
        mockAPI: async ({ page }, use) => {
            // 1. SETUP: create storage for tracked requests and mocked URLs
            const interceptedRequests: InterceptedRequest[] = [];
            const mockedUrls: string[] = [];

            // 2. Build the object with 3 methods (mockRoute, mockError, getInterceptedRequests)
            const api: MockAPI = {
                mockRoute: async (url, responseData, status = 200) => {
                    mockedUrls.push(url);
                    await page.route(url, async (route) => {
                        interceptedRequests.push({
                            url: route.request().url(),
                            method: route.request().method(),
                            postData: route.request().postData(),
                        });
                        await route.fulfill({
                            status,
                            contentType: 'application/json',
                            body: JSON.stringify(responseData),
                        });
                    });
                },

                mockError: async (url, errorCode) => {
                    mockedUrls.push(url);
                    await page.route(url, async (route) => {
                        interceptedRequests.push({
                            url: route.request().url(),
                            method: route.request().method(),
                            postData: route.request().postData(),
                        });
                        await route.fulfill({
                            status: errorCode,
                            contentType: 'application/json',
                            body: JSON.stringify({ error: 'Mocked error' }),
                        });
                    });
                },

                getInterceptedRequests: (url) => {
                    return interceptedRequests.filter(req => req.url.includes(url));
                },
            };

            // 3. USE: give the api object to the test
            await use(api);

            // 4. TEARDOWN: unroute all mocked URLs
            for (const url of mockedUrls) {
                await page.unroute(url);
            }
        },
    });

    export { expect } from '@playwright/test';


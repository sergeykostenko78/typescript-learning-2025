import { test as base } from '@playwright/test';

    type Performance = {
      markStart: () => void;
      getElapsed: () => number;
      assertLoadTime: (maxMs: number, label?: string) => void;
    };

    export const test = base.extend<{ performance: Performance }>({
            performance: async ({}, use) => {
                let startTime = Date.now();

                const perf: Performance = {
                
                    markStart() {
                        startTime = Date.now();
                    },

                    getElapsed: () => {
                        return Date.now() - startTime;
                    },

                    assertLoadTime: (maxMs: number, label: string = 'Action') => {
                        const elapsed = Date.now() - startTime;
                        if (elapsed > maxMs) {
                        throw new Error(`${label} took ${elapsed}ms, exceeding limit of ${maxMs}ms`);
                        }
                    }
                    
                }
                await use(perf);

                // 4. Optional Teardown: Log total duration after test finishes
                const totalDuration = perf.getElapsed();
                console.log(`Total duration: ${totalDuration}ms`);
            }
    });
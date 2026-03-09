import { test as base } from '@playwright/test';


    type TestData = {
        randomName: () => string;
        randomZip: () => string;
        randomAddress: () => string;
    };

    const firstNames = ['John', 'Jane', 'Alex', 'Maria', 'Sam'];
    const lastNames = ['Smith', 'Johnson', 'Lee', 'Garcia', 'Brown'];
    const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm Blvd', 'Cedar Ln'];

    export const test = base.extend<{ testData: TestData }>({
        testData: async ({}, use) => {
            const data: TestData = {
            
                randomName: () => {
                    return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
                },

                randomZip: () => {
                    return Math.floor(Math.random() * 90000 + 10000).toString();
                },

                randomAddress: () => {
                    return Math.floor(Math.random() * 999 + 1) + ' ' + streets[Math.floor(Math.random() * streets.length)];
                }
            }
            await use(data);
        }
    });
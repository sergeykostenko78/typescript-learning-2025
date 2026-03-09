import { mergeTests } from '@playwright/test';
import { test as mockAPI } from './apiMock.fixture';
import { test as auth } from './auth.fixture';
import { test as perf } from './performance.fixture';
import { test as testData } from './testData.fixture';

export const test = mergeTests(mockAPI, auth, perf, testData);

export { expect } from '@playwright/test';
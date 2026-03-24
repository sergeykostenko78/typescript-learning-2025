import { Page } from '@playwright/test';

// Practice: Create an interface for a TestResult
// with: testName, passed (boolean), duration (number), error (optional string)
// Then create a type that is TestResult with an added 'retryCount' field

interface TestResult {
    testName: string;
    passed: boolean;
    duration: number;
    error?: string;
}

type UpdTestResult = TestResult & { retryCount: number};

interface User {
      id?: number;
      name: string;
      age?: number;
      email?: string
  }

  const users: User[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
  ];

// Practice: Write a generic function
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
// Call it with string[], number[], User[] — it works with all
const text = firstElement(['aa', 'bb', 'cc']);
const nombre = firstElement([55, 77, 77]);
const checkUser = firstElement(users);
console.log(checkUser?.id);

// Practice: Write a generic interface for API responses
interface ApiResponse<T> {
  status: number;
  data: T;
  error?: string;
}

// Use it: ApiResponse<User>, ApiResponse<User[]>, ApiResponse<string>
 // ApiResponse<User> — data holds a single user
  const responseOneUser: ApiResponse<User> = {
      status: 200,
      data: { id: 1, name: 'John' },
  };

  // ApiResponse<User[]> — data holds an array of users
  const responseArrayUsers: ApiResponse<User[]> = {
      status: 200,
      data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
  };

  // ApiResponse<string> — data holds a plain string
  const responseJustString: ApiResponse<string> = {
      status: 200,
      data: 'OK',
  };
// -------------------------------------------------------------------

  // Practice: Write a function with explicit return type
async function fetchUser(id: number): Promise<User> {
  // ... fetch logic
  return { name: 'Test', age: 25 };
}

// Practice: Write a function that returns Promise<void>
async function clickAndWait(page: Page): Promise<void> {
  await page.click('button');
  await page.waitForLoadState();
}


// -----------------------------------------------------------

// Useful for test configuration and fixed value sets

enum Environment {
  DEV = 'https://dev.example.com',
  STG = 'https://stg.example.com',
  PROD = 'https://prod.example.com',
}

enum UserRole {
  STANDARD = 'standard_user',
  LOCKED = 'locked_out_user',
  PROBLEM = 'problem_user',
}

// Practice: Create an enum for test priority: CRITICAL, HIGH, MEDIUM, LOW
// Use it in a test data interface
enum TestPrio {
    CRITICAL = 'critical',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

interface TestDataLayers {
    stream: string;
    readiness?: string;
    priority: TestPrio
}

// --------------------------------------------------------------------------
// Built-in TypeScript helpers you should know

// Partial<T> — makes all properties optional
// You used this already: Partial<Post> for PATCH requests
type TestDataStatus = Partial<TestDataLayers>;

// Pick<T, Keys> — select specific properties
type UserName = Pick<User, 'name' | 'email'>;

// Omit<T, Keys> — exclude specific properties
type UserWithoutAge = Omit<User, 'age'>;

// Record<Keys, Type> — create object type with known keys
type TestResults = Record<string, boolean>; // { [testName]: passed }

// Practice: Given your User interface:
// Create a type for "user creation" that omits 'id' (server generates it)
// Create a type for "user update" that makes everything Partial
type UserCreation = Omit<User, 'id'>;
type UserUpdate = Partial<User>;







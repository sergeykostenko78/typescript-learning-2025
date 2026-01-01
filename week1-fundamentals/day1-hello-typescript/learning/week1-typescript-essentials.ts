// week1-typescript-essentials.ts
// 90% of TypeScript you'll use for test automation
// This line makes this file independent from other .ts files in the folder
export {};

// ============================================
// 1. BASIC TYPES (what you'll use daily)
// ============================================

// Primitives
const testName: string = "Login test";
const timeout: number = 5000;
const isEnabled: boolean = true;

// Arrays
const browsers: string[] = ["chrome", "firefox", "safari"];
const retries: number[] = [1, 2, 3];

// Objects (inline type)
const testConfig: { url: string; timeout: number; headless: boolean } = {
  url: "https://dou.ua",
  timeout: 30000,
  headless: true
};

// ============================================
// 2. INTERFACES (for test data & page objects)
// ============================================

interface User {
  email: string;
  password: string;
  role: "admin" | "user"; // Literal types
}

interface Admin {
    email: string;
    password: string;
    role: "admin";
    permissions: string[];
  }

  interface Guest {
    sessionId: string;
    role: "guest";
  }

interface LoginPage {
  emailInput: string; // Selector
  passwordInput: string;
  submitButton: string;
  login(user: User): Promise<void>;
}

// Test data
const testUser: User = {
  email: "test@example.com",
  password: "Test123!",
  role: "user"
};

// ============================================
// 3. TYPES vs INTERFACES (when to use which)
// ============================================

// Use TYPE for unions, primitives, utilities
type TestStatus = "pass" | "fail" | "skip";
type Selector = string;
type TestData = User | Admin | Guest; // Union

// Use INTERFACE for objects, page objects
interface TestResult {
  name: string;
  status: TestStatus;
  duration: number;
}

// ============================================
// 4. FUNCTIONS (proper typing)
// ============================================

// Basic function
function waitFor(selector: string, timeout: number = 5000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

// Arrow function
const click = async (selector: string): Promise<void> => {
  console.log(`Clicking ${selector}`);
};

// Function with return type
function getTestData(): User[] {
  return [testUser];
}

// ============================================
// 5. GENERICS (for reusable helpers)
// ============================================

// Generic function - works with any type
function findElement<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  return array.find(predicate);
}

// Usage
const users: User[] = [testUser];
const admin = findElement(users, (u) => u.role === "admin");

// Generic for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

// ============================================
// 6. ENUMS (test data, statuses)
// ============================================

enum Environment {
  DEV = "dev",
  STAGING = "staging",
  PROD = "production"
}

enum TestPriority {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4
}

const currentEnv: Environment = Environment.DEV;

// ============================================
// 7. OPTIONAL & NULLABLE (real-world data)
// ============================================

interface TestCase {
  id: string;
  name: string;
  description?: string; // Optional
  tags: string[];
  author: string | null; // Can be null
}

const test1: TestCase = {
  id: "TC001",
  name: "Login test",
  tags: ["smoke", "auth"],
  author: null // No author yet
};

// ============================================
// 8. TYPE ASSERTIONS (when you know better)
// ============================================

// DOM examples (uncomment if you add "DOM" to tsconfig lib)
// const element = document.querySelector(".login-btn") as HTMLButtonElement;
// const userInput = document.getElementById("email") as HTMLInputElement;

// ============================================
// 9. UTILITY TYPES (super useful)
// ============================================

// Partial - make all properties optional
type PartialUser = Partial<User>;
const updateUser: PartialUser = { email: "new@email.com" }; // Only email

// Pick - select specific properties
type UserCredentials = Pick<User, "email" | "password">;
const creds: UserCredentials = { 
  email: "test@test.com", 
  password: "pass123" 
};

// Omit - exclude properties
type UserWithoutPassword = Omit<User, "password">;
const publicUser: UserWithoutPassword = {
  email: "test@test.com",
  role: "user"
};

// Record - create object type with specific keys
type TestResults = Record<string, TestResult>;
const results: TestResults = {
  "login-test": { name: "Login", status: "pass", duration: 1200 },
  "signup-test": { name: "Signup", status: "fail", duration: 2300 }
};

// ============================================
// 10. CLASSES (Page Object Model)
// ============================================

class BasePage {
  constructor(public url: string) {}
  
  async navigate(): Promise<void> {
    console.log(`Navigating to ${this.url}`);
  }
}

class LoginPagePOM extends BasePage {
  // Selectors
  private emailInput = "#email";
  private passwordInput = "#password";
  private submitBtn = "button[type='submit']";
  
  constructor() {
    super("https://example.com/login");
  }
  
  async login(user: User): Promise<void> {
    await this.navigate();
    console.log(`Logging in as ${user.email}`);
    // Actual Playwright code will go here
  }
  
  async isLoginSuccessful(): Promise<boolean> {
    // Check if redirected to dashboard
    return true;
  }
}

// ============================================
// PRACTICAL EXAMPLES FOR YOUR WORK
// ============================================

// Example 1: Test data management
interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  remote: boolean;
}

const testJobs: JobPosting[] = [
  {
    id: "1",
    title: "Senior QA",
    company: "Google",
    location: "Remote",
    salary: 6000,
    remote: true
  },
  {
    id: "2",
    title: "QA Engineer",
    company: "Microsoft",
    location: "Kyiv",
    remote: false
  }
];

// Example 2: Test configuration
interface PlaywrightConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  workers: number;
  browsers: Array<"chromium" | "firefox" | "webkit">;
}

const config: PlaywrightConfig = {
  baseURL: "https://dou.ua",
  timeout: 30000,
  retries: 2,
  workers: 4,
  browsers: ["chromium"]
};

// Example 3: Test helpers with generics
async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await waitFor("retry", 1000);
    }
  }
  throw new Error("All retries failed");
}

// Example 4: Type guards (checking types at runtime)
function isUser(obj: any): obj is User {
  return (
    typeof obj.email === "string" &&
    typeof obj.password === "string" &&
    (obj.role === "admin" || obj.role === "user")
  );
}

const data: any = { email: "test@test.com", password: "123", role: "user" };
if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.email.toUpperCase());
}

console.log("✅ TypeScript essentials complete!");
console.log("Next: Apply these to Playwright tests");
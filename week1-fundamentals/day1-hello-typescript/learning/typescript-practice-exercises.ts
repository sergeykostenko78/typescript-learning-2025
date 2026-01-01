// ============================================
// TYPESCRIPT PRACTICE EXERCISES
// ============================================
// Instructions:
// 1. Read each TODO comment
// 2. Write the code yourself (don't copy from essentials file!)
// 3. Run: npx ts-node typescript-practice-exercises.ts
// 4. Fix any errors until it compiles successfully
// 5. Check your answers at the bottom of the file
// ============================================
export {};
// ============================================
// EXERCISE 1: Basic Types
// ============================================
// TODO: Create variables for a test configuration
// - testName: string = "Search Jobs Test"
// - timeout: number = 30000
// - headless: boolean = true
// - browsers: array of strings = ["chromium", "firefox"]

// YOUR CODE HERE:
const testName1: string = "Search Jobs TEst";
const timeout1: number = 30000;
const headless: boolean = true;
const browsers1 : string[] = ["chromium", 'firefox'];

// ============================================
// EXERCISE 2: Interfaces
// ============================================
// TODO: Create an interface called "JobPosting" with these properties:
// - id: string
// - title: string
// - company: string
// - salary: number (optional - use ?)
// - remote: boolean

// YOUR CODE HERE:
interface JobPosting {
    id: string;
    title: string;
    company: string;
    salary?: number;
    remote: boolean
}

// TODO: Create a test job object using your JobPosting interface
// Use any job data you want

// YOUR CODE HERE:
const testJob : JobPosting = {
    id: "123123",
    title: "QA AQA",
    company: "Google",
    remote: true
}

// ============================================
// EXERCISE 3: Union Types
// ============================================
// TODO: Create a type called "TestStatus" that can ONLY be:
// "passed", "failed", or "skipped"

// YOUR CODE HERE:
type TestStatus = "passed" | "failed" | "skipped";

// TODO: Create a variable with type TestStatus = "passed"

// YOUR CODE HERE:
let myCheck : TestStatus = "passed"

// ============================================
// EXERCISE 4: Multiple User Types
// ============================================
// TODO: Create THREE interfaces:
// 1. RegularUser: { username: string; email: string; role: "user" }
// 2. AdminUser: { username: string; email: string; role: "admin"; canDelete: boolean }
// 3. GuestUser: { sessionId: string; role: "guest" }

// YOUR CODE HERE:
interface RegularUser {
  username: string;
  email: string;
  role: "user"
}

interface AdminUser {
  username: string;
  email: string;
  role: "admin";
  canDelete: boolean
}

interface GuestUser {
  sessionId: string;
  role: "guest"
}

// TODO: Create a union type "AnyUser" that can be RegularUser OR AdminUser OR GuestUser

// YOUR CODE HERE:
type AnyUser = RegularUser | AdminUser | GuestUser;

// ============================================
// EXERCISE 5: Functions
// ============================================
// TODO: Write a function "waitForElement" that:
// - Takes a selector (string)
// - Takes a timeout (number) with default value 5000
// - Returns Promise<void>
// - Just console.log the values (no real implementation needed)

// YOUR CODE HERE:
function waitForElement(selector: string, timeout: number = 5000): Promise<void> {
  console.log(`Waiting for ${selector} with ${timeout}`)
  return Promise.resolve();
}

// ============================================
// EXERCISE 6: Array of Objects
// ============================================
// TODO: Create an array called "testJobs" that contains 2-3 JobPosting objects
// Type it properly: JobPosting[]

// YOUR CODE HERE:
let testJobs : JobPosting[] = [
  {
    id: "id1",
    title: "title1",
    company: "Doodle",
    salary: 5000,
    remote: true
  },

  {
    id: "id2",
    title: "title2",
    company: "Microsoft",
    //salary: 5000,
    remote: false
  },

  {
    id: "id3",
    title: "title3",
    company: "Nvidia",
    salary: 10000,
    remote: true
  }
]

// ============================================
// EXERCISE 7: Optional Properties
// ============================================
// TODO: Create an interface "TestConfig" with:
// - baseURL: string (required)
// - timeout: number (required)
// - retries: number (optional)
// - headless: boolean (optional)

// YOUR CODE HERE:
interface TestConfig {
  baseURL: string,
  timeout: number,
  retries?: number,
  headless?: boolean
}

// TODO: Create an object using TestConfig with only required properties
// YOUR CODE HERE:
let testObject : TestConfig = {
    baseURL: "https://www.nfl.com",
    timeout: 5000
}

// ============================================
// EXERCISE 8: Function with Typed Return
// ============================================
// TODO: Write a function "getAllJobs" that:
// - Takes no parameters
// - Returns JobPosting[] (array of job postings)
// - Return your testJobs array
// YOUR CODE HERE:
function getAllJobs(): JobPosting[] {
  return testJobs;
}

// ============================================
// EXERCISE 9: Utility Types - Pick
// ============================================
// TODO: Create a type "JobCredentials" that picks ONLY "id" and "title" from JobPosting
// Use Pick<JobPosting, "id" | "title">
// YOUR CODE HERE:
type JobCredentials = Pick<JobPosting, "id" | "title">;

// TODO: Create an object using JobCredentials type
// YOUR CODE HERE:
let objectToTestUtility : JobCredentials;

// ============================================
// EXERCISE 10: Class (Page Object Model)
// ============================================
// TODO: Create a class "SearchPage" that:
// - Has a constructor that takes url (string) - make it public
// - Has a method "searchJobs" that takes query (string) and returns Promise<void>
// - Just console.log the query (no real implementation)
// YOUR CODE HERE:
class SearchPage {
  constructor(public url: string) {}
  
  async searchJobs(query: string): Promise<void> {
    console.log(`Navigating to ${this.url}`);
  }
}



// ============================================
// TEST YOUR WORK
// ============================================
console.log("✅ If this prints, your TypeScript is valid!");
console.log("Now check each section to make sure you completed all TODOs");

// ============================================
// BONUS CHALLENGE (Advanced)
// ============================================
// TODO: Write a function "filterJobs" that:
// - Takes jobs array (JobPosting[])
// - Takes a filter function: (job: JobPosting) => boolean
// - Returns JobPosting[]
// - Filters the jobs array using the filter function

// YOUR CODE HERE:
function filterJobs(
  jobs: JobPosting[],
  filter: (job: JobPosting) => boolean
): JobPosting[] {
  return jobs.filter(filter);
}


// TODO: Use your filterJobs function to find all remote jobs
// Hint: filterJobs(testJobs, (job) => job.remote === true)

// YOUR CODE HERE:
const remoteJobs = filterJobs(testJobs, (job) => job.remote === true);
console.log("Remote jobs:", remoteJobs);



console.log("🎉 All exercises complete!");

// ============================================
// ANSWER KEY (Don't look until you try!)
// ============================================
/*

EXERCISE 1 ANSWER:
const testName: string = "Search Jobs Test";
const timeout: number = 30000;
const headless: boolean = true;
const browsers: string[] = ["chromium", "firefox"];

EXERCISE 2 ANSWER:
interface JobPosting {
  id: string;
  title: string;
  company: string;
  salary?: number;
  remote: boolean;
}

const testJob: JobPosting = {
  id: "1",
  title: "QA Engineer",
  company: "Google",
  remote: true
};

EXERCISE 3 ANSWER:
type TestStatus = "passed" | "failed" | "skipped";
const myStatus: TestStatus = "passed";

EXERCISE 4 ANSWER:
interface RegularUser {
  username: string;
  email: string;
  role: "user";
}

interface AdminUser {
  username: string;
  email: string;
  role: "admin";
  canDelete: boolean;
}

interface GuestUser {
  sessionId: string;
  role: "guest";
}

type AnyUser = RegularUser | AdminUser | GuestUser;

EXERCISE 5 ANSWER:
function waitForElement(selector: string, timeout: number = 5000): Promise<void> {
  console.log(`Waiting for ${selector} with timeout ${timeout}ms`);
  return Promise.resolve();
}

EXERCISE 6 ANSWER:
const testJobs: JobPosting[] = [
  { id: "1", title: "QA Engineer", company: "Google", remote: true },
  { id: "2", title: "Test Automation", company: "Microsoft", remote: false, salary: 5000 }
];

EXERCISE 7 ANSWER:
interface TestConfig {
  baseURL: string;
  timeout: number;
  retries?: number;
  headless?: boolean;
}

const config: TestConfig = {
  baseURL: "https://dou.ua",
  timeout: 30000
};

EXERCISE 8 ANSWER:
function getAllJobs(): JobPosting[] {
  return testJobs;
}

EXERCISE 9 ANSWER:
type JobCredentials = Pick<JobPosting, "id" | "title">;
const credentials: JobCredentials = { id: "1", title: "QA Engineer" };

EXERCISE 10 ANSWER:
class SearchPage {
  constructor(public url: string) {}

  async searchJobs(query: string): Promise<void> {
    console.log(`Searching for: ${query}`);
  }
}

BONUS ANSWER:
function filterJobs(
  jobs: JobPosting[],
  filter: (job: JobPosting) => boolean
): JobPosting[] {
  return jobs.filter(filter);
}

const remoteJobs = filterJobs(testJobs, (job) => job.remote === true);
console.log("Remote jobs:", remoteJobs);

*/

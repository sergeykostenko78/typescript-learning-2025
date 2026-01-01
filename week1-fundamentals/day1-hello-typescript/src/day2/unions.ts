// src/day2/unions.ts
export {};
// ========================================
// UNION TYPES: Variable can be Type A OR Type B
// ========================================

// Example 1: Simple union
let salary: number | null = 120000;
salary = null; // Valid
// salary = "high"; // Error: Type 'string' is not assignable

// Example 2: Union with string literals
// FIXED: Renamed from JobStatus to ApplicationStatus to avoid conflict
type ApplicationStatus = "wishlist" | "applied" | "interview" | "offer" | "rejected";

let myStatus: ApplicationStatus = "applied";
myStatus = "interview"; // Valid
// myStatus = "pending"; // Error: not in union

// Example 3: Function with union parameter
function displaySalary(salary: number | null): string {
  if (salary === null) {
    return "Salary not disclosed";
  }
  return `$${salary.toLocaleString()}`;
}

console.log(displaySalary(120000)); // $120,000
console.log(displaySalary(null));   // Salary not disclosed

// Example 4: Union of object types
interface RemoteJob {
  type: "remote";
  location: string; // "Anywhere"
  timezone?: string;
}

interface OnsiteJob {
  type: "onsite";
  location: string; // "New York, NY"
  office: string;
}

interface HybridJob {
  type: "hybrid";
  location: string;
  office: string;
  daysInOffice: number;
}

type Job = RemoteJob | OnsiteJob | HybridJob;

// Type narrowing with discriminated unions
function describeJob(job: Job): string {
  // TypeScript knows which type based on "type" field
  switch (job.type) {
    case "remote":
      return `Remote position, work from ${job.location}`;
    case "onsite":
      return `Onsite at ${job.office}, ${job.location}`;
    case "hybrid":
      return `Hybrid: ${job.daysInOffice} days/week at ${job.office}`;
  }
}

const job1: Job = {
  type: "remote",
  location: "Anywhere",
  timezone: "CET"
};

const job2: Job = {
  type: "hybrid",
  location: "Warsaw, Poland",
  office: "Google Campus",
  daysInOffice: 3
};

console.log(describeJob(job1));
console.log(describeJob(job2));

// Practice Exercise:
// Create a union type for different interview types
type InterviewType = "phone" | "video" | "onsite" | "technical" | "behavioral";

interface Interview {
  id: string;
  company: string;
  type: InterviewType;
  scheduledDate: Date;
  duration: number; // minutes
  notes?: string;
}

function formatInterview(interview: Interview): string {
  return `${interview.type.toUpperCase()} interview with ${interview.company}
Date: ${interview.scheduledDate.toLocaleDateString()}
Duration: ${interview.duration} minutes`;
}

const myInterview: Interview = {
  id: "1",
  company: "Google",
  type: "technical",
  scheduledDate: new Date("2025-11-25"),
  duration: 60
};

console.log("\n" + formatInterview(myInterview));
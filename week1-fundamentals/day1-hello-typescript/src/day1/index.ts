// src/index.ts

// Basic types
const name: string = "Serhii";
const age: number = 30;
const isQA: boolean = true;
const skills: string[] = ["Cypress", "TypeScript", "Playwright"];

console.log(`Hello! I'm ${name}, ${age} years old.`);
console.log(`QA Engineer: ${isQA}`);
console.log(`Skills: ${skills.join(", ")}`);

// Function with types
function greet(name: string): string {
  return `Welcome to TypeScript, ${name}!`;
}

console.log(greet(name));

// Interface example
interface Job {
  company: string;
  position: string;
  salary?: number; // Optional property
  appliedDate: Date;
}

const myJob: Job = {
  company: "Tech Corp",
  position: "QA Automation Engineer",
  appliedDate: new Date("2025-01-15")
};

console.log("\nMy Current Job:");
console.log(`Company: ${myJob.company}`);
console.log(`Position: ${myJob.position}`);
console.log(`Applied: ${myJob.appliedDate.toLocaleDateString()}`);

// Function with interface parameter
function displayJob(job: Job): void {
  console.log(`\nJob at ${job.company}`);
  console.log(`Role: ${job.position}`);
  if (job.salary) {
    console.log(`Salary: $${job.salary}`);
  }
}

displayJob(myJob);
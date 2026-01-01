// src/exercises.ts

// TODO: Define JobStatus enum
enum JobStatus {
  WISHLIST = "wishlist",
  APPLIED = "applied",
  INTERVIEW = "interview",
  OFFER = "offer",
  REJECTED = "rejected"
}

// TODO: Define JobApplication interface
interface JobApplication {
  id: number;
  company: string;
  position: string;
  location: string;
  salary: number | null;
  status: JobStatus;
  appliedDate: Date;
  notes: string;
}

// TODO: Create sample job applications
const applications: JobApplication[] = [
  {
    id: 1,
    company: "Google",
    position: "Senior QA Engineer",
    location: "Remote",
    salary: 120000,
    status: JobStatus.INTERVIEW,
    appliedDate: new Date("2025-11-10"),
    notes: "Second round interview scheduled"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Automation Engineer",
    location: "Kyiv",
    salary: 100000,
    status: JobStatus.APPLIED,
    appliedDate: new Date("2025-11-15"),
    notes: "Waiting for response"
  },
  {
    id: 3,
    company: "Amazon",
    position: "QA Lead",
    location: "Warsaw",
    salary: null,
    status: JobStatus.WISHLIST,
    appliedDate: new Date(),
    notes: "Need to prepare resume"
  }
];

// TODO: Function to display all applications
function displayApplications(apps: JobApplication[]): void {
  console.log("\n=== My Job Applications ===\n");
  apps.forEach((app) => {
    console.log(`ID: ${app.id}`);
    console.log(`Company: ${app.company}`);
    console.log(`Position: ${app.position}`);
    console.log(`Status: ${app.status}`);
    console.log(`Salary: ${app.salary ? `$${app.salary}` : "Not specified"}`);
    console.log(`Applied: ${app.appliedDate.toLocaleDateString()}`);
    console.log(`Notes: ${app.notes}`);
    console.log("---");
  });
}

// TODO: Function to filter by status
function filterByStatus(
  apps: JobApplication[],
  status: JobStatus
): JobApplication[] {
  return apps.filter((app) => app.status === status);
}

// TODO: Function to get average salary
function getAverageSalary(apps: JobApplication[]): number {
  const withSalary = apps.filter((app) => app.salary !== null);
  if (withSalary.length === 0) return 0;
  
  const total = withSalary.reduce((sum, app) => sum + (app.salary || 0), 0);
  return total / withSalary.length;
}

// TODO: Function to add new application
function addApplication(
  apps: JobApplication[],
  newApp: Omit<JobApplication, "id">
): JobApplication[] {
  const maxId = Math.max(...apps.map((app) => app.id), 0);
  const application: JobApplication = {
    id: maxId + 1,
    ...newApp
  };
  return [...apps, application];
}

// Run the functions
displayApplications(applications);

console.log("\n=== Filter: Interview Status ===");
const interviews = filterByStatus(applications, JobStatus.INTERVIEW);
displayApplications(interviews);

console.log("\n=== Statistics ===");
console.log(`Total Applications: ${applications.length}`);
console.log(`Average Salary: $${getAverageSalary(applications).toFixed(2)}`);

// Add new application
const newApp: Omit<JobApplication, "id"> = {
  company: "Apple",
  position: "Test Automation Engineer",
  location: "Remote",
  salary: 130000,
  status: JobStatus.WISHLIST,
  appliedDate: new Date(),
  notes: "Dream job!"
};

const updatedApplications = addApplication(applications, newApp);
console.log("\n=== After Adding New Application ===");
displayApplications(updatedApplications);
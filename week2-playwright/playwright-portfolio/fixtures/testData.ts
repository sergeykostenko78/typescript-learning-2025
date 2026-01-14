export interface JobListing {
    title: string;       // Job title
    company: string;     // Company name
    location: string;    // City/location
    description: string; // Job description
  }

export interface SearchQuery {
    keyword: string;     // What to search for
    city?: string;       // Optional city filter
    expectedMin: number; // Minimum results expected
  }

 export const sampleJobs: JobListing[] = [
    {
      title: "QA Automation Engineer",
      company: "TechCorp",
      location: "Kyiv",
      description: "Testing position"
    },
    
    {
      title: "Developer",
      company: "Meta",
      location: "Lviv",
      description: "Coding"
    },

    {
      title: "Manager",
      company: "Amazon",
      location: "Odesa",
      description: "Leading"
    }
  ];

  export const searchQueries: SearchQuery[] = [
    {
      keyword: "QA",
      expectedMin: 100
    },
    
    {
      keyword: "Rust",
      expectedMin: 3
    },

    {
      keyword: "AQA",
      city: "Харків",
      expectedMin: 23
    }
  ];




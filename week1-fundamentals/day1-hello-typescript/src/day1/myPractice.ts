// src/myPractice.ts - Learning TypeScript with Resume example

// STEP 1: Define the Resume interface
// An interface is like a blueprint - it describes what a Resume object must look like

interface Resume {

  fullName: string;

  email: string;

  skills: string[];

  experience: number;

  education: {             // This is an array of objects
    degree: string;
    university: string;
  }[];
}

const sampleResume: Resume = {
  fullName: "John Doe",

  email: "john.doe@example.com",

  skills: ["TypeScript", "JavaScript", "QA Testing"],

  experience: 5,

  education: [
    {
      degree: "Bachelor of Computer Science",
      university: "Tech University"
    },
    {
      degree: "QA Certification",
      university: "Online Academy"
    }
  ]
};

const resumes: Resume[] = [
{
  fullName: "John1 Doe1",

  email: "john1.doe1@example.com",

  skills: ["TypeScript", "JavaScript", "QA Testing"],

  experience: 10,

  education: [
    {
      degree: "Bachelor of Computer Science",
      university: "Tech University"
    },
    {
      degree: "QA Certification",
      university: "Online Academy"
    }
  ]
},

{
  fullName: "John2 Doe2",

  email: "john2.doe2@example.com",

  skills: ["TS", "JS", "Go"],

  experience: 6,

  education: [
    {
      degree: "Doctor of Computer Science",
      university: "MIT"
    },
    {
      degree: "AI RAG",
      university: "Google course"
    }
  ]
},

{
  fullName: "John3 Doe3",

  email: "john3.doe3@example.com",

  skills: ["Python", "C# .Net"],

  experience: 15,

  education: [
    {
      degree: "Bachelor of CS",
      university: "HNURE"
    },
    {
      degree: "Microsoft MVP",
      university: "Microsoft"
    }
  ]
}
];

function formatResume(resume: Resume): string {
  return `Name: ${resume.fullName}
Email: ${resume.email}
Experience: ${resume.experience} years
Skills: ${resume.skills.join(", ")}
Education: 
${resume.education.map((edu) => ` - ${edu.degree} from ${edu.university}`).join("\n")}`;
};

resumes.forEach((resume) => {
    console.log(formatResume(resume))
  });

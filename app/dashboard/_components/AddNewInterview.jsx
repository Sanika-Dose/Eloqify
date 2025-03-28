"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const engineeringJobRoles = [
  "Software Developer",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Java Developer",
  "Python Developer",
  "DevOps Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cloud Engineer",
  "Systems Engineer",
  "Embedded Systems Engineer",
  "Network Engineer",
  "Security Engineer",
  "QA Engineer",
  "Mobile Developer (Android/iOS)",
  "Game Developer",
  "Computer Vision Engineer",
  "NLP Engineer",
  "Blockchain Developer",
  "Electrical Engineer",
  "Mechanical Engineer",
  "Civil Engineer",
  "Chemical Engineer",
  "Biomedical Engineer",
  "Aerospace Engineer",
  "Graduate Engineer Trainee",
  "Other (Please Specify)"
];

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [customJobPosition, setCustomJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleJobPositionChange = (e) => {
    const value = e.target.value;
    setJobPosition(value);
    if (value !== "Other (Please Specify)") {
      setCustomJobPosition("");
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    // Use custom job position if "Other" was selected
    const finalJobPosition = jobPosition === "Other (Please Specify)" 
      ? customJobPosition 
      : jobPosition;

    console.log(finalJobPosition, jobDesc, jobExperience);

    const InputPrompt = `
  Job Positions: ${finalJobPosition}, 
  Job Description: ${jobDesc}, 
  Years of Experience: ${jobExperience}. 
  Based on this information, please provide 5 interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: finalJobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });
        
      console.log("Inserted ID:", resp);

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>
                    Add Details about your job position, job description and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role/Position</label>
                    <select
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={jobPosition}
                      onChange={handleJobPositionChange}
                      required
                    >
                      <option value="">Select a job role</option>
                      {engineeringJobRoles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {jobPosition === "Other (Please Specify)" && (
                      <Input
                        className="mt-2"
                        placeholder="Enter your job role"
                        value={customJobPosition}
                        onChange={(e) => setCustomJobPosition(e.target.value)}
                        required
                      />
                    )}
                  </div>
                  <div className="my-5">
                    <label className="text-black">
                      Job Description/Tech stack (In Short)
                    </label>
                    <Textarea
                      className="placeholder-opacity-50"
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="goast"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
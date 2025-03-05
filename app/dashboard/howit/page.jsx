import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - AI Mock Interview</title>
        <meta
          name="description"
          content="Learn how our AI Mock Interview works."
        />
      </Head>
      <main className="bg-gray-100 p-8 mt-10">
        <h1 className="text-4xl font-bold text-center mb-8">How It Works</h1>
        <section className="space-y-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Step 1: Prepare for the Interview
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">
                  Get ready by selecting the type of interview and providing
                  some details about the job position.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                {" "}
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Step 2: Start the AI Interview
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">
                  Our AI will ask you a series of questions and evaluate your
                  responses in real-time.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Step 3: Receive Feedback
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">
                  Get detailed feedback on your performance, including strengths
                  and areas for improvement.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  );
};

export default HowItWorks;




// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import Head from "next/head";
// import Contect from "./_components/Contect";
// import Link from "next/link";
// import { FaGithub } from "react-icons/fa";

// const page = () => {
//   const [faqOpen, setFaqOpen] = useState(null);

//   const faqs = [
//     {
//       question: "How does the AI mock interview work?",
//       answer:
//         "Our AI analyzes your responses in real-time, providing feedback on communication skills, tone, and accuracy based on job descriptions.",
//     },
//     {
//       question: "Is the interview tailored to my resume?",
//       answer:
//         "Yes! We extract key skills from your resume to generate personalized interview questions.",
//     },
//     {
//       question: "How soon do I receive feedback?",
//       answer:
//         "Feedback is instant. As soon as you complete your mock interview, our AI provides an analysis of your performance.",
//     },
//     {
//       question: "Can I retake interviews to improve?",
//       answer:
//         "Absolutely! You can practice multiple times to refine your answers and boost confidence.",
//     },
//   ];

//   return (
//     <div>
//       <Head>
//         <title>Eloqify</title>
//         <meta
//           name="description"
//           content="Ace your next interview with AI-powered mock interviews"
//         />
//       </Head>

//       <main className="min-h-screen pt-[70px]">
//         {/* Header Section */}
//         {/* Header */}
//         <header className="fixed top-0 left-0 w-full z-50 py-3 bg-[#2b0955] shadow-md border-b-2">
//           <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
//             {/* Logo */}
//             <div className="flex items-center">
//               <img src="/elllo.png" alt="Eloqify Logo" className="w-28 h-auto" />
//             </div>

//             {/* Navigation */}
//             <nav className="mt-2 md:mt-0 flex items-center space-x-6">
//               <a
//                 href="#how-it-works"
//                 className="text-md font-semibold text-white hover:opacity-80 transition-all"
//               >
//                 How It Works
//               </a>
//               <a
//                 href="#features"
//                 className="text-md font-semibold text-white hover:opacity-80 transition-all"
//               >
//                 Features
//               </a>
//               <a
//                 href="#testimonials"
//                 className="text-md font-semibold text-white hover:opacity-80 transition-all"
//               >
//                 Testimonials
//               </a>
//               <a
//                 href="#faq"
//                 className="text-md font-semibold text-white hover:opacity-80 transition-all"
//               >
//                 FAQ
//               </a>
//               <a
//                 href="#contact"
//                 className="text-md font-semibold text-white hover:opacity-80 transition-all"
//               >
//                 Contact
//               </a>

//               {/* Sign In Button */}
//               <a
//                 href="/dashboard"
//                 className="ml-4 px-5 py-2 text-md font-semibold bg-white text-[#2b0955] rounded-lg shadow-md hover:bg-gray-200 transition-all"
//               >
//                 Sign In
//               </a>
//             </nav>
//           </div>
//         </header>

//         {/* Hero Section */}
//         <section className="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left py-24 px-6 md:px-12 bg-gradient-to-b from-[#742bb1] via-[#8f39d6] to-[#a050ec]">
//           {/* Left Content - Text & CTA */}
//           <div className="md:w-1/2">
//             <h2 className="text-4xl md:text-5xl font-bold text-white">
//               Unlock Your Dream Job with AI
//             </h2>
//             <p className="mt-4 text-lg md:text-xl text-gray-200">
//               Master your interviews with AI-driven mock sessions and receive
//               instant, personalized feedback!
//             </p>
//             <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//               <a
//                 href="/dashboard"
//                 className="px-6 py-3 text-lg font-semibold bg-white text-[#2D1B69] rounded-lg shadow-md hover:bg-gray-100 transition-all"
//               >
//                 Start for Free
//               </a>
//               <a
//                 href="#features"
//                 className="px-6 py-3 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-lg shadow-md hover:bg-white hover:text-[#2b1141] transition-all"
//               >
//                 Learn More
//               </a>
//             </div>
//           </div>

//           {/* Right Content - Image */}
//           <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
//             <img
//               src="/ai-interview.jpg"
//               alt="AI Interview Illustration"
//               className="w-full max-w-md md:max-w-lg rounded-xl shadow-lg"
//             />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section
//           id="how-it-works"
//           className="bg-gradient-to-b from-purple-100 to-purple-200 py-16 px-6 md:px-12"
//         >
//           <div className="container mx-auto text-center max-w-4xl">
//             <h2 className="text-4xl font-bold text-purple-900">
//               Be 10x more successful in interviews
//             </h2>
//             <p className="mt-4 text-lg text-gray-700">
//               Get hired quicker by having one up on your opponents by being more
//               successful in interviews.
//             </p>

//             <div className="mt-8 bg-white p-6 md:p-8 rounded-lg shadow-lg">
//               <h3 className="text-2xl font-semibold text-purple-800">
//                 How It Works
//               </h3>
//               <p className="mt-3 text-gray-600">
//                 Our AI-powered system generates
//                 <strong className="font-bold text-purple-900">
//                   {" "}
//                   job-specific questions{" "}
//                 </strong>
//                 based on your resume and simulates real-world interview
//                 scenarios.
//               </p>
//               <p className="mt-2 text-gray-600">
//                 Receive
//                 <strong className="font-bold text-purple-900">
//                   {" "}
//                   instant feedback{" "}
//                 </strong>
//                 on clarity, confidence, structure, and technical accuracy to
//                 refine your responses.
//               </p>
//             </div>

//             <div className="mt-6">
//               <a
//                 href="/dashboard"
//                 className="px-6 py-3 text-lg font-semibold bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-800 transition-all"
//               >
//                 Get Started Now
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section
//           id="features"
//           className="py-16 bg-gradient-to-b from-purple-100 to-purple-200 px-6 md:px-0"
//         >
//           <div className="container mx-auto text-center">
//             <h2 className="text-4xl font-bold text-gray-800">
//               Why Choose Eloqify?
//             </h2>
//             <p className="mt-4 text-lg text-gray-600">
//               Unlock the full potential of AI-driven interview preparation with
//               our cutting-edge features.
//             </p>

//             <div className="flex flex-wrap justify-center mt-8 space-y-6 md:space-y-0 md:space-x-6">
//               {/* Feature 1 */}
//               <div className="w-full md:w-1/3 px-4 py-6">
//                 <div className="bg-purple-50 rounded-lg p-6 shadow-md hover:bg-purple-200 transition-all duration-300">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     🎯 Resume-Based Mock Interviews
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Our AI analyzes your resume and tailors questions based on
//                     your experience and skills.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 2 */}
//               <div className="w-full md:w-1/3 px-4 py-6">
//                 <div className="bg-purple-50 rounded-lg p-6 shadow-md hover:bg-purple-200 transition-all duration-300">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     ⚡ Instant AI Feedback
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Get real-time insights on your responses, including tone,
//                     confidence, and clarity.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 3 */}
//               <div className="w-full md:w-1/3 px-4 py-6">
//                 <div className="bg-purple-50 rounded-lg p-6 shadow-md hover:bg-purple-200 transition-all duration-300">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     📊 Detailed Performance Reports
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Receive in-depth analysis with strengths, improvement areas,
//                     and score breakdowns.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 4 */}
//               <div className="w-full md:w-1/3 px-4 py-6">
//                 <div className="bg-purple-50 rounded-lg p-6 shadow-md hover:bg-purple-200 transition-all duration-300">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     🎤 Voice & Speech Analysis
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Assess speech clarity, tone, pace, and confidence level to
//                     enhance verbal communication.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 5 */}
//               <div className="w-full md:w-1/3 px-4 py-6">
//                 <div className="bg-purple-50 rounded-lg p-6 shadow-md hover:bg-purple-200 transition-all duration-300">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     📚 Industry-Specific Questions
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Practice with customized questions from various industries.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature 6 */}
//               <div className="w-full md:w-1/3 px-4 py-6">
//                 <div className="bg-purple-50 rounded-lg p-6 shadow-md hover:bg-purple-200 transition-all duration-300">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     🔄 Continuous Learning
//                   </h3>
//                   <p className="mt-2 text-gray-600">
//                     Improve over time with AI-driven suggestions and track your
//                     progress after every session.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Testimonials Section */}
//         <section
//           id="testimonials"
//           className="py-16 bg-gradient-to-b from-purple-100 to-purple-300 px-6 md:px-0"
//         >
//           <div className="container mx-auto text-center opacity-0 animate-fade-in">
//             <h2 className="text-4xl font-bold text-gray-800 transition-opacity duration-1000 ease-out">
//               What Our Users Say
//             </h2>
//             <p className="mt-4 text-lg text-gray-700 transition-opacity duration-1000 ease-out delay-200">
//               See how Eloqify has helped professionals excel in interviews.
//             </p>

//             <div className="flex flex-wrap justify-center mt-8 space-y-6 md:space-y-0 md:space-x-6">
//               {[
//                 {
//                   name: "John Doe",
//                   role: "Software Engineer at Google",
//                   feedback:
//                     "Eloqify transformed my interview preparation! The AI-driven feedback helped me improve my answers and boost confidence.",
//                 },
//                 {
//                   name: "Sarah Smith",
//                   role: "Data Analyst at Amazon",
//                   feedback:
//                     "The real-time feedback on tone and clarity was a game-changer. I landed my dream job thanks to Eloqify!",
//                 },
//                 {
//                   name: "Mark Johnson",
//                   role: "Product Manager at Microsoft",
//                   feedback:
//                     "I loved the resume-based mock interviews! The tailored questions made me feel super prepared.",
//                 },
//               ].map((testimonial, index) => (
//                 <div
//                   key={index}
//                   className="w-full md:w-1/3 px-4 py-6 flex flex-col items-center opacity-0 animate-slide-up transition-transform duration-1000 ease-out delay-300"
//                 >
//                   <div className="bg-white rounded-lg p-6 shadow-md w-full transform scale-95 transition-all duration-500 ease-in-out hover:scale-100 hover:bg-purple-500">
//                     {/* Feedback */}
//                     <p className="text-gray-600 italic transition-colors duration-300 ease-in-out hover:text-white">
//                       "{testimonial.feedback}"
//                     </p>

//                     {/* Name */}
//                     <h3 className="mt-4 text-lg font-semibold text-gray-800 transition-colors duration-300 ease-in-out hover:text-white">
//                       - {testimonial.name}
//                     </h3>

//                     {/* Role */}
//                     <p className="text-gray-500 text-sm transition-colors duration-300 ease-in-out hover:text-white">
//                       {testimonial.role}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         {/* FAQ Section */}
//         <section
//           id="faq"
//           className="py-16 bg-gradient-to-b from-purple-100 to-purple-200 px-6 md:px-0"
//         >
//           <div className="container mx-auto text-center">
//             <h2 className="text-4xl font-bold text-gray-800">
//               Frequently Asked Questions
//             </h2>
//             <div className="mt-8 max-w-3xl mx-auto">
//               {faqs.map((faq, index) => (
//                 <div key={index} className="mb-6">
//                   <button
//                     onClick={() => setFaqOpen(faqOpen === index ? null : index)}
//                     className="w-full text-left text-lg font-semibold bg-white p-4 rounded-lg shadow-md hover:bg-purple-500 hover:text-white transition duration-300"
//                   >
//                     {faq.question}
//                   </button>
//                   {faqOpen === index && (
//                     <p className="mt-2 text-gray-600 p-4 bg-white shadow-md rounded-lg">
//                       {faq.answer}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         {/* Contact Section */}
//         <section id="contact" className="py-16 bg-white px-6 md:px-0">
//           <Contect />
//         </section>
//       </main>

//       <footer className="py-8 bg-[#2b0955] text-white text-center">
//         <p>© 2024 Eloqify : AI Mock Interview. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default page;
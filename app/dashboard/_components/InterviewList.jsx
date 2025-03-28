// "use client";
// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState } from "react";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { desc, eq } from "drizzle-orm";
// import InterviewItemCard from "./InterviewItemCard";
// import { Skeleton } from "@/components/ui/skeleton"

// const InterviewList = () => {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);

//   useEffect(() => {
//     user && GetInterviewList();
//   }, [user]);

//   const GetInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(
//         eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
//       )
//       .orderBy(desc(MockInterview.id));

//     console.log(result);
//     setInterviewList(result);
//   };
//   return (
//     <div>
//       <h2 className="font-medium text-xl">Previous Mock Interview</h2>
  
//       {interviewList ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
//           {interviewList.map((interview, index) => (
//             <InterviewItemCard key={index} interview={interview} />
//           ))}
//         </div>
//       ) : (
//         <Skeleton className="w-[100px] h-[20px] rounded-full" />
//       )}
//     </div>
//   );
// };

// export default InterviewList;


// "use client";
// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { db } from "@/utils/db";
// import { MockInterview, UserAnswer } from "@/utils/schema";
// import { desc, eq } from "drizzle-orm";
// import InterviewItemCard from "./InterviewItemCard";
// import { Skeleton } from "@/components/ui/skeleton";

// // Chart.js and react-chartjs-2 imports
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const InterviewList = () => {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (user) {
//       fetchInterviewList();
//     }
//   }, [user]);

//   const fetchInterviewList = async () => {
//     setLoading(true);
//     try {
//       // Fetch all interviews created by the current user
//       const result = await db
//         .select()
//         .from(MockInterview)
//         .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
//         .orderBy(desc(MockInterview.id));
//       console.log("Fetched Interviews:", result);
      
//       // For each interview, fetch its feedback and compute the average rating.
//       const interviewsWithRating = await Promise.all(
//         result.map(async (interview) => {
//           const feedbacks = await db
//             .select()
//             .from(UserAnswer)
//             .where(eq(UserAnswer.mockIdRef, interview.mockId));
//           let avgRating = "N/A";
//           if (feedbacks.length > 0) {
//             const total = feedbacks.reduce(
//               (sum, feedback) => sum + Number(feedback.rating),
//               0
//             );
//             avgRating = (total / feedbacks.length).toFixed(1);
//           }
//           return { ...interview, rating: avgRating };
//         })
//       );
//       setInterviewList(interviewsWithRating);
//     } catch (error) {
//       console.error("Error fetching interviews:", error);
//     }
//     setLoading(false);
//   };

//   // Create a gradient fill for the line chart
//   const getGradient = (ctx, chartArea) => {
//     const gradient = ctx.createLinearGradient(chartArea.left, chartArea.top, chartArea.right, chartArea.bottom);
//     gradient.addColorStop(0, "rgba(79,70,229,0.5)"); // indigo-600 at 50%
//     gradient.addColorStop(1, "rgba(139,92,246,0.1)"); // violet-400 at 10%
//     return gradient;
//   };

//   // Prepare data for the line chart (ratings out of 5)
//   const lineChartData = useMemo(() => {
//     const labels = interviewList.map(
//       (item, index) => item.jobPosition || `Interview ${index + 1}`
//     );
//     const data = interviewList.map((item) =>
//       item.rating !== "N/A" ? Number(item.rating) : 0
//     );
//     return {
//       labels,
//       datasets: [
//         {
//           label: "Rating Trend",
//           data,
//           fill: true,
//           borderColor: "#6366F1", // indigo-500
//           backgroundColor: (context) => {
//             const { ctx, chartArea } = context.chart;
//             if (!chartArea) return null;
//             return getGradient(ctx, chartArea);
//           },
//           tension: 0.4,
//           pointRadius: 6,
//           pointHoverRadius: 8,
//           pointBackgroundColor: "#4F46E5", // indigo-600
//         },
//       ],
//     };
//   }, [interviewList]);

//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top", labels: { font: { size: 14, weight: "600" } } },
//       title: {
//         display: true,
//         text: "Interview Rating Trend (Out of 5)",
//         font: { size: 22, weight: "700" },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { font: { size: 12 } },
//         grid: { color: "#E5E7EB" },
//       },
//       y: {
//         min: 0,
//         max: 5,
//         ticks: { stepSize: 1, font: { size: 12 } },
//         grid: { color: "#E5E7EB" },
//       },
//     },
//     animation: {
//       duration: 1500,
//       easing: "easeInOutQuart",
//     },
//   };

//   return (
//     <div className="px-6 py-8">
//       <header className="mb-10 text-center">
//         <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
//           Previous Mock Interviews
//         </h2>
//         <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
//           Explore your past sessions and track your interview ratings with style.
//         </p>
//       </header>

//       {/* Line Chart Section */}
//       {interviewList.length > 0 && (
//         <div className="mb-10 h-80 p-6 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//           <Line ref={chartRef} data={lineChartData} options={lineChartOptions} />
//         </div>
//       )}

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(3)].map((_, index) => (
//             <Skeleton key={index} className="w-full h-56 rounded-lg" />
//           ))}
//         </div>
//       ) : interviewList.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {interviewList.map((interview, index) => (
//             <InterviewItemCard key={index} interview={interview} rating={interview.rating} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500 mt-8">No Interview Records Found.</div>
//       )}
//     </div>
//   );
// };

// export default InterviewList;




"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, useMemo } from "react";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInterviewList();
    }
  }, [user]);

  const fetchInterviewList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));
      
      const interviewsWithRating = await Promise.all(
        result.map(async (interview) => {
          const feedbacks = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interview.mockId));
          let avgRating = "N/A";
          if (feedbacks.length > 0) {
            const total = feedbacks.reduce(
              (sum, feedback) => sum + Number(feedback.rating),
              0
            );
            avgRating = (total / feedbacks.length).toFixed(1);
          }
          return { ...interview, rating: avgRating };
        })
      );
      setInterviewList(interviewsWithRating);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
    setLoading(false);
  };

  const lineChartData = useMemo(() => {
    const labels = interviewList.map(
      (item, index) => item.jobPosition || `Interview ${index + 1}`
    );
    const data = interviewList.map((item) =>
      item.rating !== "N/A" ? Number(item.rating) : 0
    );
    
    return {
      labels,
      datasets: [
        {
          label: "Rating Trend",
          data,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#4f46e5",
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }, [interviewList]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#64748b"
        }
      },
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          color: "#64748b"
        },
        grid: {
          color: "#e2e8f0"
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Previous Mock Interviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review your past interview sessions and track your progress
        </p>
      </div>

      {interviewList.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Interview Rating Trend
          </h2>
          <div className="h-80">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Interview Sessions
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview, index) => (
            <InterviewItemCard 
              key={index} 
              interview={interview} 
              rating={interview.rating} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
            No interviews found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start a new mock interview to see your progress here
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewList;
// // src/pages/CoachDashboard.tsx
// import React from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import ClientList from "../components/dashboard/ClientList";
// import ScheduleCalendar from "../components/dashboard/ScheduleCalendar";
// import PerformanceMetrics from "../components/dashboard/PerformanceMetrics";
// import QuickActions from "../components/dashboard/QuickActions";

// const CoachDashboard = () => {
//   return (
//     <DashboardLayout>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
//         <div className="py-6">
//           <div className="flex flex-col mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">
//               Coach Dashboard
//             </h1>
//             <p className="mt-2 text-gray-600">
//               Manage your clients, schedule, and business performance in one
//               place
//             </p>
//           </div>

//           <QuickActions />

//           <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-flow-col lg:grid-cols-3">
//             <div className="lg:col-span-2">
//               <PerformanceMetrics />
//             </div>
//             <div>
//               <ScheduleCalendar />
//             </div>
//           </div>

//           <div className="mt-8">
//             <ClientList />
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default CoachDashboard;

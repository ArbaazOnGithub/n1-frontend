// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/ui/AdminLayout';
import AdminNavbar from '../Components/ui/Admin/AdminNavbar';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalUsers: 5,
    newUsers: 5,
    totalServices: 5,
    newOrders: 5,
  });

  useEffect(() => {
    // Fetch data from your backend API
    // Example:
    fetch('/api/admin/summary')
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, []);

  return (
    <>
      <div className="h-30">
        <AdminNavbar />
      </div>
      <AdminLayout/>
     
    </>
  );
};

export default AdminDashboard;




































// src/pages/AdminDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import AdminLayout from '@/components/ui/AdminLayout';
// import DashboardSummary from '../components/ui/admin/Dashboard/DashboardSummary';
// import AdminNavbar from '../Components/ui/Admin/AdminNavbar';

// const AdminDashboard = () => {
//   const [summary, setSummary] = useState({
//     totalUsers: 5,
//     newUsers: 5,
//     totalServices: 5,
//     newOrders: 5,
//   });

//   useEffect(() => {
//     // Fetch data from your backend API
//     // Example:
//     fetch('/api/admin/summary')
//       .then((res) => res.json())
//       .then((data) => setSummary(data));
//   }, []);

//   return (
//     <>
//     <div className='h-30'>
//       <AdminNavbar/>

//     </div>
    
//     <AdminLayout>
      
//       <DashboardSummary summary={summary}  />
//     </AdminLayout>
    
//     </>

    
//   );
// };

// export default AdminDashboard;
























// import React from "react";
// import OrderSummary from "../Components/Admin/OrderSummary";
// import { Button } from "@/Components/ui/button";

// const AdminDashboardHome = () => {
//   return (
//     <div>
//       <h2>Admin Dashboard Overview</h2>
//       <OrderSummary/>
      

//     </div>
//   );
// };

// export default AdminDashboardHome;
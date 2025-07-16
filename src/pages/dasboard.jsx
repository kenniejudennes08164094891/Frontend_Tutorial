import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRecord } from "../services/transmitters";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-8">MyDashboard</h2>
      <nav className="space-y-6">
        <SidebarItem label="🏠 Home" />
        <SidebarItem label="👥 Users" />
        <SidebarItem label="📊 Reports" />
        <SidebarItem label="⚙️ Settings" />
      </nav>
    </aside>
  );
}

function SidebarItem({ label }) {
  return (
    <div className="cursor-pointer hover:text-gray-300">{label}</div>
  );
}



function TopBar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/");
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-600">🔔</button>
        <button className="text-gray-600" onClick={handleLogout}>🚪</button>
      </div>
    </header>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}

export function RecentTable({ loginDetails }) {


  // useEffect() is a special React LifecycleHook that helps to fetch data from external environments outside React code
  // It must be declared inside the function to which it is called
  let [loginRecord, setLoginRecord] = useState([])
  const location = useLocation();
  const {state} = location;
  // console.log("location>>",state);

  useEffect(() => {
    // const getLoggedInUser = localStorage.getItem("user");
    //    const getLoggedInUser = sessionStorage.getItem("user");
    // if(getLoggedInUser !== null){
    //   let parseData = JSON.parse(getLoggedInUser);
    //     let rows = [];
    //   rows.push(parseData);
    //   setLoginRecord(rows);
    // }
    // if (state) {
    //   let rows = [];
    //   rows.push(state);
    //   setLoginRecord(rows);
    // }

    const getData = getRecord();
    setLoginRecord(getData);
    console.log("getData>>",getData);
    // console.clear();
  }, []) // The dependency array helps to deconstruct the useEffect after the variable has been called.



  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <table className="min-w-full text-sm text-left">
        <thead className="border-b text-gray-600">
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">Email</th>
            <th className="py-2">Password</th>
            <th className="py-2">Platform Type</th>
            <th className="py-2">Date LoggedIn</th>
          </tr>
        </thead>
        <tbody>
          {loginRecord.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{item.email}</td>
              <td className="py-2">{item.password}</td>
              <td className="py-2">{item.plaformType}</td>
              <td className="py-2">{item.dateLoggedIn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 w-full min-h-screen bg-gray-100">
        <TopBar />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">
            Hello World – Welcome to the Security Audit Dashboard
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Users" value="1,240" />
            <StatCard title="Sales" value="$9,700" />
            <StatCard title="Visitors" value="4,000" />
            <StatCard title="Bounce Rate" value="35%" />
          </div>

          {/* Table */}
          <RecentTable />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRecord } from "../services/transmitters";

function Sidebar() {
  const navigate = useNavigate();
  const handleNavigate = (route, e) => {
    e.preventDefault();
    navigate(route);
  }
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-8">MyDashboard</h2>
      <nav className="space-y-6">
        <span>
          <SidebarItem label="🏠 Home" />
        </span>
        <span onClick={(e) => handleNavigate("/file-uploads", e)}>
          <SidebarItem label="👥 File Uploads" />
        </span>
        <span onClick={(e) => handleNavigate("/customer-data", e)}>
          <SidebarItem label="📊Customer Data" />
        </span>
        <span>
          <SidebarItem label="⚙️ Settings" />
        </span>
      </nav>
    </aside>
  );
}


function GridModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fileData, setFileData] = useState(null)

  const handleUpload = (event) => {
    const fileData = event?.target?.files[0];
    setFileData(fileData);
    // Form Data is a library in js
    const formData = new FormData();
    formData.append('fileData',fileData);
    console.log("get formData uploaded>>",formData.get("fileData"));
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Form Data Modal
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Content */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Form Data File Uploads</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div class="flex items-center justify-center w-full">
              <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={(event) => handleUpload(event)}/>
              </label>
            </div>

          </div>
        </div>
      )}
    </>
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
  const { state } = location;
  // console.log("location>>",state);


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
            <GridModal />
          </div>

          {/* Table */}
          <RecentTable />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

import React from "react";

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
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-600">🔔</button>
        <button className="text-gray-600">🚪</button>
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

function RecentTable() {
  const rows = [
    { name: "Jane Doe", action: "Logged in", date: "2025-07-15" },
    { name: "John Smith", action: "Updated profile", date: "2025-07-14" },
    { name: "Emily Green", action: "Added item", date: "2025-07-13" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <table className="min-w-full text-sm text-left">
        <thead className="border-b text-gray-600">
          <tr>
            <th className="py-2">Email</th>
            <th className="py-2">Password</th>
            <th className="py-2">Platform Type</th>
               <th className="py-2">Date LoggedIn</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-2">{row.name}</td>
              <td className="py-2">{row.action}</td>
              <td className="py-2">{row.date}</td>
               <td className="py-2">{row.date}</td>
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

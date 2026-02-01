import React from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  Settings,
  Bell,
  Search,
} from "lucide-react";

export default function Layout({ children, activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "menu", label: "Menu Management", icon: UtensilsCrossed },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              E
            </div>
            <span className="text-xl font-bold tracking-tight">Eatoes Admin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    activeTab === item.id ? "text-emerald-600" : "text-gray-400"
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="mr-3 h-5 w-5 text-gray-400" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-96 hidden sm:block">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="search"
                placeholder="Search dashboard..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-emerald-600">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <div className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
              <img
                src="https://picsum.photos/seed/admin/40"
                alt="Admin"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/dashboard' },
    { name: 'Asset Survey', href: '/survey' },
    { name: 'Questionnaire', href: '/questionnaire' },
    { name: 'Assessment Reports', href: '/assessments' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed md:static z-30 w-64 bg-white shadow-md transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold text-blue-600">Dashboard</span>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm p-2 rounded hover:bg-blue-100 ${
                pathname === item.href ? 'bg-blue-200 text-blue-800 font-semibold' : 'text-gray-700'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-xl p-1 font-semibold text-gray-800">Overview</h1>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

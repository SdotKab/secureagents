'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthProvider';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const navLinks = !user
    ? [
        { label: 'Sign In', href: '/signin' },
        { label: 'Register', href: '/signup' },
      ]
    : [
        { label: 'Company Profile', href: '/companyProfile' },
        { label: 'Account Settings', href: '/accountSettings' },
      ];

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={user ? '/dashboard' : '/welcome'} className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-600">SecureAgents</span>
        </Link>

        {/* Toggle button for mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={`${pathname === href ? 'text-blue-600 font-semibold' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <button onClick={signOut} className="text-red-600 font-semibold">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile links */}
      {open && (
        <div className="md:hidden px-4 pb-4 text-right">
          <ul className="flex flex-col space-y-2">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} onClick={() => setOpen(false)} className="block text-gray-700">
                  {label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="text-red-600 font-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

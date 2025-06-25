'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '/logo.svg'; // replace with actual SVG or image path
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={user ? '/dashboard' : '/welcome'} className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-600">SecureAgents</span>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        <ul className={`md:flex gap-6 items-center ${open ? 'block' : 'hidden'} md:block`}>
          {!user ? (
            <>
              <li>
                <Link href="/signin">Sign In</Link>
              </li>
              <li>
                <Link href="/signup">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account-settings">Settings</Link>
              </li>
              <li>
                <button onClick={signOut} className="text-red-600 font-semibold">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

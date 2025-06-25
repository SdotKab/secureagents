'use client';

import { usePathname } from 'next/navigation';
import Navbar from './layout/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Show navbar only outside of auth pages */}
      {!['/signin', '/signup'].includes(pathname) && <Navbar />}
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/schedules", label: "Schedules" },
  { href: "/documents", label: "Docs" },
  { href: "/approvals", label: "Approvals" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Mobile & Desktop Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 sm:py-0 sm:h-16">
          {/* Logo & Status */}
          <div className="flex items-center justify-between mb-2 sm:mb-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦞</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900 hidden xs:inline">Mission Control</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 sm:hidden">
              <span className="font-medium">Larrabee</span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
          </div>

          {/* Nav Items - Scrollable on Mobile */}
          <div className="flex space-x-1 overflow-x-auto pb-2 sm:pb-0 sm:space-x-2 -mx-2 px-2 sm:mx-0 sm:px-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Status */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
            <span className="font-medium">Larrabee</span>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

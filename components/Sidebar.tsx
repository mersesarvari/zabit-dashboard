"use client";

import React from "react";
import Link from "next/link";
import { Home, User, BarChart, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <Card className="flex-shrink-0 bg-gray-800 border-none">
        <CardContent className="py-6 px-4 text-center">
          <h2 className="text-xl font-bold text-white">Dashboard</h2>
        </CardContent>
      </Card>

      <nav className="flex-grow">
        <ul className="space-y-2 mt-4">
          {[
            { href: "/", icon: Home, label: "Dashboard" },
            { href: "/user", icon: User, label: "Users" },
          ].map(({ href, icon: Icon, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-4 px-6 py-3 text-lg hover:bg-gray-700 rounded-lg"
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Card className="flex-shrink-0 bg-gray-800 border-none">
        <CardContent className="py-4 px-6 text-center">
          <p className="text-sm text-white">© 2024 Your App</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;

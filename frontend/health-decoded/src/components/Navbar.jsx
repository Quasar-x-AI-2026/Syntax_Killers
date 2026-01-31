import React from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

export default function Navbar() {

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/working" },
    { name: "Contact Us", path: "/contactus" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Health-Decoded
          </span>
        </Link>


        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}


        </div>
      </div>
    </nav>
  );
}
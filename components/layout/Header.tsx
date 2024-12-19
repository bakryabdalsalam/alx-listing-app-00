// components/layout/Header.tsx
import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 flex items-center justify-between bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">MyListingApp</span>
        </Link>
      </div>

      {/* Navigation / Types of Accommodation */}
      <nav className="hidden md:flex space-x-4">
        <Link href="/#">
          <span className="hover:text-blue-500 cursor-pointer">Rooms</span>
        </Link>
        <Link href="/#">
          <span className="hover:text-blue-500 cursor-pointer">Mansion</span>
        </Link>
        <Link href="/#">
          <span className="hover:text-blue-500 cursor-pointer">Countryside</span>
        </Link>
        <Link href="/#">
          <span className="hover:text-blue-500 cursor-pointer">Beachfront</span>
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="hidden md:flex items-center border rounded-full px-3 py-1">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none px-2"
        />
        <button className="text-gray-500">🔍</button>
      </div>

      {/* Sign In / Sign Up */}
      <div className="flex space-x-4">
        <button className="text-sm font-medium hover:text-blue-500">Sign In</button>
        <button className="text-sm font-medium hover:text-blue-500 border rounded-full px-3 py-1">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;

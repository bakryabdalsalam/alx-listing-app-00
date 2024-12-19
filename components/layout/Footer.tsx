// components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 text-center bg-white border-t border-gray-200 mt-8">
      <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Affsquare. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

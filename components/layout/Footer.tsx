const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Listing App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
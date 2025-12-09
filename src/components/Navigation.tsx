import React from 'react';
// If you are using 'lucide-react' icons, keep your imports. 
// If not, standard text works too.

const Navigation = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ✅ NAME CHANGED to AtreyaCare */}
          <div className="flex-shrink-0 cursor-pointer">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              AtreyaCare
            </span>
          </div>
          
          {/* ✅ REMOVED GitHub Button */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              {/* <a href="#" ... > GitHub </a>  <-- DELETED THIS LINE */}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
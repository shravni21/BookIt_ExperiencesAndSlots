import React, { useState } from "react";

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">

                {/* Logo Section */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <img
                        src="/bookit_logo.png"
                        alt="BookIt Logo"
                        className="h-8 sm:h-10 lg:h-12 w-auto object-contain"
                    />
                </div>

                {/* Search Section */}
                <div className="flex-1 max-w-xl">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search experiences"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-500"
                        />
                        
                        <button className="flex items-center justify-center px-5 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium text-black transition-all">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

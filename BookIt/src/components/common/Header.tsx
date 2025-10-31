import React, { useRef, useEffect } from "react";
import { Search, X, Clock } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  recentSearches: string[];
  onRecentSearchClick: (query: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onClear,
  recentSearches,
  onRecentSearchClick,
  showSuggestions,
  setShowSuggestions,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
      setShowSuggestions(false);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
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
        <div className="flex-1 max-w-xl relative" ref={searchRef}>
          <div className="flex items-center gap-2">
            {/* Input Box */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>

              <input
                type="text"
                placeholder="Search experiences"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-8 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800 placeholder-gray-500 transition-all"
              />

              {searchQuery && (
                <button
                  onClick={onClear}
                  className="absolute inset-y-0 right-2 flex items-center justify-center p-1.5 hover:bg-gray-200 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={() => {
                onSearch();
                setShowSuggestions(false);
              }}
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium text-black transition-all"
            >
              Search
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && recentSearches.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" />
                Recent Searches
              </div>
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onRecentSearchClick(search);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

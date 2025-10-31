import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import ExperienceCard from "../components/experiences/ExperienceCard";
import { api, type Experience } from "../api/api";
import { X } from "lucide-react";

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    api.getExperiences()
      .then((data) => {
        setExperiences(data);
        setFilteredExperiences(data);
      })
      .catch(() => setError("Failed to load experiences"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!appliedQuery.trim()) {
      setFilteredExperiences(experiences);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(() => {
      const q = appliedQuery.toLowerCase();
      const results = experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(q) ||
          exp.location.toLowerCase().includes(q) ||
          exp.shortDescription?.toLowerCase().includes(q)
      );
      setFilteredExperiences(results);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [appliedQuery, experiences]);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setAppliedQuery(trimmedQuery);
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toLowerCase() !== trimmedQuery.toLowerCase());
        return [trimmedQuery, ...filtered].slice(0, 5);
      });
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setAppliedQuery("");
    setShowSuggestions(false);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    setAppliedQuery(query);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading experiences...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-medium">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        recentSearches={recentSearches}
        onRecentSearchClick={handleRecentSearchClick}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {appliedQuery ? (
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600 mt-1">
                {searching
                  ? "Searching..."
                  : `Found ${filteredExperiences.length} result${filteredExperiences.length !== 1 ? "s" : ""} for "${appliedQuery}"`}
              </p>
            </div>
            <button onClick={handleClear} className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <X className="h-4 w-4" /> Clear Search
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Explore Experiences</h1>
            <p className="text-gray-600 mt-2">Discover amazing adventures around the world</p>
          </div>
        )}

        {searching ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
          </div>
        ) : filteredExperiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or browse all experiences</p>
            {appliedQuery && (
              <button onClick={handleClear} className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium">
                View All Experiences
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

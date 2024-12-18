import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (query.trim()) {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  // Handle the Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white py-20">
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-4 py-2 rounded-full bg-white text-[#F83002] font-medium text-lg">
            Leading Platform for Career Growth
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Find, Apply, and Secure Your <span className="text-[#FFB703]">Ideal Job</span>
          </h1>
          <p className="text-white text-lg mt-4">
            Browse through thousands of curated job opportunities and take the next step in your career today.
          </p>
          <div className="flex justify-center items-center w-full max-w-lg mx-auto mt-6">
            <div className="flex w-full shadow-xl border-2 border-white rounded-full items-center gap-4 p-2 bg-white">
              <input
                type="text"
                placeholder="Search for jobs by title, company, or skill"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="outline-none border-none w-full py-2 px-4 text-gray-700 rounded-l-full focus:ring-2 focus:ring-[#6A38C2]"
              />
              <Button
                onClick={searchJobHandler}
                className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] transition duration-300 ease-in-out"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            {/* Section Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900">
                    Latest & Top
                </span>{' '}
                Job Openings
            </h1>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allJobs.length <= 0 ? (
                    <div className="col-span-full text-center text-gray-500 text-lg">
                        No Job Available
                    </div>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestJobs;

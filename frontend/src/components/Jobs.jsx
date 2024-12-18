import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery && typeof searchedQuery === 'object') {
            const { location, jobType, experience, salary, company } = searchedQuery;
    
            const filteredJobs = allJobs.filter((job) => {
                return (
                    (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
                    (!jobType || job.jobType.toLowerCase().includes(jobType.toLowerCase())) &&
                    (!experience || job.experienceLevel === parseInt(experience)) &&
                    (!salary || job.salary >= parseInt(salary.split('-')[0]) && job.salary <= parseInt(salary.split('-')[1])) &&
                    (!company || job.company.name.toLowerCase().includes(company.toLowerCase()))
                );
            });
    
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);    
    

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto mt-10 px-5">
                <div className="flex gap-6">
                    {/* Filter Panel */}
                    <div className="w-1/4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-700 mb-4">Filter Jobs</h2>
                        <FilterCard />
                    </div>

                    {/* Job Listings */}
                    <div className="flex-1 overflow-y-auto h-[88vh] pb-5">
                        {filterJobs.length <= 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex justify-center items-center h-full text-lg text-gray-600">
                                <span>No jobs found based on your search criteria.</span>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        initial={{ opacity: 0, y: 100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -100 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-[350px] flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;

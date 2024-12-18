import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto my-12 px-6">
                <h1 className="font-bold text-3xl text-gray-800 text-center mb-6">Search Results ({allJobs.length})</h1>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {
                        allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;

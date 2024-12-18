import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const FilterCard = () => {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedJobType, setSelectedJobType] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const dispatch = useDispatch();
    const { companies } = useSelector((store) => store.company);

    useEffect(() => {
        // Combining selected filters into a search query
        const combinedQuery = {
            location: selectedLocation,
            jobType: selectedJobType,
            experience: selectedExperience,
            salary: selectedSalary,
            company: selectedCompany,
        };
        dispatch(setSearchedQuery(combinedQuery));
    }, [selectedLocation, selectedJobType, selectedExperience, selectedSalary, selectedCompany, dispatch]);

    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <h1 className="font-semibold text-xl text-blue-800">Filter Jobs</h1>
            <hr className="mt-4 mb-6 border-t border-blue-300" />

            <div className="space-y-6">
                {/* Location Filter */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg text-blue-700 mb-3">Location</h2>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full bg-blue-50 border border-blue-300 rounded-md p-3 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Location</option>
                        {[
                            'Delhi NCR',
                            'Bangalore',
                            'Hyderabad',
                            'Mumbai',
                            'Pune',
                            'Chennai',
                            'Kolkata',
                            'Noida',
                            'Gurgaon',
                            'Ahmedabad',
                            'Chandigarh',
                            'Jaipur',
                            'Lucknow',
                            'Surat',
                            'Indore',
                            'Bhopal',
                            'Nagpur',
                            'Visakhapatnam',
                            'Kochi',
                            'Goa',
                        ].map((loc, idx) => (
                            <option key={idx} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg text-blue-700 mb-3">Job Type</h2>
                    <select
                        value={selectedJobType}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="w-full bg-blue-50 border border-blue-300 rounded-md p-3 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Job Type</option>
                        {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map((type, idx) => (
                            <option key={idx} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Experience Level Filter */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg text-blue-700 mb-3">Experience Level</h2>
                    <select
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-full bg-blue-50 border border-blue-300 rounded-md p-3 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Experience Level</option>
                        {['Fresher', '1-3 years', '3-5 years', '5+ years'].map((exp, idx) => (
                            <option key={idx} value={exp}>
                                {exp}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Salary Filter */}
                <div className="mb-6">
                    <h2 className="font-semibold text-lg text-blue-700 mb-3">Salary (LPA)</h2>
                    <select
                        value={selectedSalary}
                        onChange={(e) => setSelectedSalary(e.target.value)}
                        className="w-full bg-blue-50 border border-blue-300 rounded-md p-3 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Salary Range</option>
                        {['0-3 LPA', '3-5 LPA', '5-10 LPA', '10-20 LPA', '20-30 LPA', '30+ LPA'].map((salary, idx) => (
                            <option key={idx} value={salary}>
                                {salary}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Company Filter */}
                {companies.length > 0 && (
                    <div className="mb-6">
                        <h2 className="font-semibold text-lg text-blue-700 mb-3">Company</h2>
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="w-full bg-blue-50 border border-blue-300 rounded-md p-3 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Company</option>
                            {companies.map((company) => (
                                <option key={company._id} value={company.name.toLowerCase()}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterCard;

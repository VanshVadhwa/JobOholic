import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-6">
                        <Input
                            className="w-72 p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Search by company name"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition duration-300"
                        >
                            New Company
                        </Button>
                    </div>
                </div>
                <CompaniesTable />
            </div>
        </div>
    );
};

export default Companies;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name cannot be empty.');
            return;
        }

        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName: companyName.trim() },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while registering the company.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
                <div className="my-8 text-center">
                    <h1 className="text-3xl font-semibold text-blue-600 mb-4">Create Your Company</h1>
                    <p className="text-gray-600 mb-6">
                        What would you like to name your company? You can change this later.
                    </p>
                </div>

                <div className="mb-4">
                    <Label htmlFor="companyName" className="block text-lg text-gray-700">Company Name</Label>
                    <Input
                        id="companyName"
                        type="text"
                        className="mt-2 p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Google, Adobe, ..."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className="flex justify-between gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/companies')}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50 transition-all"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={registerNewCompany}
                        className="bg-blue-600 text-white hover:bg-blue-700 transition-all"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;

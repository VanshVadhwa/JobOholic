import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const EditJob = () => {
    const { id } = useParams();
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);

    const locations = ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Chennai', 'Kolkata', 'Noida', 'Gurgaon', 'Ahmedabad', 'Chandigarh', 'Jaipur', 'Lucknow', 'Surat', 'Indore', 'Bhopal', 'Nagpur', 'Visakhapatnam', 'Kochi', 'Goa'];

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
                const job = res.data.job;
                setInput({
                    title: job.title,
                    description: job.description,
                    requirements: job.requirements.join(","),
                    salary: job.salary,
                    location: job.location,
                    jobType: job.jobType,
                    experience: job.experienceLevel,
                    position: job.position,
                    companyId: job.company._id,
                });
            } catch (error) {
                toast.error('Error fetching job details.');
            }
        };
        fetchJob();
    }, [id]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value, filterType) => {
        setInput({ ...input, [filterType]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/edit/${id}`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const selectCompanyHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-full py-5 bg-gray-50">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl bg-white border border-gray-200 shadow-lg rounded-lg space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label>Salary (LPA)</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Select onValueChange={(value) => selectChangeHandler(value, 'location')}>
                                <SelectTrigger className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {locations.map((location) => (
                                            <SelectItem key={location} value={location}>
                                                {location}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select onValueChange={selectCompanyHandler}>
                                    <SelectTrigger className="mt-2 p-3 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Select Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    {companies.length === 0 && (
                        <p className="text-xs text-red-500 font-semibold text-center mt-3">
                            * Please register a company before editing a job.
                        </p>
                    )}
                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJob;

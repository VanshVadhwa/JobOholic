import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const cityNames = ['Delhi NCR',
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
    'Goa',];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: 0, // Stored as an integer
        location: "",
        jobType: "",
        experience: 0, // Numeric input
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (name, value) => {
        setInput({ ...input, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center py-10">
                <form
                    onSubmit={submitHandler}
                    className="bg-white p-8 max-w-4xl border border-gray-200 shadow-md rounded-lg w-full"
                >
                    <h2 className="text-xl font-semibold text-center mb-6 text-blue-600">Post a New Job</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1"
                                placeholder="Enter Job Title"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1"
                                placeholder="Enter Job Description"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1"
                                placeholder="Enter Job Requirements"
                            />
                        </div>
                        <div>
                            <Label>Salary (in LPA)</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1"
                                placeholder="Enter Salary in LPA"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Select
                                onValueChange={(value) => selectChangeHandler('location', value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {cityNames.map((city, index) => (
                                            <SelectItem key={index} value={city}>
                                                {city}
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
                                className="my-1"
                                placeholder="e.g., Full-time, Part-time"
                            />
                        </div>
                        <div>
                            <Label>Experience Level (Years)</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1"
                                placeholder="Enter Years of Experience"
                            />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1"
                                placeholder="Enter Number of Openings"
                            />
                        </div>
                        {companies.length > 0 && (
                            <div>
                                <Label>Company</Label>
                                <Select
                                    onValueChange={(value) => selectChangeHandler('companyId', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        {loading ? (
                            <Button className="w-full">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                                Post Job
                            </Button>
                        )}
                    </div>
                    {companies.length === 0 && (
                        <p className="text-center text-sm text-red-500 mt-4">
                            *Please register a company first before posting jobs.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;

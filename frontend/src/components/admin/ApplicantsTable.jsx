import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];
const backendUrl = 'https://joboholic.onrender.com'; // Define your backend URL here

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6">
            <Table>
                <TableCaption className="text-xl font-semibold text-gray-700">Recent Applicants</TableCaption>
                <TableHeader className="bg-gray-100 text-gray-600">
                    <TableRow>
                        <TableHead className="p-3 text-left">Full Name</TableHead>
                        <TableHead className="p-3 text-left">Email</TableHead>
                        <TableHead className="p-3 text-left">Contact</TableHead>
                        <TableHead className="p-3 text-left">Resume</TableHead>
                        <TableHead className="p-3 text-left">Date</TableHead>
                        <TableHead className="p-3 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-50 transition-colors duration-300">
                            <TableCell className="p-3">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="p-3">{item?.applicant?.email}</TableCell>
                            <TableCell className="p-3">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="p-3">
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 hover:underline"
                                        href={`${backendUrl}${item.applicant.profile.resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.applicant.profile.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-400">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="p-3">{item?.applicant.createdAt.split('T')[0]}</TableCell>
                            <TableCell className="p-3 text-right">
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer">
                                        <MoreHorizontal className="text-gray-600 hover:text-blue-500" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 bg-white border border-gray-200 rounded-md shadow-lg">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                onClick={() => statusHandler(status, item?._id)}
                                                key={index}
                                                className="flex w-full items-center my-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
                                            >
                                                <span className="text-gray-700">{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;

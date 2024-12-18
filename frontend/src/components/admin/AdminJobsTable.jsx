import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Company Name</TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</TableHead>
                        <TableHead className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id} className="border-b hover:bg-gray-50 transition-colors">
                            <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">{job?.company?.name}</TableCell>
                            <TableCell className="px-6 py-4 text-sm text-gray-600">{job?.title}</TableCell>
                            <TableCell className="px-6 py-4 text-sm text-gray-500">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right px-6 py-4">
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer">
                                        <MoreHorizontal className="w-5 text-gray-500 hover:text-gray-700 transition-colors" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/edit`)} // Updated navigation URL
                                            className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Edit2 className="w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">Edit</span>
                                        </div>
                                        <div
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 cursor-pointer p-2 mt-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            <Eye className="w-4 text-gray-500" />
                                            <span className="text-sm text-gray-700">Applicants</span>
                                        </div>
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

export default AdminJobsTable;

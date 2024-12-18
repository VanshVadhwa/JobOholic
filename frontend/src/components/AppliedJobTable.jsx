import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="overflow-x-auto rounded-lg shadow-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100">
            <Table className="min-w-full bg-white rounded-lg shadow-md">
                <TableCaption className="text-2xl font-semibold text-gray-800 pb-6">Your Applied Jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-blue-100">
                        <TableHead className="text-left px-6 py-3 text-sm text-gray-600">Date</TableHead>
                        <TableHead className="text-left px-6 py-3 text-sm text-gray-600">Job Role</TableHead>
                        <TableHead className="text-left px-6 py-3 text-sm text-gray-600">Company</TableHead>
                        <TableHead className="text-right px-6 py-3 text-sm text-gray-600">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-xl text-gray-500 italic">
                                    No jobs applied yet. Start exploring opportunities!
                                </TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-blue-50 transition duration-300 ease-in-out">
                                <TableCell className="px-6 py-4 text-sm text-gray-700">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="px-6 py-4 text-sm text-gray-700">{appliedJob.job?.title}</TableCell>
                                <TableCell className="px-6 py-4 text-sm text-gray-700">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right px-6 py-4 text-sm">
                                    <Badge className={`px-3 py-2 text-white rounded-full font-medium ${appliedJob?.status === "rejected" ? 'bg-red-500' : appliedJob.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable

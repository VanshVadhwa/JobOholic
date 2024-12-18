import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    const backendUrl = 'https://joboholic.onrender.com'; // Your backend URL

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    // Helper function to get the company logo URL
    const getLogoUrl = (logoPath) => {
        return logoPath ? `${backendUrl}${logoPath}` : '/default-logo.png'; // Fallback to a default logo if not found
    };

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white shadow-lg rounded-lg">
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-3 text-left">Logo</TableHead>
                        <TableHead className="px-4 py-3 text-left">Name</TableHead>
                        <TableHead className="px-4 py-3 text-left">Date</TableHead>
                        <TableHead className="px-4 py-3 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <TableRow key={company._id} className="border-t hover:bg-gray-50 transition-colors">
                                <TableCell className="px-4 py-3">
                                    <Avatar>
                                        <AvatarImage 
                                            src={getLogoUrl(company.logo)} 
                                            alt={`${company.name} Logo`}
                                            className="w-8 h-8 rounded-full" 
                                        />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="px-4 py-3">{company.name}</TableCell>
                                <TableCell className="px-4 py-3">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="px-4 py-3 text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-gray-600 hover:text-gray-900" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 p-2 rounded'>
                                                <Edit2 className='w-4 text-blue-600' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;

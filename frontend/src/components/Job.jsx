import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const backendUrl = 'http://localhost:3000'; // Your backend URL

    // Helper function to get the company logo URL
    const getLogoUrl = (logoPath) => {
        return logoPath ? `${backendUrl}${logoPath}` : '/default-logo.png'; // Fallback to a default logo
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    return (
        <div className="p-6 rounded-lg shadow-xl bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
            </div>

            <div className="flex items-center gap-3 my-3">
                <Button className="p-2" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage
                            src={getLogoUrl(job?.company?.logo)}
                            alt={`${job?.company?.name} Logo`}
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-xl text-gray-800">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-xl text-gray-900 mt-2">{job?.title}</h1>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{job?.description}</p>
            </div>

            <div className="flex items-center gap-3 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className="flex items-center gap-6 mt-5">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 ease-in-out"
                >
                    Details
                </Button>
                {/* <Button className="bg-[#7209b7] text-white hover:bg-[#5e07a3] transition-all duration-300 ease-in-out">
                    Save For Later
                </Button> */}
            </div>
        </div>
    );
};

export default Job;

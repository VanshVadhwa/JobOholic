import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const backendUrl = 'http://localhost:3000'; // Your backend URL

  // Helper function to get the company logo URL
  const getLogoUrl = (logoPath) => {
    return logoPath ? `${backendUrl}${logoPath}` : '/default-logo.png'; // Fallback to a default logo if not found
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-lg bg-white border border-gray-100 cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      {/* Company Logo and Name */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img
            src={getLogoUrl(job?.company?.logo)}
            alt={`${job?.company?.name} Logo`}
            className="w-10 h-10 rounded-full"
          />
          <h1 className="font-semibold text-xl text-gray-800">{job?.company?.name}</h1>
        </div>
        <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
      </div>

      {/* Job Title and Description */}
      <div className="my-3">
        <h1 className="font-bold text-xl text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-3 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">{job?.salary} LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;

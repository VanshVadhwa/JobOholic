import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullRequirements, setShowFullRequirements] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true); // Update local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((application) => application.applicant === user?._id)
          ); // Sync state with fetched data
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto my-12 bg-white shadow-md rounded-lg p-8 border border-gray-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-red-100 text-red-800 px-4 py-1 rounded-full">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-1 rounded-full">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-3 rounded-lg ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-blue-700 text-white hover:bg-blue-800'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mb-8"></div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Role:</h2>
          <p className="text-gray-600">{singleJob?.title}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Location:</h2>
          <p className="text-gray-600">{singleJob?.location || 'Not specified'}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Experience:</h2>
          <p className="text-gray-600">{singleJob?.experience || 0} yrs</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Salary:</h2>
          <p className="text-gray-600">{singleJob?.salary} LPA</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Total Applicants:</h2>
          <p className="text-gray-600">{singleJob?.applications?.length || 0}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Posted Date:</h2>
          <p className="text-gray-600">{singleJob?.createdAt?.split('T')[0] || 'N/A'}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Job Type:</h2>
          <p className="text-gray-600">{singleJob?.jobType}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Position:</h2>
          <p className="text-gray-600">{singleJob?.position || 'Not specified'}</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-gray-700 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Description:</h2>
          <p className="text-gray-600">
            {showFullDescription
              ? singleJob?.description
              : `${singleJob?.description?.slice(0, 150)}...`}
          </p>
          {singleJob?.description?.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 font-semibold mt-2"
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Requirements:</h2>
          <ul className="list-disc pl-5 text-gray-600">
            {showFullRequirements
              ? singleJob?.requirements?.map((req, idx) => (
                  <li key={idx}>{req.trim()}</li>
                ))
              : singleJob?.requirements?.slice(0, 3)?.map((req, idx) => (
                  <li key={idx}>{req.trim()}</li>
                ))}
          </ul>
          {singleJob?.requirements?.length > 3 && (
            <button
              onClick={() => setShowFullRequirements(!showFullRequirements)}
              className="text-blue-600 font-semibold mt-2"
            >
              {showFullRequirements ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

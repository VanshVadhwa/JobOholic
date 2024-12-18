import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Linkedin } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const backendUrl = 'http://localhost:3000';

    const renderSkills = () => {
        if (!user?.profile?.skills?.length) {
            return <span className="text-gray-500">NA</span>;
        }
        return user.profile.skills.map((skill, index) => (
            <Badge key={index} className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                {skill}
            </Badge>
        ));
    };

    const renderResume = () => {
        if (!user?.profile?.resume) {
            return <span className="text-gray-500">NA</span>;
        }
        return (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${backendUrl}${user.profile.resume}`}
                className="text-[#6A38C2] hover:underline cursor-pointer"
            >
                {user.profile.resumeOriginalName}
            </a>
        );
    };

    return (
        <div className="bg-[#F1F5F9]">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-6">
                        {/* Profile Avatar */}
                        <Avatar className="h-20 w-20 border-4 border-[#6A38C2] p-[2px] overflow-hidden">
                            <AvatarImage
                                src={
                                    user?.profile?.profilePhoto
                                        ? `${backendUrl}${user.profile.profilePhoto}`
                                        : 'https://via.placeholder.com/150'
                                }
                                alt="profile"
                                className="object-cover w-full h-full rounded-full"
                            />
                        </Avatar>

                        <div>
                            <h1 className="font-semibold text-xl text-[#1E3A8A]">{user?.fullname || 'Anonymous User'}</h1>
                            <p className="text-gray-600">{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        className="p-2 text-sm text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white rounded-full"
                    >
                        <Pen className="w-4 h-4" />
                    </Button>
                </div>

                {/* Contact Information */}
                <div className="my-5">
                    <div className="flex items-center gap-4 my-2">
                        <Mail className="text-[#6A38C2] w-5 h-5" />
                        <span className="text-[#1E3A8A]">{user?.email || 'No email provided'}</span>
                    </div>
                    <div className="flex items-center gap-4 my-2">
                        <Contact className="text-[#6A38C2] w-5 h-5" />
                        <span className="text-[#1E3A8A]">{user?.phoneNumber || 'No phone number provided'}</span>
                    </div>
                    {/* LinkedIn Profile (if available) */}
                    {user?.profile?.linkedin && (
                        <div className="flex items-center gap-4 my-2">
                            <Linkedin className="text-[#6A38C2] w-5 h-5" />
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={user?.profile?.linkedin}
                                className="text-[#1E3A8A] hover:underline"
                            >
                                LinkedIn Profile
                            </a>
                        </div>
                    )}
                </div>

                {/* Skills Section */}
                <div className="my-5">
                    <h1 className="font-semibold text-lg text-[#1E3A8A]">Skills</h1>
                    <div className="flex items-center gap-2 flex-wrap mt-2">{renderSkills()}</div>
                </div>

                {/* Resume Section */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold">Resume</Label>
                    {renderResume()}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8">
                <h1 className="font-bold text-lg text-[#1E3A8A] my-5">Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const backendUrl = 'https://joboholic.onrender.com';

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const getShortBio = (bio) => {
        if (bio && bio.length > 100) {
            return bio.slice(0, 100) + '...';
        }
        return bio;
    };

    return (
        <div className="bg-[#1E3A8A]">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" className="text-3xl font-bold text-[#FBBF24]">
                        Job<span className="text-[#F59E0B]">Oholic</span>
                    </Link>
                </div>

                {/* Centered Navigation Links */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6">
                    <ul className="flex font-medium items-center gap-6">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="text-white hover:text-[#FBBF24]">
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="text-white hover:text-[#FBBF24]">
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="text-white hover:text-[#FBBF24]">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/jobs" className="text-white hover:text-[#FBBF24]">
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="text-white hover:text-[#FBBF24]">
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* User Section */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-12 h-12 border-2 border-[#FBBF24] hover:border-[#F59E0B] p-[2px] transition-all duration-300 ease-in-out transform hover:scale-110">
                                    <AvatarImage
                                        src={
                                            user?.profile?.profilePhoto
                                                ? `${backendUrl}${user.profile.profilePhoto}`
                                                : 'https://via.placeholder.com/150'
                                        }
                                        alt="Profile"
                                        className="rounded-full"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-white text-black shadow-lg rounded-lg">
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar className="cursor-pointer w-16 h-16 border-2 border-[#FBBF24] hover:border-[#F59E0B] p-[2px] transition-all duration-300 ease-in-out transform hover:scale-110">
                                            <AvatarImage
                                                src={
                                                    user?.profile?.profilePhoto
                                                        ? `${backendUrl}${user.profile.profilePhoto}`
                                                        : 'https://via.placeholder.com/150'
                                                }
                                                alt="Profile"
                                                className="rounded-full"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{getShortBio(user?.profile?.bio)}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        {user && user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

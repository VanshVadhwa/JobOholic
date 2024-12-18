import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, EyeIcon, EyeOffIcon } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
        showPassword: false
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const togglePasswordVisibility = () => {
        setInput(prevState => ({
            ...prevState,
            showPassword: !prevState.showPassword
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full max-w-lg border border-gray-300 rounded-lg shadow-lg p-8 my-10 bg-white'>
                    <h1 className='font-semibold text-3xl text-center mb-6 text-blue-600'>Login</h1>

                    {/* Email */}
                    <div className='my-4'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="e.g., patel@gmail.com"
                            className="p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className='my-4 relative'>
                        <Label>Password</Label>
                        <Input
                            type={input.showPassword ? 'text' : 'password'}
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {input.showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className='flex items-center justify-between my-6'>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                    required
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    {
                        loading 
                        ? <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                          </Button> 
                        : <Button type="submit" className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700 transition-all">
                            Login
                          </Button>
                    }

                    {/* Signup Link */}
                    <span className='text-sm text-center block mt-4'>Don't have an account? <Link to="/signup" className='text-blue-600 hover:text-blue-800 transition-all'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;

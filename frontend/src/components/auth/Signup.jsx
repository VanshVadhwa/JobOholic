import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup } from '../ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import countryCodes from '@/utils/countryCodes.json'; // Import country codes JSON

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: '',
        countryCode: '+91',
    });
    const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Updated password validation function
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
        return passwordRegex.test(password);
    };

    const getPasswordStrength = (password) => {
        let strength = 'Weak';
        if (password.length >= 12) {
            strength = 'Strong';
        } else if (password.length >= 10) {
            strength = 'Medium';
        }
        return strength;
    };

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate phone number length based on selected country code
        const selectedCountry = countryCodes.find((c) => c.code === input.countryCode);
        
        if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
            toast.error('All fields are required!');
            return;
        }
        
        if (input.phoneNumber.length < selectedCountry.minLength || input.phoneNumber.length > selectedCountry.maxLength) {
            toast.error(`Phone number must be between ${selectedCountry.minLength}-${selectedCountry.maxLength} digits.`);
            return;
        }

        // Proceed with form submission regardless of password strength
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', `${input.countryCode}${input.phoneNumber}`);
        formData.append('password', input.password);
        formData.append('role', input.role);
        
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/'); // Redirect to home if user is already logged in
        }
    }, [user, navigate]);

    return (
        <div className="bg-gradient-to-r from-blue-100 to-indigo-200 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-full max-w-lg border border-gray-300 rounded-lg shadow-lg p-8 my-10 bg-white">
                    <h1 className="font-semibold text-3xl text-center mb-6 text-blue-600">Create an Account</h1>
                    
                    {/* Full Name */}
                    <div className="my-4">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="e.g., John Doe"
                            className="p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="my-4">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="e.g., john.doe@example.com"
                            className="p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Phone Number with Country Code */}
                    <div className="my-4">
                        <Label>Phone Number</Label>
                        <div className="flex items-center space-x-3">
                            <select
                                name="countryCode"
                                value={input.countryCode}
                                onChange={changeEventHandler}
                                className="p-3 border-2 border-indigo-300 rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {countryCodes.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.code} ({country.name})
                                    </option>
                                ))}
                            </select>
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}
                                placeholder="Phone Number"
                                className="p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="my-4 relative">
                        <Label>Password</Label>
                        <Input
                            type={passwordVisible ? 'text' : 'password'}
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a secure password"
                            className="p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </span>
                        {/* Provide feedback without blocking submission */}
                        {!isPasswordValid(input.password) && input.password && (
                            <p className="text-sm text-red-500 mt-2">
                                Password must be at least 10 characters long and include uppercase letters, lowercase letters, digits, and special characters.
                            </p>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="flex items-center justify-between my-6">
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

                    {/* Profile Image Upload */}
                    <div className="my-4">
                        <Label>Profile Picture</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer p-3 border-2 border-indigo-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700 transition-all">
                            Sign Up
                        </Button>
                    )}

                    {/* Login Link */}
                    <span className="text-sm text-center block mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-all">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
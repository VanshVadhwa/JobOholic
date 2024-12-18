import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 py-10 px-4 rounded-lg shadow-lg">
            <h2 className="text-center text-2xl font-bold text-blue-900 mb-6">
                Explore Categories
            </h2>
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent className="flex items-center justify-center gap-6">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full px-6 py-2 border-blue-500 text-blue-900 bg-white hover:bg-blue-100 hover:shadow-md transition-transform transform hover:scale-105"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-blue-500 hover:text-blue-700" />
                <CarouselNext className="text-blue-500 hover:text-blue-700" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;

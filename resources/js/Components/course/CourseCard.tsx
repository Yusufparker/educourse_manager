
import { CourseType } from '@/feature/course/useFetchCourses';
import { formatPrice } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import React from 'react';
import { Button, buttonVariants } from '../ui/button';


interface CourseCardProps {
    course: CourseType
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    
    return (
        <div className="overflow-hidden shadow border rounded-xl hover:shadow transition">
            <div className="h-40 overflow-hidden relative">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-110 transition"
                />
                <span className="absolute bottom-3 right-3 text-blue-500 bg-white py-1 px-2 rounded-full font-bold text-[10px]">
                    Rp. {formatPrice(course.price)}
                </span>
            </div>
            <div className="p-4 relative">
                <Link href={`/course/detail/${course.slug}`}>
                    <h2 className="text-slate-700 hover:text-slate-900 font-bold w-[80%]">
                        {course.title}
                    </h2>
                </Link>
                <span
                    className={`inline-block right-3.5 top-3 py-0.5 px-2 text-[10px] rounded-xl absolute ${
                        course.is_active
                            ? "bg-green-200 text-green-700"
                            : "bg-gray-300 text-gray-600"
                    }`}
                >
                    {course.is_active ? "Active" : "Inactive"}
                </span>

                <p className="text-xs text-gray-600 mt-2">
                    {course.description}
                </p>

                <div className="flex gap-2 mt-4 justify-end">
                    <Link
                        href={`/course/edit/${course.id}`}
                        className={`${buttonVariants({
                            variant: "default",
                            size:"xs",
                            className: "rounded-sm",
                        })} text-sm`}
                    >
                        Edit
                    </Link>
                    <Button
                        size="xs"
                        variant="destructive"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default CourseCard;
import React, { Suspense } from "react";
import { buttonVariants } from "@/Components/ui/button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useFetchCourses } from "@/feature/course/useFetchCourses";
import { Head } from "@inertiajs/react";
import CourseSkeleton from "@/Components/course/CourseSkeleton";
const CourseCard = React.lazy(() => import("@/Components/course/CourseCard"));
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import CourseEditor from "@/Components/course/CourseEditor"; 
const CourseList = ({ page }: { page: number }) => {
    const { data, isLoading } = useFetchCourses(page);

    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-700">
                                Courses
                            </h3>

                            {/* form modal */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        className={`${buttonVariants({
                                            variant: "default",
                                            className: "rounded-sm",
                                        })} text-sm`}
                                    >
                                        Add New
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add New Course
                                        </DialogTitle>
                                        <DialogDescription>
                                            Fill out the details to create a new
                                            course.
                                        </DialogDescription>
                                        
                                    </DialogHeader>
                                    <div className="mt-3">
                                        <CourseEditor />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {isLoading &&
                                [1, 2, 3, 4].map((index) => (
                                    <CourseSkeleton key={index} />
                                ))}
                            {data?.data.map((course, index) => (
                                <Suspense
                                    key={index}
                                    fallback={<CourseSkeleton />}
                                >
                                    <CourseCard key={index} course={course} />
                                </Suspense>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CourseList;

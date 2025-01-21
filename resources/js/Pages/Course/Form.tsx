import CourseEditor from "@/Components/course/CourseEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Form = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Form" />
            <div className="py-6  ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-700">
                                Add New Course
                            </h3>
                        </div>
                        <CourseEditor/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Form;

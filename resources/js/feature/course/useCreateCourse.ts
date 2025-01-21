import { z } from "zod";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseFormSchema } from "@/lib/zod";

export type CreateCourseRequest = z.infer<typeof CourseFormSchema>;

const createCourse = async (data: CreateCourseRequest): Promise<any> => {
    const formData = new FormData();

    // Menambahkan data ke FormData
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("is_active", data.is_active ? "1" : "0");
    formData.append("thumbnail", data.thumbnail[0]);

    const response = await axios.post("/course/store", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

const useCreateCourse = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<any, Error, CreateCourseRequest>({
        mutationFn: createCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
        },
        onError: (error) => {
            console.error("Error creating course:", error);
        },
    });

    return mutation;
};

export default useCreateCourse;

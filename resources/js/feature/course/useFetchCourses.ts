import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type CourseType = {
    id : number;
    slug : string;
    title : string;
    description : string;
    price : number;
    is_active : boolean;
    thumbnail : string;
    created_at : Date;
    updated_at : Date;
}

export type  FetchCourseResponse = {
    current_page : number;
    data  : CourseType[]
}


export const useFetchCourses = (page : number | null) => {
    return useQuery<FetchCourseResponse, Error>({
        queryKey: ["courses", page],
        queryFn: async (): Promise<FetchCourseResponse> => {
            const response = await axios.get("/course/list", {
                params: { page },
            });
            return response.data;
        },
    });
}
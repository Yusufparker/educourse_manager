import {z} from "zod";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormSchema } from "@/lib/zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
import { DialogFooter, DialogClose } from "../ui/dialog";
import useCreateCourse from "@/feature/course/useCreateCourse";
import { toast } from "react-hot-toast";

type CourseFormSchema = z.infer<typeof CourseFormSchema>

const CourseEditor = () => {
    const { register, handleSubmit, formState, control, setValue} =
        useForm<CourseFormSchema>({
            resolver: zodResolver(CourseFormSchema),
        });
    const { mutate: createCourse, isError, error } = useCreateCourse();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = handleSubmit((values) => {
        setIsLoading(true);

        const createCoursePromise = new Promise((resolve, reject) => {
            createCourse(values, {
                onSuccess: (response) => {
                    resolve(response); // Berhasil
                },
                onError: (error) => {
                    reject(error); // Gagal
                },
            });
        });

        toast.promise(createCoursePromise, {
            loading: "Creating course...",
            success: "Course created successfully!",
            error: (error) =>
                `Error creating course: ${error.message || error}`,
        });

        createCoursePromise
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
                window.location.reload()
            });
    });

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Form Fields */}
                <div className="flex-1 space-y-3">
                    <div>
                        <Label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            placeholder="Enter your title"
                            {...register("title")}
                        />
                        {formState.errors.title && (
                            <p className="text-xs text-red-500 mt-2">
                                {formState.errors.title.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </Label>
                        <Input
                            type="text"
                            id="description"
                            placeholder="Enter your description"
                            {...register("description")}
                        />
                        {formState.errors.description && (
                            <p className="text-xs text-red-500 mt-2">
                                {formState.errors.description.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Price
                        </Label>
                        <Input
                            type="number"
                            id="price"
                            placeholder="Enter your price"
                            {...register("price")}
                        />
                        {formState.errors.price && (
                            <p className="text-xs text-red-500 mt-2">
                                {formState.errors.price.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="w-full md:w-1/2">
                    <div>
                        <Label htmlFor="thumbnail" className="block mb-2">
                            Thumbnail
                        </Label>
                        <Controller
                            name="thumbnail"
                            control={control}
                            render={({ field }) => (
                                <FilePond
                                    {...field}
                                    credits={false}
                                    allowMultiple={false}
                                    acceptedFileTypes={["image/*"]}
                                    onupdatefiles={(fileItems) => {
                                        setValue(
                                            "thumbnail",
                                            fileItems.map((item) => item.file)
                                        );
                                    }}
                                />
                            )}
                        />
                        {formState.errors.thumbnail && (
                            <p className="text-xs text-red-500 mt-2">
                                {String(formState.errors.thumbnail.message)}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Controller
                            name="is_active"
                            control={control}
                            defaultValue={true}
                            render={({ field }) => (
                                <Switch
                                    {...field}
                                    id="is-active"
                                    checked={field.value}
                                    onCheckedChange={(val) => {
                                        setValue("is_active", val);
                                    }}
                                    value={String(field.value)}
                                />
                            )}
                        />
                        <Label htmlFor="is-active">Active</Label>
                    </div>
                </div>
            </div>

            <div className="pt-8 flex justify-end gap-3">
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button 
                            type="button" 
                            variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
                <Button 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Save'}
                </Button>
            </div>
        </form>
    );
};

export default CourseEditor;

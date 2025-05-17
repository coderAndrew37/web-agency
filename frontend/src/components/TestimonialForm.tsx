import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema } from "../Utils/validationSchemas";
import { useSubmitTestimonial } from "../hooks/testimonials/useTestimonial";
import { useCurrentUser } from "../hooks/auth/useAuth";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ✅ Define type just for form input (not server)
type TestimonialFormData = {
  name: string;
  message: string;
  image?: FileList;
};

const TestimonialForm = () => {
  const user = useCurrentUser();
  const { submit, isSubmitting, isError, isSuccess, error } =
    useSubmitTestimonial();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("❌ Image size must be under 2MB");
        return setPreview(null);
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("✅ Testimonial submitted for approval!");
      reset();
      setPreview(null);
    } else if (isError) {
      toast.error(`❌ Submission failed. ${error || ""}`);
    }
  }, [isSuccess, isError, error, reset]);

  const onSubmit = async (data: TestimonialFormData) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    await submit(formData);
  };

  if (!user) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            📝 Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-600">
          Please sign in to submit a testimonial.
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      className="max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary">
            📝 Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} disabled={isSubmitting} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="message">Testimonial</Label>
              <Textarea
                id="message"
                rows={4}
                {...register("message")}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="image">Optional Image</Label>
              <Input
                id="image"
                type="file"
                {...register("image")}
                disabled={isSubmitting}
                accept="image/*"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover rounded-full border"
                />
              )}
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Testimonial"
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Submit your honest feedback 💬</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialForm;
// This component is a form for submitting testimonials. It includes fields for the user's name, message, and an optional image upload. The form uses React Hook Form for validation and submission handling, and it provides feedback to the user on submission status.

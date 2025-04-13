export interface Testimonial {
  _id: string;
  name: string;
  message: string;
  image?: string;
  approved: boolean;
  createdAt?: string;
}

export type SubmitTestimonialPayload = {
  name: string;
  message: string;
  image?: FileList;
};

import { Booking } from "../models/booking";
import { Project, projectValidationSchema } from "../models/project";
import logger from "../utils/logger";
import User from "../models/User";

function getDefaultMilestones(serviceType: string) {
  const templates: Record<
    string,
    Array<{ name: string; completed: boolean }>
  > = {
    "web-design": [
      { name: "Initial consultation", completed: true },
      { name: "Design mockups", completed: false },
      { name: "Client approval", completed: false },
      { name: "Development", completed: false },
      { name: "Launch", completed: false },
    ],
    "app-development": [
      { name: "Requirements gathering", completed: true },
      { name: "Wireframing", completed: false },
      { name: "Prototype", completed: false },
      { name: "Development", completed: false },
      { name: "Testing", completed: false },
      { name: "App Store Submission", completed: false },
    ],
    seo: [
      { name: "Site audit", completed: false },
      { name: "Keyword research", completed: false },
      { name: "On-page optimization", completed: false },
    ],
    "facebook-ads": [
      { name: "Ad copy creation", completed: false },
      { name: "Target audience setup", completed: false },
      { name: "Ad launch", completed: false },
    ],
    "google-ads": [
      { name: "Keyword research", completed: false },
      { name: "Ad copy creation", completed: false },
      { name: "Campaign setup", completed: false },
    ],
    "email-marketing": [
      { name: "Email list segmentation", completed: false },
      { name: "Email template design", completed: false },
      { name: "Campaign launch", completed: false },
    ],
    // Add other services...
  };

  return (
    templates[serviceType] || [
      { name: "Kickoff meeting", completed: true },
      { name: "Project execution", completed: false },
      { name: "Final delivery", completed: false },
    ]
  );
}

export const createProjectFromBooking = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId).populate("user");
  if (!booking) throw new Error("Booking not found");

  // Type guard to ensure populated user
  const user = booking.user instanceof User ? booking.user : null;
  if (!user) throw new Error("Invalid or unpopulated user reference");
  if (!user.name) throw new Error("Invalid user reference");

  const projectData = {
    booking: booking._id,
    user: user._id,
    serviceType: booking.serviceType,
    name: `${booking.serviceType} project for ${user.name}`,
    status: "not-started",
    milestones: getDefaultMilestones(booking.serviceType),
    description:
      booking.notes || `Project created from booking on ${booking.meetingDate}`,
  };

  // Validate against schema
  const { error } = projectValidationSchema.validate(projectData);
  if (error) throw new Error(`Validation error: ${error.message}`);

  const project = new Project(projectData);
  await project.save();

  await Booking.findByIdAndUpdate(bookingId, {
    status: "converted-to-project",
  });

  logger.info(`🔄 Converted booking ${bookingId} to project ${project._id}`);
  return project;
};

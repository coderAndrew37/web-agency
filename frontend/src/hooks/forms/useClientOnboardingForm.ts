import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientData } from "../../types/client";
import axios from "axios";
import { useSubmitClientForm } from "../useSubmitClientForm";

export const useClientOnboardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    control,
    getValues,
    setValue,
  } = useForm<ClientData>({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      servicesInterested: [],
      budget: 5000,
      message: "",
    },
  });

  const { mutateAsync: submitClientForm } = useSubmitClientForm();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: ClientData) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await submitClientForm(data);
      setMessage("✅ " + response.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `❌ ${
            error.response?.data?.message ||
            "Submission failed. Please try again."
          }`
        );
      } else {
        setMessage("❌ An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = async () => {
    switch (step) {
      case 1:
        return await trigger(["fullName", "email", "phone"]);
      case 2:
        return await trigger(["businessName"]);
      case 3:
        return await trigger(["servicesInterested", "budget"]);
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    const valid = await isStepValid();
    if (valid) setStep((prev) => prev + 1);
  };

  const handleBackStep = () => setStep((prev) => prev - 1);

  const selectedServices = getValues("servicesInterested");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: string[] = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setValue("servicesInterested", selected);
  };

  return {
    register,
    handleSubmit,
    control,
    onSubmit,
    step,
    setStep,
    handleNextStep,
    handleBackStep,
    handleServiceChange,
    selectedServices,
    errors,
    isValid,
    loading,
    message,
  };
};

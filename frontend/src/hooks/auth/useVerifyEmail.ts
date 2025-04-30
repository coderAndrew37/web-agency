import { useState } from "react";
import { useAuthActions } from "./useAuthActions";
import { VerifyData } from "../../types/authTypes";

export const useVerifyEmail = () => {
  const { verify } = useAuthActions();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (otpData: VerifyData) => {
    setIsVerifying(true);
    try {
      await verify(otpData);
      return true;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    handleVerify,
    isVerifying,
  };
};

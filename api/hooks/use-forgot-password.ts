import { useMutation, mutationOptions } from "@tanstack/react-query";

import { postForgotPassword } from "../services/forgot-password";
import { ForgotPasswordReqInterface } from "../interfaces/forgot-password-interface";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordReqInterface) => {
      return postForgotPassword(data);
    },
    ...mutationOptions,
  });
};

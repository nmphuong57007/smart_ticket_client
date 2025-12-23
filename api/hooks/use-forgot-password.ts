import { useMutation, mutationOptions } from "@tanstack/react-query";

import { ForgotPasswordReqInterface } from "../interfaces/forgot-password-interface";
import { postForgotPassword } from "../services/forgot-password";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordReqInterface) => {
      return postForgotPassword(data);
    },
    ...mutationOptions,
  });
};
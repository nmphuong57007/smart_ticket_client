import { useMutation, mutationOptions } from "@tanstack/react-query";

import { ResetPasswordReqInterface } from "../interfaces/reset-password-interface";
import { resetPassword } from "../services/reset-password";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordReqInterface) => {
      return resetPassword(data);
    },
    ...mutationOptions,
  });
};
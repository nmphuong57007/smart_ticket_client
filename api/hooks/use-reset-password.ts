import { useMutation, mutationOptions } from "@tanstack/react-query";

import { resetPassword } from "../services/reset-password";
import { ResetPasswordReqInterface } from "../interfaces/reset-password-interface";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordReqInterface) => {
      return resetPassword(data);
    },
    ...mutationOptions,
  });
};

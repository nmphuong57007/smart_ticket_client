import { useMutation, mutationOptions } from "@tanstack/react-query";

import { changePassword } from "../services/change-password";
import { ChangePasswordReqInterface } from "../interfaces/change-password";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordReqInterface) => {
      return changePassword(data);
    },
    ...mutationOptions,
  });
};
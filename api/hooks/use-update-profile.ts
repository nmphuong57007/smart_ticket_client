import { useMutation, mutationOptions } from "@tanstack/react-query";

import { updateProfile } from "../services/profile-api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return updateProfile(data);
    },
    ...mutationOptions,
  });
};

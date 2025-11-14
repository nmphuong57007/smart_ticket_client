import { useMutation, mutationOptions } from "@tanstack/react-query";

import { postLogout } from "../services/logout-api";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      return postLogout();
    },
    ...mutationOptions,
  });
};

import { useMutation, mutationOptions } from "@tanstack/react-query";

import { postRegister } from "../services/register-api";
import { RegisterReqInterface } from "../interfaces/register-interface";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterReqInterface) => {
      return postRegister(data);
    },
    ...mutationOptions,
  });
};

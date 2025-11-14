export interface RegisterReqInterface {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  gender: "male" | "female" | "other";
  password: string;
  device_name: string;
}

export interface RegisterResInterface {
  data: {
    user: {
      id: number;
      fullname: string;
      avatar: string | null;
      email: string;
      phone: string | null;
      address: string | null;
      gender: string | null;
      role: string;
      points: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
}

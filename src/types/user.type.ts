import { TRoles } from "@/constants/userType";

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type TUser = {
  _id?: string;
  role?: TRoles,
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  address: Address;
  isDeleted: false;
  photo?: string;
};

export type TUpdateUser = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: Address;
  isDeleted?: false;
  photo?: string;
};

export type TSignInUser = {
  email: string;
  password: string;
};

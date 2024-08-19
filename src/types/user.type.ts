export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type TUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  address: Address;
  isDeleted: false;
};

export type TSignInUser = {
  email: string;
  password: string;
};

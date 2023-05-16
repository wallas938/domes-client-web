export interface ClientPostDTO {
  lastname: string;
  firstname:string;
  phoneNumber: string;
  address: Address;
  email: string;
  password: string;
}

export interface ClientGetDTO {
  id: string;
  lastname: string;
  firstname:string;
  phoneNumber: string;
  address: Address;
  email: string;
  password: string;
}

export interface Address {
  country: string | null | undefined;
  city: string | null | undefined;
  street: string | null | undefined;
  zipCode: string | null | undefined;
}

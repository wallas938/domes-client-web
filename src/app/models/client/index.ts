export interface ClientPostDTO {
  lastname: string | null | undefined;
  firstname:string | null | undefined;
  phoneNumber: string | null | undefined;
  address: Address | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface ClientGetDTO {
  id: string | null | undefined;
  lastname: string | null | undefined;
  firstname:string | null | undefined;
  phoneNumber: string | null | undefined;
  address: Address | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface Address {
  country: string | null | undefined;
  city: string | null | undefined;
  street: string | null | undefined;
  zipCode: string | null | undefined;
}

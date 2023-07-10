import {AnimalGetDTO} from "../animal";
import {Address, ClientGetDTO} from "../client";

export interface OrderGetDTO {
  id: string;
  cart: AnimalGetDTO[];
  client: ClientGetDTO;
  shippingAddress: Address;
  numberOfArticles: number;
  total: number;
}

export interface OrderPostDTO {
  cart: AnimalGetDTO[];
  client: ClientGetDTO;
  shippingAddress: Address;
  numberOfArticles: number;
  total: number;
}

export interface PaymentInfo {
  cardNumber: string | null | undefined;
  cvv: string | null | undefined;
  name: string | null | undefined;
  expirationDate: {
    month: string | null | undefined,
    year: string | null | undefined
  } | null | undefined;
}

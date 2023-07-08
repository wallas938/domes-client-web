import {CategoryName} from "./category";

export interface AnimalGetDTO {
  id: string,
  description: string;
  mainPicture: string;
  secondPicture: string;
  thirdPicture: string;
  fourthPicture: string;
  category: Category;
  specie: Specie;
  age: number;
  price: number;
  sold: boolean;
};

export interface Specie {
  id: string;
  name: string
}

export interface Category {
  id: string;
  name: string
}
export interface Article {
  id: string,
  specie: string;
  age: number;
  price: number;
};

export interface AnimalSearchQuery {
  minPrice: number;
  maxPrice: number;
  minAge: number;
  maxAge: number;
  category: Category;
  specie: Specie;
  pageNumber: number;
  pageSize: number;
}

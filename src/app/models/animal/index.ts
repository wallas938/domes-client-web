export interface AnimalGetDTO {
  id: String,
  description: String;
  mainPicture: String;
  secondPicture: String;
  thirdPicture: String;
  fourthPicture: String;
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
  id: String,
  specie: String;
  age: number;
  price: number;
};

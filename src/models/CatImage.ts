import type CatBreed from "models/CatBreed";

export default interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: CatBreed[];
}

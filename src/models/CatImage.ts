import type CatBreed from "./CatBreed";

export default interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
}

import type CatBreed from "models/CatBreed";
import type CatImage from "models/CatImage";
import AppError from "errors/AppError";

export const getBreeds = async (): Promise<CatBreed[]> => {
  const response = await fetch(
    `${process.env.REACT_APP_CAT_API_BASE_URL}/breeds`,
    getOptions(),
  );
  if (response.status !== 200) {
    throw Error("Could not retrieve list of breeds");
  }

  const breeds = (await response.json()) as CatBreed[];
  return breeds;
};

export const getImages = async (
  breedId: string,
  page: number,
  limit: number = 10,
  order: "ASC" | "DESC" | "RAND" = "ASC",
): Promise<{
  images: CatImage[];
  totalCount: number | undefined;
}> => {
  const params = new URLSearchParams();
  params.append("breed_id", breedId);
  params.append("page", `${page}`);
  params.append("limit", `${limit}`);
  params.append("order", order);

  const response = await fetch(
    `${process.env.REACT_APP_CAT_API_BASE_URL}/images/search?${params.toString()}`,
    getOptions(),
  );

  if (response.status !== 200) {
    throw new AppError("Could not retrieve list of images");
  }

  const images = (await response.json()) as CatImage[];
  const total = response.headers.get("Pagination-Count");
  return {
    images,
    totalCount: total ? parseInt(total) : undefined,
  };
};

export const getImage = async (imageId: string): Promise<CatImage> => {
  const response = await fetch(
    `${process.env.REACT_APP_CAT_API_BASE_URL}/images/${imageId}`,
    getOptions(),
  );
  if (response.status !== 200) {
    // Catch all 4XX. The Cat API returns 400 for invalid image ID.
    if (response.status === 400 || response.status === 404) {
      throw new AppError("Not Found", AppError.CAT_IMAGE_NOT_FOUND);
    }
    throw new AppError("Could not retrieve image details");
  }

  const image = (await response.json()) as CatImage;
  return image;
};

function getOptions() {
  const headers = new Headers({
    Accept: "application/json",
  });

  if (process.env.NODE_ENV === "development") {
    headers.set("x-api-key", process.env.REACT_APP_CAT_API_KEY ?? "");
  }

  return { headers };
}

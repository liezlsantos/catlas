import React, { createContext, useEffect, useState } from "react";
import type CatBreed from "models/CatBreed";
import type CatImage from "models/CatImage";
import { getBreeds, getImages } from "services/cats";

/**
 * Would be nice to choose a pagination limit that is
 * divisible by 4, 2 and 1 (the number of items in a row for
 * xl, md, and xs screen, respectively).
 */
const PAGE_LIMIT = 8;

interface SearchContextType {
  state: {
    breeds: CatBreed[];
    breedId: string | undefined;
    images: CatImage[];
    totalImagesCount: number | undefined;
    isLoading: boolean;
    error: string | null;
  };
  fetchBreeds: () => void;
  search: (breedId: string) => void;
  nextPage: () => void;
}

export const SearchContext = createContext<SearchContextType>({
  state: {
    breeds: [],
    breedId: undefined,
    images: [],
    totalImagesCount: undefined,
    isLoading: false,
    error: null,
  },
  fetchBreeds: () => {},
  search: () => {},
  nextPage: () => {},
});

interface SearchContextProviderProps {
  children: React.ReactNode;
}

export const SearchContextProvider: React.FC<SearchContextProviderProps> = ({
  children,
}) => {
  const [breeds, setBreeds] = useState<CatBreed[]>([]);
  const [breedId, setBreedId] = useState<string | undefined>();
  const [images, setImages] = useState<CatImage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalImagesCount, setTotalImagesCount] = useState<number>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBreeds = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const breedList = await getBreeds();
      setBreeds(breedList);
    } catch (e) {
      setError(
        "Apologies but we could not load cats for you at this time! Miau!",
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (breedId === undefined) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const listData = await getImages(breedId, currentPage, PAGE_LIMIT);
        const { images: imageList, totalCount } = listData;
        setTotalImagesCount(totalCount);
        setImages((prev) => [...prev, ...imageList]);
      } catch (e) {
        setError(
          "Apologies but we could not load cats for you at this time! Miau!",
        );
      }
      setIsLoading(false);
    };
    fetchImages();
  }, [breedId, currentPage]);

  const search = (breedId: string) => {
    setBreedId(breedId);
    setTotalImagesCount(undefined);
    setImages([]);
    setCurrentPage(0);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <SearchContext.Provider
      value={{
        state: {
          breeds,
          breedId,
          images,
          totalImagesCount,
          isLoading,
          error,
        },
        fetchBreeds,
        search,
        nextPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

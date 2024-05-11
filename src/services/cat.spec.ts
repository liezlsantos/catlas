import { getBreeds, getImages, getImage } from "services/cats";
import AppError from "errors/AppError";

describe("Cat API service", () => {
  const breed = {
    id: "abc",
    name: "Test",
  };

  const image = {
    id: "xyz",
    url: "https://example.png",
    width: 100,
    height: 100,
    breeds: [breed],
  };

  let fetchSpy: any = undefined;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getBreeds", () => {
    it("should return list of breeds if API call is successful", async () => {
      const breeds = [breed];
      fetchSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: async () => breeds,
        } as Response),
      );

      const fetchedBreeds = await getBreeds();

      const expectedOptions = {
        headers: new Headers({
          Accept: "application/json",
        }),
      };
      expect(fetchSpy).toHaveBeenCalledWith(
        `${process.env.REACT_APP_CAT_API_BASE_URL}/breeds`,
        expectedOptions,
      );
      expect(fetchedBreeds).toEqual(breeds);
    });

    it("should throw an error if API call is unsuccessful", async () => {
      fetchSpy.mockImplementation(() =>
        Promise.resolve({
          status: 500,
        } as Response),
      );
      await expect(async () => {
        await getBreeds();
      }).rejects.toThrow(Error);
    });
  });

  describe("getImages", () => {
    it("should return list of images if API call is successful", async () => {
      const images = [image];
      const totalCount = 100;
      fetchSpy.mockImplementation(() => {
        const mockResponse = {
          status: 200,
          json: async () => images,
          headers: new Headers(),
        } as Response;
        mockResponse.headers.set("Pagination-Count", `${totalCount}`);
        return Promise.resolve(mockResponse);
      });

      const page = 1;
      const limit = 10;
      const order = "DESC";
      const fetchedImages = await getImages(breed.id, page, limit, order);

      const expectedOptions = {
        headers: new Headers({
          Accept: "application/json",
        }),
      };
      const expectedQueryString = `breed_id=${breed.id}&page=${page}&limit=${limit}&order=${order}`;
      expect(fetchSpy).toHaveBeenCalledWith(
        `${process.env.REACT_APP_CAT_API_BASE_URL}/images/search?${expectedQueryString}`,
        expectedOptions,
      );
      expect(fetchedImages).toEqual({
        images,
        totalCount,
      });
    });

    it("should throw an error if API call is unsuccessful", async () => {
      fetchSpy.mockImplementation(() =>
        Promise.resolve({
          status: 500,
        } as Response),
      );
      await expect(async () => {
        await getImages(image.id, 0);
      }).rejects.toThrow(Error);
    });
  });

  describe("getImage", () => {
    it("should return the image details if API call is successful", async () => {
      fetchSpy.mockImplementation(() =>
        Promise.resolve({
          status: 200,
          json: async () => image,
        } as Response),
      );

      const fetchedImage = await getImage(image.id);

      const expectedOptions = {
        headers: new Headers({
          Accept: "application/json",
        }),
      };
      expect(fetchSpy).toHaveBeenCalledWith(
        `${process.env.REACT_APP_CAT_API_BASE_URL}/images/${image.id}`,
        expectedOptions,
      );
      expect(fetchedImage).toEqual(image);
    });

    it("should throw an error if image ID is invalid", async () => {
      fetchSpy.mockImplementation(() =>
        Promise.resolve({
          status: 400,
        } as Response),
      );
      await expect(async () => {
        await getImage("invalid");
      }).rejects.toThrow(AppError);
    });

    it("should throw an error if API call is unsuccessful", async () => {
      fetchSpy.mockImplementation(() =>
        Promise.resolve({
          status: 500,
        } as Response),
      );
      await expect(async () => {
        await getImage(image.id);
      }).rejects.toThrow(Error);
    });
  });
});

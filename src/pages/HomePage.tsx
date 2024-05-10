import React, { useContext, useMemo } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import Loader from "components/Loader";
import CatImagesList from "components/CatImagesList";
import SearchContext from "context/SearchContext";
import type CatBreed from "models/CatBreed";

const HomePage: React.FC = () => {
  const { state, search, nextPage, fetchBreeds } = useContext(SearchContext);
  const { breeds, images, breedId, totalImagesCount, isLoading, error } = state;

  const handleChangeBreed = (selected: Option[]) => {
    if (selected.length === 0) {
      return;
    }
    const selectedBreed = selected[0] as CatBreed;
    if (breedId !== selectedBreed.id || error !== null) {
      search(selectedBreed.id);
    }
  };

  const defaultSelectedOption = useMemo(() => {
    const selectedBreed = breeds.find(({ id }) => id === breedId) as Option;
    return selectedBreed ? [selectedBreed] : undefined;
  }, [breeds, breedId]);

  // Allows retrying to retrieve the list of breeds without reloading the page
  const handleTryAgain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetchBreeds();
  };

  const hasMore = totalImagesCount && images.length < totalImagesCount;
  const showEndOfList =
    error === null && !hasMore && !isLoading && breedId !== undefined;

  return (
    <div className="page-container">
      {breeds.length > 0 && (
        <Row>
          <Col xl={4} md={6} sm={12}>
            <Form.Group>
              <Form.Label>Search by Cat Breed</Form.Label>
              <Typeahead
                id="breed-selection"
                labelKey="name"
                onChange={handleChangeBreed}
                options={breeds}
                placeholder="Choose a breed"
                defaultSelected={defaultSelectedOption}
                disabled={isLoading}
                clearButton
              />
            </Form.Group>
          </Col>
          {totalImagesCount && (
            <Col xl={8} md={6} sm={12} className="align-self-end text-md-end">
              <small>
                Showing {images.length} out of {totalImagesCount} images
              </small>
            </Col>
          )}
        </Row>
      )}

      {error !== null && (
        <Alert
          variant="danger"
          dismissible={breeds.length > 0}
          className="my-4"
        >
          <div>{error}</div>
          {breeds.length === 0 && (
            <Button variant="link" onClick={handleTryAgain}>
              Please try again after a few minutes.
            </Button>
          )}
        </Alert>
      )}

      <CatImagesList images={images} />

      {isLoading && <Loader />}

      {hasMore && !isLoading && (
        <Button className="mb-4" onClick={nextPage}>
          Load more
        </Button>
      )}

      {showEndOfList && <div>All available images are displayed.</div>}
    </div>
  );
};

export default HomePage;

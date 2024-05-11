import React, { useContext, useMemo } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import Loader from "components/Loader/Loader";
import CatImagesList from "components/CatImagesList/CatImagesList";
import SearchContext from "context/SearchContext";
import type CatBreed from "models/CatBreed";
import "./HomePage.scss";

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

  let hasMore = false;
  let showEndOfList = false;
  const hasError = error !== null;
  if (totalImagesCount !== undefined) {
    hasMore = images.length < totalImagesCount;
    showEndOfList =
      !hasError && !hasMore && !isLoading && breedId !== undefined;
  }

  return (
    <div className="home-page">
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
          {totalImagesCount !== undefined && (
            <Col xl={8} md={6} sm={12} className="count-status-text">
              <small>
                Showing {images.length} out of {totalImagesCount} image(s)
              </small>
            </Col>
          )}
        </Row>
      )}

      {hasError && (
        <Alert
          variant="danger"
          dismissible={breeds.length > 0}
          className="error-banner"
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

      {hasMore && !isLoading && <Button onClick={nextPage}>Load more</Button>}

      {showEndOfList && (
        <div>
          {totalImagesCount === 0
            ? "No available images."
            : "All available images are displayed."}
        </div>
      )}
    </div>
  );
};

export default HomePage;

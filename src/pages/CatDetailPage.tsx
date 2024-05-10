import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Loader from "components/Loader";
import CatImageDetail from "components/CatImageDetail";
import type CatImage from "models/CatImage";
import AppError from "errors/AppError";
import { getImage } from "services/cats";

type CatPageParams = {
  id: string;
};

const CatPage: React.FC = () => {
  const { id } = useParams<CatPageParams>();
  const [image, setImage] = useState<CatImage>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoToHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    const fetchImageDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const imageDetails = await getImage(id!);
        setImage(imageDetails);
      } catch (e) {
        if (
          e instanceof AppError &&
          e.getCode() === AppError.CAT_IMAGE_NOT_FOUND
        ) {
          navigate("/404");
          return;
        }
        setError(
          "Apologies but we could not load cat details for you at this time! Miau!",
        );
      }
      setIsLoading(false);
    };
    fetchImageDetails();
  }, [id, navigate]);

  const location = useLocation();
  const hasNavigatedInApp = location.key !== "default";

  const displayError = error !== null && image === undefined;

  return (
    <div className="page-container">
      {(image !== undefined || error !== null) && (
        <div className="pb-4">
          {hasNavigatedInApp ? (
            <Button variant="link" onClick={handleGoToHome}>
              Back
            </Button>
          ) : (
            <Link to="/">Go to Home</Link>
          )}
        </div>
      )}

      {displayError && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}

      {isLoading && <Loader />}

      {image && <CatImageDetail image={image} />}
    </div>
  );
};

export default CatPage;

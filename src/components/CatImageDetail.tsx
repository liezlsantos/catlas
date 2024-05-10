import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pill from "components/Pill";
import type CatImage from "models/CatImage";

interface CatImageDetailProps {
  image: CatImage;
}

const CatImageDetail: React.FC<CatImageDetailProps> = ({ image }) => {
  const breed = image.breeds ? image.breeds[0] : null;

  return (
    <Row>
      <Col md={6} sm={12}>
        <a href={image.url} target="_blank" rel="noreferrer">
          <img
            src={image.url}
            alt={breed?.name}
            className="rounded mb-4 w-100"
          />
        </a>
      </Col>
      <Col md={6} sm={12}>
        <h1>{breed?.name}</h1>
        <h6>Origin: {breed?.origin ?? "Unknown"} </h6>
        <div className="d-flex py-2 flex-wrap">
          {breed?.temperament &&
            breed?.temperament
              .split(",")
              .map((temperament, i) => <Pill key={i} label={temperament} />)}
        </div>
        <div className="pt-4">{breed?.description}</div>
      </Col>
    </Row>
  );
};

export default CatImageDetail;

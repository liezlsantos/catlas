import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pill from "components/Pill/Pill";
import type CatImage from "models/CatImage";
import "./CatImageDetail.scss";

interface CatImageDetailProps {
  image: CatImage;
}

const CatImageDetail: React.FC<CatImageDetailProps> = ({ image }) => {
  const breed = image.breeds ? image.breeds[0] : null;

  return (
    <Row className="cat-detail-container">
      <Col md={6} sm={12}>
        <a href={image.url} target="_blank" rel="noreferrer">
          <img src={image.url} alt={breed?.name} className="cat-image" />
        </a>
      </Col>
      <Col md={6} sm={12}>
        <h1>{breed?.name}</h1>
        <h6>Origin: {breed?.origin ?? "Unknown"} </h6>
        <div className="pill-container">
          {breed?.temperament &&
            breed?.temperament
              .split(",")
              .map((temperament, i) => <Pill key={i} label={temperament} />)}
        </div>
        <div className="cat-description">{breed?.description}</div>
      </Col>
    </Row>
  );
};

export default CatImageDetail;

import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { AsyncImage } from "loadable-image";
import CatImage from "models/CatImage";
import "styles/CatImageListItem.scss";

interface CatImageListItemProps {
  image: CatImage;
}

const CatImageListItem: React.FC<CatImageListItemProps> = ({ image }) => {
  return (
    <Link to={`/cats/${image.id}`}>
      <Card className="my-10 card-item">
        <Card.Body>
          <AsyncImage
            src={image.url}
            className="card-image"
            loader={<div className="card-image-placeholder"></div>}
          />
        </Card.Body>
        <Card.Footer>View details</Card.Footer>
      </Card>
    </Link>
  );
};

export default CatImageListItem;

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CatImageListItem from "./CatImageListItem/CatImageListItem";
import type CatImage from "models/CatImage";
import "./CatImagesList.scss";

interface CatImagesListProps {
  images: CatImage[];
}

const CatImagesList: React.FC<CatImagesListProps> = ({ images }) => {
  return (
    <Container className="cat-images-container">
      <Row>
        {images.map((image) => (
          <Col key={image.id} xl={3} md={6} sm={12}>
            <CatImageListItem image={image} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatImagesList;

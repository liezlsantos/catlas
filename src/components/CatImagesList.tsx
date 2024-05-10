import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CatImageListItem from "components/CatImageListItem";
import type CatImage from "models/CatImage";

interface CatImagesListProps {
  images: CatImage[];
}

const CatImagesList: React.FC<CatImagesListProps> = ({ images }) => {
  return (
    <Container className="pt-4 px-0">
      <Row>
        {images.map((image) => (
          <Col key={image.id} xl={3} md={6} sm={12} className="m-10">
            <CatImageListItem image={image}></CatImageListItem>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CatImagesList;

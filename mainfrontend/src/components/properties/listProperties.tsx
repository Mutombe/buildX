import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { useEffect} from "react";
import MainButton from "../button/button";
import { Carousel } from "react-bootstrap";
import { fetchProperties } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import "./properties.css";
import "../css/listProperties.css"

function PropertyList() {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(
    (state: any) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);


  if (loading) {
    return <div className="my-div">Loading...</div>;
  }

  if (error) {
    return <div className="my-div">Error: {error}</div>;
  }

  return (
    <>
      <div className="properties">
        <CardGroup>
          {properties.map((property: any) => (
            <Card>
              <Card.Body key={property.id}>
                <Carousel fade>
                  {property.images.map((image) => (
                    <Carousel.Item key={image.id}>
                      <img
                        className="w-100 h-100"
                        src={image.file}
                        alt={image.name}
                        />
                      <Carousel.Caption>{image.name}</Carousel.Caption>
                    </Carousel.Item>
                  ))}
                  
                </Carousel>

                <Card.Title>{property.name}</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small>{property.location}</small>{" "}
                <small>
                  <span>
                    <MainButton
                      variant="secondary"
                      onClick={""}
                      text="See Units"
                    />
                  </span>
                </small>
                <span>
                  <MainButton variant="secondary" onClick={""} text="Book" />
                </span>
              </Card.Footer>
            </Card>
          ))}
        </CardGroup>
      </div>
    </>
  );
}

export default PropertyList;

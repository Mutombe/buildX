import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { getProperties } from "../../data-layer/properties";
import { useState, useEffect } from "react";
import MainButton from "../button/button";
import { Carousel } from "react-bootstrap";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [allunits, setUnits] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response: any = await getProperties();
        setProperties(response.data);
        setLoading(false);
        setUnits(response.data.Units);
      } catch (error: any) {
        setErrors(error.message);
      }
    };

    fetchPropertyData();
  }, []);

  if (loading) {
    return <div className="my-div">Loading...</div>;
  }

  if (errors) {
    return <div className="my-div">Error: {errors}</div>;
  }

  return (
    <>
      <CardGroup>
        {properties.map((property: any) => (
          <Card>
            <Card.Body key={property.id}>
            <Carousel>
                {property.images.map(image => (
                  <Carousel.Item key={image.id}>
                        <img
                            className="d-block w-100"
                            src={image.file}
                            alt={image.name}
                        />
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
              {allunits ? (
                <small>
                  <span>
                    <MainButton
                      variant="secondary"
                      onClick={""}
                      text="See Units"
                    />
                  </span>
                </small>
              ) : (
                <small>
                  <span>
                    <MainButton variant="secondary" onClick={""} text="Book" />
                  </span>
                </small>
              )}
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </>
  );
}

export default Properties;
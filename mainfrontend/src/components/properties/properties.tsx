import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { getProperties } from "../../data-layer/properties";
import { useState, useEffect } from "react";
import App from "../practice";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response: any = await getProperties();
        setProperties(response.data);
        setLoading(false);
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
      
      <App/>
      <CardGroup>
        {properties.map((property: any) => (
          <Card>
            <Card.Body key={property.id}>
              <Card.Img variant="top" src={""} />
              <Card.Title>{property.name}</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small>{property.location}</small>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </>
  );
}

export default Properties;

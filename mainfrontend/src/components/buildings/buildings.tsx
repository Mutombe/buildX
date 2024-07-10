import useDataFetcher from "../../utils/api";
import { PROPERTIES_URL } from "../../utils/constants";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function Buildings() {
  const { data, loading, error } = useDataFetcher(PROPERTIES_URL);
  if (loading) {
    return <div className="my-div">Loading...</div>;
  }

  if (error) {
    return <div className="my-div">Error: {error}</div>;
  }

  return (
    <CardGroup>
      {data.map((properties: any) => (
        <Card>
          <Card.Body key={properties.id}>
            <Card.Img variant="top" src={""} />
            <Card.Title>{properties.name}</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{properties.location}</small>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  );
}

export default Buildings;

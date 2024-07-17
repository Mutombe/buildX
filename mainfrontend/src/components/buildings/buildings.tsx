import { useDataFetcher } from "../../utils/apiUtil";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function Properties() {
  const { data, loading, error } = useDataFetcher(
    "http://127.0.0.1:8000/properties/"
  );
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

export default Properties;

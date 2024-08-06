import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchUnits } from '../../utils/api';

const UnitList = () => {
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const units = useSelector((state) => state.properties.units);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUnits(propertyId));
  }, [propertyId, dispatch]);

  const handleBookUnit = (unitId: any) => {
    navigate(`/units/${unitId}/book`);
  };

  return (
    <Container>
      <Row>
        {units.map((unit: any) => (
          <Col key={unit.id} md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{unit.name}</Card.Title>
                <Card.Text>Rented: <strong>{unit.booked_count}</strong> times</Card.Text>
                <Card.Text>Occupied: {unit.occupied ? 'Yes' : 'No'}</Card.Text>
                <Button variant="primary" onClick={() => handleBookUnit(unit.id)}>
                  Book Unit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UnitList;

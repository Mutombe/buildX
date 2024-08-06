import React, { useEffect } from "react";
import { fetchProperties } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "./propertyCard";
import { Col, Row, Container } from "react-bootstrap";
import "./properties.css";
import "../css/listProperties.css";

function PropertyList() {
  const dispatch = useDispatch();
  const { properties, loading, error, success } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  }

  if (success) {
    content = properties.map((property) => (
      <Col key={property.id} xs={12} md={4} className="mb-4">
        <PropertyCard property={property} />
      </Col>
    ));
  }

  if (error) {
    content = <div>Error: {error}</div>;
  }

  return (
    <Container className="properties">
      <Row className="g-4">
        {content}
      </Row>
    </Container>
  );
}

export default PropertyList;

import { useEffect, useState } from "react";
import { fetchProperties } from "../../redux/propertySlice";
import { useDispatch, useSelector } from "react-redux";
import GradientCover from "./propertyCard";
import { Col, Row, Container, Form } from "react-bootstrap";
import "./properties.css";
import "../css/listProperties.css";
import { fetchCategories } from "../../redux/categorySlice";

function PropertyList() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const { properties, loading, error, success } = useSelector(
    (state) => state.properties
  );
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = async (event) => {
    setSelectedCategory(event.target.value);
    console.log("Selected Category", selectedCategory);
  };

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  }

  if (success) {
    content = properties
      .filter((property) =>
        selectedCategory ? property.category === selectedCategory : true
      )
      .map((property) => (
        <>
          <Col key={property.id} xs={12} md={4} className="mb-4">
            <GradientCover property={property} />
          </Col>
        </>
      ));
  }

  if (error) {
    content = <div>Error: {error}</div>;
  }

  return (
    <><Container className="properties">
        <Col>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      <br />
      <Row className="g-4">{content}</Row>
      </Container>
    </>
  );
}

export default PropertyList;

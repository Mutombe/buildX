import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/propertySlice";
import { fetchCategories } from "../../redux/categorySlice";
import PropertyCard from "./propertyCard";
import { Col, Row, Container, Form, InputGroup } from "react-bootstrap";
import { debounce } from 'lodash';

function PropertyList() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { properties, loading, success, error } = useSelector((state) => state.properties);
  const { categories } = useSelector((state) => state.categories);

  const debouncedSearch = debounce((search, category) => {
    dispatch(fetchProperties({ search, category }));
  }, 300);

  useEffect(() => {
    dispatch(fetchProperties({}));
    console.log("Properties", properties)
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    debouncedSearch(searchQuery, category);
  };

  let content;

  if (loading) {
    content = <div>Loading...</div>;
  } else if (success) {
    content = properties.map((property) => (
      <Col key={property.id} xs={12} md={4} className="mb-4">
        <PropertyCard property={property} />
      </Col>
    ));
  } else if (error) {
    content = <div>Error: {error}</div>;
  }

  return (
    <Container className="properties">
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row className="g-4">{content}</Row>
    </Container>
  );
}

export default PropertyList;
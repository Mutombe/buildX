import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../../redux/propertySlice";
import { fetchCategories } from "../../redux/categorySlice";
import PropertyCard from "./propertyCard";
import { Col, Row, Container, Form, InputGroup } from "react-bootstrap";
import { debounce } from "lodash";
import { Skeleton } from "@mui/material";
import "./css/propetyList.css";

function PropertyList() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { properties, loading, success, error } = useSelector(
    (state) => state.properties
  );
  const { categories } = useSelector((state) => state.categories);

  const debouncedSearch = debounce((search, category) => {
    dispatch(fetchProperties({ search, category }));
  }, 300);

  useEffect(() => {
    dispatch(fetchProperties({}));
    console.log("Properties", properties);
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

  const renderSkeletons = () =>
    Array.from(new Array(6)).map((_, index) => (
      <Col
        key={index}
        xs={12}
        md={5}
        className="mb-4"
        style={{ width: "300px" }}
      >
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </Col>
    ));

  let content;

  if (loading) {
    content = renderSkeletons();
  } else if (properties.length > 0) {
    const sortedProperties = [...properties].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.created_at) - new Date(a.created_at);
    });
    content = sortedProperties.map((property) => (
      <Col key={property.id} xs={12} md={4} className="mb-4">
        <PropertyCard property={property} />
      </Col>
    ));
  } else {
    content = (
      <div id="no-content">
        No properties found. Try adjusting your search or filter settings.
      </div>
    );
  }

  if (error) {
    content = <div>Error: {error}</div>;
  }

  return (
    <Container className="properties">
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search Location..."
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

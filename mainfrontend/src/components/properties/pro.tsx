import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProperty } from "../../redux/addPropertySlice";
import { Button, Form } from "react-bootstrap";
import { fetchCategories } from "../../utils/api";

const PropertyUploadForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState();
    const [images, setImages] = useState([]);

  const loading = useSelector((state) => state.property);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  console.log("Property Upload", user.id)  

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creating FormData to send files along with property data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("category", category);
    images.forEach((image, i) => {
      formData.append(`images[${i}]file`, image);
    });

    dispatch(uploadProperty(formData));
    console.log(formData);
  };

  return (
    <form>
      <Form.Group>
        <Form.Label>Property Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
        />
      </Form.Group>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Upload Property"}
      </Button>
    </form>
  );
};

export default PropertyUploadForm;

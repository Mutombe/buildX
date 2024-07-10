import { logout } from "./api";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Logout = () => {
  const handleLogout = async (event: any) => {
    event.preventDefault();
    try {
      await logout();
      localStorage.removeItem("token");
      console.log("Logout Successful");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleLogout}>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Logout;

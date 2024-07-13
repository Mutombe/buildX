import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AuthContext } from "./authContext";
import { useContext } from "react";

const Logout = () => {
  const authContext: any = useContext(AuthContext);
  const handleLogout = async (event: any) => {
    event.preventDefault();
    authContext.logout();
  };

  return (
    <Form onSubmit={handleLogout}>
      <Button variant="primary" type="submit">
        Logout
      </Button>
    </Form>
  );
};

export default Logout;

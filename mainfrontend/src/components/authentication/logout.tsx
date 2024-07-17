import Button from "react-bootstrap/Button";
import { AuthContext } from "./authContext";
import { useContext } from "react";

const Logout = () => {
  const { userlogout } = useContext(AuthContext);
  const handleLogout = async (event: any) => {
    event.preventDefault();
    userlogout();
  };

  return (
      <Button variant="primary" type="submit" onClick={handleLogout}>
          Logout
      </Button>
  );
};

export default Logout;

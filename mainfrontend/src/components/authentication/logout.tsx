import Button from "react-bootstrap/Button";
import { logout } from "../../utils/api";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch()
  const handleLogout = async (event: any) => {
    try {
      event.preventDefault();
      const response = await logout();
      dispatch({ type: 'LOGOUT' })
      if (response.status === 200) {
        setSuccess(true);
        console.log(response)
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      {success ? (
        <Alert variant="success">You're Logged Out <Link to="/login"> Login</Link></Alert>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );
};

export default Logout;

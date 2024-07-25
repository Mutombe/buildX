import { useContext, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainButton from "../button/button";
import { AuthContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await login(username, password);
      if ((response.status = 200)) {
        setSuccess(true);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      {success ? (
        <Alert variant="success">Logged In</Alert>
      ) : (
        <>
          {error && (
            <Alert variant="warning">
              {error} <Link to="/signup">Sign Up</Link>
            </Alert>
          )}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <MainButton
              variant="primary"
              type="submit"
              text="Login"
              onClick={handleLogin}
            />
          </Form>
        </>
      )}
    </>
  );
};

export default Login;

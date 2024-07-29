import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { signup } from "../../utils/api";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../button/button";
import { AuthContext } from "./authContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignup = async (event: any) => {
    event.preventDefault();
    try {
      const response = await signup(username, email, password);
      if (response.status === 200 || 201) {
        setSuccess(true);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.email) {
        setError(error.response.data.email[0]);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <>
      {success ? (
        <Alert variant="success">You're signed In</Alert>
      ) : (
        <>
          {error && (
            <Alert variant="warning">
              {error} <Link to="/login"> Login</Link>
            </Alert>
          )}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                value={email}
                required
                onChange={(event: any) => setEmail(event.target.value)}
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                autoComplete="off"
                value={username}
                required
                onChange={(event: any) => setUsername(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(event: any) => setPassword(event.target.value)}
              />
            </Form.Group>
            <MainButton
              variant="primary"
              type="submit"
              text="Register"
              onClick={handleSignup}
            />
          </Form>
        </>
      )}
    </>
  );
};

export default Signup;

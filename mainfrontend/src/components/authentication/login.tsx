import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { login } from "../../utils/api";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const dispatch = useDispatch();
    try {
      const response = await login(username, password);
      const userData = response.data;
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        setSuccess(true);
      } else {
        const data = await response.data;
        setError(data.detail)
      }
    } catch (error: any) {
      setError("User not Found ");
    }
  };

  return (
    <>
      {success ? (
        <Alert variant="success">Logged In</Alert>
      ) : (
        <>
          {error && <Alert variant="warning">{error} <Link to="/signup">Sign Up</Link></Alert>}
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
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default Login;

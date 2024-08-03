import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainButton from "../button/button";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, success } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    dispatch(login({ username, password })).then((result: any) => {
      if (result.payload) {
        if (!error) {
          navigate("/");
        }
      }
    });
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
              text={loading ? "Loading..." : "Login"}
              onClick={handleLogin}
            />
          </Form>
        </>
      )}
    </>
  );
};

export default Login;

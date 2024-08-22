<<<<<<< HEAD

import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { login } from "./baseAuthApi";

=======
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainButton from "../button/button";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/authSlice";
>>>>>>> branch-01

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, success } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

<<<<<<< HEAD
  const handleLogin = async (event: any) => {
    event.preventDefault();
    const response = await login(username, password);
    localStorage.setItem("token", response.data.token);
    console.log("Your response: ", response);
    console.log("Your Local Storage: ", localStorage);


    try {
      const response = await login(username, password);
      if ((response.status = 200)) {
        setSuccess(true);
        setIsAuthenticated(true);
=======
  const handleLogin = async (e: any) => {
    e.preventDefault();
    dispatch(userLogin({ username, password })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
>>>>>>> branch-01
        navigate("/");
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Alert, Button } from "@mui/material";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    dispatch(userSignup({ username, email, password })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else if (result.meta.requestStatus === "rejected") {
        console.log("SignUp Display", error);
      }
    });
  };

  return (
    <>
      <>
        {error && (
          <Alert severity="warning">
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setUsername(e.target.value)}
            />
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
          <Button onClick={handleSignup}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </Form>
      </>
    </>
  );
};

export default Signup;

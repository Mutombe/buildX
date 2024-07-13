import { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AuthContext } from "./authContext";

const Signup = () => {
  const authContext: any = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event: any) => {
    event.preventDefault();
    authContext.signup(username, email, password);
  };

  <Form onSubmit={handleSignup}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email Address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
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
        value={username}
        onChange={(event: any) => setUsername(event.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event: any) => setPassword(event.target.value)}
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Signup
    </Button>
  </Form>;
};

export default Signup;

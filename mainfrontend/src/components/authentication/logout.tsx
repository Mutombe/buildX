import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/authSlice";
import { Button } from "@mui/material";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout()).then(() => {
      navigate("/login");
    });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;

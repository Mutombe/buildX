import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/authSlice";
import { Button } from "@mui/material";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout()).then(() => {
      //Redirect 
    });
  };

  return <Button onClick={handleLogout} size="small">Logout</Button>;
};

export default Logout;

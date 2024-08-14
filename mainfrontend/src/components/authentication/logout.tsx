import { useDispatch } from "react-redux";
import { clearAuth, logout } from "../../redux/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearAuth());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;

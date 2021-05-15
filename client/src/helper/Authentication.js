import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSelector } from "../store/userSlice";

const Authentication = ({ children }) => {
  const length = useSelector(userSelector.selectTotal);
  if (length === 0) return <Redirect to="/login" />;
  return children;
};

export default Authentication;

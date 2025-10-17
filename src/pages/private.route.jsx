import { AuthContext } from "../components/context/auth.context";
import { useContext } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    return <>{props.children}</>;
  }
  return (
    <Result
      status="403"
      title="Oops!"
      subTitle="You need to log in to use this feature."
      extra={
        <Button type="primary">
          {" "}
          <Link to="/login">Back to login Page</Link>
        </Button>
      }
    />
  );
};
export default PrivateRoute;

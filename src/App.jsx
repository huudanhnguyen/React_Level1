import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";
import { Await, Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";
const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;

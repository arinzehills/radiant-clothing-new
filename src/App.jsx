import { useEffect, useState } from "react";
import "./App.css";
import { Routes as Switch, Route, useLocation } from "react-router-dom";
import HomepageWrapper from "./pages/HomepageWrapper/HomepageWrapper";
import Homepage from "./pages/Homepage/Homepage";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import AdminPrivateRoute from "./utils/AdminPrivateRoute";
import Admin from "./pages/Admin/Admin";
import useToken from "./useToken";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import Products from "./pages/Admin/Products/Products";
import Customers from "./pages/Admin/Customers/Customers";
import Orders from "./pages/Admin/Orders/Orders";
import SettingsComponent from "./components/SettingsComponent/SettingsComponent";
import { ReactNotifications } from "react-notifications-component";
import handleNot from "./components/HandleNotification/HandleNot";
import FAQs from "./pages/FAQs/FAQs";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Contactus from "./pages/Contact/Contactus";

function App() {
  const [handleNotData, setHandleNotData] = useState({
    message: "no",
    color: "var(--success)",
  });
  useEffect(() => {
    if (handleNotData.message !== "no") {
      handleNot({
        title: "Success",
        message: handleNotData.message,
        backgroundColor: handleNotData.color ?? "var(--success)",
      });
    }
  }, [handleNotData.message]);
  const { token, setToken } = useToken();

  return (
    <div className="App">
      <ReactNotifications />

      <Switch>
        {/* <Route path='/' exact element={<Home/>}> */}
        <Route path="/" exact element={<HomepageWrapper />}>
          <Route index element={<Homepage />} />
          <Route path="/faqs" exact element={<FAQs />} />
          <Route path="/contact" exact element={<Contactus />} />
          <Route path="/path" element={<Cart />} />

          {/* <Route path="/portfolio" exact element={<Porfolio />} />
          <Route path="/skills" exact element={<Skills />} />
          <Route path="/contact" exact element={<Contact />} /> */}
        </Route>
        <Route
          path="/login"
          exact
          // element={<Navigate to={"/dashboard"} />}
          element={<Login setHandleNotData={setHandleNotData} />}
          // element={token === null ? <Login /> : <Navigate to={"/dashboard"} />}
        />

        <Route path="/register" element={<Register />} />
        {/* <Route path="/forgotPassword" exact element={<ForgotPassword />} /> */}
        {/* <Route path="/resetPassword" exact element={<ResetPassword />} /> */}

        <Route
          path="adminlogin"
          element={<AdminLogin setHandleNotData={setHandleNotData} />}
        />
        <Route element={<AdminPrivateRoute token={token} />}>
          <Route
            path="/admin"
            element={<Admin setHandleNotData={setHandleNotData} />}
          >
            <Route
              index
              element={<AdminDashboard setHandleNotData={setHandleNotData} />}
            />
            <Route
              path="products"
              element={
                <Products
                  handleNotData={handleNotData}
                  setHandleNotData={setHandleNotData}
                />
              }
            />
            <Route
              path="customers"
              element={<Customers setHandleNotData={setHandleNotData} />}
            />
            <Route
              path="orders"
              element={<Orders setHandleNotData={setHandleNotData} />}
            />
            <Route
              path="settings"
              element={
                <SettingsComponent
                  // handleNot={handleNot}
                  setHandleNotData={setHandleNotData}
                />
              }
            />
          </Route>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

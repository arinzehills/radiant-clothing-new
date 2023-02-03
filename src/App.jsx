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
import Cart from "./pages/Cart";
import Checkout from "./pages/Cart/Checkout";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import UserOrders from "./pages/Dashboard/Orders/UserOrders";
import WishList from "./pages/Dashboard/WishList/WishList";
import SliderImages from "./pages/Admin/SliderImages/SliderImages";
import Categorypage from "./pages/Category/Categorypage";
import Success from "./pages/Success";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About/About";
import ProductDetail from "./components/Featured/ProductDetail";
import Terms from "./pages/Terms/Terms";
import MoreProducts from "./components/Featured/MoreProducts";
import PrivateRoutes from "./utils/PrivateRoutes";
import OrderDetail from "./components/OrderDetail/OrderDetail";

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

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const { token, setToken } = useToken();

  return (
    <div className="App">
      <ReactNotifications />
      <ToastContainer />

      <Switch>
        {/* <Route path='/' exact element={<Home/>}> */}
        <Route path="/" exact element={<HomepageWrapper />}>
          <Route index element={<Homepage />} />
          <Route path="/faqs" exact element={<FAQs />} />
          <Route path="/contact" exact element={<Contactus />} />
          <Route path="/categories">
            <Route path=":category" exact element={<Categorypage />} />
          </Route>
          <Route path="/more-products" exact element={<MoreProducts />} />
          <Route path="/products">
            <Route index element={<MoreProducts />} />
            <Route path=":product" exact element={<ProductDetail />} />
          </Route>
          <Route path="/about" exact element={<About />} />
          <Route path="/terms-and-condition" exact element={<Terms />} />
          <Route element={<PrivateRoutes token={token} />}>
          <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route
              path="orders"
              element={<UserOrders setHandleNotData={setHandleNotData} />}
            />
            <Route
              path="order-details"
              element={<OrderDetail setHandleNotData={setHandleNotData} />}
            />
            <Route
              path="wishlist"
              element={<WishList setHandleNotData={setHandleNotData} />}
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
          {/* <Route path="/portfolio" exact element={<Porfolio />} />
          <Route path="/skills" exact element={<Skills />} />
          <Route path="/contact" exact element={<Contact />} /> */}
        </Route>
        <Route path="/payment-success" element={<Success />} />
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
              path="order-details"
              element={<OrderDetail setHandleNotData={setHandleNotData} />}
            />
            <Route
              path="images"
              element={
                <SliderImages
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

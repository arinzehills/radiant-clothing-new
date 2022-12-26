import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { TiTimesOutline } from "react-icons/ti";
// import {useNavigate} from 'react-router-dom';
import { Button } from "../Button/Button";
// import {logo} from '../../../assets/logo_transparent.png
import "./Navbar.css";
import "./CategoriesList.css";
import UpperNavbar from "./UpperNavbar";
import PhoneUpper from "./PhoneUpper";
import { Icon } from "@iconify/react";
import useFetch from "../../useFetch";
const Navbar = () => {
  const {
    data: categoriesData,
    loading: loadingCategory,
    errorCategory,
  } = useFetch({
    url: window.baseUrl + "admin/getCategories",
    // secondParam: activeRow,
  });
  !loadingCategory &&
    categoriesData?.categories.forEach((cat, index) => {
      // cat.image = cat.images[0];
      console.log(cat.category);
    });
  const [click, setClick] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const handleClick = () => setClick(!click);
  const [button, setButton] = useState(true);
  const closeMobileMenu = (currentTab) => {
    setClick(!click);
    setCurrentTab(currentTab);
  };
  // const [onHover, setOnHover] = useState(false);
  // const hoverEvent= () =>{
  //     onmouseenter{()=>setOnHover(!onHover)};
  // }
  // const router=useNavigate()
  //     router.
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  return (
    <>
      {window.innerWidth < 769 ? <PhoneUpper /> : <UpperNavbar />}
      <div className="navbar">
        <div className="navbar-container container">
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <TiTimesOutline fontSize={48} />
            ) : (
              <HiMenuAlt4 fontSize={48} />
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"} style={{}}>
            <li
              className={
                currentTab === 1 ? "underline_link nav-items" : "nav-items"
              }
            >
              <Link
                to="/"
                className="nav-links"
                onClick={() => closeMobileMenu(1)}
              >
                Home
              </Link>
            </li>
            <li
              className={
                currentTab === 2
                  ? "underline_links nav-items categories-dropdown"
                  : "nav-items "
              }
            >
              <Link
                to="/"
                className="nav-links  dropdown-link"
                onClick={() => closeMobileMenu(2)}
              >
                Clothing
              </Link>
              <div className="categories_dropdown-content">
                {loadingCategory ? (
                  <div
                    className="class_justify_contents_column"
                    style={{ height: "200px" }}
                  >
                    loading...
                  </div>
                ) : (
                  categoriesData?.categories.map((item) => (
                    <Link
                      to={`/categories/${item.category}`}
                      key={item.category}
                    >
                      {item.category}
                    </Link>
                  ))
                )}
              </div>
            </li>
            <li
              className={
                currentTab === 2
                  ? "underline_links nav-items categories-dropdown"
                  : "nav-items "
              }
            >
              <Link
                to="/"
                className="nav-links  dropdown-link"
                onClick={() => closeMobileMenu(2)}
              >
                Accessories
              </Link>
              <div className="categories_dropdown-content">
                {loadingCategory ? (
                  <div
                    className="class_justify_contents_column"
                    style={{ height: "200px" }}
                  >
                    loading...
                  </div>
                ) : (
                  categoriesData?.categories.map((item) => (
                    <Link
                      to={`/categories/${item.category}`}
                      key={item.category}
                    >
                      {item.category}
                    </Link>
                  ))
                )}
              </div>
            </li>
            <li
              className={
                currentTab === 2
                  ? "underline_link nav-items categories-dropdown"
                  : "nav-items "
              }
            >
              <Link
                to="/"
                className="nav-links  dropdown-link"
                onClick={() => closeMobileMenu(2)}
              >
                Footwears
              </Link>
              <div className="categories_dropdown-content">
                {loadingCategory ? (
                  <div
                    className="class_justify_contents_column"
                    style={{ height: "200px" }}
                  >
                    loading...
                  </div>
                ) : (
                  categoriesData?.categories.map((item) => (
                    <Link
                      to={`/categories/${item.category}`}
                      key={item.category}
                    >
                      {item.category}
                    </Link>
                  ))
                )}
              </div>
            </li>

            <li
              className={
                currentTab === 3 ? "underline_link nav-items" : "nav-items"
              }
            >
              <Link
                to="/contact"
                className="nav-links"
                onClick={() => closeMobileMenu(3)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li
            className={
              currentTab === 4 ? "underline_link nav-items" : "nav-items"
            }
          >
            <Link
              to="/content-creators"
              className="nav-links"
              onClick={() => closeMobileMenu(4)}
            >
              FAQ
            </Link>
          </li>

          <li
            className={
              currentTab === 4 ? "underline_link nav-items" : "nav-items"
            }
            style={{ width: "150px" }}
          >
            <Link
              to="/about"
              className="nav-links"
              onClick={() => closeMobileMenu(4)}
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

{
  /* <div className='navbar'>
<div className='navbar-container container'>
  <Link to='/' className='navbar-logo'>
  <img style={{ width: "175px" }} src={"/images/logo_transparent.png"} alt='dsa' />
  <h1>dsahfiso</h1>
  </Link>
  <div className="menu-img">

  </div>
</div>
</div> */
}
export default Navbar;

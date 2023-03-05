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
      {window.innerWidth < 769 ? (
        <PhoneUpper handleClick={handleClick} click={click} />
      ) : (
        // <div></div>
        <UpperNavbar />
      )}
      <div className={click ? "navbar active" : "navbar"}>
        <div className="navbar-container container">
          {/* <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <TiTimesOutline fontSize={48} />
            ) : (
              <HiMenuAlt4 fontSize={48} />
            )}
          </div> */}
          <ul className={click ? "nav-menu active" : "nav-menu"} style={{}}>
            <li className={currentTab === 1 ? " nav-items" : "nav-items"}>
              <Link
                to="/"
                className="nav-links"
                onClick={() => closeMobileMenu(1)}
              >
                Home
              </Link>
            </li>
            <li
              className={`${currentTab === 4 ? "nav-items " : "nav-items "}
                  categories-dropdown
                  `}
            >
              <Link
                to="/"
                className="nav-links  dropdown-link"
                onClick={() => setCurrentTab(2)}
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
                  categoriesData?.categories.map(
                    (item) =>
                      item.super_category === "clothing" && (
                        <Link
                          to={`/categories/${item.category}`}
                          key={item.category}
                          onClick={() => closeMobileMenu(3)}
                        >
                          {item.category}
                        </Link>
                      )
                  )
                )}
              </div>
            </li>
            <li
              className={`
                ${currentTab === 4 ? "nav-items " : "nav-items "}
                  categories-dropdown
                  `}
            >
              <Link
                to="/"
                className="nav-links  dropdown-link"
                onClick={() => setCurrentTab(4)}
              >
                Indian Accessories
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
                  categoriesData?.categories.map(
                    (item) =>
                      item.super_category === "accessories" && (
                        <Link
                          to={`/categories/${item.category}`}
                          key={item.category}
                          onClick={() => closeMobileMenu(4)}
                        >
                          {item.category}
                        </Link>
                      )
                  )
                )}
              </div>
            </li>
            <li className={currentTab === 5 ? " nav-items" : "nav-items"}>
              <Link
                to="/contact"
                className="nav-links"
                onClick={() => closeMobileMenu(5)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className={currentTab === 6 ? " nav-items" : "nav-items"}>
            <Link
              to="/faqs"
              className="nav-links"
              onClick={() => closeMobileMenu(6)}
            >
              FAQ
            </Link>
          </li>

          <li
            className={currentTab === 7 ? " nav-items" : "nav-items"}
            style={{ width: "150px" }}
          >
            <Link
              to="/about"
              className="nav-links"
              onClick={() => closeMobileMenu(7)}
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

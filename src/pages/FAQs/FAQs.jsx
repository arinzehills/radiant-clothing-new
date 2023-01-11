import React from "react";
import "./Faqs.css";
import { MdArrowForwardIos } from "react-icons/md";
import { BsRecordCircle } from "react-icons/bs";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useState, useRef } from "react";
import { homeData } from "./data";

const data1 = [
  {
    id: 1,
    heading: "How does it work?",
    desc: [
      "After signing up, you will see different monthly plans to choose from on your dashboard. ",
      "Pick a plan and submit a content request from your dashboard. Specify requirements, word counts and content type, etc. " +
        "Our algorithm finds the best content creators for your requirements and the content is delivered to you on your dashboard where you can accept or request a revision.  ",
      "You can also Invite any member of your team to make a content request or handle content requests for you.      ",
    ],
  },
];

function FAQs() {
  // const [click, setClick] = useState(false);
  const [click, setClick] = useState({});
  // const onClick = () => setClick(!click);
  const [setHeight, setHeightState] = useState("0px");
  const handleClick = (index) => () => {
    setClick((state) => ({
      ...state, // <-- copy previous state
      [index]: !state[index], // <-- update value by index key
    }));
  };
  const content = useRef(null);
  function toggleAccordion() {
    // onClick();
    setHeightState();
    // click === true ? "0px" : `${content.current.scrollHeight}px`
    // console.log(content.current.scrollHeight);
  }
  return (
    <>
      <div className="faq_section">
        <div className="faq_wrapper">
          <h2>Frequently Asked Questions</h2>
          {homeData.map((item, index) => (
            <div
              className={
                click[index] ? "faq_container faq_active" : "faq_container  "
              }
              onClick={handleClick(index)}
              key={item.id}
              // style={{ height: click ? "300px" : "100px" }}
            >
              <div className="faq_row">
                <h3>{item.heading}</h3>
                <div className="faq_icon_wrapper ">
                  {/* {click ? ( */}

                  <IoIosArrowDropdownCircle
                    style={{
                      fontSize: "2em",
                      opacity: click[index] ? "0" : "1",
                    }}
                    className={
                      click[index] ? "faq_icon " : "faq_icon faq_icon-active2"
                    }
                    // key={item.heading}
                  />
                  {/* ) : ( */}
                  <IoIosArrowDroprightCircle
                    className={
                      click[index] ? "faq_icon faq_icon-active" : "faq_icon"
                    }
                    // key={item.heading}
                    style={{
                      fontSize: "2em",
                      opacity: click[index] ? "1" : "0",
                    }}
                  />
                  {/* )} */}
                </div>
              </div>
              {/* <div className="faq_body"></div> */}
              {click[index] &&
                item.desc.map((des) => (
                  <div
                    // ref={content}
                    // style={{ maxHeight: `${setHeight}` }}
                    className="accordian_content"
                    key={des}
                  >
                    <BsRecordCircle className="g_icon" />
                    <p style={{ alignContent: "center" }}>{des}</p>
                  </div>
                ))}
            </div>
          ))}
          {/* <Pricingcontact heading="Ready to take your startup content game to the next level?" /> */}
        </div>
      </div>
    </>
  );
}

export default FAQs;

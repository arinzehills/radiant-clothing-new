import React from "react";
import "./Faqs.css";
import { MdArrowForwardIos } from "react-icons/md";
import { BsRecordCircle } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState, useRef } from "react";
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
const data = [
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
  {
    id: 2,
    heading: "How many pieces of content can I request per month? ",
    desc: [
      "Each plan comes with a variety of content options.",
      "For instance, the Starter plan comes with 4,000 worded content and five social media graphics per month. On the 4,000 worded content, you can request 8 500 worded articles or 4 1,000 worded articles or 2 2,000 worded articles, or any other split word count you like. Also, this could be articles, newsletters, product descriptions, ebooks, etc.",
      "For the Social media graphics, it could be flyers, cover photos, banner images, quote graphics, infographics, or just any other form of social media graphic. You can also split the graphic types. For instance, you can request three flyers and two cover photo designs. ",
    ],
  },
  {
    id: 3,
    heading: "What if I don’t like my content?",
    desc: [
      "We offer unlimited revisions for all content created as part of your monthly subscription plan. We also offer a 100% money-back guarantee. ",
    ],
  },
  {
    id: 4,
    heading: "Can I cancel anytime?",
    desc: [
      "Yes, you can cancel the monthly" +
        "subscription at any time and resume it any " +
        "time of your choice. No contracts. ",
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
          {data.map((item, index) => (
            <div
              className={
                click[index] ? "faq_container active" : "faq_container  "
              }
              onClick={handleClick(index)}
              key={item.id}
              // style={{ height: click ? "300px" : "100px" }}
            >
              <div className="faq_row">
                <h3>{item.heading}</h3>
                <div className="icon_wrapper">
                  {/* {click ? ( */}

                  <IoIosArrowDropdownCircle
                    style={{
                      fontSize: "2em",
                      // opacity: click[index] ? "1" : "0",
                    }}
                    className={
                      click[index] ? "faq_icon " : "faq_icon icon-active2"
                    }
                    // key={item.heading}
                  />
                  {/* ) : ( */}
                  <MdArrowForwardIos
                    className={
                      click[index] ? "faq_icon icon-active" : "faq_icon"
                    }
                    // key={item.heading}
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

import React, { useState } from "react";
import "./CustomTab.css";
const CustomTab = ({ tabs, tabsComponents }) => {
  const [currentTab, setCurrentTab] = useState(0);

  if (!Array.isArray(tabs) || tabs.length <= 0) {
    // if is not an array return null
    return null;
  }
  console.log(currentTab);
  return (
    <>
      <div className="">
        <div style={{ display: "flex", gap: "10px" }}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`centerClass ${
                index === currentTab
                  ? "custom_tab "
                  : "custom_tab custom_tab_active"
              }`}
              onClick={() => setCurrentTab(index)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="custom_tab-contents">{tabsComponents[currentTab]}</div>
      </div>
    </>
  );
  // <div
  //   className={
  //     index === currentTab ? "myslide myslide-active" : "myslide"
  //   }
  //   key={index}
  // >

  //   {index === currentTab && (
  //     //   <img src={slide.img} alt="slide image" className="slider-image" />
  //     <div>{tabsComponents[1]}</div>
  //   )}
  // </div>
};

export default CustomTab;

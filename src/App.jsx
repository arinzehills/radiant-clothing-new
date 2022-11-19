import { useState } from "react";
import "./App.css";
import { Routes as Switch, Route, useLocation } from "react-router-dom";
import HomepageWrapper from "./pages/HomepageWrapper/HomepageWrapper";
import Homepage from "./pages/Homepage/Homepage";

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path='/' exact element={<Home/>}> */}
        <Route path="/" exact element={<HomepageWrapper />}>
          <Route index element={<Homepage />} />
          {/* <Route path="/pricing" exact element={<Pricingpage />} />
           */}
          {/* <Route path="/portfolio" exact element={<Porfolio />} />
          <Route path="/skills" exact element={<Skills />} />
          <Route path="/contact" exact element={<Contact />} /> */}
        </Route>
      </Switch>
    </div>
  );
}

export default App;

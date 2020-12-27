import { includes, map } from "lodash";
import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import Header from "../features/header/view/index";
import Footer from "../features/footer/view/index";
import { Menu, NOT_HEADER } from "../config/route";

const MainRouter = () => {
  const location = useLocation();

  console.log(">>> location: ", location);
  const _path = window.location.pathname;
  console.log(_path, location);
  return (
    <>
      {!["/login"].includes(location.pathname) && (
        <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
          <Header />
        </div>
      )}

      <Switch>
        {map(Menu, (item, key) => {
          return (
            <Route
              path={item.path}
              component={item.component}
              exact={item.exact}
              key={item.path}
            />
          );
        })}
      </Switch>
      {/* <Footer /> */}
    </>
  );
};

export default MainRouter;

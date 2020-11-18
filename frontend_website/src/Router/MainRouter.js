import { includes, map } from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../features/header/view/index";
import Footer from "../features/footer/view/index";
import { Menu, NOT_HEADER } from "../config/route";

const MainRouter = () => {
  const _path = window.location.pathname;
  console.log(_path);
  return (
    <>
      <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
        <Header />
      </div>
      <Switch>
        {map(Menu, (item, key) => {
          return (
            <Route
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          );
        })}
      </Switch>
      <Footer />
    </>
  );
};

export default MainRouter;

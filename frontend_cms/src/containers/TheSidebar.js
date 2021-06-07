import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import Cookies from "js-cookie";
import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";
import emplnvaigation from "./_navemp";
const TheSidebar = () => {
  const [isadnavi, setisadnavi] = useState();
  useEffect(() => {
    const isAdmin = Cookies.get("isAdmin") === "true";
    console.log(">>isAdmin", isAdmin);
    if (isAdmin) {
      setisadnavi(navigation);
    } else setisadnavi(emplnvaigation);
    console.log(">>emplnvaigation", emplnvaigation);
  }, []);
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        /> */}
        <div className="c-sidebar-brand-full" height={35}>
          The Coffee Shop
        </div>
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={isadnavi}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default TheSidebar;

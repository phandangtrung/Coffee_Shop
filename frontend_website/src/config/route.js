import Homepage from "../features/homepage/view";
import LoginPage from "../features/login/view";
import Product from "../features/product/view";
export const Menu = [
  {
    path: "/",
    exact: true,
    component: Homepage,
  },
  {
    path: "/product",
    exact: true,
    component: Product,
  },
  // {
  //   path: "*",
  //   exact: false,
  //   component: NotfoundPage,
  // },
];

export const NOT_HEADER = [
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
];

import Homepage from "../features/homepage/view";
import LoginPage from "../features/login/view";
import Product from "../features/product/view";
import SingleProduct from "../features/single_product/view";
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
  {
    path: "/singleproduct",
    exact: true,
    component: SingleProduct,
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

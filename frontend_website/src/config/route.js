import Homepage from "../features/homepage/view";
import LoginPage from "../features/login/view";
import Product from "../features/product/view";
import SingleProduct from "../features/single_product/view";
import ShoppingPage from "../features/shoppingpage/view";
import NotfoundPage from "../features/notfoundpage/NoFound";
import IntroPage from "../features/IntroPage/view";
import AddressPage from "../features/addresspage/view";
export const Menu = [
  {
    path: "/",
    exact: true,
    component: Homepage,
  },
  {
    path: "/:userid",
    exact: true,
    component: Homepage,
  },
  {
    path: "/product",
    exact: true,
    component: Product,
  },
  {
    path: "/singleproduct/:product",
    // exact: true,
    component: SingleProduct,
  },
  {
    path: "/shoppingpage",
    exact: true,
    component: ShoppingPage,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "/intro",
    exact: true,
    component: IntroPage,
  },
  {
    path: "/address",
    exact: true,
    component: AddressPage,
  },
  {
    path: "*",
    exact: false,
    component: NotfoundPage,
  },
];

export const NOT_HEADER = [];

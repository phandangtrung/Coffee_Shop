import Homepage from "../features/homepage/view";
import LoginPage from "../features/login/view";
import Product from "../features/product/view";
import SingleProduct from "../features/single_product/view";
import ShoppingPage from "../features/shoppingpage/view";
import NotfoundPage from "../features/notfoundpage/NoFound";
import IntroPage from "../features/IntroPage/view";
import AddressPage from "../features/addresspage/view";
import signupsucess from "../features/signupsucess/signupsucess";
import MyProfile from "../features/myprofile/view";
import Searchorder from "../features/searchorder/view/index";
import CouponPage from "../features/coupon/view/index";
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
    path: "/signupsuccess",
    exact: true,
    component: signupsucess,
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
    path: "/myprofile",
    exact: true,
    component: MyProfile,
  },
  {
    path: "/searchorder",
    exact: true,
    component: Searchorder,
  },
  {
    path: "/coupon",
    exact: true,
    component: CouponPage,
  },
  {
    path: "*",
    exact: false,
    component: NotfoundPage,
  },
];

export const NOT_HEADER = [];

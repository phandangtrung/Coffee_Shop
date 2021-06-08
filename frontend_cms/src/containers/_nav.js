export default [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Customize"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Account",
    to: "/account",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Employee",
    to: "/employee",
    icon: "cil-user-follow",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Category",
    to: "/category",
    icon: "cil-layers",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Coupon",
    to: "/coupon",
    icon: "cil-tags",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Product",
    to: "/product",
    icon: "cil-puzzle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Branch",
    to: "/branch",
    icon: "cil-inbox",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Order",
    to: "/order",
    icon: "cil-notes",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Comment",
    to: "/comment",
    icon: "cil-spreadsheet",
  },
];

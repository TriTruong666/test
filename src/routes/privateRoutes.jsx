import React from "react";
// import pages
import { HomeMember } from "../pages/private/member/HomeMember";
import { PondManage } from "../pages/private/member/PondManage";
import { PondDetail } from "../pages/private/member/PondDetail";
import { PondInfo } from "../pages/private/member/PondInfo";
import { PondWater } from "../pages/private/member/PondWater";
import { KoiManage } from "../pages/private/member/KoiManage";
import { OrderManage } from "../pages/private/member/OrderManage";
import { MyOrderDetail } from "../pages/private/member/MyOrderDetail";
import { BlogManage } from "../pages/private/member/BlogManage";
import { BlogDetail } from "../pages/private/member/BlogDetail";
import { UserSetting } from "../pages/private/both/UserSetting";
import { AdminOrderManage } from "../pages/private/admin/AdminOrderManage";
import { AdminAccountManage } from "../pages/private/admin/AdminAccountManage";
export const privateRoutes = [
  {
    path: "/dashboard/home",
    element: <HomeMember />,
  },
  {
    path: "/dashboard/mypond",
    element: <PondManage />,
    children: [
      {
        path: "/dashboard/mypond/detail",
        element: <PondDetail />,
        children: [
          {
            path: "/dashboard/mypond/detail/info",
            element: <PondInfo />,
          },
          {
            path: "/dashboard/mypond/detail/water",
            element: <PondWater />,
          },
          {
            path: "/dashboard/mypond/detail/kois",
            element: <KoiManage />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/myorder",
    element: <OrderManage />,
    children: [
      {
        path: "/dashboard/myorder/detail",
        element: <MyOrderDetail />,
      },
    ],
  },
  {
    path: "/dashboard/myblog",
    element: <BlogManage />,
    children: [
      {
        path: "/dashboard/myblog/review",
        element: <BlogDetail />,
      },
    ],
  },
  {
    path: "/dashboard/setting",
    element: <UserSetting />,
  },
  {
    path: "/dashboard/admin/order",
    element: <AdminOrderManage />,
  },
  {
    path: "/dashboard/admin/account",
    element: <AdminAccountManage />,
  },
];

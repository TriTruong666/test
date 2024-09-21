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
import AuthWrapper from "./AuthWrapper";
export const privateRoutes = [
  {
    path: "/dashboard/home",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <HomeMember />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/mypond",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <PondManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/mypond/detail",
        element: (
          <AuthWrapper allowedRoles={["USER"]}>
            <PondDetail />
          </AuthWrapper>
        ),
        children: [
          {
            path: "/dashboard/mypond/detail/info",
            element: (
              <AuthWrapper allowedRoles={["USER"]}>
                <PondInfo />
              </AuthWrapper>
            ),
          },
          {
            path: "/dashboard/mypond/detail/water",
            element: (
              <AuthWrapper allowedRoles={["USER"]}>
                <PondWater />
              </AuthWrapper>
            ),
          },
          {
            path: "/dashboard/mypond/detail/kois",
            element: (
              <AuthWrapper allowedRoles={["USER"]}>
                <KoiManage />
              </AuthWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/myorder",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <OrderManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/myorder/detail",
        element: (
          <AuthWrapper allowedRoles={["USER"]}>
            <MyOrderDetail />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/dashboard/myblog",
    element: (
      <AuthWrapper allowedRoles={["USER"]}>
        <BlogManage />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/dashboard/myblog/review",
        element: (
          <AuthWrapper allowedRoles={["USER"]}>
            <BlogDetail />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: "/dashboard/setting",
    element: (
      <AuthWrapper allowedRoles={["USER", "ADMIN"]}>
        <UserSetting />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/admin/order",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <AdminOrderManage />
      </AuthWrapper>
    ),
  },
  {
    path: "/dashboard/admin/account",
    element: (
      <AuthWrapper allowedRoles={["ADMIN"]}>
        <AdminAccountManage />
      </AuthWrapper>
    ),
  },
];

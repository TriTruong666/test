import React from "react";
// import pages
import { HomeMember } from "../pages/private/member/HomeMember";
import { PondManage } from "../pages/private/member/PondManage";
import { PondDetail } from "../pages/private/member/PondDetail";
import { PondInfo } from "../pages/private/member/PondInfo";
import { PondWater } from "../pages/private/member/PondWater";
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
        ],
      },
    ],
  },
];

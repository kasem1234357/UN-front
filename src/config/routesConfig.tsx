import React, { ReactNode, Suspense, lazy } from "react";

import { RoutesConfig } from "../types";

import ImageIcon from "../components/global/ImageIcon";

import ProfileIcon from "../assets/icons/ProfileIcon";

import ClubAdminsIcon from "../assets/icons/ClubAdminsIcon";
import Loader from "../components/skeletons/Loader";

import OrderIcon from "../assets/icons/OrderIcon";

import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Report";
import Engineer from "../pages/Engineer";
import Map from "../pages/Map";
import Review from "../pages/Report";



const Loadable = ({ children }: { children: ReactNode }) => (
  <Suspense
    fallback={
      <div className="w-full h-[calc(100dvh-200px)] flex flex-col justify-center items-center">
        <Loader />
      </div>
    }
  >
    {children}
  </Suspense>
);
export const routes: RoutesConfig = [
  {
    path: "/",
    role: ["all"],
    title: "Map",
    tag:"Map",
    isMainPage: true,
    icon: () => <ImageIcon Icon={OrderIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Map />
      </Loadable>
    ),
  },
  {
    path: "/reports",
    role: ["all"],
    title: "reports",
    tag:"Reports",
    isMainPage: true,
    icon: () => <ImageIcon Icon={ProfileIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Review />
      </Loadable>
    ),
  },
   {
    path: "/Engineers",
    role: ["all"],
    title: "Engineers",
    tag:"Engineers",
    isMainPage: true,
    icon: () => <ImageIcon Icon={ClubAdminsIcon} width={42} height={42} />,
    element: (
      <Loadable>
        <Engineer />
      </Loadable>
    ),
  },
   {
    path: "/*",
    role: ["all"],
    title: "",
    
    isMainPage: false,
    
    element: (
      <Loadable>
        <Navigate to='not-found' />
      </Loadable>
    ),
  },
 
];
export const routesSchema = (role = "all") => {
  if (role === "super_admin") return routes;
  const safeRoutes = routes.filter(
    (route) => route.role.includes(role) || route.role.includes("all")
  );
  return safeRoutes;
};

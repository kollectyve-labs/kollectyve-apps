import Header from "../components/dashcompo/header";
import Sidebar from "../components/sidebar";
import Stats from "../components/dashcompo/stats";
import Deployments from "../components/dashcompo/Rdeployments";
import Resource from "../components/dashcompo/resource";
import React from "react";

const Dashboard: React.FC = () => {
  return (

    <div className="w-[90%] h-[100%] bg-[#f0f2f5] p-5 overflow-y-scroll">
   <Header Title="Dashboard" />
        <Stats />
      <Resource />
      <Deployments />
    </div>

  );
};

export default Dashboard;

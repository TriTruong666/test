import React from "react";
import { Radar } from "react-chartjs-2";

const WaterParametersChart = ({ waterParam }) => {
  const data = {
    labels: ["O2", "Temperature", "NH4", "Salt", "pH", "NO2", "NO3"],
    datasets: [
      {
        label: "Water Parameters",
        data: [
          waterParam.o2,
          waterParam.temperature,
          waterParam.nh4,
          waterParam.salt,
          waterParam.ph,
          waterParam.no2,
          waterParam.no3,
        ],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <>
      <h3>Water Parameters</h3>
      <Radar data={data} />
    </>
  );
};

export default WaterParametersChart;

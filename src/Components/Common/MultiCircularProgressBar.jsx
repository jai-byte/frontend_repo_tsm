/* eslint-disable */

import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PropTypes from "prop-types";
import { CChart } from "@coreui/react-chartjs";

export default function MultiCircularProgressBar({ values }) {
   const labels = values.map((item) => item.label);
   const data = values.map((item) => item.value);
   const color = values.map((item) => item.color);
   const totalCount = values.reduce((acc, curr) => acc + parseInt(curr.value), 0);

   return (
      <div style={{ width: "250px" }} className="mt-3 m-auto">
         <div>Total Count: {totalCount}</div>
         <CChart
            type="doughnut"
            data={{
               labels: labels,

               datasets: [
                  {
                     backgroundColor: color,
                     data: data,
                  },
               ],
            }}
            options={{
               aspectRatio: 1.5,
               plugins: {
                  tooltip: {
                     enabled: true,
                  },
               },
            }}
         />
      </div>
   );
}

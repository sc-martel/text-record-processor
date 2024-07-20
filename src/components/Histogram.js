import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

/**
 * Histogram component displays a histogram of item frequencies using Recharts.
 *
 * Author: Scott Martel
 * Date: 07/19/2024
 */

const Histogram = ({ items }) => {
  // Convert the items object into an array of objects, each containing name and frequency
  const data = Object.entries(items).map(([name, frequency]) => ({
    name,
    frequency,
  }));

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" align="center">Item Frequency Histogram</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="frequency" fill="#1687A7" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default Histogram;

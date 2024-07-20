import React, { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

/**
 * ItemList component displays a list of items with their frequencies.
 * Includes a search feature to filter items.
 *
 * Author: Scott Martel
 * Date: 07/17/2024
 */

const ItemList = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Handles the change in the search input field and updates the search value.
   *
   * @param {Event} event - The event triggered by changing the search input field.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Filters the items based on the search value.
   *
   * @param {string} item - The item name.
   * @returns {boolean} - Returns true if the item matches the search term, otherwise false.
   */
  const filterItems = (item) => {
    return item.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2, backgroundColor: "#f0f0f0" }} // Change background color here
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#276678" }}>
              <TableCell sx={{ color: "#FFFFFF" }}>Item</TableCell>
              <TableCell sx={{ color: "#FFFFFF" }} align="center">
                Frequency
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(items)
              .filter(([item]) => filterItems(item))
              .map(([item, count], index) => (
                <TableRow
                  key={item}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F6F5F5" : "inherit", // Alternate row background color
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item}
                  </TableCell>
                  <TableCell align="center">{count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemList;

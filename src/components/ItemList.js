import React, { useState, useEffect } from "react";
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
  Button,
} from "@mui/material";
import { binarySearch } from "../algorithms";

/**
 * ItemList component displays a list of items with their frequencies.
 * Includes a search feature to filter items.
 *
 * Update 7/26/2024: Implemented binary search with time complexity O(log n)
 * to improve performance from existing linear search with time complexity of O(n).
 * 
 * Update 08/02/2024 Enhancement Three: Implement loading saved data from Google Firestore database.
 *
 * Author: Scott Martel
 * Date: 07/26/2024
 */

const ItemList = ({ items, loadItemsFromFirestore }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedItems, setSortedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Initialize the sortedItems and filteredItems arrays
  useEffect(() => {
    if (items && Array.isArray(items)) {
      setSortedItems(items);
      setFilteredItems(items);
    }
  }, [items]);

  /**
   * Handles the change in the search input field and updates the search value.
   *
   * @param {Event} event - The event triggered by changing the search input field.
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Filters the items based on the search value using binary search.
   *
   * 7/26/2024 Enhancement Two: implemented binary search improving time complexity
   * from linear O(n) to binary search O(log n)
   *
   * @param {Array} itemsArray - The sorted items array.
   * @param {string} searchTerm - The search term.
   * @returns {Array} - Returns the filtered items array.
   */
  const filterItems = (itemsArray, searchTerm) => {
    if (!searchTerm) return itemsArray;

    // Enhancement Two: switched from linear to binary search
    const index = binarySearch(itemsArray, searchTerm.toLowerCase());
    return index !== -1 ? [itemsArray[index]] : [];
  };

  /**
   * Handles the search button click and updates the filtered items.
   */
  const handleSearchClick = () => {
    const newFilteredItems = filterItems(sortedItems, searchTerm.toLowerCase());
    setFilteredItems(newFilteredItems);
  };

  /**
   * Handles the reset button click and resets the filtered items to the original sorted list.
   */
  const handleResetClick = () => {
    setFilteredItems(sortedItems);
    setSearchTerm("");
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2, backgroundColor: "#f0f0f0" }}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSearchClick}
          sx={{
            backgroundColor: "#276678",
            my: 2,
            "&:hover": { backgroundColor: "#1687A7" },
          }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          onClick={handleResetClick}
          sx={{ color: "#276678", my: 2 }}
        >
          Reset
        </Button>
        {/* Enhancement Three: Button to load items from Firestore */}
        <Button
          variant="contained"
          onClick={loadItemsFromFirestore}
          sx={{
            backgroundColor: "#276678",
            my: 2,
            "&:hover": { backgroundColor: "#1687A7" },
          }}
        >
          Load from Firestore
        </Button>
      </Box>
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
            {Array.isArray(filteredItems) &&
              filteredItems.map(([item, count], index) => (
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

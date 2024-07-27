import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import TextInput from "./components/TextInput";
import ItemList from "./components/ItemList";
import Histogram from "./components/Histogram";
import { mergeSort } from "./algorithms";

/**
 * App component serves as the main container for the Text File Processor application.
 * It handles the state management and renders the TextInput, ItemList, and Histogram components.
 *
 * Update 7/26/2024: Implemented merge sort to sort the items input by the year allowing the use 
 * of binary search.
 * 
 * Author: Scott Martel
 * Date: 07/26/2024
 */

const App = () => {
  const [items, setItems] = useState([]);
  // Flag to toggle between list and histogram view
  const [view, setView] = useState("list");

  /**
   * Handles the input text processing by splitting it into lines,
   * counting the frequency of each item, sorting the items using merge sort,
   * and updating the state.
   * 
   * 7/26/2024 Enhancement Two, implemented merge sort to sort the data allowing the use 
   * of the binary search algorithm, merge sort has a time complexity of 0(n log n)
   *
   * @param {string} text - The input text containing the list of purchased items.
   */
  const handleTextInput = (text) => {
    // Split the text input into lines and trims excess whitespace 
    const lines = text.split("\n").map(line => line.trim()).filter(line => line);
  
    // Create an object to store the frequency of each item
    const itemMap = {};
  
    // Count the frequency of each item in the lines array
    lines.forEach((item) => {
      itemMap[item] = (itemMap[item] || 0) + 1;
    });
  
    // Convert the itemMap object to an array of [item, frequency] pairs
    const itemsArray = Object.entries(itemMap);
  
    // Enhancement Two 7/26/2024: Implemented merge sort algorithm to sort the array allowing the use of binary search
    const sortedItems = mergeSort(itemsArray);
  
    // Update the state with the sorted items array
    setItems(sortedItems);
  };

  /**
   * Toggles the view between the list and histogram views.
   */
  const toggleView = () => {
    setView(view === "list" ? "histogram" : "list");
  };

  return (
    <Box sx={{ backgroundColor: "#276678", minHeight: "100vh", py: 4 }}>
      <Container sx={{ backgroundColor: "#D3E0EA", py: 2, borderRadius: 2 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Text Record Processor
          </Typography>
          <TextInput onTextInput={handleTextInput} />
          <Button
            variant="contained"
            onClick={toggleView}
            sx={{
              backgroundColor: "#276678",
              my: 2,
              "&:hover": { backgroundColor: "#1687A7" },
            }}
          >
            {view === "list"
              ? "Switch to Histogram View"
              : "Switch to List View"}
          </Button>
          {view === "list" ? <ItemList items={items} /> : <Histogram items={items} />}
        </Box>
      </Container>
    </Box>
  );
};

export default App;

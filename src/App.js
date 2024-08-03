import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import TextInput from "./components/TextInput";
import ItemList from "./components/ItemList";
import Histogram from "./components/Histogram";
import Auth from "./components/Auth";
import { mergeSort } from "./algorithms";
import { db } from "./firebase"; 
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";

/**
 * App component serves as the main container for the Text File Processor application.
 * It handles the state management and renders the TextInput, ItemList, and Histogram components.
 *
 * Update 07/26/2024: Implemented merge sort to sort the items input by the year allowing the use
 * of binary search.
 *
 * Update 08/02/2024 Enhancement Three: implemented Firebase authentication for user login/registration and saving/loading item data.
 *
 * Author: Scott Martel
 * Date: 08/02/2024
 */

const App = () => {
  const [items, setItems] = useState([]);
  // Update 08/01/2024, Enhancement Three: State to manage user authentication
  const [view, setView] = useState("list");
  // Update 08/02/2024, Enhancement Three: Manage user authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  /**
   * Handles the input text processing by splitting it into lines,
   * counting the frequency of each item, sorting the items using merge sort,
   * and updating the state.
   *
   * Enhancement Two 7/26/2024: Implemented merge sort to sort the data allowing the use
   * of the binary search algorithm, merge sort has a time complexity of 0(n log n)
   *
   * @param {string} text - The input text containing the list of purchased items.
   */
  const handleTextInput = (text) => {
    if (text === "") return;
    // Split the text input into lines and trims excess whitespace
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

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

    // Save items to firestore
    saveItemsToFirestore(itemsArray);
  };

  /**
   * Toggles the view between the list and histogram views.
   */
  const toggleView = () => {
    setView(view === "list" ? "histogram" : "list");
  };

  /**
   * Update 08/01/2024 Enhancement Three: Handles the user authentication status change.
   *
   * Updates the user authentication state
   *
   * @param {boolean} status - The user's authentication status.
   */
  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
  };

   /**
   * Saves the processed item data to Firestore database.
   * 
   * Update 08/02/2024 Enhancement Three: Implemented storing items in Firestore.
   * 
   * @param {Array} itemsArray - The array of items to be saved to Firestore.
   */
   const saveItemsToFirestore = async (itemsArray) => {
    try {
      // Reference the items collection in Firestore
      const itemsCollection = collection(db, "items");

      // Get the existing items from Firestore
      const querySnapshot = await getDocs(itemsCollection);
      const existingItems = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        existingItems[data.item.toLowerCase()] = { id: doc.id, frequency: data.frequency };
      });

      // Loop through items and save each item as a document in Firestore
      for (const [item, frequency] of itemsArray) {
        const lowerCaseItem = item.toLowerCase();

        if (existingItems[lowerCaseItem]) {
          // If the item exists, update its frequency
          const itemRef = doc(db, "items", existingItems[lowerCaseItem].id);
          const newFrequency = existingItems[lowerCaseItem].frequency + frequency;
          await updateDoc(itemRef, { frequency: newFrequency });
        } else {
          // If the item does not exist, add a new document
          await addDoc(itemsCollection, { item, frequency });
        }
      }
      alert("Items saved to Firestore successfully!");
    } catch (error) {
      console.error("Error saving items to Firestore:", error);
    }
  };

  /**
   * Update 08/02/2024 Enhancement Three: Load items from Firestore database.
   *
   * This function fetches item data from Firestore to update local state.
   */
  const loadItemsFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Use the item field from the document data for the item name
        itemsData.push([data.item, data.frequency]);
      });
      // Save item data in items state
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching items from Firestore:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#276678", minHeight: "100vh", py: 4 }}>
      <Container sx={{ backgroundColor: "#D3E0EA", py: 2, borderRadius: 2 }}>
        <Box sx={{ my: 4 }}>
          {!isAuthenticated ? (
            // Update 08/01/2024 Enhancement Three: Render the Auth component when the user is not authenticated
            <Auth onAuthChange={handleAuthChange} />
          ) : (
            // Render the main application components when the user is authenticated
            <>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
              >
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
              {view === "list" ? (
                <ItemList items={items} loadItemsFromFirestore={loadItemsFromFirestore} />
              ) : (
                <Histogram items={items} />
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default App;

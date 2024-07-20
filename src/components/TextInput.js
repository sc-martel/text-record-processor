import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { SAMPLE_DATA } from "../constants/SampleData";

/**
 * TextInput component provides a text area for users to input a list of purchased items.
 * It processes the input text and passes it to the parent component for further processing.
 * Includes the option to populate using pre created ample data.
 * 
 * Author: Scott Martel
 * Date: 07/20/2024
 */

const TextInput = ({ onTextInput }) => {
  const [text, setText] = React.useState("");

  /**
   * Handles submit by passing the current text input to the parent component
   */
  const handleSubmit = () => {
    onTextInput(text);
  };

  /**
   * Handles populating the text field with sample data
   */
  const handlePopulateSampleData = () => {
    setText(SAMPLE_DATA);
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField
        label="Input Text List"
        multiline
        rows={10}
        fullWidth
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" sx={{ backgroundColor: '#276678', mt: 2, mr: 2, '&:hover': { backgroundColor: '#1687A7' } }} onClick={handleSubmit}>
        Process
      </Button>
      <Button
        variant="outlined"
        sx={{ color: '#276678', mt: 2 }}
        onClick={handlePopulateSampleData}
      >
        Populate Sample Data
      </Button>
    </Box>
  );
};

export default TextInput;

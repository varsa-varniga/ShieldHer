import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Layout from "../layout";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Router>
      <CssBaseline />
      <Layout 
      isExpanded={isExpanded} 
      setIsExpanded={setIsExpanded} 
      />
    </Router>
  );
}



export default App;

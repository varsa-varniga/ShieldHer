import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useDropzone } from "react-dropzone";
import LinkIcon from "@mui/icons-material/Link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ScanAnimation from "./ScanAnimation"; 
import { checkPhishingLink } from "../services/PhishingScannerService";
const ThreatScanner = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileScanResults, setFileScanResults] = useState([]); 

  const [folderUploaded, setFolderUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setScanResult(null);
    setFileScanResults([]); 
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.error("Invalid URL:", error);
      return false;
    }
  };

  const handleScan = async () => {
    if (!isValidURL(inputValue.trim())) {
      alert("Invalid URL! Please enter a valid link.");
      return;
    }
  
    setLoading(true); // Start loading (show animation)
  
    try {
      // Call backend API instead of mock response
      const response = await checkPhishingLink(inputValue.trim());
  
      setScanResult({
        status: response.isPhishing ? "Phishing Detected" : "Clean",
        riskScore: response.riskScore || 0,
      });
    } catch (error) {
      console.error("Error scanning URL:", error);
      alert("Error scanning URL.");
    }
  
    setLoading(false); // Stop loading (hide animation)
  };
  

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setFolderUploaded(true);
    handleFileScan(acceptedFiles);
  };

  const handleFileScan = async (uploadedFiles) => {
    setLoading(true); // Start loading (show animation)
  
    let results = [];
  
    try {
      // Simulate scanning delay (3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      for (const file of uploadedFiles) {
        const response = {
          isPhishing: Math.random() < 0.3,
          riskScore: Math.floor(Math.random() * 100),
        };
  
        results.push({
          name: file.name,
          status: response.isPhishing ? "Phishing Detected" : "Clean",
          riskScore: response.riskScore || 0,
        });
      }
    } catch (error) {
      console.error("Error scanning files:", error);
      alert("Error scanning files.");
    }
  
    setFileScanResults(results);
    setLoading(false); // Stop loading (hide animation)
  };
  
  const getRiskColor = (score) => {
    if (score > 80) return "#ff4d4d";
    if (score > 50) return "#ffa000";
    return "#32cd32";
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        mb: 5,
        p: 3,
       
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "#2C3E50", // Dark navy blue
        color: "white",
        
      }}
    >
     
     <Typography variant="body1" align="center" mt={2} fontSize={"2.5rem"} color="white">
  {tabIndex === 0 ? <LinkIcon sx={{ fontSize: "2.5rem", verticalAlign: "middle" }} /> 
                  : <InsertDriveFileIcon sx={{ fontSize: "2.5rem", verticalAlign: "middle" }} />} 
  <strong> {tabIndex === 0 ? "Is this link safe?" : "Is this file safe?"}</strong>
</Typography>

<Typography textAlign={"center"} fontSize={"1rem"} color="white">
  {tabIndex === 0
    ? "Scan a URL you want to visit to detect malware, fake websites, and phishing attacks."
    : "Scan your file for malware and viruses."}
</Typography>


    

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="inherit"
        sx={{ mb: 3 }}
      >
        <Tab label="URL Scanner" />
        <Tab label="File Scanner" />
      </Tabs>

      {tabIndex === 0 && (
        <Box textAlign="center" mt={3}>
          <TextField
            label="Enter URL to Scan"
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#3f7afc" },
              },
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleScan}
            disabled={loading}
            sx={{ mt: 2, backgroundColor: "#3f7afc", "&:hover": { backgroundColor: "#3160d8" } }}
          >
            {loading ? "scaning..." : "Scan URL"}
          </Button>
          <Box display="flex" flexDirection="column" alignItems="center">
  {loading && (
  <Box display="flex" flexDirection="column" alignItems="center">
  {loading ? (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="100vw"
    height="100vh"
 position={"absolute"}
    zIndex={999}
    bgcolor="rgba(0, 0, 0, 0.5)"
    borderRadius={2}
    top={0}
    left={0}
    >
   
    <ScanAnimation />
  </Box>
  

 
  ) : (
    scanResult && (
      <Typography variant="h6" color="white" mt={2}>
        Scan Result: {scanResult.status} (Risk Score: {scanResult.riskScore})
      </Typography>
    )
  )}
</Box>

  )}
</Box>


          {scanResult && (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mt: 3,
                bgcolor: getRiskColor(scanResult.riskScore),
                color: "white",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                {scanResult.status === "Clean" ? <CheckCircleIcon /> : <ErrorIcon />} {scanResult.status}
              </Typography>
              <Typography>Risk Score: {scanResult.riskScore}/100</Typography>
            </Paper>
          )}
        </Box>
      )}

      {tabIndex === 1 && (
        <Box textAlign="center" mt={3}>
          <Box
            {...getRootProps()}
            sx={{
              p: 4,
              border: "2px dashed #3f7afc",
              borderRadius: 2,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "skyblue",
              "&:hover": { bgcolor: "skyblue" },
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 50, color: "#3f7afc" }} />
            <Typography variant="body1" mt={1} color="textSecondary">
              Drag & Drop Images Here
            </Typography>
          </Box>

          {fileScanResults.length > 0 && (
            <List sx={{ mt: 2 }}>
              {fileScanResults.map((file, index) => (
                <ListItem key={index} sx={{ bgcolor: getRiskColor(file.riskScore), borderRadius: 2, mb: 1 }}>
                  <ListItemText
                    primary={file.name}
                    secondary={`Status: ${file.status}, Risk Score: ${file.riskScore}/100`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      <Snackbar
        open={folderUploaded || imageUploaded}
        autoHideDuration={3000}
        onClose={() => {
          setFolderUploaded(false);
          setImageUploaded(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          {folderUploaded ? "Folder uploaded successfully!" : "Image uploaded successfully!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ThreatScanner;

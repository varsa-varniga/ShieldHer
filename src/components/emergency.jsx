import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  Grid,
  Snackbar,
  Alert,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Backdrop,
} from "@mui/material";
import {
  ReportProblem,
  ContactSupport,
  Security,
  Check,
  Verified,
  Shield,
  GavelRounded,
  DeleteSweep,
  Person,
} from "@mui/icons-material";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../chatbot/config";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
// Note: Lottie import and animation imports are commented out until you install them

const EmergencyCyberHelpPage = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [incidentType, setIncidentType] = useState(null);
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [cyberPoliceModalOpen, setCyberPoliceModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  // Removed unused state variables that were causing warnings

  const actionButtons = [
    {
      label: "Report an Incident",
      color: "error",
      icon: <ReportProblem />,
      description: "Immediate threat reporting",
    },
    {
      label: "AI Chatbot Help",
      color: "success",
      icon: <ContactSupport />,
      description: "Instant cyber guidance",
      onClick: () => setIsChatbotVisible(!isChatbotVisible),
    },
    {
      label: "Connect with Cyber Police",
      color: "primary",
      icon: <Security />,
      description: "Official support",
      onClick: () => setCyberPoliceModalOpen(true),
    },
  ];

  const incidentTypes = [
    { label: "Blackmail" },
    { label: "Harassment" },
    { label: "Phishing" },
    { label: "Other" },
  ];

  const cyberPoliceActions = [
    {
      text: "Identify the scammer",
      icon: <Person sx={{ color: "#4caf50" }} />,
      description:
        "Our cyber forensics team can trace digital footprints to identify perpetrators",
    },
    {
      text: "Help remove leaked content",
      icon: <DeleteSweep sx={{ color: "#4caf50" }} />,
      description:
        "We work with platforms to expedite removal of harmful content",
    },
    {
      text: "Take legal action",
      icon: <GavelRounded sx={{ color: "#4caf50" }} />,
      description:
        "Our legal team can assist with criminal complaints and legal proceedings",
    },
  ];

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:");
    console.log(`Incident type: ${incidentType?.label}`);
    console.log(`Description: ${description}`);
    console.log(`Evidence: ${evidence?.name}`);

    setNotification({
      open: true,
      message: evidence
        ? `Report submitted successfully. File "${evidence.name}" uploaded. Our team will take necessary actions.`
        : "Report submitted successfully. Our team will take necessary actions.",
      severity: "success",
    });

    setIncidentType(null);
    setDescription("");
    setEvidence(null);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleRequestCyberPoliceHelp = () => {
    setCyberPoliceModalOpen(false);
    setConfirmationModalOpen(true);

    // Simulate API call to cyber police (Fake API for Demo)
    setTimeout(() => {
      setConfirmationModalOpen(false);
      setNotification({
        open: true,
        message:
          "Your request has been sent to Cyber Police. An officer will contact you shortly.",
        severity: "success",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A2342] via-[#1F4068] to-[#1A3B5C] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-5xl w-full space-y-8">
        <h1 className="text-6xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse">
          Emergency Cyber Help
        </h1>

        <p className="text-xl text-gray-200 mb-10 tracking-wide">
          Immediate action for online threats – Report & Get Help Now!
        </p>

        <div className="flex justify-center items-center w-full space-x-8">
          {actionButtons.map((btn) => (
            <Button
              key={btn.label}
              variant="contained"
              color={btn.color}
              startIcon={btn.icon}
              onClick={btn.onClick}
              sx={{
                mx: 2,
                transform: "scale(1)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                },
              }}
              className={`
                text-lg capitalize py-4 px-6
                ${
                  btn.label === "Report an Incident"
                    ? "bg-red-600"
                    : btn.label === "AI Chatbot Help"
                    ? "bg-green-600"
                    : "bg-blue-600"
                }
              `}
            >
              {btn.label}
            </Button>
          ))}
        </div>

        <Card
          sx={{
            width: "100%",
            padding: "20px",
            backgroundColor: "#253242",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            marginTop: "30px",
          }}
        >
          <CardContent sx={{ mt: -3 }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#fff",
              }}
            >
              Report an Incident
            </h2>

            <form onSubmit={handleReportSubmit}>
              <Autocomplete
                disablePortal
                id="incident-type"
                options={incidentTypes}
                value={incidentType}
                sx={{
                  width: "100%",
                  marginBottom: "20px",
                  "& .MuiAutocomplete-root": {
                    color: "#fff !important",
                  },
                  "& .MuiAutocomplete-inputRoot": {
                    color: "#fff !important",
                    "& .MuiAutocomplete-input": {
                      color: "#fff !important",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#fff !important",
                  },
                  "& .MuiAutocomplete-popper": {
                    "& .MuiAutocomplete-listbox": {
                      backgroundColor: "#253242 !important",
                      color: "#fff !important",
                    },
                    "& .MuiAutocomplete-option": {
                      color: "#fff !important",
                      "&.Mui-focused": {
                        backgroundColor: "#007bff !important",
                        color: "#fff !important",
                      },
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="What happened?"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#fff !important",
                      },
                      "& .MuiOutlinedInput-root": {
                        color: "#fff !important",
                        "& input": {
                          color: "#fff !important",
                        },
                        "& fieldset": {
                          borderColor: "#fff",
                        },
                        "&:hover fieldset": {
                          borderColor: "#fff",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007bff",
                        },
                      },
                    }}
                  />
                )}
                onChange={(event, value) => setIncidentType(value)}
              />

              <TextField
                id="description"
                label="Describe the issue (optional)"
                multiline
                rows={4}
                sx={{
                  width: "100%",
                  marginBottom: "20px",
                  "& .MuiInputLabel-root": {
                    color: "#fff !important",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "#fff !important",
                    "& textarea": {
                      color: "#fff !important",
                    },
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#007bff",
                    },
                  },
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{
                  style: {
                    color: "#fff",
                  },
                }}
              />

              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "200px",
                    }}
                  >
                    Upload Evidence (optional)
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setEvidence(e.target.files[0])}
                    />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "200px",
                      backgroundColor: "#ff0000",
                      color: "#fff",
                      padding: "10px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Submit Report
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        {/* Cyber Police Connection Modal */}
        <Modal
          open={cyberPoliceModalOpen}
          onClose={() => setCyberPoliceModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={cyberPoliceModalOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "#1A2133",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                p: 4,
                border: "1px solid rgba(66, 153, 225, 0.5)",
                animation: "pulse 2s infinite",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "5px",
                  background:
                    "linear-gradient(90deg, #3182CE 0%, #63B3ED 100%)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Shield
                    sx={{
                      fontSize: 40,
                      mr: 2,
                      color: "#63B3ED",
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Cyber Police Division
                    <Verified
                      sx={{
                        ml: 1,
                        color: "#4caf50",
                        animation: "pulse 1.5s infinite",
                      }}
                    />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: "#0A2342",
                    color: "#fff",
                    px: 2,
                    py: 0.5,
                    borderRadius: "20px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "10px", marginRight: "5px" }}>
                    ⚠️
                  </span>
                  DEMO
                </Box>
              </Box>

              <Typography
                variant="body1"
                sx={{ color: "#B2CADE", mb: 3, fontWeight: "medium" }}
              >
                Our cyber police unit is ready to assist with your online
                emergency. We can take the following actions:
              </Typography>

              <List>
                {cyberPoliceActions.map((action, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "rgba(30, 64, 104, 0.4)",
                      borderRadius: "8px",
                      mb: 2,
                      transition: "all 0.3s",
                      "&:hover": {
                        bgcolor: "rgba(30, 64, 104, 0.6)",
                        transform: "translateX(5px)",
                      },
                    }}
                  >
                    <ListItemIcon>{action.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Check
                            sx={{ color: "#4caf50", mr: 1, fontSize: 20 }}
                          />
                          {action.text}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: "#B2CADE", fontSize: "14px" }}>
                          {action.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleRequestCyberPoliceHelp}
                  sx={{
                    py: 1.5,
                    px: 6,
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, #3182CE 0%, #63B3ED 100%)",
                    boxShadow: "0 4px 14px rgba(49, 130, 206, 0.5)",
                    transition: "all 0.3s",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #2B6CB0 0%, #4299E1 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(49, 130, 206, 0.7)",
                    },
                  }}
                >
                  Request Cyber Police Help
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        {/* Confirmation Modal with Animation */}
        <Modal
          open={confirmationModalOpen}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={confirmationModalOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "#1A2133",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                p: 4,
                textAlign: "center",
                border: "1px solid rgba(66, 153, 225, 0.5)",
              }}
            >
              <Box sx={{ mb: 2 }}>
                {/* Placeholder animation - will be replaced with Lottie when installed */}
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                    backgroundColor: "#3182CE",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    animation: "pulse 1.5s infinite",
                  }}
                >
                  <Security sx={{ fontSize: 80, color: "#fff" }} />
                </div>
              </Box>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold", mb: 2 }}
              >
                Connecting to Cyber Police
              </Typography>
              <Typography variant="body1" sx={{ color: "#B2CADE" }}>
                Your request is being processed. A certified cyber police
                officer will be assigned to your case shortly.
              </Typography>
            </Box>
          </Fade>
        </Modal>

        {isChatbotVisible && (
          <div
            style={{
              position: "fixed",
              bottom: 30,
              right: 20,
              zIndex: 1000,
            }}
          >
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              handleClose={() => setIsChatbotVisible(false)}
            />
          </div>
        )}

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{
              width: "100%",
              backgroundColor: "#1A3B5C",
              color: "#fff",
              "& .MuiAlert-icon": { color: "#fff" },
              "& .MuiAlert-message": { color: "#fff" },
              "& .MuiAlert-action": { color: "#fff" },
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        <style jsx global>{`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(66, 153, 225, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(66, 153, 225, 0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EmergencyCyberHelpPage;

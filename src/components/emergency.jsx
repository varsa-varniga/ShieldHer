// import React from "react";
// import { Typography, Card, CardContent, Button, Grid } from "@mui/material";

// const EmergencyHelp = ({ isDarkMode }) => {
//   const emergencyContacts = [
//     { name: "Cybersecurity Hotline", number: "1-800-CYBER-HELP" },
//     { name: "Local Cyber Crime Unit", number: "1-888-CYBER-911" },
//     { name: "Data Recovery Service", number: "1-877-DATA-SAVE" },
//   ];

//   return (
//     <div
//       style={{
//         backgroundColor: isDarkMode ? "#1a2634" : "#f4f6f8",
//         color: isDarkMode ? "#ffffff" : "#000000",
//         minHeight: "100%",
//         padding: "20px",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Emergency Help
//       </Typography>
//       <Card
//         sx={{
//           backgroundColor: isDarkMode ? "#243447" : "#ffffff",
//           color: isDarkMode ? "#ffffff" : "#000000",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Emergency Contacts
//           </Typography>
//           <Grid container spacing={2}>
//             {emergencyContacts.map((contact, index) => (
//               <Grid item xs={12} sm={4} key={index}>
//                 <Card
//                   sx={{
//                     backgroundColor: isDarkMode ? "#2c3e50" : "#f1f1f1",
//                     color: isDarkMode ? "#ffffff" : "#000000",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="subtitle1">{contact.name}</Typography>
//                     <Typography variant="body2">{contact.number}</Typography>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       sx={{ marginTop: 2 }}
//                     >
//                       Call Now
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EmergencyHelp;
import React from "react";

function Emergency() {
  return <div>emergency</div>;
}

export default Emergency;

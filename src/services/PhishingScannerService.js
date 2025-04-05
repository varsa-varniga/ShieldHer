import axios from "axios";



export const checkPhishingLink = async (url) => {

  try {

    const response = await axios.post("http://localhost:5000/api/phishing/check-phishing", { url });

    

    console.log("Backend Response:", response.data); // ✅ Log to check if data is received

    

    return response.data; // Return backend response

  } catch (error) {

    console.error("Error checking phishing link:", error);

    return { error: "Failed to analyze phishing link" };

  }

};
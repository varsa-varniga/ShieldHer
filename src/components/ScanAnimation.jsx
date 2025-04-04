import Lottie from "lottie-react";
import scanJson from "../assets/Scan.json?url";
const ScanAnimation = () => {
  return (
    <Lottie
      animationData={scanJson}
      loop={true}
      style={{ width: "500px", height: "500px",marginLeft:"150px" }} 
    />
  );
};

export default ScanAnimation;

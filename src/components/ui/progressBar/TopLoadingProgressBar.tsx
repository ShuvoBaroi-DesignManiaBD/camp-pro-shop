import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigation } from "react-router-dom";
import "nprogress/nprogress.css";
import { Progress } from "antd";

const TopLoadingProgressBar = () => {
  const location = useLocation(); // Track location changes
  const navigation = useNavigation(); // Track navigation status
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading on location change
    setIsLoading(true);
    setProgress(0);

    const incrementProgress = () => {
      setProgress((prev) => {
        if (prev >= 150) {
          setIsLoading(false);
          return 150;
        }
        return prev + 10;
      });
    };

    const timer = setInterval(incrementProgress, 100); // Increment progress every 150ms

    // Cleanup timer on component unmount or location change
    return () => {
      clearInterval(timer);
    };
  }, [location]);

  return (
    <>
      {isLoading && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999 }}>
        <Progress
          type="line"
          percent={progress}
          strokeColor="#ba986a" // Customize the color of the progress bar
          showInfo={false} // Hide the percentage text
          style={{ position: "fixed", top: -12, left: 0, width: "100%", zIndex: 9999 }}
        />
      </div>
      )}
    </>
  );
};

export default TopLoadingProgressBar;

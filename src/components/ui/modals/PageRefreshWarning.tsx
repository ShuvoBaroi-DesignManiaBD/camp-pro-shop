import { useEffect } from "react";

const PageRefreshWarning = () => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    // Prevent the default unload behavior and show the browser warning
    event.preventDefault();
};

useEffect(() => {
// Attach the beforeunload event listener
window.addEventListener('beforeunload', handleBeforeUnload);

// Cleanup the event listener
return () => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
};
}, []);

  return (
    <></>
  )
};

export default PageRefreshWarning;

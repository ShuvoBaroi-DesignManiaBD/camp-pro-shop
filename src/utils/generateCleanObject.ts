// type Address = {
//     street?: string;
//     city?: string;
//     state?: string;
//     zipCode?: string;
//   };
  
  // type UserData = {
  //   name?: string;
  //   email?: string;
  //   phone?: string;
  //   address?: Address;
  // };
  
  const generateCleanObject = <T>(obj: T): Partial<T> => {
    console.log(obj);
    
    const cleanObject = (currentObj: any): any => {
      if (currentObj === null || typeof currentObj !== 'object') {
        // console.log(cleanObject);
        return currentObj;
      }
  
      // Recursively clean the object
      const cleanedObject = Object.fromEntries(
        Object.entries(currentObj)
          .map(([key, value]) => [key, cleanObject(value)]) // Recursively clean nested values
          .filter(([_, value]) => value !== undefined && value !== null && (typeof value !== 'object' || Object.keys(value).length > 0)) // Remove undefined, null, and empty objects
      );
      // console.log(cleanObject);
      
      return cleanedObject;
    };
  
    return cleanObject(obj);
  };
  
  export default generateCleanObject;
  
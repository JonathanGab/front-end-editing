import { createContext, useState } from 'react';

export const DrawerContext = createContext(null);

export default function DrawerContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [getData, setGetData] = useState([]);
  const [id, setId] = useState(null);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <DrawerContext.Provider
      value={{
        handleOpen,
        open,
        getData,
        setGetData,
        id,
        setId,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

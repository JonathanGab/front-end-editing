import { createContext, useState } from 'react';

export const DrawerContext = createContext(null);

export default function DrawerContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [getData, setGetData] = useState([]);
  const [id, setId] = useState(null);
  const [getId, setGetId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formMediaValues, setFormMediaValues] = useState({});

  const handleClose = () => {
    setOpen(false);
    setGetId(null);
    setIsPreview(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handlePreview = () => {
    setIsPreview(!isPreview);
  };
  const CloseDrawer = () => {
    setOpen(false);
  };

  console.log(isPreview);
  return (
    <DrawerContext.Provider
      value={{
        handleClose,
        open,
        setOpen,
        getData,
        setGetData,
        id,
        setId,
        getId,
        setGetId,
        handleOpen,
        isPreview,
        setIsPreview,
        formValues,
        setFormValues,
        handlePreview,
        CloseDrawer,
        formMediaValues,
        setFormMediaValues,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

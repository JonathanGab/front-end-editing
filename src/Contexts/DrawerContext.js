import { createContext, useEffect, useState } from 'react';

export const DrawerContext = createContext(null);

export default function DrawerContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [getData, setGetData] = useState([]);
  const [id, setId] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formMediaValues, setFormMediaValues] = useState({});
  const [array, setArray] = useState([]);
  const [navigation, setNavigation] = useState('');
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [authId, setAuthId] = useState(null);
  const [userData, setUserData] = useState({});

  const storeData = (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      localStorage.setItem('user', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (email !== null) {
      storeData({
        email: email,
        password: password,
        auth_id: authId,
      });
    }
  }, [authId]);

  const getDataFromLocalStorage = () => {
    try {
      const getJsonValue = localStorage.getItem('user');
      return getJsonValue != null
        ? setUserData(JSON.parse(getJsonValue))
        : null;
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getDataFromLocalStorage();
  }, [email]);

  const handleClose = () => {
    setOpen(false);
    setId(null);
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

  return (
    <DrawerContext.Provider
      value={{
        array,
        setArray,
        handleClose,
        open,
        setOpen,
        getData,
        setGetData,
        id,
        setId,
        handleOpen,
        isPreview,
        setIsPreview,
        formValues,
        setFormValues,
        handlePreview,
        CloseDrawer,
        formMediaValues,
        setFormMediaValues,
        navigation,
        setNavigation,
        email,
        setEmail,
        password,
        setPassword,
        authId,
        setAuthId,
        userData,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

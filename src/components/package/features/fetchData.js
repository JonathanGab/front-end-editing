import axios from 'axios';

export const fetchData = async (open, id, setDrawerData, url) => {
  if (open === false && id === null) {
    setDrawerData([]);
    return;
  } else {
    try {
      const res = await axios.get(url);
      setDrawerData(res.data);
    } catch (err) {
      console.error(err);
      setDrawerData([]);
    }
  }
};

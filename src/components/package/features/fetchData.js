import axios from 'axios';

export const fetchData = (open, id, setDrawerData, url) => {
  if (open === false && id === null) {
    setDrawerData([]);
  } else {
    axios
      .get(url)
      .then((response) => setDrawerData(response.data))
      .catch((err) => console.error(err));
  }
};

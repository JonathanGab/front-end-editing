import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { iterate } from 'dixea-json-parser';

export const useParsedData = ({ enabled, drawerURI, mapResponseFn }) => {
  const [parsedData, setParsedData] = useState();
  const [loading, setLoading] = useState(enabled);
  const { id } = useContext(DrawerContext);

  useEffect(() => {
    if (enabled) {
      setLoading(true)
      axios
        .get(`${drawerURI}${id}`)
        .then(
          (response) =>
            new Promise((resolve) => {
              if (mapResponseFn) {
                resolve(mapResponseFn(response));
              } else {
                resolve(response);
              }
            })
        )
        .then((drawerData) => {
          iterate(drawerData, '', 'racine', parsedData, setParsedData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
          console.log(err)
        });
    }
  }, [enabled, id, mapResponseFn, drawerURI, parsedData]);

  return { parsedData, loading };
};

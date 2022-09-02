import { createContext, useState } from 'react';

export const JsonParserContext = createContext(null);

export default function JsonParserContextProvider({ children }) {
  const [response, setResponse] = useState([]);

  //TODO : config et front

  //. REMOVE HTML TAGS
  const removeHtmlTags = (str) => {
    return `${str}`?.replace(/<[^>]*>?/gm, '');
  };

  const iterate = (varJson, varParent, varAncetre) => {
    for (let varKey in varJson) {
      let iterateObj = {
        ancetre: varAncetre,
        parent: null,
        key: null,
        content: null,
      };

      if (typeof varJson[varKey] === 'object' && varJson[varKey] !== null) {
        if (varAncetre === 'racine') {
          varAncetre = varKey;
        }
        iterate(varJson[varKey], varKey, varAncetre);
        varAncetre = 'racine';
      } else if (
        typeof varJson[varKey] === 'string' ||
        typeof varJson[varKey] === 'number' ||
        typeof varJson[varKey] === 'boolean'
      ) {
        iterateObj.ancetre = varAncetre;
        iterateObj.parent = varParent;
        iterateObj.key = varKey;
        iterateObj.content = varJson[varKey];
        // on remplit le tableau response avec les données
      }
      if (
        iterateObj.parent !== null ||
        iterateObj.key !== null ||
        iterateObj.content !== null
      ) {
        if (response.length === 0) {
          // si response est vide, on l'initialise
          setResponse((prevState) => [...prevState, iterateObj]);
        } else {
          // sinon on vérifie si la clé existe déjà dans le tableau
          // si elle n'existe pas, on l'ajoute
          let index = response.findIndex((item) => item.key === iterateObj.key);
          if (index !== -1) {
            response[index] = iterateObj;
          } else {
            setResponse((prevState) => [...prevState, iterateObj]);
          }
        }
      }
    }
  };
  console.log(response);
  return (
    <JsonParserContext.Provider
      value={{
        response,
        setResponse,
        iterate,
        removeHtmlTags,
      }}
    >
      {children}
    </JsonParserContext.Provider>
  );
}

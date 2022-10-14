import { createContext, useState } from 'react';

export const JsonParserContext = createContext(null);

export default function JsonParserContextProvider({ children }) {
  const [arrayResponse, setArrayResponse] = useState([]);

  //. REMOVE HTML TAGS
  const removeHtmlTags = (str) => {
    return `${str}`?.replace(/<[^>]*>?/gm, '');
  };
  const iterate = async (
    varJson,
    varParent,
    varAncetre,
    varGrandParent,
    array,
    setArray
  ) => {
    for (let varKey in varJson) {
      let iterateObj = {
        ancetre: varAncetre,
        grandParent: varGrandParent,
        parent: null,
        key: null,
        content: null,
      };

      if (typeof varJson[varKey] === 'object' && varJson[varKey] !== null) {
        let varAncetreNew = varAncetre;
        // let varCheminNew = varChemin;
        let varGrandParentNew = varGrandParent;
        if (varAncetre === 'racine') {
          varAncetreNew = varKey;
          // varCheminNew = varKey;
          varGrandParentNew = varKey;
        } else {
          varGrandParent = varKey;
        }
        iterate(
          varJson[varKey],
          varKey,
          varAncetreNew,
          varGrandParentNew,
          array,
          setArray
        );
      } else if (
        typeof varJson[varKey] === 'string' ||
        typeof varJson[varKey] === 'number' ||
        typeof varJson[varKey] === 'boolean'
      ) {
        iterateObj.ancetre = varAncetre;
        // iterateObj.chemin = varChemin;
        iterateObj.grandParent = varGrandParent;
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
        if (array.length === 0) {
          // si response est vide, on l'initialise
          setArray((prevState) => [...prevState, iterateObj]);
        } else {
          // sinon on vérifie si la clé existe déjà dans le logau
          // si elle n'existe pas, on l'ajoute
          setArray([]);
          setTimeout(() => {
            setArray((prevState) => [...prevState, iterateObj]);
          }, 100);
        }
      }
    }
  };

  return (
    <JsonParserContext.Provider
      value={{
        arrayResponse,
        setArrayResponse,
        iterate,
        removeHtmlTags,
      }}
    >
      {children}
    </JsonParserContext.Provider>
  );
}

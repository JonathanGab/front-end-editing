export const iterate = async (
  varJson,
  varParent,
  varAncetre,
  varChemin,

  responseArray,
  setResponseArray
) => {
  for (let varKey in varJson) {
    let iterateObj = {
      ancetre: varAncetre,
      chemin: varChemin,
      parent: null,
      key: null,
      content: null,
    };
    // tant que la clé est un objet, on continue la boucle
    if (typeof varJson[varKey] === 'object' && varJson[varKey] !== null) {
      let varAncetreNew = varAncetre;
      let varCheminNew = varChemin;
      if (varAncetre === 'racine') {
        varAncetreNew = varKey;
        varCheminNew = varKey;
      } else {
        varCheminNew = `${varChemin}>${varKey}`;
      }
      iterate(
        varJson[varKey],
        varKey,
        varAncetreNew,
        varCheminNew,
        responseArray,
        setResponseArray
      );
    } else if (
      // si la clé est un string/number/boolean, on l'ajoute à la réponse
      typeof varJson[varKey] === 'string' ||
      typeof varJson[varKey] === 'number' ||
      typeof varJson[varKey] === 'boolean'
    ) {
      // create object with type
      iterateObj.ancetre = varAncetre;
      iterateObj.chemin = varChemin;
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
      if (responseArray.length === 0) {
        // si response est vide, on le remplit
        setResponseArray((prevState) => [...prevState, iterateObj]);
      } else {
        // si response n'est pas vide, on le vide et on le remplit
        setResponseArray([]);
        setTimeout(() => {
          setResponseArray((prevState) => [...prevState, iterateObj]);
        }, 500);
      }
    }
  }
};

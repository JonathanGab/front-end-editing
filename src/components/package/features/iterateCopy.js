const splitChemin = (relation) => {
  let splitrelation = relation.split('>');
  return splitrelation[2];
};
let varImage = {};
let relationshipsArray = [];
let varImageIncluded = {};
let includedArray = [];
//! loop
let array = [];

export const iterateCopy = (
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
      iterateCopy(
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
      array.push(iterateObj);
    }
    if (
      iterateObj.ancetre === 'data' &&
      iterateObj.chemin.includes('data>relationships>field') &&
      iterateObj.content === 'file--file'
    ) {
      //. -------------------------------------------------------------------------------------------------------------------------
      varImage.field_name = splitChemin(iterateObj.chemin);
    }
    if (
      iterateObj.ancetre === 'data' &&
      //! attention le nom du champs système d'une image dans drupal doit commencer par field
      iterateObj.chemin.includes('data>relationships>field') &&
      iterateObj.key === 'id'
    ) {
      varImage.image_id = iterateObj.content;
      varImage.image_url = '';
      relationshipsArray.push({ ...varImage });
    }
    if (
      iterateObj.ancetre === 'included' &&
      iterateObj.key === 'id' &&
      iterateObj.parent !== 'data'
    ) {
      varImageIncluded.id = iterateObj.content;
    }
    if (
      iterateObj.ancetre === 'included' &&
      iterateObj.parent === 'uri' &&
      iterateObj.key === 'url'
    ) {
      varImageIncluded.image_url = iterateObj.content;
      includedArray.push({ ...varImageIncluded });
    }
    //. -------------------------------------------------------- END OF LOOP  -------------------------------------------------------
  }
  // Add image url to relationships array
  relationshipsArray.forEach((relation) => {
    includedArray.forEach((include) => {
      if (relation.image_id === include.id) {
        relation.image_url = include.image_url;
      }
    });
  });

  console.log('relationshipsArray', relationshipsArray);
  array.push(
    ...relationshipsArray
      .filter(
        (relation) =>
          !array.some((item) => item.ancetre === relation.field_name)
      )
      .map((element) => {
        return {
          ancetre: element.field_name,
          chemin: element.field_name,
          parent: element.image_id,
          key: 'id',
          content: element.image_url,
        };
      })
  );

  return setResponseArray(array);
};

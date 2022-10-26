import { iterate } from './iterate';

const splitChemin = (relation) => {
  let splitrelation = relation.split('>');
  return splitrelation[2];
};
let varImage = {};
let varImageIncluded = {};
let includedArray = [];

//! loop
//
export const iterateDrupal = async (
  varJson,
  varAncetre,
  varParent,
  varChemin,
  responseArray,
  setResponseArray,
  varRelationshipsArray
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
      iterateDrupal(
        varJson[varKey],
        varAncetreNew,
        varKey,
        varCheminNew,
        responseArray,
        setResponseArray,
        varRelationshipsArray
      );
    } else if (
      // si la clé est un string/number/boolean, on l'ajoute à la réponse
      typeof varJson[varKey] === 'string' ||
      typeof varJson[varKey] === 'number' ||
      typeof varJson[varKey] === 'boolean' ||
      varJson[varKey] === null
    ) {
      // create object with type
      iterateObj.ancetre = varAncetre;
      iterateObj.chemin = varChemin;
      iterateObj.parent = varParent;
      iterateObj.key = varKey;
      iterateObj.content = varJson[varKey];
    }
    // condition pour remplir le tableau d'images
    // condition for fill images array
    if (
      iterateObj.ancetre === 'data' &&
      iterateObj.chemin.includes('data>relationships>field') &&
      iterateObj.content === 'file--file'
    ) {
      //. -------------------------------------------------------------------------------------------------------------------------
      varImage.field_name = splitChemin(iterateObj.chemin);
    } else if (
      iterateObj.ancetre === 'data' &&
      //! attention le nom du champs système d'une image dans drupal doit commencer par field
      iterateObj.chemin.includes('data>relationships>field') &&
      iterateObj.key === 'id'
    ) {
      varImage.image_id = iterateObj.content;
    } else if (iterateObj.key === 'alt') {
      varImage.alt = iterateObj.content;
    } else if (iterateObj.key === 'title' && iterateObj.parent === 'meta') {
      varImage.title = iterateObj.content;
      varRelationshipsArray.push({ ...varImage });
    } else if (
      iterateObj.ancetre === 'included' &&
      iterateObj.parent === 'uri' &&
      iterateObj.key === 'url'
    ) {
      varImageIncluded.image_url = iterateObj.content;
    } else if (
      iterateObj.ancetre === 'included' &&
      iterateObj.key === 'id' &&
      iterateObj.parent !== 'data'
    ) {
      varImageIncluded.id = iterateObj.content;
    } else if (
      iterateObj.key === 'filemime' &&
      iterateObj.content.includes('image/')
    ) {
      varImageIncluded.isImage = true;
      includedArray.push({ ...varImageIncluded });
    }

    if (
      iterateObj.parent !== null ||
      iterateObj.key !== null
      //   // ||
      //   // iterateObj.content !== null
    )
      if (responseArray.length === 0) {
        //! -------------------------------------- FOR FILL THE ARRAY --------------------------------------
        // si response est vide, on le remplit
        // if responseArray is empty, we fill it
        setResponseArray((prevState) => [...prevState, iterateObj]);
      } else {
        // si response n'est pas vide, on le vide d'abord et on le remplit
        // if is not empty, we clear it and fill it
        setResponseArray([]);
        // Create async with setTimeout
        setTimeout(() => {
          setResponseArray((prevState) => [...prevState, iterateObj]);
        }, 100);
      }
    // -------------------------------------------------------- END OF LOOP  -------------------------------------------------------
  }

  // Ajoute l'image au tableau de relation
  // Add image url to relationships array
  varRelationshipsArray.forEach((relation) => {
    includedArray.forEach((include) => {
      if (relation.image_id === include.id) {
        relation.image_url = include.image_url;
        relation.isImage = include.isImage;
      }
    });
  });

  // ajoute le tableau de relation au tableau de réponse
  // add relationship array to at the end of response array
  setResponseArray((prevState) => [
    ...prevState,
    // si l'element est déjà présent on le l'ajoute pas
    // if the element is already present, we don't add it
    ...varRelationshipsArray
      .filter(
        (item) =>
          !prevState.some((prevItem) => prevItem.ancetre === item.field_name)
      )
      // on créer l'object avec le même format
      // create new object with same structure
      .map((element) => {
        return {
          ancetre: element.field_name,
          chemin: element.field_name,
          parent: element.image_id,
          isImage: element.isImage,
          key: 'id',
          alt: element.alt,
          title: element.title,
          content: element.image_url,
        };
      }),
  ]);
};

// const iterate = async (varJson, varParent, varAncetre, array, setArray) => {
//   for (let varKey in varJson) {
//     let iterateObj = {
//       ancetre: varAncetre,
//       // grandParent: varGrandParent,
//       parent: null,
//       key: null,
//       content: null,
//     };

//     if (typeof varJson[varKey] === 'object' && varJson[varKey] !== null) {
//       let varAncetreNew = varAncetre;
//       // let varCheminNew = varChemin;
//       // let varGrandParentNew = varGrandParent;
//       if (varAncetre === 'racine') {
//         varAncetreNew = varKey;
//         // varCheminNew = varKey;
//         // varGrandParentNew = varKey;
//       }
//       // else {
//       // varCheminNew = varCheminNew + '>' + varKey;
//       //   varGrandParent = varKey;
//       // }
//       iterate(varJson[varKey], varKey, varAncetreNew, array, setArray);
//     } else if (
//       typeof varJson[varKey] === 'string' ||
//       typeof varJson[varKey] === 'number' ||
//       typeof varJson[varKey] === 'boolean'
//     ) {
//       iterateObj.ancetre = varAncetre;
//       // iterateObj.chemin = varChemin;
//       // iterateObj.grandParent = varGrandParent;
//       iterateObj.parent = varParent;
//       iterateObj.key = varKey;
//       iterateObj.content = varJson[varKey];
//       // on remplit le logau response avec les données
//     }
//     if (
//       iterateObj.parent !== null ||
//       iterateObj.key !== null ||
//       iterateObj.content !== null
//     ) {
//       if (array.length === 0) {
//         // si response est vide, on l'initialise
//         setArray((prevState) => [...prevState, iterateObj]);
//       } else {
//         // sinon on vérifie si la clé existe déjà dans le logau
//         // si elle n'existe pas, on l'ajoute
//         setArray([]);
//         setTimeout(() => {
//           setArray((prevState) => [...prevState, iterateObj]);
//         }, 100);
//       }
//     }
//   }
// };

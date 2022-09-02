// const iterate = (paramObj) => {
//   //. initialisation du tableau vide
//   const emptyArray = [];
//   //. initialisation d'une variable qui sera incrémenté à tour de boucle
//   let index = 0;

//   //. on parcous l'objet avec une boucle forEach
//   Object.keys(paramObj).forEach((key) => {
//     //. on initialise une variable qui contiendra le type de la valeur et sa position
//     emptyArray[index] = [];
//     //. si l'objet est de type object et qu'il n'est pas vide
//     if (typeof paramObj[key] === 'object' && paramObj[key] !== null) {
//       const paramObj2 = paramObj[key];
//       //. on parcours l'objet avec une nouvelle boucle forEach
//       Object.keys(paramObj2).forEach((object) => {
//         //. on récupère la clé et la valeur de l'objet et on les sépare dans un nouvel objet
//         const obj = {
//           key: key ? key : null,
//           label: object,
//           content: paramObj2[object],
//         };
//         //. on ajoute l'objet dans le tableau
//         emptyArray[index].push(obj);
//         //. si obj.content est un objet et qu'il n'est pas vide
//         //. on boucle dessus pour récupérer les clés et les valeurs
//         if (
//           typeof obj.content === 'object' &&
//           obj.content !== null &&
//           obj.content !== null
//         ) {
//           const paramObj3 = obj.content;
//           Object.keys(paramObj3).forEach((object2) => {
//             const obj2 = {
//               key: object ? object : null,
//               label: object2,
//               content: paramObj3[object2],
//             };
//             emptyArray[index].push(obj2);
//             //. si obj.content est un objet et qu'il n'est pas vide
//             //. on boucle dessus pour récupérer les clés et les valeurs
//             if (
//               typeof obj2.content === 'object' &&
//               obj2.content !== null &&
//               obj2.content !== null
//             ) {
//               const paramObj3 = obj2.content;
//               Object.keys(paramObj3).forEach((object2) => {
//                 const obj2 = {
//                   key: object2 ? object2 : null,
//                   label: object2,
//                   content: paramObj3[object2],
//                 };
//                 emptyArray[index].push(obj2);
//               });
//             }
//           });
//         }
//       });
//     } else if (
//       //. si l'objet est de type string ou number
//       typeof paramObj[key] === 'string' ||
//       typeof paramObj[key] === 'number'
//     ) {
//       //. on rempli le tableau avec le type de la valeur et sa position
//       const obj = {
//         label: key,
//         content: paramObj[key],
//       };
//       emptyArray[index].push(obj);
//     }
//     //. on incrémente la variable index
//     index++;
//   });
//   //. on rempli la variable response avec le tableau initialisé au debut de la fonction
//   setResponse(emptyArray);
// };

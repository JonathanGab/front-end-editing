// import React, { useContext, useState } from 'react';
// import './DetailArticle.css';

// import { Drawer, DrupalForm, Button } from 'jonathan-formulaire';

// import { drupal_module } from '../config';
// import { JsonParserContext } from '../Contexts/JsonParserContext';
// import { DrawerContext } from '../Contexts/DrawerContext';

// export default function DetailArticle() {
//   const [filteredValue, setFilteredValue] = useState([]);
//   const [edit, setEdit] = useState({});
//   const { removeHtmlTags } = useContext(JsonParserContext);
//   const { handleOpen, getData, setGetData, open, setId, id } =
//     useContext(DrawerContext);

//   return (
//     <div className="detail-article">
//       <div className="btn-container">
//         <Button
//           onClick={() => {
//             handleOpen();
//             setId(`${getData.id}`);
//           }}
//         />
//       </div>
//       {/* <h1>{getData?.title?.rendered}</h1> */}
//       <h1>{getData?.attributes?.title}</h1>
//       <div>
//         <p>{removeHtmlTags(getData?.content?.rendered)}</p>
//       </div>
//       {getData && (

//       )}
//     </div>
//   );
// }

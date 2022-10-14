import { iterate } from './iterate';
import { iterateDrupal } from './iterateDrupal';

export const displayData = (varState, id, varData, setData) => {
  if (varState !== null && varState !== undefined && id !== null) {
    // iterate(varState, '', 'racine', 'gp', varData, setData);
    iterate(varState, '', 'racine', 'chemin', varData, setData);
  } else if (id === null) {
    setData([]);
  }
};
export const displayDataDrupal = (varState, id, varData, setData) => {
  if (varState !== null && varState !== undefined && id !== null) {
    iterateDrupal(varState, '', 'racine', 'chemin', varData, setData);
  } else if (id === null) {
    setData([]);
  }
};

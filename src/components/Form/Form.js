import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { wordpress_module } from '../../config';
import { DrawerContext } from '../../Contexts/DrawerContext';
import { JsonParserContext } from '../../Contexts/JsonParserContext';
import NumberInput from '../Inputs/NumberInput';
import TextInput from '../Inputs/TextInput';
import SelectInput from '../Inputs/SelectInput';
import { iterate } from 'dixea-json-parser';
import './Form.css';
export default function Form() {
  //. STATE
  const [apiResponse, setApiResponse] = useState([]);
  const [tabInput, setTabInput] = useState([]);
  const [drawerData, setDrawerData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  //. CONTEXTS

  const { removeHtmlTags } = useContext(JsonParserContext);
  const { open, id } = useContext(DrawerContext);
  //. PARAMS
  const { paramsId } = useParams();
  //. FETCH DATA

  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost/module/wp-json/wp/v2/maison/${paramsId}`
        );
        setApiResponse(response?.data);
      } catch (err) {
        console.error(err);
      }
    };
    getDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(
        `http://localhost/module/wp-json/wp/v2/maison/${paramsId}`,
        tabInput,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open === false && id === null) {
      setDrawerData([]);
    } else {
      axios
        // .get(`http://localhost/drupalSite/jsonapi/node/article/${id}`)
        .get(`http://localhost/module/wp-json/wp/v2/${id}`)
        // .then((response) => setDrawerData(response.data.data))
        .then((response) => setDrawerData(response.data))
        .catch((err) => console.log(err));
    }
  }, [open]);

  useEffect(() => {
    if (drawerData !== null && drawerData !== undefined && id !== null) {
      iterate(drawerData, '', 'racine', parsedData, setParsedData);
    } else if (id === null) {
      setParsedData([]);
    }
  }, [drawerData]);

  return parsedData ? (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {parsedData
          ?.filter(
            (element) =>
              wordpress_module.filter.includes(element?.ancetre) &&
              wordpress_module.filter.includes(element?.key)
          )
          ?.map((item, i) => (
            <div key={i}>
              {typeof item?.content === 'string' ? (
                <div className="input-margin">
                  <TextInput
                    defaultValue={removeHtmlTags(item?.content)}
                    label={item.key === 'rendered' ? item?.ancetre : item?.key}
                    name={item?.ancetre}
                    onChange={(e) => {
                      setTabInput(
                        item?.ancetre === 'acf'
                          ? {
                              ...tabInput,
                              [item.ancetre]: { [item?.key]: e.target.value },
                              status: 'darft',
                            }
                          : {
                              ...tabInput,
                              [item?.ancetre]: e.target.value,
                              status: 'draft',
                            }
                      );
                    }}
                  />
                </div>
              ) : typeof item?.content === 'number' ? (
                <div className="input-margin">
                  <NumberInput
                    defaultValue={removeHtmlTags(item?.content)}
                    label={item.key === 'rendered' ? item?.ancetre : item?.key}
                    name={item?.ancetre}
                    onChange={(e) => {
                      setTabInput(
                        item?.ancetre === 'acf'
                          ? {
                              ...tabInput,
                              [item.ancetre]: { [item?.key]: e.target.value },
                              status: 'darft',
                            }
                          : {
                              ...tabInput,
                              [item?.ancetre]: e.target.value,
                              status: 'draft',
                            }
                      );
                    }}
                  />
                </div>
              ) : typeof item?.content === 'boolean' ? (
                <div className="input-margin">
                  <SelectInput
                    inputLabel={item?.key}
                    label={item?.key}
                    value={item?.content}
                  />
                </div>
              ) : null}
            </div>
          ))}
        <div className="form-btn">
          <button className="btn-send">send</button>
        </div>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

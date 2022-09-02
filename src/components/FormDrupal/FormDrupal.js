import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TextInput from '../Inputs/TextInput';
import { useParams } from 'react-router-dom';
import { drupal_module } from '../../config';
import { JsonParserContext } from '../../Contexts/JsonParserContext';
import SelectInput from '../Inputs/SelectInput';
export default function FormDrupal() {
  //. STATE

  // eslint-disable-next-line no-unused-vars
  const [apiResponseFr, setApiResponseFr] = useState([]);
  const [apiResponseEn, setApiResponseEn] = useState([]);
  const [input, setInput] = useState([]);
  const [label, setLabel] = useState({});
  //. CONTEXTS
  const { response, iterate, removeHtmlTags } = useContext(JsonParserContext);
  //. PARAMS
  const { id } = useParams();

  //. FETCH DATA
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost/drupalSite/jsonapi/node/article/${id}`
        );
        setApiResponseFr(await response?.data?.data);
        setLabel('');
      } catch (err) {
        console.error(err);
      }
    };
    getDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const getDataFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost/drupalSite/en/jsonapi/node/article/${id}`
        );
        setApiResponseEn(await response?.data?.data);
        setLabel('');
      } catch (err) {
        console.error(err);
      }
    };
    getDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //. PATCH DATA
  const handleInputsChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(
      name === 'attributes'
        ? {
            data: {
              type: 'node--article',
              id: `${id}`,
              ...input,
              [name]: { [label]: value },
            },
          }
        : {
            data: {
              type: 'node--article',
              id: `${id}`,
              ...input,
              [name]: value,
            },
          }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.patch(
        `http://localhost/drupalSite/jsonapi/node/article/${id}`,
        input,
        {
          headers: {
            Authorization: 'Basic ' + window.btoa(`apiuser:Vavaskale69!`),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
    } catch (err) {
      console.error({ message: err });
    }
  };

  return response ? (
    <div>
      <div>
        <button onClick={() => iterate(apiResponseEn, '', 'racine')}>
          Load
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {response
          ?.filter(
            (element) =>
              drupal_module.filter.includes(element?.ancetre) &&
              drupal_module.filter.includes(element?.key)
          )
          ?.map((item, i) => (
            <div key={i}>
              {typeof item?.content === 'string' ? (
                <TextInput
                  defaultValue={removeHtmlTags(item?.content)}
                  label={item.key ? item?.key : item?.label}
                  name={item.key ? item?.key : item?.label}
                  onChange={(e) => {
                    setLabel(item?.label);
                    handleInputsChange(e);
                  }}
                />
              ) : typeof item?.content === 'boolean' ? (
                <SelectInput
                  inputLabel={item?.key}
                  label={item?.key}
                  value={item?.content}
                />
              ) : null}
            </div>
          ))}
        <button>send</button>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

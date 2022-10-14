import React, { useState, useEffect, useContext } from 'react';
import ButtonEdit from '../components/Button/ButtonEdit';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
import { wordpress_module } from '../config';
import Form from '../components/Form/Form';
import Drawer from '../components/Drawer/Drawer';
//import { Button, Drawer, WordPressForm } from 'jonathan-formulaire';
export default function ArticlesWP() {
  const [responseFetch, setResponseFetch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //------------------------------------------- CONTEXT //-------------------------------------------
  const { removeHtmlTags } = useContext(JsonParserContext);
  const { setId, handleOpen, id, setGetId, getId, isPreview, formValues } =
    useContext(DrawerContext);

  //------------------------------------------- PACKAGE -------------------------------------------
  const [varData, setVarData] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);

  const [edit, setEdit] = useState({});
  const [uploadId, setUploadId] = useState();
  const [mediaId, setMediaId] = useState();
  useEffect(() => {
    // si un token est stocké dans le local storage, on le récupère
    const token = localStorage.getItem('token');
    if (token) {
      const getToken = () => {
        axios
          .post(
            `${wordpress_module.url_token_module}`,
            {
              username: 'Jonathan',
              password: 'Vavaskale69!',
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            }
          )
          .then((res) => {
            localStorage.setItem('token', res.data.token);
          })
          .catch((err) => console.error(err));
      };
      getToken();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost/module/wp-json/wp/v2/maison`
        );
        setResponseFetch(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   try {
  //     axios.patch(`http://localhost/module/wp-json/wp/v2/${id}`, edit, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setMediaId('');
  //     setUploadId('');
  //   }
  // };
  //-------------------------------- CONSOLE.LOG --------------------------------
  console.log('fv', formValues);
  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      {isPreview && <p className="">preview mode</p>}
      {responseFetch.map((item, index) => (
        <div key={index}>
          <h1>
            {isPreview && item?.id === getId
              ? formValues?.title
              : item?.title?.rendered}
          </h1>
          <div>
            {removeHtmlTags(
              isPreview && item?.id === getId
                ? formValues?.content
                : item?.content?.rendered
            )}
          </div>
          {/* package */}
          <div style={{ position: 'relative' }}>
            {/* component */}
            <ButtonEdit
              onClick={() => {
                setId(`maison/${item.id}`);
                setGetId(item.id);
                handleOpen();
              }}
            />
          </div>
        </div>
      ))}
      <Drawer formOne={<Form />} />
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
// import { Button, Drawer, DrupalForm } from 'jonathan-formulaire';
import { drupal_module, style } from '../config';
import FormDrupal from '../components/FormDrupal/FormDrupal';
import ButtonEdit from '../components/Button/ButtonEdit';
import Drawer from '../components/Drawer/Drawer';
export default function ArticlesDrupal() {
  const [getData, setGetData] = useState([]);
  const [edit, setEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setId, handleOpen, id, getId, setGetId, isPreview, formValues } =
    useContext(DrawerContext);
  const { removeHtmlTags } = useContext(JsonParserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.patch(
        `http://localhost/drupalSite/jsonapi/node/article/${id}`,
        { data: edit },
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost/drupalSite/jsonapi/node/article`)
      .then((response) => {
        setGetData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // ------------------------------------------- CONSOLE LOG -------------------------------------------
  // console.log('getData', getData);
  // console.log(formValues);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {isPreview && <p className="">preview mode</p>}
      {getData?.map((item) => (
        // {getData?.map((item) => (
        <>
          <h1>
            {isPreview && item?.id === getId
              ? formValues?.title
              : item?.attributes?.title}
          </h1>
          <p>
            {isPreview && item?.id === getId
              ? formValues?.body
              : removeHtmlTags(item?.attributes?.body?.value)}
          </p>
          {/* <Button
            top={16}
            right={32}
            color={'#000'}
            onClick={() => {
              setId(`${item.id}`);
              handleOpen();
            }}
          /> */}
          <div style={{ position: 'relative' }}>
            {/* component */}
            <ButtonEdit
              onClick={() => {
                setId(item.id);
                setGetId(item.id);
                handleOpen();
              }}
            />
          </div>
        </>
      ))}
      <Drawer formOne={<FormDrupal />} width={50 + '%'} />

      {/* <Drawer
        open={open}
        onClick={() => {
          handleOpen();
        }}
        width={style.drawer_width}
        formOne={
          <DrupalForm
            emptyArray={array}
            onSubmit={handleSubmit}
            inputDataObject={edit}
            setInputDataObject={setEdit}
            //. iterate function() start
            dataBeforeIterate={filteredValue.data}
            id={id}
            dataAfterIterate={array}
            seDataAfterIterate={setArray}
            //. iterate function() end
            //. displayData start
            open={open}
            setDataBeforeIterate={setFilteredValue}
            url={`http://localhost/drupalSite/jsonapi/node/article/${id}`}
            //. displayData end
            ancetre={array.ancetre}
            key={array.key}
            drupal_module_filter={drupal_module.filter}
          />
        }
      /> */}
    </div>
  );
}

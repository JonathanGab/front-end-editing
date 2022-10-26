import React, { useState, useEffect, useContext } from 'react';
import { Button, Drawer, WordPressForm } from 'jonathan-formulaire';
import axios from 'axios';
import { DrawerContext } from '../Contexts/DrawerContext';
import { JsonParserContext } from '../Contexts/JsonParserContext';
import { wordpress_module } from '../config';
export default function ArticlePackage() {
  const [responseFetch, setResponseFetch] = useState([]);
  const [varData, setVarData] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [edit, setEdit] = useState({});
  const [uploadId, setUploadId] = useState();
  const [mediaId, setMediaId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //------------------------------------------- CONTEXT //-------------------------------------------
  const { removeHtmlTags } = useContext(JsonParserContext);
  const {
    setId,
    handleOpen,
    open,
    id,
    setGetId,
    getId,
    isPreview,
    handlePreview,
    CloseDrawer,
  } = useContext(DrawerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.patch(`http://localhost/module/wp-json/wp/v2/${id}`, edit, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setMediaId('');
      setUploadId('');
    }
  };

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
  // console.log(edit);
  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      {isPreview && <p className="">preview mode</p>}
      {responseFetch.map((item, index) => (
        <div key={index}>
          {/*  */}

          <h1>
            {isPreview && item?.id === getId
              ? edit.title
              : item?.title?.rendered}
          </h1>
          <div>
            {removeHtmlTags(
              isPreview && item?.id === getId
                ? edit.content
                : item?.content?.rendered
            )}
          </div>
          {/* package */}
          <div style={{ position: 'relative' }}>
            <Button
              position={'absolute'}
              top={0}
              right={20}
              color="#000"
              onClick={() => {
                setId(`maison/${item.id}`);
                setGetId(item.id);
                handleOpen();
              }}
            />
          </div>
        </div>
      ))}

      <Drawer
        open={open}
        onClick={() => {
          CloseDrawer();
        }}
        width={50 + '%'}
        formOne={
          <WordPressForm
            emptyArray={varData}
            formValues={edit}
            setFormValues={setEdit}
            // displayData()
            dataBeforeIterate={filteredValues}
            id={id}
            dataAfterIterate={varData}
            seDataAfterIterate={setVarData}
            //------------------------
            ancetre={varData.ancetre}
            wordpress_module_filter={wordpress_module.filter}
            key={varData.key}
            onPatchData={handleSubmit}
            custom_fields={wordpress_module.custom_fields}
            // fetchData()
            open={open}
            setDrawerData={setFilteredValues}
            urlBack={`${wordpress_module.url_website_back}${id}`}
            draft={wordpress_module.draft}
            // upload()
            uploadId={uploadId}
            setUploadId={setUploadId}
            mediaId={mediaId}
            setMediaId={setMediaId}
            // preview()
            onClickPreview={handlePreview}
          />
        }
      />
    </div>
  );
}

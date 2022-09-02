import React, { useEffect, useState, useContext } from 'react';
import './DetailArticle.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Form from '../components/Form/Form';
import { Drawer } from 'dixea-drawer';
import ButtonEdit from '../components/Button/ButtonEdit';

import { JsonParserContext } from '../Contexts/JsonParserContext';
import { DrawerContext } from '../Contexts/DrawerContext';

export default function DetailArticle() {
  const { id } = useParams();
  const { removeHtmlTags, iterate } = useContext(JsonParserContext);
  const { handleOpen, getData, setGetData, open, setId } =
    useContext(DrawerContext);

  useEffect(() => {
    axios
      .get(`http://localhost/module/wp-json/wp/v2/maison/${id}`)
      .then((res) => setGetData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="detail-article">
      <div className="btn-container">
        <ButtonEdit
          onClick={() => {
            handleOpen();
            setId(`maison/${getData.id}`);

            iterate(getData, '', 'racine');
          }}
        />
      </div>
      <h1>{getData?.title?.rendered}</h1>
      <div>
        <p>{removeHtmlTags(getData?.content?.rendered)}</p>
      </div>
      {getData && (
        <Drawer
          open={open}
          onClick={handleOpen}
          formOne={<Form />}
          formTwo={<Form />}
        />
      )}
    </div>
  );
}

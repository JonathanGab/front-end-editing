import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';
import Upload from '../upload/Upload';
import TextField from '@mui/material/TextField';

export default function ModalDrupal(props) {
  const [medias, setMedias] = useState([]);
  const [files, setFiles] = useState(null);
  useEffect(() => {
    axios
      .get('http://localhost/drupalSite/jsonapi/file/file')
      .then((res) => setMedias(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // DRAG AND DROP
  const postImage = async (e) => {
    e.preventDefault();
    try {
      const document = await axios.post(
        'http://localhost/drupalSite/jsonapi/node/article/ ' + props.chemin_url,
        files,
        {
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'file; filename="test.png"',
            Authorization: 'Basic ' + window.btoa(`apiuser:Vavaskale69!`),
          },
        }
      );
      await props.setUploadId(document.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={props.open ? 'mod_open_container' : 'mod_close_container'}>
      <div className="modal">
        <div className="mod_padding">
          <div className="close_btn">
            <div className="mod_close_btn" onClick={props.onClick}>
              x
            </div>
          </div>
          <div className="mod_header">
            <div>
              <h1>Sélectionnez un média</h1>
            </div>
            <div className="mod_filter_search">
              <button>Filtre</button> <input type="text" />
            </div>
          </div>
          <div className="mod_wrapper">
            <div className="mod_direction">
              <div className="mod_grid">
                {medias?.map((varItem) => (
                  <div
                    className="mod_box"
                    key={varItem.id}
                    onClick={() => console.log()}
                  >
                    <img
                      src={`http://localhost${varItem?.attributes?.uri?.url}`}
                      alt=""
                      className="mod_img"
                      onClick={() => props.setMediaId(varItem.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mod_btn_send">
              <button onClick={props.onClick} className="btn_send">
                Valider
              </button>
            </div>
            <div className="divider">
              <div className="divider_text">OU</div>
            </div>
            <div className="mod_upload_container">
              <h1>Uploader un média</h1>
              <div className="mod_upload_block">
                <div className="mod_upload_left">
                  <Upload files={files} setFiles={setFiles} />
                </div>
                <div className="mod_upload_right">
                  <div className="mod_update_input">
                    <TextField
                      id="outlined-name"
                      label="alt"
                      value={props.altText}
                      onChange={(e) => props.setAltText(e.target.value)}
                    />
                  </div>
                  <div className="mod_update_input">
                    <TextField
                      id="outlined-name"
                      label="legend"
                      onChange={(e) => props.setTitle(e.target.value)}
                      value={props.title}
                    />
                  </div>
                </div>
              </div>
              <div className="mod_btn_send">
                <button
                  className="btn_send"
                  onClick={(e) => {
                    postImage(e);
                    props.onClick();
                  }}
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

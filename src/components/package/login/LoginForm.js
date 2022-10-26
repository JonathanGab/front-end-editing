import React, { useState, useContext } from 'react';
import './loginForm.css';
import { DrawerContext } from '../../../Contexts/DrawerContext';
import axios from 'axios';
import bcrypt from 'bcryptjs';
export default function LoginForm() {
  const { setEmail, setPassword, setAuthId, email, password } =
    useContext(DrawerContext);
  const salt = bcrypt.genSaltSync(10);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const hadhPassword = bcrypt.hashSync(password, salt);
      const res = await axios.post(
        'http://localhost/drupalSite/jsonapi/node/article',
        {
          data: {
            type: 'node--article',
            attributes: {
              title: 'test auth',
            },
            status: false,
          },
        },
        {
          headers: {
            Authorization: 'Basic ' + window.btoa(`${email}:${password}`),
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        }
      );
      // setPassword(hadhPassword);
      setAuthId(res.data?.data?.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form_box" onSubmit={handleLogin}>
      <div className="form_login">
        <div className="form_title">
          <h2 className="form_header">Connectez-vous</h2>
        </div>
        <div className="form_body">
          <div className="form_input_margin">
            <label className="">Email</label>
            <input
              type="text"
              className="form_email_input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form_input_margin">
            <label className="">Password</label>
            <input
              type="password"
              className="form_password_input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form_btn_container">
            <button className="form_btn">Connexion</button>
          </div>
        </div>
      </div>
    </form>
  );
}

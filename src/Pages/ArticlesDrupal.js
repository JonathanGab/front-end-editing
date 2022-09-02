import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ArticlesDrupal() {
  const [getData, setGetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost/drupalSite/jsonapi/node/article`)
      .then((response) => {
        setGetData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      {getData.map((item) => (
        <Link to={`/article/drupal/${item.id}`}>
          <h1>{item.id}</h1>
        </Link>
      ))}
    </div>
  );
}

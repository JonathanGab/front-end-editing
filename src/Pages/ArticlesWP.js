import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { JsonParserContext } from '../Contexts/JsonParserContext';

export default function ArticlesWP() {
  const [responseFetch, setResponseFetch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { removeHtmlTags } = useContext(JsonParserContext);

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

  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      {responseFetch.map((item) => (
        <Link to={`/detail-article/${item.id}`}>
          <h1>{item?.title?.rendered}</h1>
          <div>{removeHtmlTags(item?.content?.rendered)}</div>
        </Link>
      ))}
    </div>
  );
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticlesWP from './Pages/ArticlesWP';
import ArticlesDrupal from './Pages/ArticlesDrupal';
import Form from './components/Form/Form';
import FormDrupal from './components/FormDrupal/FormDrupal';
import DetailArticle from './Pages/DetailArticle';
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesWP />} />
      <Route path="/drupal" element={<ArticlesDrupal />} />
      <Route path="/article/:id" element={<Form />} />
      <Route path="/article/drupal/:id" element={<FormDrupal />} />
      <Route path="/detail-article/:id" element={<DetailArticle />} />
    </Routes>
  );
}

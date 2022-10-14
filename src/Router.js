import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ArticlesWP from './Pages/ArticlesWP';
import ArticlesDrupal from './Pages/ArticlesDrupal';
// import Form from './components/Form/Form';
// import FormDrupal from './components/FormDrupal/FormDrupal';
import DetailArticle from './Pages/DetailArticle';
import ArticlePackage from './Pages/ArticlePackage';
import ArticlePackageDrup from './Pages/ArticlePackageDrup';

import TestJS from './Pages/TestJS';
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ArticlesWP />} />
      <Route path="/package" element={<ArticlePackage />} />
      <Route path="/drupal-npm" element={<ArticlePackageDrup />} />
      <Route path="/drupal" element={<TestJS />} />
      {/* <Route path="/article/:id" element={<Form />} /> */}
      {/* <Route path="/article/drupal/:id" element={<DetailArticle />} /> */}
      {/* <Route path="/detail-article/:id" element={<DetailArticle />} /> */}
    </Routes>
  );
}

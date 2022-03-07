import React from 'react';
import { render } from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CourseDetail } from './components/CourseDetail';
// import your route components too

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="courses">
        <Route path=":courseId" element={<CourseDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

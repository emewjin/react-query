import React from 'react';
import { render } from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

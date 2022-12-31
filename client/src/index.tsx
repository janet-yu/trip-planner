import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from 'react-router-dom';
import PlanTripPage from './screens/PlanTrip';
import { Theme } from './Theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<App />} />
      <Route path="plan-trip" element={<PlanTripPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

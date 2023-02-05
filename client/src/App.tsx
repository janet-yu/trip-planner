import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import './App.css';
import LoginPage from './screens/LoginPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import PlanTripPage from './screens/PlanTrip';
import TripPage from './screens/Trip';
import { Theme } from './Theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<LoginPage />} />
      <Route path="plan-trip" element={<PlanTripPage />} />
      <Route path="trip/:id" element={<TripPage />} />
    </Route>
  )
);
const queryClient = new QueryClient();
function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;

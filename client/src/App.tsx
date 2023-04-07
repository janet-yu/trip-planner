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
import { AuthProvider } from './context/AuthProvider';
import PlanTripPage from './screens/PlanTrip';
import TripPage from './screens/Trip';
import { Theme } from './Theme';
import ProtectedLayout from './components/ProtectedLayout';
import Home from './screens/Home';
import UpcomingTrips from './screens/UpcomingTrips';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvider />}>
      <Route path='login' element={<LoginPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='trip/:id' element={<TripPage />} />
        <Route path='upcoming-trips' element={<UpcomingTrips />} />
        <Route path='plan-trip' element={<PlanTripPage />} />
      </Route>
    </Route>
  )
);
const queryClient = new QueryClient();

function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Theme>
  );
}

export default App;

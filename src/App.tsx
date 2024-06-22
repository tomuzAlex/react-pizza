import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layout/MainLayout.tsx';
import Home from './pages/Home.tsx';

import './scss/root/app.scss';
import { selectCart } from './redux/slices/cartSlice.ts';
import { useSelector } from 'react-redux';

const Cart = React.lazy(() => import('./pages/Cart/index.tsx'));
const NotFound = React.lazy(() => import('./pages/NotFoundBlock/index.tsx'));
const FullPizza = React.lazy(() => import('./pages/FullPizza.tsx'));

function App() {
  const { totalPrice, items } = useSelector(selectCart);
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="cart" element={<Suspense fallback={<div>Loading...</div>}><Cart totalPrice={totalPrice} items={items} /></Suspense>} />
        
        <Route path="pizza/:id" element={<Suspense fallback={<div>Loading...</div>}><FullPizza /></Suspense>} />
        
        <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
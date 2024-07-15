import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';



import Loader from '../components/Global/Loader';
import LoginPage from '../pages/LoginPage';
import SecurityConfigutation from '../components/Global/secuirtyConfiguration';
import NavbarPage from '../pages/navbar';
import Product from '../components/ManageProducts';



const CartPage = lazy(() => import('../pages/cart'));
const CheckOutPage = lazy(() => import('../pages/checkOut'));
const ProductListingPage = lazy(() => import('../pages/productListing'));
const ProductDetailsPage = lazy(() => import('../pages/productDetails'));



const SuspenseWrapper = ({ children }: { children: JSX.Element}) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

 const router = createBrowserRouter([
  {
    element: <SecurityConfigutation />,
    children: [
      {
        path: '/login',
        element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
      },
      {
        element:<NavbarPage/>,
        children: [
          {
            index: true,
            element: <SuspenseWrapper><ProductListingPage /></SuspenseWrapper>,
          },
        {
          path: 'products',
          children: [
            {
              index: true,
              element: <SuspenseWrapper><ProductListingPage /></SuspenseWrapper>,
            },
            {
              path: ':productId',
              element:<SuspenseWrapper><ProductDetailsPage /></SuspenseWrapper>,
            },
          ],
  
        },
        {
          path: 'manageProducts',
          element: <SuspenseWrapper><Product /></SuspenseWrapper>,
        },
        {
          path: 'cart',
          element: <SuspenseWrapper><CartPage /></SuspenseWrapper>,
        },
       {
          path:'/checkout',
          element: <SuspenseWrapper><CheckOutPage /></SuspenseWrapper>,
       },
      ],
      },
      //not fount page route
],
  }
]);

export default router


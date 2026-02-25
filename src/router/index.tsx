import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/Routes/ProtectedRoute';
import UnprotectedRoute from '../components/Routes/UnprotectedRoute';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="products" replace />,
    },
    {
        path: '/login',
        element: (
            <UnprotectedRoute needsRedirect>
                <LoginPage />
            </UnprotectedRoute>
        ),
    },
    {
        path: '/products',
        element: (
            <ProtectedRoute>
                <ProductsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './utilities/PrivateRoutes';
import { AdminProvider } from './contexts/AdminContext';
import { AdminRoute } from './utilities/AdminRoute';

import ScrollToTop from './components/ScrollToTop'
import Header from './components/Header';
import Footer from './components/Footer';

import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ProductDetail from './views/ProductDetail';
import SignInView from './views/SignInView';
import LogInView from './views/LogInView';

import SignInToAdmin from './views/admin/SignInToAdmin';
import AdminView from './views/admin/AdminView';
import ListOfProductsView from './views/admin/ListOfProductsView';
import AddCamisetaView from './views/admin/AddCamisetaView';
import EditCamisetaView from './views/admin/EditCamisetaView';
import AddPrendaView from './views/admin/AddPrendaView';
import EditPrendaView from './views/admin/EditPrendaView';

import NotFound from './views/NotFound';

function App() {
  return (
    <>
      <ScrollToTop />

        <AuthProvider>
        <AdminProvider>
          <Header />
          <Routes>
            <Route path="/"                        element={ <HomeView /> } />
            <Route path="/products"                element={ <ProductsView /> } />
            <Route path="/product/:id"             element={ <ProductDetail /> } />
            <Route path="/sign-in"                 element={ <SignInView /> } />
            <Route path="/log-in"                  element={ <LogInView /> } />

            <Route path="/sign-in/to-admin"        element={ <SignInToAdmin /> } />

            <Route path="/admin"                   element={ <AdminRoute> <AdminView /> </AdminRoute>} />
            <Route path="/admin/products_list"     element={ <AdminRoute> <ListOfProductsView /> </AdminRoute>} />
            <Route path="/admin/add_camiseta"      element={ <AdminRoute> <AddCamisetaView /> </AdminRoute>} />
            <Route path="/admin/product_edit/:id"  element={ <AdminRoute> <EditCamisetaView /> </AdminRoute>} />
            <Route path="/admin/add_prenda"        element={ <AdminRoute> <AddPrendaView /> </AdminRoute>} />
            <Route path="/admin/prenda_edit/:id"   element={ <AdminRoute> <EditPrendaView /> </AdminRoute>} />

            <Route path="*"                        element={ <NotFound />} />
          </Routes>
        </AdminProvider>
        </AuthProvider>
      <Footer />
    </>
  );
}

export default App
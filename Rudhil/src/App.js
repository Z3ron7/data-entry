import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import CustomerEntry from "./pages/CustomerEntry";
import CustomerInsured from "./pages/CustomerInsured";
import Coverage from "./pages/Coverage";
import Transaction from "./pages/Transaction";
import Login from "./buttons/Login";
import Signup from "./buttons/Signup";
import Sidebar from "./component/Sidebar";
import Home from "./pages/Home";
import ProdList from "./pages/ProdList";
import InsuredList from "./pages/InsuredList";
import ProdUpdate from "./component/ProdUpdate";
import InsuredUpdate from "./component/InsuredUpdate";
import TransacUpdate from "./pages/TransacUpdate";
import Logout from "./buttons/Logout";

// Layout component with Sidebar and Navbar
const MainLayout = ({ children }) => (
  <div className="container-fluid bg-light min-vh-100">
    <div className="row">
    <div className="col-2 bg-white vh-100 position-fixed">
      <Sidebar />
    </div>
    <div className="col-2"></div>
      <div className="col" style={{height: "45px"}}>
      <Home />
      </div>
    </div>
    {children}
  </div>
);

// Layout component without Sidebar and Navbar
const EmptyLayout = ({ children }) => <div>{children}</div>;

// Custom protected route component

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
  };

  return (
    <Routes>
      <Route path="/signup" element={<EmptyLayout><Signup /></EmptyLayout>} />
      <Route path="/" element={<EmptyLayout><Login /></EmptyLayout>} />
      <Route path="/logout" element={<EmptyLayout><Logout /></EmptyLayout>} />

      <Route
        path="/customer-entry"
        element={isAuthenticated() ? <MainLayout><CustomerEntry /></MainLayout> : <Navigate to="/customer-entry" replace />}
      />
      <Route
        path="/customerInsured"
        element={isAuthenticated() ? <MainLayout><CustomerInsured /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/coverage"
        element={isAuthenticated() ? <MainLayout><Coverage /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/transaction"
        element={isAuthenticated() ? <MainLayout><Transaction /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/productList"
        element={isAuthenticated() ? <MainLayout><ProdList /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/insuredList"
        element={isAuthenticated() ? <MainLayout><InsuredList /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/ProdUpdate"
        element={isAuthenticated() ? <MainLayout><ProdUpdate /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/prodUpdate/:id"
        element={isAuthenticated() ? <MainLayout><ProdUpdate /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/InsuredUpdate"
        element={isAuthenticated() ? <MainLayout><InsuredUpdate /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/InsuredUpdate/:id"
        element={isAuthenticated() ? <MainLayout><InsuredUpdate /></MainLayout> : <Navigate to="/" replace />}
      />
      <Route
        path="/TransacUpdate"
        element={isAuthenticated() ? <MainLayout><TransacUpdate /></MainLayout> : <Navigate to="/" replace />}
      /> 
      <Route
        path="/TransacUpdate/:id"
        element={isAuthenticated() ? <MainLayout><TransacUpdate /></MainLayout> : <Navigate to="/" replace />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
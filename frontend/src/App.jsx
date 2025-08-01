import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import UserProvider from './context/UserContext';
import { Toaster } from "react-hot-toast";
import { useOfflineManager } from './hooks/useOfflineManager';
import PWAInstallButton from './components/PWAInstallButton';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <AppContent />
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px"
          },
        }}
      />
    </UserProvider>
  )
}

const AppContent = () => {
  const { isOnline, pendingActions } = useOfflineManager();
  
  return (
    <>
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-orange-500 text-white text-center py-2 px-4">
          <span className="text-sm">
            Voce esta offline. {pendingActions.length > 0 && `${pendingActions.length} changes will sync when online.`}
          </span>
        </div>
      )}
      
      {/* PWA Install Button - Show on login/signup pages */}
      
      
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<SignUp />} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/income" exact element={<Income />} />
        <Route path="/expense" exact element={<Expense />} />
      </Routes>
    </>
  );
};

export default App

const Root = () => {
  //Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  );
};
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard, Home, PrivateRoute, AuthWrapper, Error } from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;

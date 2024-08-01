import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotificationSystem from './components/NotificationSystem';
import ViewNotification from './components/ViewNotification';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NotificationSystem />} />
          <Route path="/view/:id" element={<ViewNotification />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

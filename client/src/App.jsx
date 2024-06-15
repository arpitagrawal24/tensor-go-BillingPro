import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Error from './Pages/error/Error';
import Login from './Pages/login/Login';
import Navbar from './Pages/navbar/Navbar';
import DarkState from './context/dark/DarkState';
import Dashboard from './Pages/dashboard/Dashboard';
import InvoiceState from './context/invoice/InvoiceState';

function App() {
  return (
    <Router>
      <DarkState>
        <InvoiceState>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </InvoiceState>
      </DarkState>
    </Router>
  );
}

export default App;

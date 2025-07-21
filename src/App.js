import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dasboard';
import Login from './pages/login';
import FileUploads from './pages/fileUploads';
import ViewFile from './pages/ViewFile';
import Customer from './pages/Customer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/file-uploads" element={<FileUploads />} />
        <Route path="/view-file" element={<ViewFile />} />
         <Route path="/customer-data" element={<Customer />} />
      </Routes>
    </div>
  );
}

export default App;

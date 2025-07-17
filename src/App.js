import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dasboard';
import Login from './pages/login';
import FileUploads from './pages/fileUploads';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/file-uploads" element={<FileUploads />} />
      </Routes>
    </div>
  );
}

export default App;

 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import {Dashboard,Landing,Register,Error} from './pages';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<div><Dashboard/></div>} ></Route>
            <Route path="/register" element={<div><Register/></div>} ></Route>
            <Route path="/landing" element={<div><Landing/></div>}></Route>
            <Route path="*" element={<div><Error/></div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

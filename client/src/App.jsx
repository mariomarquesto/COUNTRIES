import './App.css';
import { Routes, Route,  useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './views/Home/Home';
import Landing from './views/Landing/Landing';
import Form from './views/Form/Form';
import Detail from './views/Detail/Detail';
import Error404 from './components/Error404';
import Card from './components/Card/Card';


function App() {
  const { pathname } = useLocation()
  return (
    <div className="App">

{ pathname !== '/' && <NavBar/> }
      <Routes>
     

        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route path="/countries/:id" element={<Detail />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import Header from './side-bars/header';
import Footer from './side-bars/footer';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element ={<Home/>}></Route>
      </Routes>
      <Footer/>
    </Router>
  );  
}

export default App;

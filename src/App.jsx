import logo from './logo.svg';
import './App.css';
import Navbar from "./components/navbar"
import Movies from './components/movies';
import { Route, Routes } from 'react-router-dom';
import MovieFrom from './components/movieFrom';
import Customer from './components/customer';
import Rentals from './components/rentals';
import RegisterForm from "./components/registerForm" 
import NotFound from './components/notFound';
import LoginFrom from './components/loginForm';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <main className='container'>
        <Routes>
          <Route path="/" element={<Movies/>} />
          <Route path="/:id" element={<MovieFrom/>} />
          <Route path="/customers" element={<Customer/>} />
          <Route path="/rentals" element={<Rentals/>} />
          <Route path="/login" element={<LoginFrom/>} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

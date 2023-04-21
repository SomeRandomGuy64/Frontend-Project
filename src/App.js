import './App.css';
import Header from "./components/Header";
import Review from "./components/Review";
import ReviewList from './components/ReviewList';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header/>

        <Routes>
          <Route path='/' element={<ReviewList/>}/>
          <Route path='/reviews' element={<ReviewList/>}/>
          <Route path='/reviews/:review_id' element={<Review/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

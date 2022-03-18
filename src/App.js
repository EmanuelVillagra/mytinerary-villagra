import './App.css';
import Indecs from './pages';
import Cities from './pages/cities'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import InConstruction from './components/inConstruction';
import DetailPage from './pages/cardDetails';
import SignUp from './components/SignUp/signup'
import SignIn from './components/SignUp/signin'

const App = () => {

  return (
    <div className='App'>
      <BrowserRouter >

      <Routes>
        <Route path='/' element={<Indecs/>}/>
        <Route path='*' element={<InConstruction/>}/>
        <Route path='/cities' element={<Cities/>} />
        <Route path='/cities/detail/:_id' element={<DetailPage/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        
      </Routes>
      
      
      
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Error404 from './components/Error404';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alert/AlertState';
import Alert from './components/Alert';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <NoteState>
        <AlertState>
          <Alert />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/home' element={<Home/>}/>
              <Route exact path='/about' element={<About/>}/>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/signup' element={<Signup/>}/>
              <Route exact path='/*' element={<Error404/>}/>
            </Routes>
          </div>
        </AlertState>
      </NoteState>
    </div>
  );
}

export default App;

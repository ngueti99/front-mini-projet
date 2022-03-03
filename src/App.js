import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';
import { BrowserRouter as Router ,Switch, Route} from 'react-router-dom';

import Home from './component/Home';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

axios.defaults.baseURL="http://localhost:8000";
axios.defaults.headers.post['Content-Type']='application/json'
axios.defaults.headers.post['Accept']='application/json'
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token=localStorage.getItem('auth_token');
  config.headers.Authorization=token?`Bearer ${token}`:'';
  return config;
})

function App() {
  return (
    <div className="App">
    
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
    
        <Route exact path="/login">
          {localStorage.getItem('auth_token')?<Redirect to='/'/>:<Login/>}
        </Route>
        <Route exact path="/register">
          {localStorage.getItem('auth_token')?<Redirect to='/'/>:<Register/>}
        </Route>

      </Switch>
    </Router>
    </div>
  );
}

export default App;

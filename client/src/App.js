import logo from './logo.svg';
import './App.css';

import Login from './component/accounts/login';
import Home from './component/home/home';

function App() {
  return (
    <div className="App" style={{marginTop:'64px'}}>
<Login/>
<Home/>
    </div>
  );
}

export default App;

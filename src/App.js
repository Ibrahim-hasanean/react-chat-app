import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './component/Home';
import Chat from './component/Chat';
import {AuthContext} from "./context/authContext";
import {useState} from "react";
import {useParams} from "react-router-dom";
function App() {    
  const [currentUser,setCurrentUser] = useState();
  const [curruentRoom,setCurruentRoom] = useState()
  const [messages,setMessages]= useState([])
  return (
    <Router>
        <Switch>
        <AuthContext.Provider value={{currentUser,setCurrentUser,curruentRoom,setCurruentRoom,messages,setMessages}}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/chat" component={Chat}/>
          {/* <Route exact path="/chat/:id" component={Chat}/> */}
        </AuthContext.Provider>
        </Switch>      
    </Router>   
  );
}

export default App;

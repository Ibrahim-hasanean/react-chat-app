import React from 'react'
import {Grid,makeStyles} from "@material-ui/core";
import SideBar from "./SideBar";
import Messages from "./Messages";
import TextEditor from "./ChatTextEditor";
import CurrentUser from "./CurruentUser";
import {useParams,useHistory} from "react-router-dom";
import useChat from "./useChat.js";
import useAuthContext from "../context/authContext";
const useStyle = makeStyles({
    chatContainer:{
        height:"100vh"
    }
})
const Chat = () => {   
    const classes = useStyle(); 
    const {curruentRoom,setCurruentRoom,setCurrentUser} = useAuthContext();       
    
    if(!curruentRoom){        
        setCurruentRoom(null)
        setCurrentUser(null)    
    }
    return (
        <Grid className={classes.chatContainer} container justify="flex-start">
            <SideBar/>
            <Grid xs={8} item container>  
                 <CurrentUser />               
                 <Messages />  
                 <TextEditor />
            </Grid>         
        </Grid>
    )
}

export default Chat

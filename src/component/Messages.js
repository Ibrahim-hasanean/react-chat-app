import React,{useState} from 'react';
import {Grid,makeStyles} from "@material-ui/core";
import useChat from "./useChat";
import useAuthContext from "../context/authContext";
import {useParams} from "react-router-dom"
const useStyle = makeStyles({
    messages:{
        height:"70%",
        overflow:"scroll"        
    }
})
const Messages = () => {  
    const classes = useStyle();  
    const {messages,currentUser} = useAuthContext();     
    return (
        <Grid className={classes.messages} item xs={12}>   
            <ul>
            {currentUser?               
                messages.length>0? 
                    messages.map((msg,index)=>
                            <>
                                <li key={index}>{msg.message}</li>
                                <li>{msg.senderId}</li>
                            </>
                        ):<p>no messages</p>
                :<p>no conversation opened</p>
            }
            </ul>
        </Grid> 
    )
}

export default Messages

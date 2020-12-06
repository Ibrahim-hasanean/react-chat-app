import React,{useState} from 'react'
import {TextField,Grid,makeStyles,Button} from "@material-ui/core"
import useAuthContext from "../context/authContext";
import useChat from "./useChat"
const useStyle = makeStyles({
    textField:{
        width:"90%",

    },
    button:{
        width:"10%"
    }
})

const ChatTextEditor = () => {
    const classes = useStyle();
    const [message,setMessage] = useState();
    const {sendMessage,emitTyping} = useChat();
    const {curruentRoom} = useAuthContext();
    const send = ()=>{       
        const senderId = localStorage.getItem("userId")
        console.log(senderId,curruentRoom,message)
        sendMessage(senderId,curruentRoom,message); 
    }
    const handleChange = (e)=>{
        let value = e.target.value;
        const senderId = localStorage.getItem("userId");
        setMessage(value)
        emitTyping(senderId,curruentRoom)
    }
    return (
        <Grid xs={12} item container>
            <TextField   
            className={classes.textField}         
            id="outlined-multiline-static"
            label="new message"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            />
            <Button onClick={send} className={classes.button} variant="contained" color="primary">Send</Button>
        </Grid>
    )
}

export default ChatTextEditor

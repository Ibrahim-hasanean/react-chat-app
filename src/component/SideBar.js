import React,{useEffect,useState} from 'react'
import {Grid,makeStyles,Paper, MenuItem,MenuList} from "@material-ui/core";
import axios from "axios";
import useChat from "./useChat";
import useAuthContext from "../context/authContext";
import {useHistory,Redirect} from "react-router-dom";
const useStyle = makeStyles({
    sideBar:{
        border:"black solid 1px"
    },
    user:{
        border:"solid 1px grey",
        margin:"3px 0px"
    }
})
const SideBar = () => {
    const classes = useStyle();
    const [users,setUsers] = useState([]);
    const {setCurrentUser,setCurruentRoom} = useAuthContext()    
    const {joinRoom} = useChat();
    useEffect(()=>{
        axios.get("http://localhost:4000/users/getUsers").then(response=>{
            console.log(response)
            let {data} = response;
            let userId = localStorage.getItem("userId");
            let allUsers = data.filter(x=>x._id !== userId)
            setUsers([...allUsers])
        }).catch(e=>{
            console.log(e)
        })        
    },[])
    const userRoomOnClick=(e)=>{
        let reciverId= e.target.getAttribute("name")
        let senderId = localStorage.getItem("userId");
        let user = users.find(x=>x._id===reciverId);
        setCurrentUser(user.name)
        let roomId=  joinRoom(senderId,reciverId);
        setCurruentRoom(roomId)
    }
    return (
        <Grid className={classes.sideBar}  xs={4} item>
            <h2>all users</h2>
            <Paper elevation={0} className={classes.paper}>
                <MenuList>
                    {users.length > 0 ? users.map((user,index)=><MenuItem name={user._id} onClick={userRoomOnClick} className={classes.user} key={index}>{user.name}</MenuItem>)
                            :<div></div>
                    }
                </MenuList>
            </Paper>
        </Grid>
    )
}

export default SideBar

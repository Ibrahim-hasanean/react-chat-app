import React,{useState} from 'react'
import {Grid,TextField,Button ,makeStyles} from "@material-ui/core";
import {grey} from "@material-ui/core/colors"
import axios from 'axios';
import {Redirect} from "react-router-dom";
const  useStyle = makeStyles((theme)=>({
    home:{        
        height:"50vh",        
    },    
    input:{
        background:grey[300], 
        width:"40%"             
    }
}))
const Home = () => {
    const classes= useStyle();
    const [inputs,setInputs] = useState({});
    const [isLoged,setIsLoged] = useState(false)
    const hadleLogin=async ()=>{
        try {       
            let postLogin = await axios.post("http://localhost:4000/login",
            {email:inputs.email,name:inputs.name,password:inputs.password});
            console.log(postLogin)
            if(postLogin.status === 200 || postLogin.status === 201){
                localStorage.setItem("token",postLogin.data.token)
                localStorage.setItem("userId",postLogin.data.userId)
                setIsLoged(true)
            }
        } catch (e) {
            console.log(e.response)
        }       
    }

    const hadleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setInputs((inputs)=>({...inputs,[name]:value}))
    }

    if(isLoged){
      return  <Redirect to="/chat" />
    }
    return (
        <Grid className={classes.home}  container  justify="center" alignItems="center">
            <Grid container  justify="center"  item className={classes.inputContainer} xs={12}>
              <TextField onChange={hadleChange} className={classes.input}  name="email" type="email" label="email"  />
            </Grid>
            <Grid container justify="center" item className={classes.inputContainer} xs={12}>
              <TextField onChange={hadleChange} className={classes.input}  name="name" type="text" label="Name"  />
            </Grid>
            <Grid container justify="center" item className={classes.inputContainer} xs={12}>
              <TextField onChange={hadleChange} className={classes.input}  name="password" type="password" label="password"  />
            </Grid>
            <Grid container justify="center" item className={classes.inputContainer} xs={12}>
               <Button onClick={hadleLogin} color="primary" variant="contained">Login</Button>
            </Grid>
        </Grid>
    )
}

export default Home

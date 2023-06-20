/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import TextField from '@mui/material/TextField';
import { Button,Typography,Box,Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import '../styles/login.css'
export default function login() {
    const [data, setData] = useState(null);
    localStorage.clear()
   function signIn() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if(!(username && password )){
            alert("All input is require")
        }else{
            try{
                fetch('http://localhost:3000/users/login',{
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    })
                })
                  .then(response => response.json())
                  .then(data => {

                    localStorage.setItem("token",data.token)
                    setTimeout(() => {
                        // alert("wait a minute, it's returning to sign in ")
                        window.location.href = "/home"
                    },2000)
                    
                    })
                  .catch(error => {
                   const errEle = document.createElement("h5");
                    const errText = document.createTextNode("username or password incorrect");
                    errEle.appendChild(errText);
                    
                    document.getElementById("err").appendChild(errEle);

                  });
            }catch{
                alert("username or password is incorrect")
            }
            
              
        }
        }
        useEffect(() => {
            console.log(data)
      }, [data]);


    return (
    <div style={{backgroundColor:'white'}}>
        <Box style={{padding:5,alignContent:'center',justifyItems:'center',border:'5px solid black'}} minHeight={300} >
            <Typography>
            <h1>Sign In</h1>
                <Box style={{marginLeft:275}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div style={{padding:5,alignContent:'center',justifyItems:'center'}}>
                                <TextField id="username" label="Username " variant="outlined" style={{padding:5,margin:'5px auto'}}  />
                                <TextField id="password" label="Password " variant="outlined" style={{padding:5,margin:'5px auto'}} type="password" />
                                <div id="err" className='err'>
                                    
                                </div>
                                <Button variant="contained" style={{padding:5,margin:'5px auto',width:200}} onClick={signIn} >Sign In</Button>
                                <div style={{padding:5,alignContent:'center',justifyItems:'center'}}>
                                <a href='/register' style={{fontSize:15,marginRight:150}} >Sign Up</a>
                                </div>
                        
                            </div>
                        </Grid>
                    </Grid>
                </Box>

            </Typography>
        </Box>
        
        </div>
  
    )
}
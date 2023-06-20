/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import TextField from '@mui/material/TextField';
import { Button,Typography,Box,Grid } from '@mui/material';
import { useState, useEffect } from 'react';

export default function register() {

    const [data, setData] = useState(null);

   function regis() {
        var username = document.getElementById("username").value
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var cPassword = document.getElementById("cPassword").value

        if(!(username && email && password && cPassword)){
            alert("All input is require")
        }if(password != cPassword){
            alert("Please Check Password or Confirm Password")
        }else{
            fetch('http://localhost:3000/users/register',{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: document.getElementById("username").value,
                    password: document.getElementById("cPassword").value,
                    email: document.getElementById("email").value
                })
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                setTimeout(() => {
                    // alert("wait a minute, it's returning to sign in ")
                    window.location.href = "/"
                },2000)
                
                })
              .catch(error => console.error(error));
              


        }
        }
        useEffect(() => {
            console.log(data)
      }, [data]);

    return (
    <div style={{backgroundColor:'white'}}>
        <Box style={{padding:5,border:'5px solid black'}} minHeight={300} >
            <Typography>
            <h1>Sign Up</h1>
                <Box style={{marginLeft:175}} minWidth={400}>
                    <Grid container spacing={2}>
                        <Grid item >
                            <div style={{padding:5}}>
                                <TextField id="username" label="Username " variant="outlined"  />
                            </div>

                            <div style={{padding:5}}>
                                <TextField id="email" label="Email " variant="outlined" type="email"  />
                            </div>

                            <div style={{padding:5}}>
                                <TextField id="password" label="Password " variant="outlined" type="password" />
                            </div> 

                            <div style={{padding:5}}>
                                <TextField id="cPassword" label="Confirm Password " variant="outlined" type="password"  />
                            </div>
                            <div style={{padding:5}}>
                            <Button variant="contained" style={{padding:5,margin:'5px auto'}} onClick={async () => {
                                regis()
                             
                                }} >Sign Up</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>

            </Typography>
        </Box>
        
        </div>
  
    )
}
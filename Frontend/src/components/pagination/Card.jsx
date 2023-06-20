/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useEffect} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid  from "@mui/material/Grid";
import  Button  from "@mui/material/Button";
import "./Card.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 235,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    alignContent:'center',
    justifyItems:'center',
   
  };

const prodCard = ({id,img, name, price,desc,brand,type,pack }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [confirm, setConfirm] = useState(false);
    const handleConfirm = () => setConfirm(true);
    const handleUnConfirm = () => setConfirm(false);

    const [nameProd,setNameProd] = useState();
    const [descProd,setDescProd] = useState();
    const [typeProd,setTypeProd] = useState();
    const [brandProd,setBrandProd] = useState();
    const [priceProd,setPriceProd] = useState(1);
    const [packProd,setPackProd] = useState(1);


    function test() {
    if(document.getElementById("name").value.length == 0){
      setNameProd(document.getElementById("name").placeholder)
    }else{
      setNameProd(document.getElementById("name").value)
    }

    if(document.getElementById("desc").value.length == 0){
      setDescProd(document.getElementById("desc").placeholder)
    }else{
      setDescProd(document.getElementById("desc").value)
    }

    if(document.getElementById("type").value.length == 0){
      setTypeProd(document.getElementById("type").placeholder)
    }else{
      setTypeProd(document.getElementById("type").value)
    }

    if(document.getElementById("brand").value.length == 0){
      setBrandProd(document.getElementById("brand").placeholder)
    }else{
      setBrandProd(document.getElementById("brand").value)
    }

    if(document.getElementById("price").value.length == 0){
      setPriceProd(document.getElementById("price").placeholder)
    }else{
      setPriceProd(document.getElementById("price").value)
    }

    if(document.getElementById("pack").value.length == 0){
      setPackProd(document.getElementById("pack").placeholder)
    }else{
      setPackProd(document.getElementById("pack").value)
    }

    fetch('http://localhost:3000/products/update/'+id,{
      method:"PUT",
      headers:{
         "x-access-token":localStorage.getItem("token"),
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": nameProd,
        "desc":descProd,
        "type":typeProd,
        "brand":brandProd,
        "price":priceProd,
        "pack":packProd
      })
  })
  .then(res => res.json())
  .then(data => {
      console.log(data)
      setTimeout(() => {
          // alert("wait a minute, it's returning to sign in ")
          // window.location.reload()
      },2000)
      
   
  }) 
  }

  

    return (
        <div className='card'>
            <div className='card_image'>
                <img src={img}/>
            </div>
            <div className='card_info'>
               
                <h2>{name}</h2>
                <h3>{desc}</h3>
                <a>Type:{type}|Brand:{brand}</a>
                <h3>{price}฿</h3>
                <button onClick={() => {
                    fetch('http://localhost:3000/products/delete/'+id,{
                        method:"DELETE",
                        headers:{
                           "x-access-token":localStorage.getItem("token")
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setTimeout(() => {
                          // alert("wait a minute, it's returning to sign in ")
                          window.location.reload()
                      },2000)
                    })
                }}    
                >Delete</button>
                <button onClick={handleOpen}>Edit</button>
                <Modal
                    open={open}
                    onClose={handleClose}
                aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="editHead" >
            <h3>           Edit <a style={{textDecoration: "underline"}}>{name}</a> information </h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item >
                
                <TextField id="name" label="Product Name" variant="outlined" placeholder={name} style={{padding:5,margin:'5px auto'}} />
                <TextField id="desc" label="Description" variant="outlined" placeholder={desc} style={{padding:3,margin:'5px auto'}} />
                <TextField id="type" label="Type" variant="outlined" placeholder={type} style={{padding:5,margin:'5px auto'}} />
                <TextField id="brand" label="Brand" variant="outlined" placeholder={brand} style={{padding:3,margin:'5px auto'}} />
                <TextField id="price" label="Price" variant="outlined" placeholder={price} style={{padding:5,margin:'5px auto'}} type="number" />
                <TextField id="pack" label="Amount/Packaging" variant="outlined" placeholder={pack} style={{padding:3,margin:'5px auto'}} type="number"  />
                <Button variant="contained" style={{padding:5,margin:'5px auto',width:230}} onClick={() => {
                  handleConfirm()
                  test()
                  }}>Confirm</Button>
                <Modal
                    open={confirm}
                    onClose={handleUnConfirm}
                aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="editHead" >
            <h3>           Edit <a style={{textDecoration: "underline"}}>{name}</a> information </h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" style={{padding:5,margin:'5px auto',width:230}} onClick={handleUnConfirm}>No</Button>
            <Button variant="contained" style={{padding:5,margin:'5px auto',width:230}} onClick={() => {
              test()
              setTimeout(() => {
                // alert("wait a minute, it's returning to sign in ")
                window.location.reload()
            },2000)
              }}>Yes</Button>
          </Typography>
          </Box>
      </Modal>
                </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
            </div>
        </div>
    );
};

export default prodCard;

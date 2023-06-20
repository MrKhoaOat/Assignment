/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { Button,Typography,Box,Grid,Stack,Modal,TextField  } from '@mui/material';
import { createElement, useEffect, useState } from 'react';
import List from "../components/pagination/list";
import Pagination from "../components/pagination/pagination";
import '../styles/home.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Navbar from '../components/navbar/navbar'


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

export default function home() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    
    useEffect(() => {
        
        fetch('http://localhost:3000/products',{method:"GET"})
        .then(response => response.json())
              .then(e => {
                setData(e)
                console.log(e)
                })
              .catch(error => console.error(error));
    },[])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const [confirm, setConfirm] = useState(false);
    const handleConfirm = () => setConfirm(true);
    const handleUnConfirm = () => setConfirm(false);
    const [nameProd,setNameProd] = useState(null);
    const [descProd,setDescProd] = useState(null);
    const [typeProd,setTypeProd] = useState(null);
    const [brandProd,setBrandProd] = useState(null);
    const [priceProd,setPriceProd] = useState(1);
    const [packProd,setPackProd] = useState(1);

    const [base, setBase] = useState(null);
    useEffect(()=>{
      console.log(base)
      console.log(nameProd)
      console.log(descProd)
      console.log(typeProd)
      console.log(brandProd)
      console.log(priceProd)
      console.log(packProd)
    },[base,nameProd,descProd,typeProd,brandProd,priceProd,packProd])



function getBaseUrl ()  {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        setBase(baseString)
        console.log(base); 
    };
    reader.readAsDataURL(file);
}

    return (
  
        <div className='home'>
            <Navbar />

            <Button variant="contained" style={{padding:5,margin:'5px 50px',width:180}} onClick={handleOpen2} >Add Product</Button>
            <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
            <Box sx={style}>
          <Typography id="editHead" >
            <h3>    Add Product </h3>
          </Typography>
          <Typography>
          <Grid container spacing={2}>
                <Grid item>
                <Box>
                <TextField id="name" label="Product Name" variant="outlined" style={{padding:5,margin:'5px auto'}} />
                  <TextField id="desc" label="Description" variant="outlined" style={{padding:3,margin:'5px auto'}} />
                  <TextField id="type" label="Type" variant="outlined" style={{padding:5,margin:'5px auto'}} />
                </Box>
                  <Box>
                  <TextField id="brand" label="Brand" variant="outlined"  style={{padding:3,margin:'5px auto'}} />
                  <TextField id="price" label="Price" variant="outlined"  style={{padding:5,margin:'5px auto'}} type="number" />
                  <TextField id="pack" label="Amount/Packaging" variant="outlined"  style={{padding:3,margin:'5px auto'}} type="number"  />
                </Box>
                <Box>
                <div>
                <label >Choose Image to upload</label>
                <input type="file" id="img" />
                </div>
              
                </Box>
                  
                <Button variant="contained" style={{padding:5,margin:'5px auto',width:230}} onClick={() => {
                  getBaseUrl()
                  const name = document.getElementById("name").value 
                  const desc = document.getElementById("desc").value 
                  const type = document.getElementById("type").value 
                  const brand = document.getElementById("brand").value 
                  const pack = document.getElementById("pack").value 
                  const price = document.getElementById("price").value 

              if(!(name && price && pack )){
                alert("All input is require")
              }else{
            
                setNameProd(name)
                setDescProd(desc)
                setTypeProd(type)
                setBrandProd(brand)
                setPriceProd(price)
                setPackProd(pack)
                getBaseUrl()
                handleConfirm()
              }
                  }}>ADD</Button>
                <Modal
                    open={confirm}
                    onClose={handleUnConfirm}
                aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="editHead" >
            <h3>   Confirm Product </h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button variant="contained" style={{padding:5,margin:'5px auto',width:230}} onClick={handleUnConfirm}>No</Button>
            <Button variant="contained" style={{padding:5,margin:'5px auto',width:230}} onClick={() => {
              
           
              fetch('http://localhost:3000/products/insertOne',{
                method:"POST",
                headers:{"Content-Type": "application/json","x-access-token":localStorage.getItem("token")},
                body: JSON.stringify({
                  img: base,
                  name: nameProd ,
                  desc : descProd ,
                  price: priceProd,
                  brand: brandProd ,
                  type: typeProd ,
                  pack: packProd
                })
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                setTimeout(() => {
                    // alert("wait a minute, it's returning to sign in ")
                    window.location.href = "/home"
                },2000)
            }) 
          
              }}>Yes</Button>
          </Typography>
          </Box>
      </Modal>
                </Grid>
              </Grid>
          </Typography>
          </Box>
     
            </Modal> 
            {/* <Button variant="contained" style={{padding:5,margin:'5px 50px',width:180}} onClick={handleOpen} hidden >Add Many Product</Button>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
            <Box sx={style}>
          <Typography id="editHead" >
            <h3>    Please upload json file </h3>
          </Typography>
          <Typography>
          <form  
         
                id='uploadForm' 
                action='http://localhost:3000/unzip/upload' 
                method='post' 
                encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!' />
            </form>     
          </Typography>
          </Box>
     
            </Modal> */}
        <List data={currentPosts} />
        <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
    </div>
  
    )
}
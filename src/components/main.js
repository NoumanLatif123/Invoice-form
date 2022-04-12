import React, { useState } from 'react'
import Button from '@mui/material/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import './form.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import TableDemo from './tableDemo';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


function Main() {

    const onSubmit = studentObject => {
  	axios.post(
    'http://localhost:4000/students/create-student', studentObject)
	  .then(res => {
		if (res.status === 200){
		alert('Student successfully created')
        console.log(studentObject);
        reset();
        }
		else
		Promise.reject()
	})
	.catch(err => alert('Something went wrong'))
    }

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onChange', });
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const [pic, setPic] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollNo] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const pdfGenerate =()=>{
    // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  doc.text("INVOICE", 170, 20, 0, 100);
  //doc.addFileToVFS(`${pic}`, 10, 0, 0, 100);
  doc.text(`${name}`, 20, 30, 0, 100);
  doc.text(`${email}`, 20, 40, 0, 100);
  doc.text(`${rollno}`, 70, 40, 0, 0);
  doc.save("Invoice.pdf");
  }


  return (
    <div className="App">
      
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="loginBox">
  
            <div className='picUpload'>
        
              <input placeholder="Certificate" type="file" name="CertificateImg" id="CertificateImg" 
              className={`form-control ${errors.CertificateImg && 'is-invalid' }`}
              {...register('CertificateImg', { required: true})} onChange={e => setPic(e.target.value)} />

             {errors.CertificateImg && errors.CertificateImg.type === "required" && <p>Image is a required field</p> } 
             </div>
                    
            <h1>INVOICE</h1>
            

            <input placeholder="who is this invoice from? (required)" type="text"  id="invoiceFrom" 
            className={`form-control ${errors.name && 'is-invalid' }`}
            {...register('name', { required: true,'minLength':  5,})} onChange={e => setName(e.target.value)} />
            {errors.name && errors.name.type === "required" && <p className='error'>It is a required field</p> }
            {errors.name && errors.name.type === 'minLength' && 
            ( <p className='error'>It should be at-least 5 characters</p> )}
            
            
            <input type="text"  id="num__input" placeholder="#" /> 
            

            <label className='DateField'> Date </label>
            <div className='date__field'>
            <DatePicker id="date__input"
            selected={startDate} 
            onChange={date => setStartDate(date)}
            calendarIcon={null}
            />
            </div>      

            <div className='payment__field'>
            <label className='payment'>Payment Terms </label>
            <input type="text"  id="payment1" />
            </div>
            
            <div className='duedate__field'>
            <label className='due__date'>Due Date </label>
            <input type="text"  id="due__date1" />
            </div>

            <div className='ponum__field'>
            <label className='po__num'>PO Number </label>
            <input type="text"  id="po__num1" />
            </div>
                     
            <label className='Bill'>Bill To </label>
            <input placeholder="who is this invoice to? (required)" type="text" id="invoiceTo" 
            className={`form-control ${errors.email && 'is-invalid' }`}
            {...register('email', { required: true,'minLength':  5,})} onChange={e => setEmail(e.target.value)}/>      
            
            {errors.email && errors.email.type === "required" && <p className='error1'>It is a required field</p> }
            {errors.email && errors.email.type === 'minLength' && 
            ( <p className='error1'>It should be at-least 5 characters</p> )}  

            <label className='Ship'>Ship To</label>
            <input placeholder="Optional" type="text" name="shipTo" id="shipTo"
            onChange={e => setRollNo(e.target.value)} />   

            <div className="table__demo">
            <TableDemo />
            </div>

            <label className='Notes'>Notes</label>
            <input placeholder="Notes - any relevant information not really covered" type="text"  id="notes__input" />   

            <label className='Terms'>Terms</label>
            <input placeholder="Terms and Conditions - late fees, payments methods, delievery schedule" type="text" id="terms__input" />   
            
          </div>
          <div className="submit">
          <Button variant="contained" type="submit" id="send__invoice">Send Invoice</Button>
          <div className='invoice'>
          <Button variant="text" onClick={handleOpen}><GetAppIcon />Download Invoice</Button>
          </div>

          <div className="line1"></div>
          <Link to="./student-list">
          <Button variant="text">My Invoices</Button>
          </Link>

          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Click on the Button to Download
          </Typography>
          <div className='download'>
          <Button variant="contained" onClick={pdfGenerate}>Download in pdf</Button>
          </div>
          </Box>
          </Modal>
        </div>
        </form>
      </div>
    </div>
  );
}

export default Main;

// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";
import './form.css';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { jsPDF } from "jspdf";
import Box from "@mui/material/Box";
import TableDemo from './tableDemo';


const EditStudent = (props) => {

const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: 'onChange', });
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollNo] = useState("");

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

//});
	
//onSubmit handler
const onSubmit = (studentObject) => {
	axios
	.put(
		"http://localhost:4000/students/update-student/" +
		props.match.params.id,
		studentObject
	)
	.then((res) => {
		if (res.status === 200) {
		alert("Student successfully updated");
		props.history.push("/student-list");
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

// Load data from server and reinitialize student form
useEffect(() => {
	axios
	.get(
		"http://localhost:4000/students/update-student/"
		+ props.match.params.id
	)
	.then((res) => {
		const { name, email, rollno } = res.data;
		//setFormValues({ name, email, rollno });
		setName(name);
	})
	.catch((err) => console.log(err));
}, []);

// Return student form
return (
	<div className="App">
      
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="loginBox">
		  <div className='picUpload'>
              <input placeholder="Certificate" type="file" name="CertificateImg" id="CertificateImg" />
		  </div>
                <h1>INVOICE</h1>

				<input placeholder="who is this invoice from? (required)" type="text"  id="invoiceFrom" 
            className={`form-control ${errors.name && 'is-invalid' }`}
            {...register('name', { required: true,'minLength':  5,})} onChange={e => setName(e.target.value)} />
            {errors.name && errors.name.type === "required" && <p className='error'>It is a required field</p> }
            {errors.name && errors.name.type === 'minLength' && 
            ( <p className='error'>It should be at-least 5 characters</p> )}
            
            <label className='DateField'> Date </label>
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
            
          </div>
          <div className="submit">
          <Button variant="contained" type="submit">Send Invoice</Button>
          <div className='invoice'>
          <Button variant="outlined" ><GetAppIcon />Download Invoice</Button>
          </div>

          <div className="line1"></div>
          <Link to="../student-list">
          <Button variant="text">My Invoices</Button>
          </Link>

          
        </div>
        </form>
      </div>
    </div>
);
};

// Export EditStudent Component
export default EditStudent;

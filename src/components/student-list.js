import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentTableRow from "./StudentTableRow";
import Button from '@mui/material/Button';
import { Link }  from 'react-router-dom'; 

const StudentList = () => {
const [students, setStudents] = useState([]);

useEffect(() => {
	axios
	.get("http://localhost:4000/students/")
	.then(({ data }) => {
		setStudents(data);
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const DataTable = () => {
	return students.map((res, i) => {
	return <StudentTableRow obj={res} key={i} />;
	});
};

return (
       <>
		<div className="register-form">
		<div className="myInvoices">
		<h1>My Invoices</h1>
          <Link to="/">
          <Button variant="contained" className="new__invoice">New Invoice</Button>
          </Link>
		  </div>
		<div className="table-wrapper">
		<tbody>{DataTable()}</tbody>
		</div>
      </div>
	</>
);
};

export default StudentList;

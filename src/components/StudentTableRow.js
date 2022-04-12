import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import axios from "axios";

const StudentTableRow = (props) => {
const { _id, name, email, rollno } = props.obj;

const deleteStudent = () => {
	axios
	.delete(
    "http://localhost:4000/students/delete-student/" + _id)
	.then((res) => {
		if (res.status === 200) {
		alert("Form successfully deleted");
		window.location.reload();
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

return (
	<>
	<Link to={"/edit-student/" + _id}>
	<div className="form__container">	
	<div className="data__get">
	{name}
	<br />
	{email}
	<br />
	{rollno}
	</div>
	    <div id="delete__btn">
		<Button onClick={deleteStudent} startIcon={<DeleteIcon />}
		variant="text" >
		</Button>
		</div>
	</div>
	</Link>
	</>
);
};

export default StudentTableRow;

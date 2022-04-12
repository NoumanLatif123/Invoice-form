import React, { useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
    Box, Snackbar, Table,
    TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import Button from '@mui/material/Button';
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


// Creating styles
const useStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset",
        },
    },
    table: {
        minWidth: 750,
    },
    snackbar: {
        bottom: "104px",
    },
});
  
function TableDemo() {
    // Creating style object
    const classes = useStyles();
  
    // Defining a state named rows
    // which we can update by calling on setRows function
    const [rows, setRows] = useState([
        { id: 1, item: "", quantity: "", rate: "" },
    ]);
  
    // Initial states
    const [open, setOpen] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [disable, setDisable] = React.useState(true);
    const [showConfirm, setShowConfirm] = React.useState(false);
  
    // Function For closing the alert snackbar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
  
    // Function For adding new row object
    const handleAdd = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1, item: "",
                quantity: "", rate: ""
            },
        ]);
        setEdit(true);
    };
  
    // Function to handle edit
    const handleEdit = (i) => {
        // If edit mode is true setEdit will 
        // set it to false and vice versa
        setEdit(!isEdit);
    };
  
    // Function to handle save
    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
        setDisable(true);
        setOpen(true);
    };
  
    // The handleInputChange handler can be set up to handle
    // many different inputs in the form, listen for changes 
    // to input elements and record their values in state
    const handleInputChange = (e, index) => {
        setDisable(false);
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };
  
    // Showing delete confirmation to users
    const handleConfirm = () => {
        setShowConfirm(true);
    };
  
    // Handle the case of delete confirmation where 
    // user click yes delete a specific row of id:i
    const handleRemoveClick = (i) => {
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };
  
    // Handle the case of delete confirmation 
    // where user click no 
    const handleNo = () => {
        setShowConfirm(false);
    };
  
  return (
    <TableBody>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        className={classes.snackbar}
      >
        <Alert onClose={handleClose} severity="success">
          Record saved successfully!
        </Alert>
      </Snackbar>
      <Box margin={1}>
             
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow className="first__line">
              
              <TableCell className="item2">Item</TableCell>
              <TableCell className="quantity2">Quantity</TableCell>
              <TableCell align="center" className="rate2">Rate</TableCell>
              <TableCell align="center" className="amount2">Amount </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <div>
                  <TableRow>
                    {isEdit ? (
                      <div className="adding__rows">
                        <TableCell padding="none" className="rows1__">
                          <input
                            value={row.item}
                            name="item"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none" className="rows2__">
                          <input
                            value={row.quantity}
                            name="quantity"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell padding="none" className="rows3__">
                          <input
                            style={{ width: "100px" }}
                            name="rate"
                            value={row.rate}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                      </div>
                    ) : (
                      <div>
                        <TableCell component="th" scope="row">
                          {row.item}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.quantity}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.rate}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                        ></TableCell>
                      </div>
                    )}
                    {isEdit ? (
                      <Button variant="text" className="mr10" onClick={handleConfirm} id="clear__">
                        <ClearIcon />
                      </Button>
                    ) : (
                      <Button className="mr10" onClick={handleConfirm} id="clear1__">
                        <DeleteOutlineIcon />
                      </Button>
                    )}
                    {showConfirm && (
                      <div>
                        <Dialog
                          open={showConfirm}
                          onClose={handleNo}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to delete?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => handleRemoveClick(i)}
                              color="primary"
                              autoFocus
                            >
                              Yes
                            </Button>
                            <Button
                              onClick={handleNo}
                              color="primary"
                              autoFocus
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    )}
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
            {isEdit ? (
              <div className="add__buttons">
                <Button  variant="contained" onClick={handleAdd} className="add__button">
                  <AddBoxIcon onClick={handleAdd} />
                  Line Item
                </Button>
                {rows.length !== 0 && (
                  <div>
                    {disable ? (
                      <div className="save1__button">
                      <Button variant="outlined" disabled align="right" onClick={handleSave} className="save__button">
                        <DoneIcon />
                        Save
                      </Button>
                      </div>
                    ) : (
                      <div className="save1__button">
                      <Button variant="outlined" align="right" onClick={handleSave} className="save__button">
                        <DoneIcon />
                        Save
                      </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="add__buttons">
                <Button  variant="contained" onClick={handleAdd} className="add1__button" > 
                  <AddBoxIcon onClick={handleAdd}  />
                  Line Item
                </Button>
                <div className="edit__button">
                <Button className="edit__button" variant="outlined" align="right" onClick={handleEdit}>
                  <CreateIcon />
                  Edit
                </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <TableRow align="center"> </TableRow>
    </TableBody>
  );
}
  
export default TableDemo;
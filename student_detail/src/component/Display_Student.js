import MaterialTable from "@material-table/core"
import React from "react"
import { useEffect, useState } from "react"
import { getData, postData, serverURL } from "./Services/NodeServices"
import { usestyles } from "./Display_Student_CSS"
import { Dialog, InputLabel, ListItemText, Select, MenuItem, OutlinedInput, Button, Grid, TextField, Avatar, Checkbox, IconButton, FormControl, FormControlLabel, Radio, FormLabel, Paper, RadioGroup, Divider } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PhotoCamera } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material"

import Slide from '@mui/material/Slide';
import Swal from "sweetalert2"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'C',
    'C++',
    'Java',
    'Pyhton',
    'Javascript',
    'Go',

];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function DisplayStudent() {

    var classes = usestyles()
    const [studentDetails, setStudentDetails] = useState([])
    const [studentid, setstudentid] = useState('')
    const [studentname, setStudentname] = useState('')
    const [fathername, setFathername] = useState('')
    const [mothername, setMothername] = useState('')
    const [dob, setDob] = useState('')
    const [standard, setStandard] = useState('')
    const [gender, setGender] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [interestedcourse, setinterestedcourse] = useState([])
    const [picture, setPicture] = useState({ url: '', bytes: '' })
    const [btnStatus, setBtnStatus] = useState(false)
    const [oldPicture,setOldPicture]=useState({ url: '', bytes: '' })



    const [open, setOpen] = useState(false)


    const fetchAllData = async () => {
        var result = await getData('student/display_all_data')
        setStudentDetails(result.data)

    }
    useEffect(function () {
        fetchAllData()
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    const matches = useMediaQuery('(min-width:1000px)');

    const handleOpenDialog = (rowData) => {
       
        setOpen(true)
        setstudentid(rowData.studentid)
        setStudentname(rowData.studentname)
        setFathername(rowData.fathername)
        setMothername(rowData.mothername)
        setAddress(rowData.address)
        setDob(rowData.dob)
        setStandard(rowData.standard)
        setGender(rowData.gender)
        setPhonenumber(rowData.phonenumber)
        setEmail(rowData.email)
        setinterestedcourse(JSON.parse(rowData.interestedcourse))
        setPicture({ url: `${serverURL}/images/${rowData.picture}`, bytes: `` })


setOldPicture({ url: `${serverURL}/images/${rowData.picture}`, bytes: `` })

    }

    const handleCancelPicture=()=>{

        setPicture(oldPicture)
        setBtnStatus(false)
    }

    const handleDelete = async (rowData) => {
        Swal.fire({
            title: 'Do you want to delete the student?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var res = await postData('student/delete_student', { studentid: rowData.studentid })
                if (res.status) {
                    Swal.fire({ text: 'Deleted! Successfully', icon: "success" })
                    fetchAllData()

                }
                else {
                    Swal.fire('Server Error!', '', 'Successfully')
                    fetchAllData()
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })



    }

    const handleEdit = async () => {
        setOpen(false)
        var body = { studentid, studentname, fathername, mothername, dob, standard, gender, email, phonenumber, interestedcourse: JSON.stringify(interestedcourse), address }
        var result = await postData('student/update_student', body)
        if(result.status)
        {fetchAllData()
          Swal.fire({ text: ' Updated Successfully', icon: "success" })
  
        }
        else
        {
          Swal.fire({ text: 'Server Error', icon: "error" })
  
        }
        setOpen(false)
    }

    const handlePicture = (event) => {
        setBtnStatus(true)
        setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }

    const handleUpdatePicture=async()=>{
      var formData = new FormData()
      formData.append('picture',picture.bytes)
      formData.append('studentid',studentid)
      var result = await postData('student/update_picture',formData)
      if(result.status)
      {fetchAllData()
        Swal.fire({ text: 'Picture Updated Successfully', icon: "success" })

      }
      else
      {
        Swal.fire({ text: 'Server Error', icon: "error" })

      }
      setOpen(false)
      setBtnStatus(false)
    }


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setinterestedcourse(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const showDatainPopUp = () => {
        return (<div>
            {matches ? <>
                <Dialog
                    maxWidth="md"
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <div className={classes.dmainContainer}>
                        <Paper elevation={3} className={classes.dbox}>
                            <div className={classes.heading}>
                                Update     Student Entry
                            </div>
                            <div className={classes.gridspace}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Student Name"
                                            fullWidth
                                            size="small"
                                            value={studentname}
                                            onChange={(event) => setStudentname(event.target.value)}

                                        />
                                    </Grid>

                                    <Grid item xs={4}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Father Name"
                                            fullWidth
                                            size="small"
                                            value={fathername}
                                            onChange={(event) => setFathername(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Mother Name"
                                            fullWidth
                                            size="small"
                                            value={mothername}
                                            onChange={(event) => setMothername(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                            <DatePicker

                                                fullWidth
                                                label="DOB"
                                                value={dob}
                                                defaultValue=""
                                                onChange={(newValue) => {
                                                    setDob(newValue);
                                                }}
                                                renderInput={(params) => <TextField fullWidth {...params} size="small" />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="Standard"
                                            fullWidth
                                            value={standard}
                                            onChange={(event) => setStandard(event.target.value)}

                                        />

                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl fullWidth style={
                                            {
                                                display: 'flex',
                                                flexDirection: 'row',
                                                border: '1px solid grey'

                                            }
                                        }>
                                            <div className={classes.radio}> Gender : </div>
                                            <div>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    value={gender}
                                                >
                                                    <FormControlLabel sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 18,
                                                            color: 'black'
                                                        }
                                                    }} control={<Radio />} color="default" label="Female" value="Female" onChange={(event) => setGender(event.target.value)} />
                                                    <FormControlLabel sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 18,
                                                            color: 'black'
                                                        }
                                                    }} control={<Radio />} color="default" size="small" label="Male" value="Male" onChange={(event) => setGender(event.target.value)} />

                                                </RadioGroup>
                                            </div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="Phone Number"
                                            fullWidth
                                            type="number"
                                            value={phonenumber}
                                            onChange={(event) => setPhonenumber(event.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            fullWidth
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="Address"
                                            fullWidth
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>

                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Interested Course</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={interestedcourse}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Interested Course" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={interestedcourse.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={12} className={classes.center}>
                                        < Button variant="contained" onClick={handleEdit} color="success" className={classes.btn}>Edit</Button>
                                    </Grid>
                                    <Divider sx={{ color: 'black', width: '860px', padding: '3px' }} variant="middle" />
                                    <Grid item xs={12} className={classes.center}>
                                        <Avatar
                                            variant="square"
                                            alt="Remy Sharp"
                                            src={picture.url}
                                            sx={{ width: 90, height: 90 }}
                                        />
                                    </Grid>
                                    {btnStatus ? <>  <Grid item xs={12} className={classes.center}><Button variant="contained" size="small" onClick={handleUpdatePicture} color="success" sx={{ width: '150px', margin: '1%' }}>
                                        Update Picture
                                    </Button>

                                        <Button variant="contained" size="small" color="error" sx={{ width: '150px', margin: '1%' }} onClick={handleCancelPicture}>
                                            Cancel
                                        </Button>
                                    </Grid> </> : <>

                                        <Grid item xs={12} className={classes.center}>
                                            <IconButton color="primary" aria-label="upload picture" component="label" onChange={handlePicture} >
                                                <input hidden accept="image/*" type="file" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div>
                                                        <PhotoCamera color="action" /></div>

                                                    <div className={classes.uptext}>  Upload New Picture</div></div>
                                            </IconButton>
                                        </Grid>
                                    </>}

                                </Grid>

                            </div>

                        </Paper>
                    </div>
                </Dialog></> : <>


                <Dialog
                    maxWidth="md"
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <div className={classes.dmainContainer}>
                        <Paper elevation={3} className={classes.dbox}>
                            <div className={classes.sheading}>
                                Update  Student Entry
                            </div>
                            <div className={classes.gridspace}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Student Name"
                                            fullWidth
                                            size="small"
                                            value={studentname}
                                            onChange={(event) => setStudentname(event.target.value)}

                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Father Name"
                                            fullWidth
                                            size="small"
                                            value={fathername}
                                            onChange={(event) => setFathername(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Mother Name"
                                            fullWidth
                                            size="small"
                                            value={mothername}
                                            onChange={(event) => setMothername(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                            <DatePicker

                                                fullWidth
                                                label="DOB"
                                                value={dob}
                                                defaultValue=""
                                                onChange={(newValue) => {
                                                    setDob(newValue);
                                                }}
                                                renderInput={(params) => <TextField fullWidth {...params} size="small" />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="Standard"
                                            fullWidth
                                            value={standard}
                                            onChange={(event) => setStandard(event.target.value)}

                                        />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth style={
                                            {
                                                display: 'flex',
                                                flexDirection: 'row',
                                                border: '1px solid grey'

                                            }
                                        }>
                                            <div className={classes.radio}> Gender : </div>
                                            <div>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    value={gender}
                                                >
                                                    <FormControlLabel control={<Radio />} color="default" label="Female" value="Female" sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 18,
                                                            color: 'black'
                                                        }
                                                    }} onChange={(event) => setGender(event.target.value)} />
                                                    <FormControlLabel  control={<Radio />} color="default" size="small" label="Male" value="Male" sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 18,
                                                            color: 'black'
                                                        }
                                                    }} onChange={(event) => setGender(event.target.value)} />

                                                </RadioGroup>
                                            </div>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="Phone Number"
                                            fullWidth
                                            type="number"
                                            value={phonenumber}
                                            onChange={(event) => setPhonenumber(event.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="E-Mail"
                                            fullWidth
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            size="small"
                                            required
                                            id="outlined-required"
                                            label="Address"
                                            fullWidth
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}

                                        />
                                    </Grid>
                                    <Grid item xs={6}>

                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel id="demo-multiple-checkbox-label">Interested Course</InputLabel>
                                            <Select
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={interestedcourse}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Interested Course" />}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={interestedcourse.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                 
                                    <Grid item xs={12} className={classes.center}>
                                        < Button variant="contained" onClick={handleEdit} color="success" className={classes.btn}>Edit</Button>
                                    </Grid>
                                    <Divider sx={{ color: 'black', width: '860px', padding: '3px' }} variant="middle" />
                                    <Grid item xs={12} className={classes.center}>
                                        <Avatar
                                            variant="square"
                                            alt="Remy Sharp"
                                            src={picture.url}
                                            sx={{ width: 90, height: 90 }}
                                        />
                                    </Grid>
                                    {btnStatus ? <>  <Grid item xs={12} className={classes.center}><Button variant="contained" size="small" color="success" sx={{ width: '150px', margin: '1%' }} onClick={handleUpdatePicture}>
                                        Update Picture
                                    </Button>

                                        <Button variant="contained" size="small" color="error" onClick={handleCancelPicture} sx={{ width: '150px', margin: '1%' }}>
                                            Cancel
                                        </Button>
                                    </Grid> </> : <>

                                        <Grid item xs={12} className={classes.center}>
                                            <IconButton color="primary" aria-label="upload picture" component="label" onChange={handlePicture} >
                                                <input hidden accept="image/*" type="file" />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <div>
                                                        <PhotoCamera color="action" /></div>

                                                    <div className={classes.uptext}>  Upload New Picture</div></div>
                                            </IconButton>
                                        </Grid>
                                    </>}





                                </Grid>

                            </div>

                        </Paper>
                    </div>
                </Dialog>
            </>}
        </div>)
    }

    const showDataInTAble = () => {
        return (

            <MaterialTable
                style={{ fontSize: '1vw' }}
                title="Student Details "
                columns={[
                    { title: 'Id', field: 'studentid' },
                    { title: ' Name', field: 'studentname' },
                    { title: 'Father Name', field: 'fathername' },
                    { title: 'Mother Name', field: 'mothername' },
                    {
                        title: 'Dob/Gender', render: (rowData => <div><div>{rowData.dob}</div><div>{rowData.gender}</div></div>),
                    },
                    { title: 'Standard', field: 'standard' },

                    { title: 'Phone Number/Email', render: (rowData => <div><div>{rowData.phonenumber}</div><div>{rowData.email}</div></div>) },

                    { title: 'Address', field: 'address' },
                    { title: 'Interested Course', field: 'interestedcourse' },
                    {
                        title: 'Picture', render: (rowData) => <img src={`${serverURL}/images/${rowData.picture}`} width='30' height='30' style={{ borderRadius: '10%' }} />
                    },
                ]}
                data={studentDetails}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Update Student',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Student',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
            />
        )
    }

    return (<div className={classes.mainContainer} >
        <div className={classes.box}>
            {showDataInTAble()}
        </div>
        {showDatainPopUp()}
    </div>)
}  
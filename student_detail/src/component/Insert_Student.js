import { usestyles } from "./Insert_Student_Css"
import { Grid, Paper, TextField, Radio, MenuItem, RadioGroup, InputLabel, Select, OutlinedInput, ListItemText, FormControl, FormControlLabel, FormLabel, Checkbox, FormGroup, Typography, Button, Avatar, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postData } from "./Services/NodeServices";
import { PhotoCamera } from "@mui/icons-material";
import Swal from "sweetalert2";


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


export default function InsertStudent() {
    var classes = usestyles()


    const [studentname, setStudentname] = useState('');
    const [fathername, setFathername] = useState('');
    const [mothername, setMothername] = useState('');
    const [dob, setDob] = useState(null)
    const [standard, setStandard] = useState('')
    const [gender, setGender] = useState('')
    const [mobilenumber, setMObilenumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [interestedcourse, setinterestedcourse] = useState([])
    const [picture, setPicture] = useState({ url: 'logo192.png', bytes: '' })

    const theme = useTheme();

    const matches = useMediaQuery('(min-width:700px)');



    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setinterestedcourse(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = async () => {

        var formData = new FormData()
        formData.append("studentname", studentname)
        formData.append("fathername", fathername)
        formData.append("mothername", mothername)
        formData.append("dob", dob)
        formData.append("standard", standard)
        formData.append("gender", gender)
        formData.append("mobilenumber", mobilenumber)
        formData.append("email", email)
        formData.append("address", address)
        formData.append("interestedcourse", JSON.stringify(interestedcourse))
        formData.append("picture", picture.bytes)
        var result = await postData('student/insert_student', formData)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Record Submitted Successfully',

            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: 'Server Error '
            })
        }

    }

    const handlePicture = (event) => {

        setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      
       
    }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  


    return (<div className={classes.mainContainer} >
        {matches ? <>
            <Paper elevation={3} className={classes.box}>
                <div className={classes.heading}>
                    Student Entry
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
                                    >
                                        <FormControlLabel control={<Radio />}

                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 18,
                                                    color: 'black'
                                                }
                                            }}

                                            color="default" label="Female" value="Female" onChange={(event) => setGender(event.target.value)} />
                                        <FormControlLabel control={<Radio />} color="default" size="small" sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 18, color: 'black'
                                            }
                                        }} label="Male" value="Male" onChange={(event) => setGender(event.target.value)} />

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
                                value={mobilenumber}
                                onChange={(event) => setMObilenumber(event.target.value)}

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
                            <FormControl sx={{ width: '100%', size: 'small' }}>
                                <InputLabel id="demo-multiple-checkbox-label">Interested Course</InputLabel>
                                <Select
                                    size="small"
                                    fullWidth
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
                        <Grid item xs={12}>

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
                        <Grid item xs={6} className={classes.center}>
                            <IconButton color="primary" aria-label="upload picture" component="label" onChange={handlePicture}>
                                <input hidden accept="image/*" type="file" />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <PhotoCamera color="action" /></div>

                                    <div className={classes.uptext}>  Upload Student Picture</div></div>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar
                                variant="square"
                                alt="Remy Sharp"
                                src={picture.url}
                                sx={{ width: 70, height: 70 }}
                            />
                        </Grid>

                        <Grid item xs={6} className={classes.center}>
                            < Button variant="contained" onClick={handleSubmit} color="success" className={classes.btn}>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <    Button variant="contained" color="error" className={classes.btn}>Reset</Button>
                        </Grid>


                    </Grid>

                </div>

            </Paper></> : <>
            <Paper elevation={3} className={classes.box}>
                <div className={classes.sheading}>
                    Student Entry
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
                                    >
                                        <FormControlLabel sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 18,
                                                color: 'black'
                                            }
                                        }} control={<Radio />} color="default" label="Female"  value="Female" onChange={(event) => setGender(event.target.value)} />
                                        <FormControlLabel sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 18,
                                                color: 'black'
                                                
                                            }
                                        }} control={<Radio />} color="default" size="small"  label="Male" value="Male" onChange={(event) => setGender(event.target.value)} />

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
                                value={mobilenumber}
                                onChange={(event) => setMObilenumber(event.target.value)}

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
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                <Select
                                    size="small"
                                    fullWidth
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={interestedcourse}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag" />}
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
                        <Grid item xs={6} className={classes.center}>
                            <IconButton color="primary" aria-label="upload picture" component="label" onChange={handlePicture}>
                                <input hidden accept="image/*" type="file" />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div>
                                        <PhotoCamera color="action" /></div>

                                    <div className={classes.suptext}>  Upload Student Picture</div></div>
                            </IconButton>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            <Avatar
                                variant="square"
                                alt="Remy Sharp"
                                src={picture.url}
                                sx={{ width: 70, height: 70 }}
                            />
                        </Grid>

                        <Grid item xs={6} className={classes.center}>
                            < Button variant="contained" onClick={handleSubmit} color="success" className={classes.btn}>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <    Button variant="contained" color="error" className={classes.btn}>Reset</Button>
                        </Grid>


                    </Grid>

                </div>

            </Paper>
        </>}
    </div>)
}
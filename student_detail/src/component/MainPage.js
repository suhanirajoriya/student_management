import { Grid, AppBar, Typography, Button } from "@mui/material";
import InsertStudent from "./Insert_Student";
import DisplayStudent from "./Display_Student";
import { usestyles } from "./MainpageCss";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

export default function MainPage() {

    var navigate = useNavigate()

    const handleDisplay = () => {
        navigate('/displaystudent')
    }

    const handleInsert = () => {
        navigate('/insertstudent')

    }

    var classes = usestyles()
    return (<div>

        <AppBar position="static" sx={{ background: 'white', display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: 'black', fontSize: '3vw', fontFamily: 'fantasy', padding: '9px', letterSpacing: '1' }}>STUDENT MANAGEMENT</Typography>
        </AppBar>

        <AppBar position="static" sx={{ background: 'white', display: 'flex', alignItems: 'center' }}>
            <div className={classes.alignBtn}>
                <div className={classes.btndiv}><Button variant="text" sx={{ color: 'black' }} onClick={handleInsert} >Insert Student</Button></div>
                <div className={classes.btndiv}><Button variant="text" sx={{ color: 'black' }} onClick={handleDisplay}>Display All Student</Button></div>
            </div>

        </AppBar>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                  <Routes>

                    <Route element={<InsertStudent />} path="/insertstudent" />
                    <Route element={<DisplayStudent />} path="/displaystudent" />
                </Routes>
            </Grid>


        </Grid>


    </div>)
}
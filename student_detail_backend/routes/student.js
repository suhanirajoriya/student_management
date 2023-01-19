var express = require('express');
const { createPool } = require('mysql');
var upload = require('./multer');
const pool = require('./pool');
var router = express.Router();

router.post('/insert_student', upload.single('picture'), function (req, res, next) {
    var d = new Date(req.body.dob)
    var NoTimeDate = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
    pool.query("insert into student ( studentname, fathername, mothername, dob, standard, gender, phonenumber, email, address, interestedcourse,picture) values (?,?,?,?,?,?,?,?,?,?,?)",
        [req.body.studentname, req.body.fathername, req.body.mothername, NoTimeDate, req.body.standard, req.body.gender, req.body.mobilenumber, req.body.email, req.body.address, req.body.interestedcourse, req.file.filename], function (error, result) {
            if (error) {
                console.log(error)
                return res.status(500).json({ status: false, message: 'Server Error' })
            }
            else {
                return res.status(200).json({ status: true, message: 'Record Submitted Successfully' })

            }
        })
})

router.get('/display_all_data', function (req, res, next) {
    pool.query("select * from student", function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, message: 'Server Error', data: [] })

        }
        else {

            return res.status(200).json({ status: true, message: 'Record Fetch Successfully', data: result })

        }
    })
})

router.post('/delete_student', function (req, res, next) {
    pool.query("delete from student where studentid=?", [req.body.studentid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, message: "Server Eroor" })
        }
        else {
            return res.status(200).json({ status: true, message: "Deleted Successfully" })

        }
    })
})

router.post('/update_student', function (req, res, next) {
    pool.query("update student set studentname=?,fathername=?,mothername=?,dob=?,standard=?,gender=?,email=?,phonenumber=?,address=?, interestedcourse=? where studentid=?", [req.body.studentname, req.body.fathername, req.body.mothername, req.body.dob, req.body.standard, req.body.gender, req.body.email, req.body.phonenumber, req.body.address, req.body.interestedcourse, req.body.studentid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            return res.status(200).json({ status: true, message: 'Update Successfully' })
        }
    })
})

router.post('/update_picture',upload.single('picture'), function (req, res, next) {
    pool.query("update student set picture=? where studentid=?", [req.file.filename,req.body.studentid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, message: 'Server Error' })
        }
        else {
            return res.status(200).json({ status: true, message: 'Picture Update Successfully' })
        }
    })
})

module.exports = router;
const express = require('express')
const router = express.Router()
const Registration = require("../models/registration")

// Confirmation mail
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'cap.edciitd@gmail.com',
        pass: 'mygggtxqyglfsbvb'
    }
}));

//Get
router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find()
        res.status(200).json(
            {
                status: 200,
                length:registrations.length,
                registration: registrations
            }
        )
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

//POST
router.post('/', async (req, res) => {
    const registration = new Registration({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        college: req.body.college,
        question_1: req.body.question_1,
        question_2: req.body.question_2,
        question_3: req.body.question_3,
    })

    var mailOptions = {
        from: 'cap.edciitd@gmail.com',
        to: req.body.email,
        subject: 'Successfully registered for CAP eDC IIT Delhi',
        html: `
        <p>
            Join this WhatsApp group for further notice<br>
            <a href="https://chat.whatsapp.com/Eu0lUBkKhP78ZeHPMiV0UT">https://chat.whatsapp.com/Eu0lUBkKhP78ZeHPMiV0UT</a>
        </p>
        <p>
        <b>Your Response</b>
        </p>
        <p>
            Name:<br>
            <i>${req.body.name}</i>
        </p>
        <p>
            Mobile No:<br>
            <i>${req.body.mobile}</i>
        </p>
        <p>
            Email:<br>
            <i>${req.body.email}</i>
        </p>
        <p>
            College:<br>
            <i>${req.body.college}</i>
        </p>
        <p>
            What qualities do you possess that make you the right candidate for the CA Program?<br>
            <i>${req.body.question_1}</i>
        </p>
        <p>
            How will you take the responsibility and the leadership as a CA to spread the word about eDC IITD?<br>
            <i>${req.body.question_2}</i>
        </p>
        <p>
            Mention some of your work or experience that aligns with the CA program's purpose.<br>
            <i>${req.body.question_3}</i>
        </p>
        `
    };

    try {
        const newRegistration = await registration.save()
        res.status(201).json(
            {
                registration: newRegistration,
                status: 201
            }
        )
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        })
    }
})

module.exports = router
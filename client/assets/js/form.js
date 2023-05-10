// Base URL
// const base_url = window.location.href;
const base_url = 'https://cap.edciitd.com/';

// Register form
const registerForm = document.getElementById('registerForm');
const registerLoader = document.getElementById('registerLoader');

registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    registerLoader.classList.add("display");
    const name = document.getElementById('registerName').value;
    const mobile = document.getElementById('registerMobile').value;
    const email = document.getElementById('registerEmail').value;
    const college = document.getElementById('registerCollege').value;
    const question_1 = document.getElementById('question_1').value;
    const question_2 = document.getElementById('question_2').value;
    const question_3 = document.getElementById('question_3').value;
    const formData = {
        name: name,
        mobile: mobile,
        email: email,
        college: college,
        question_1: question_1,
        question_2: question_2,
        question_3: question_3,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url}api/registration`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status == 201) {
                    swal({
                        title: "Registered successfully",
                        text: "Please check your mail",
                        icon: "success",
                    });
                    document.getElementById('registerName').value = '';
                    document.getElementById('registerMobile').value = '';
                    document.getElementById('registerEmail').value = '';
                    document.getElementById('registerCollege').value = '';
                    document.getElementById('question_1').value = '';
                    document.getElementById('question_2').value = '';
                    document.getElementById('question_3').value = '';
                    registerLoader.classList.remove("display");
                }
                else {
                    swal({
                        title: "Email or Mobile already exist",
                        icon: "info",
                    });
                    registerLoader.classList.remove("display");
                }
            })
    }
    catch (error) {
        console.log('Error:' + error);
        swal({
            title: "Some Error occured",
            icon: "error",
        });
        registerLoader.classList.remove("display");
    }
})


// Contact Form
const contactForm = document.getElementById('contactForm');
const contactLoader = document.getElementById('contactLoader');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    contactLoader.classList.add("display");
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }
    const url = `${base_url}api/message`;
    try {
        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                if (data.status == 201) {
                    swal({
                        title: "Message sent successfully",
                        icon: "success",
                    });
                    document.getElementById('contactName').value = '';
                    document.getElementById('contactEmail').value = '';
                    document.getElementById('contactSubject').value = '';
                    document.getElementById('contactMessage').value = '';
                    contactLoader.classList.remove("display");
                }
                else {
                    swal({
                        title: "Something went wrong, please try again",
                        icon: "info",
                    });
                    contactLoader.classList.remove("display");
                }
            })
    }
    catch (error) {
        console.log('Error:' + error);
        swal({
            title: "Some Error occured",
            icon: "error",
        });
        contactLoader.classList.remove("display");
    }
})
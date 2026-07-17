document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const city = document.getElementById("city");

        const nameError = document.getElementById("nameError");
        const phoneError = document.getElementById("phoneError");
        const emailError = document.getElementById("emailError");
        const cityError = document.getElementById("cityError");
        const successMsg = document.getElementById("successMsg");

        nameError.textContent = "";
        phoneError.textContent = "";
        emailError.textContent = "";
        cityError.textContent = "";
        successMsg.textContent = "";

        // Name Validation
        if (name.value.trim() === "") {
            nameError.textContent = "Please enter your name";
            isValid = false;
        }

        // Mobile Validation
        if (!/^[6-9]\d{9}$/.test(phone.value.trim())) {
            phoneError.textContent = "Enter a valid 10-digit mobile number";
            isValid = false;
        }

        // Email Validation
        if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
            emailError.textContent = "Enter a valid email address";
            isValid = false;
        }

        // City Validation
        if (city.value.trim() === "") {
            cityError.textContent = "Please enter your city";
            isValid = false;
        }

        if (isValid) {

            successMsg.innerHTML =
                '<i class="fa-solid fa-circle-check"></i> Thank you! Our expert will contact you shortly.';

            successMsg.style.color = "#16a34a";
            successMsg.style.fontWeight = "600";

            form.reset();

            setTimeout(() => {
                successMsg.textContent = "";
            }, 5000);
        }

    });

});


// js mailer


// EmailJS Initialize
emailjs.init("rbcYF-ftTP6MUowTJ");


document.getElementById("registrationForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let city = document.getElementById("city").value;


    if(name == "" || phone == "" || email == "" || city == ""){
        document.getElementById("successMsg").innerHTML =
        "Please fill all details";
        return;
    }


    let templateParams = {

        form_name: "Company Registration Consultation Form",

        user_name: name,

        user_email: email,

        user_phone: phone,

        message: "City: " + city

    };


    emailjs.send(
        "service_5j3se2i",
        "template_1fkywz5",
        templateParams
    )
    .then(function(){

        document.getElementById("successMsg").innerHTML =
        "Thank you! Your request has been sent successfully.";

        document.getElementById("registrationForm").reset();

    }, function(error){

        document.getElementById("successMsg").innerHTML =
        "Mail send failed!";

        console.log(error);

    });

});


const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".dropdown > a").forEach(item => {

    item.addEventListener("click", function(e){

        if(window.innerWidth <= 991){

            e.preventDefault();

            this.parentElement.classList.toggle("active");
        }
    });

});
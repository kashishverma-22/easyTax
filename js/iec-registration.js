const iecForm = document.getElementById("iecForm");

iecForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("iecName");
    const phone = document.getElementById("iecPhone");
    const email = document.getElementById("iecEmail");
    const business = document.getElementById("iecBusiness");

    const nameError = document.getElementById("iecNameError");
    const phoneError = document.getElementById("iecPhoneError");
    const emailError = document.getElementById("iecEmailError");
    const businessError = document.getElementById("iecBusinessError");

    const successMsg = document.getElementById("iecSuccessMsg");

    let isValid = true;

    // Reset Errors
    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    businessError.textContent = "";
    successMsg.textContent = "";

    name.style.borderColor = "#ddd";
    phone.style.borderColor = "#ddd";
    email.style.borderColor = "#ddd";
    business.style.borderColor = "#ddd";

    // Name Validation
    if (name.value.trim() === "") {
        nameError.textContent = "Please enter your full name";
        name.style.borderColor = "#dc2626";
        isValid = false;
    }

    // Mobile Validation
    const phonePattern = /^[6-9]\d{9}$/;

    if (phone.value.trim() === "") {
        phoneError.textContent = "Please enter mobile number";
        phone.style.borderColor = "#dc2626";
        isValid = false;
    } else if (!phonePattern.test(phone.value.trim())) {
        phoneError.textContent = "Enter valid 10 digit mobile number";
        phone.style.borderColor = "#dc2626";
        isValid = false;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        emailError.textContent = "Please enter email address";
        email.style.borderColor = "#dc2626";
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter valid email address";
        email.style.borderColor = "#dc2626";
        isValid = false;
    }

    // Business Validation
    if (business.value.trim() === "") {
        businessError.textContent = "Please enter business name";
        business.style.borderColor = "#dc2626";
        isValid = false;
    }

    // Success
    if (isValid) {

        successMsg.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> IEC Registration request submitted successfully.';

        successMsg.style.color = "#16a34a";
        successMsg.style.fontWeight = "600";
        successMsg.style.marginTop = "15px";
        successMsg.style.textAlign = "center";

        iecForm.reset();

        setTimeout(() => {
            successMsg.textContent = "";
        }, 5000);
    }

});

// IEC Registration Form EmailJS
emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("iecForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("iecName").value;
    let phone = document.getElementById("iecPhone").value;
    let email = document.getElementById("iecEmail").value;
    let business = document.getElementById("iecBusiness").value;

    // Validation
    if (name === "" || phone === "" || email === "" || business === "") {

        document.getElementById("iecSuccessMsg").innerHTML =
            "Please fill all details";

        return;
    }

    let templateParams = {

        form_name: "IEC Registration Form",

        user_name: name,

        user_email: email,

        user_phone: phone,

        message: "Business Name: " + business

    };

    emailjs.send(
        "service_5j3se2i",
        "template_1fkywz5",
        templateParams
    )

    .then(function () {

        document.getElementById("iecSuccessMsg").innerHTML =
            "Thank you! Your IEC enquiry has been sent successfully.";

        document.getElementById("iecForm").reset();

    })

    .catch(function (error) {

        console.log(error);

        document.getElementById("iecSuccessMsg").innerHTML =
            "Something went wrong. Please try again.";

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
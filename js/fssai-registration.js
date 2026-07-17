const fssaiForm = document.getElementById("fssaiForm");

fssaiForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fssaiName");
    const phone = document.getElementById("fssaiPhone");
    const email = document.getElementById("fssaiEmail");
    const business = document.getElementById("businessType");

    const nameError = document.getElementById("fssaiNameError");
    const phoneError = document.getElementById("fssaiPhoneError");
    const emailError = document.getElementById("fssaiEmailError");
    const businessError = document.getElementById("businessTypeError");

    const successMsg = document.getElementById("fssaiSuccessMsg");

    let isValid = true;

    nameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    businessError.textContent = "";
    successMsg.textContent = "";

    // Name Validation
    if (name.value.trim() === "") {
        nameError.textContent = "Please enter your full name";
        isValid = false;
    }

    // Mobile Validation
    const phonePattern = /^[6-9]\d{9}$/;

    if (phone.value.trim() === "") {
        phoneError.textContent = "Please enter mobile number";
        isValid = false;
    } else if (!phonePattern.test(phone.value.trim())) {
        phoneError.textContent = "Enter valid 10 digit mobile number";
        isValid = false;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        emailError.textContent = "Please enter email address";
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Enter valid email address";
        isValid = false;
    }

    // Business Type Validation
    if (business.value.trim() === "") {
        businessError.textContent = "Please enter food business type";
        isValid = false;
    }

    if (isValid) {

        successMsg.textContent =
            "Thank you! Our FSSAI expert will contact you shortly.";

        successMsg.style.color = "#16a34a";
        successMsg.style.fontWeight = "600";
        successMsg.style.marginTop = "15px";

        fssaiForm.reset();
    }
});

// FSSAI Form EmailJS
emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("fssaiForm").addEventListener("submit", function(e){

    e.preventDefault();


    let name = document.getElementById("fssaiName").value;
    let phone = document.getElementById("fssaiPhone").value;
    let email = document.getElementById("fssaiEmail").value;
    let businessType = document.getElementById("businessType").value;


    // Validation
    if(name === "" || phone === "" || email === "" || businessType === ""){

        document.getElementById("fssaiSuccessMsg").innerHTML =
        "Please fill all details";

        return;
    }


    let templateParams = {

        form_name: "FSSAI License Form",

        user_name: name,

        user_email: email,

        user_phone: phone,

        message: "Food Business Type: " + businessType

    };


    emailjs.send(
        "service_5j3se2i",
        "template_1fkywz5",
        templateParams
    )

    .then(function(){

        document.getElementById("fssaiSuccessMsg").innerHTML =
        "Thank you! Your FSSAI enquiry has been sent successfully.";

        document.getElementById("fssaiForm").reset();

    })


    .catch(function(error){

        console.log(error);

        document.getElementById("fssaiSuccessMsg").innerHTML =
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
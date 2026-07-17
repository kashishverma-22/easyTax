const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("gstrForm").addEventListener("submit", function (e) {

    e.preventDefault();

    // Inputs
    let name = document.getElementById("gstrName").value.trim();
    let phone = document.getElementById("gstrPhone").value.trim();
    let email = document.getElementById("gstrEmail").value.trim();
    let gstNumber = document.getElementById("gstrNumber").value.trim();

    // Error Fields
    document.getElementById("gstrNameError").innerHTML = "";
    document.getElementById("gstrPhoneError").innerHTML = "";
    document.getElementById("gstrEmailError").innerHTML = "";
    document.getElementById("gstrNumberError").innerHTML = "";
    document.getElementById("gstrSuccessMsg").innerHTML = "";

    let isValid = true;

    // Name Validation
    if (name === "") {
        document.getElementById("gstrNameError").innerHTML = "Enter your full name";
        isValid = false;
    }

    // Phone Validation
    if (phone === "") {
        document.getElementById("gstrPhoneError").innerHTML = "Enter mobile number";
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById("gstrPhoneError").innerHTML = "Enter valid 10 digit mobile number";
        isValid = false;
    }

    // Email Validation
    if (email === "") {
        document.getElementById("gstrEmailError").innerHTML = "Enter email address";
        isValid = false;
    }

    // GST Number Validation
    if (gstNumber === "") {
        document.getElementById("gstrNumberError").innerHTML = "Enter GST Number";
        isValid = false;
    }

    if (!isValid) return;

    // EmailJS Data
    let templateParams = {

        form_name: "GST Return Filing Form",

        user_name: name,

        user_email: email,

        user_phone: phone,

        message: "GST Number : " + gstNumber

    };

    emailjs.send(
        "service_5j3se2i",
        "template_1fkywz5",
        templateParams
    )

    .then(function () {

        document.getElementById("gstrSuccessMsg").style.color = "green";

        document.getElementById("gstrSuccessMsg").innerHTML =
            "Thank you! Your GST Return Filing enquiry has been sent successfully.";

        document.getElementById("gstrForm").reset();

    })

    .catch(function (error) {

        console.log(error);

        document.getElementById("gstrSuccessMsg").style.color = "red";

        document.getElementById("gstrSuccessMsg").innerHTML =
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
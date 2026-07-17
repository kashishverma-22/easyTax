const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {

        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove("active");
            }
        });

        item.classList.toggle("active");

    });

});

emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("itrForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("itrName").value.trim();
    let phone = document.getElementById("itrPhone").value.trim();
    let email = document.getElementById("itrEmail").value.trim();
    let type = document.getElementById("itrType").value;

    let isValid = true;

    // Error Reset
    document.getElementById("itrNameError").innerHTML = "";
    document.getElementById("itrPhoneError").innerHTML = "";
    document.getElementById("itrEmailError").innerHTML = "";
    document.getElementById("itrTypeError").innerHTML = "";
    document.getElementById("itrSuccessMsg").innerHTML = "";

    // Name Validation
    if (name === "") {
        document.getElementById("itrNameError").innerHTML =
            "Please enter your full name";
        isValid = false;
    }

    // Phone Validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
        document.getElementById("itrPhoneError").innerHTML =
            "Enter valid mobile number";
        isValid = false;
    }

    // Email Validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("itrEmailError").innerHTML =
            "Enter valid email address";
        isValid = false;
    }

    // Taxpayer Type Validation
    if (type === "") {
        document.getElementById("itrTypeError").innerHTML =
            "Please select taxpayer type";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    let templateParams = {

        form_name: "ITR Filing Form",

        user_name: name,

        user_email: email,

        user_phone: phone,

        message: "Taxpayer Type : " + type

    };

    emailjs.send(
        "service_5j3se2i",
        "template_1fkywz5",
        templateParams
    )

    .then(function () {

        document.getElementById("itrSuccessMsg").innerHTML =
            "<span style='color:green;'>Thank you! Your ITR enquiry has been sent successfully.</span>";

        document.getElementById("itrForm").reset();

    })

    .catch(function (error) {

        console.log(error);

        document.getElementById("itrSuccessMsg").innerHTML =
            "<span style='color:red;'>Something went wrong. Please try again.</span>";

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
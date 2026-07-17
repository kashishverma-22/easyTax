
emailjs.init("rbcYF-ftTP6MUowTJ");
document.getElementById("trademarkForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("trademarkName").value.trim();
    let phone = document.getElementById("trademarkPhone").value.trim();
    let email = document.getElementById("trademarkEmail").value.trim();
    let brand = document.getElementById("brandName").value.trim();

    let isValid = true;

    // Error Reset

    document.getElementById("trademarkNameError").innerText = "";
    document.getElementById("trademarkPhoneError").innerText = "";
    document.getElementById("trademarkEmailError").innerText = "";
    document.getElementById("brandNameError").innerText = "";

    // Name Validation

    if (name === "") {
        document.getElementById("trademarkNameError").innerText = "Please enter your name";
        isValid = false;
    }

    // Phone Validation

    if (!/^[6-9]\d{9}$/.test(phone)) {
        document.getElementById("trademarkPhoneError").innerText = "Enter valid mobile number";
        isValid = false;
    }

    // Email Validation

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("trademarkEmailError").innerText = "Enter valid email";
        isValid = false;
    }

    // Brand Name Validation

    if (brand === "") {
        document.getElementById("brandNameError").innerText = "Enter brand name";
        isValid = false;
    }

    if (!isValid) return;

    // EmailJS

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {

        form_name: "Trademark Registration",

        user_name: name,

        user_phone: phone,

        user_email: email,

        message: "Brand Name : " + brand

    })

    .then(function () {

        alert("Trademark Registration Request Submitted Successfully!");

        document.getElementById("trademarkForm").reset();

    })

    .catch(function (error) {

        alert("Failed to submit form.");

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
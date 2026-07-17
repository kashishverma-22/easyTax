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

document.addEventListener("DOMContentLoaded", function(){

    const isoForm = document.getElementById("isoForm");


    isoForm.addEventListener("submit", function(e){

        e.preventDefault();


        const name = document.getElementById("isoName").value.trim();
        const phone = document.getElementById("isoPhone").value.trim();
        const email = document.getElementById("isoEmail").value.trim();
        const business = document.getElementById("isoBusiness").value.trim();


        let valid = true;



        // Name Validation
        if(name === ""){
            document.getElementById("isoNameError").innerHTML =
            "Please enter your full name";
            valid = false;
        }
        else{
            document.getElementById("isoNameError").innerHTML = "";
        }



        // Phone Validation
        let phonePattern = /^[0-9]{10}$/;

        if(phone === ""){
            document.getElementById("isoPhoneError").innerHTML =
            "Please enter mobile number";
            valid = false;
        }
        else if(!phonePattern.test(phone)){
            document.getElementById("isoPhoneError").innerHTML =
            "Enter valid 10 digit mobile number";
            valid = false;
        }
        else{
            document.getElementById("isoPhoneError").innerHTML = "";
        }




        // Email Validation
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(email === ""){
            document.getElementById("isoEmailError").innerHTML =
            "Please enter email address";
            valid = false;
        }
        else if(!emailPattern.test(email)){
            document.getElementById("isoEmailError").innerHTML =
            "Enter valid email address";
            valid = false;
        }
        else{
            document.getElementById("isoEmailError").innerHTML = "";
        }




        // Business Validation
        if(business === ""){
            document.getElementById("isoBusinessError").innerHTML =
            "Please enter business name";
            valid = false;
        }
        else{
            document.getElementById("isoBusinessError").innerHTML = "";
        }




        // Success
        if(valid){

            document.getElementById("isoSuccessMsg").innerHTML =
            "✅ Your ISO Certification consultation request has been submitted successfully!";


            document.getElementById("isoSuccessMsg").style.color = "green";


            isoForm.reset();

        }


    });


});

// ISO Certification Form EmailJS
emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("isoForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("isoName").value;
    let phone = document.getElementById("isoPhone").value;
    let email = document.getElementById("isoEmail").value;
    let business = document.getElementById("isoBusiness").value;

    // Validation
    if (name === "" || phone === "" || email === "" || business === "") {

        document.getElementById("isoSuccessMsg").innerHTML =
            "Please fill all details";

        return;
    }

    let templateParams = {

        form_name: "ISO Certification Form",

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

        document.getElementById("isoSuccessMsg").innerHTML =
            "Thank you! Your ISO Certification enquiry has been sent successfully.";

        document.getElementById("isoForm").reset();

    })

    .catch(function (error) {

        console.log(error);

        document.getElementById("isoSuccessMsg").innerHTML =
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
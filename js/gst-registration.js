const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    item.querySelector(".faq-question").addEventListener("click",()=>{

        item.classList.toggle("active");

    });

});

document.getElementById("gstForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("gstName").value.trim();
    let phone = document.getElementById("gstPhone").value.trim();
    let email = document.getElementById("gstEmail").value.trim();
    let business = document.getElementById("gstBusiness").value.trim();


    let valid = true;


    // Clear Errors
    document.getElementById("gstNameError").innerHTML = "";
    document.getElementById("gstPhoneError").innerHTML = "";
    document.getElementById("gstEmailError").innerHTML = "";
    document.getElementById("gstBusinessError").innerHTML = "";
    document.getElementById("gstSuccessMsg").innerHTML = "";


    // Name Validation
    if(name === ""){
        document.getElementById("gstNameError").innerHTML = "Please enter your name";
        valid = false;
    }
    else if(name.length < 3){
        document.getElementById("gstNameError").innerHTML = "Name must be at least 3 characters";
        valid = false;
    }



    // Phone Validation
    let phonePattern = /^[0-9]{10}$/;

    if(phone === ""){
        document.getElementById("gstPhoneError").innerHTML = "Please enter mobile number";
        valid = false;
    }
    else if(!phonePattern.test(phone)){
        document.getElementById("gstPhoneError").innerHTML = "Enter valid 10 digit mobile number";
        valid = false;
    }



    // Email Validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){
        document.getElementById("gstEmailError").innerHTML = "Please enter email address";
        valid = false;
    }
    else if(!emailPattern.test(email)){
        document.getElementById("gstEmailError").innerHTML = "Enter valid email address";
        valid = false;
    }



    // Business Validation
    if(business === ""){
        document.getElementById("gstBusinessError").innerHTML = "Please enter business name";
        valid = false;
    }
    else if(business.length < 3){
        document.getElementById("gstBusinessError").innerHTML = "Business name too short";
        valid = false;
    }



    // Success
    if(valid){

        document.getElementById("gstSuccessMsg").innerHTML =
        "✅ Your request has been submitted successfully!";

        document.getElementById("gstSuccessMsg").style.color = "green";
        document.getElementById("gstForm").reset();

    }

});

// GST Form EmailJS
emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("gstForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("gstName").value;
    let phone = document.getElementById("gstPhone").value;
    let email = document.getElementById("gstEmail").value;
    let business = document.getElementById("gstBusiness").value;

    // Validation
    if (name === "" || phone === "" || email === "" || business === "") {

        document.getElementById("gstSuccessMsg").innerHTML =
            "Please fill all details";

        return;
    }

    let templateParams = {

        form_name: "GST Registration Form",

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

        document.getElementById("gstSuccessMsg").innerHTML =
            "Thank you! Your GST enquiry has been sent successfully.";

        document.getElementById("gstForm").reset();

    })

    .catch(function (error) {

        console.log(error);

        document.getElementById("gstSuccessMsg").innerHTML =
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
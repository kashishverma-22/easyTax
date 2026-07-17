const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.querySelector(".faq-question").addEventListener("click",()=>{

        item.classList.toggle("active");

    });

});


emailjs.init("rbcYF-ftTP6MUowTJ");
document.getElementById("websiteForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("websiteName").value.trim();
    let phone = document.getElementById("websitePhone").value.trim();
    let email = document.getElementById("websiteEmail").value.trim();
    let message = document.getElementById("websiteMessage").value.trim();

    let isValid = true;


    // Clear Errors

    document.getElementById("websiteNameError").innerText = "";
    document.getElementById("websitePhoneError").innerText = "";
    document.getElementById("websiteEmailError").innerText = "";


    // Name Validation

    if(name === ""){
        document.getElementById("websiteNameError").innerText = 
        "Please enter your name";

        isValid = false;
    }


    // Phone Validation

    if(!/^[6-9]\d{9}$/.test(phone)){

        document.getElementById("websitePhoneError").innerText =
        "Enter valid mobile number";

        isValid = false;
    }


    // Email Validation

    if(!/^\S+@\S+\.\S+$/.test(email)){

        document.getElementById("websiteEmailError").innerText =
        "Enter valid email address";

        isValid = false;
    }


    if(!isValid){
        return;
    }



    // EmailJS Send

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {

        form_name : "Website Designing",

        user_name : name,

        user_phone : phone,

        user_email : email,

        message : message

    })

    .then(function(){

        alert("Website Designing Request Submitted Successfully!");

        document.getElementById("websiteForm").reset();

    })

    .catch(function(error){

        alert("Something went wrong!");

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
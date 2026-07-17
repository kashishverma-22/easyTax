const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {

        item.classList.toggle("active");

        const answer = item.querySelector(".faq-answer");

        if(answer.style.display === "block"){
            answer.style.display = "none";
        }else{
            answer.style.display = "block";
        }

    });

});


emailjs.init("rbcYF-ftTP6MUowTJ");
document.getElementById("digitalMarketingForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("dmName");
    let phone = document.getElementById("dmPhone");
    let email = document.getElementById("dmEmail");
    let message = document.getElementById("dmMessage");

    let isValid = true;

    // Reset Errors

    document.getElementById("dmNameError").innerText = "";
    document.getElementById("dmPhoneError").innerText = "";
    document.getElementById("dmEmailError").innerText = "";

    name.classList.remove("error","success");
    phone.classList.remove("error","success");
    email.classList.remove("error","success");



    /* Name Validation */

    if(name.value.trim() === ""){

        document.getElementById("dmNameError").innerText =
        "Please enter your full name";

        name.classList.add("error");

        isValid = false;

    }else{

        name.classList.add("success");
    }



    /* Phone Validation */

    if(!/^[6-9]\d{9}$/.test(phone.value.trim())){

        document.getElementById("dmPhoneError").innerText =
        "Please enter a valid mobile number";

        phone.classList.add("error");

        isValid = false;

    }else{

        phone.classList.add("success");
    }



    /* Email Validation */

    if(!/^\S+@\S+\.\S+$/.test(email.value.trim())){

        document.getElementById("dmEmailError").innerText =
        "Please enter a valid email address";

        email.classList.add("error");

        isValid = false;

    }else{

        email.classList.add("success");
    }



    if(!isValid){
        return;
    }



    // EmailJS Send

    emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {

            form_name: "Digital Marketing Services",

            user_name: name.value,

            user_phone: phone.value,

            user_email: email.value,

            message: message.value

        }
    )

    .then(function(){

        alert("Digital Marketing Request Submitted Successfully!");

        document.getElementById("digitalMarketingForm").reset();

        name.classList.remove("success");
        phone.classList.remove("success");
        email.classList.remove("success");

    })

    .catch(function(error){

        alert("Something went wrong. Please try again.");

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
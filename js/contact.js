emailjs.init("rbcYF-ftTP6MUowTJ");

document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let service = document.getElementById("service").value;
    let message = document.getElementById("message").value.trim();

    if(name==="" || phone==="" || email==="" || service==="" || message===""){

        alert("Please fill all details");

        return;

    }

    let templateParams={

        form_name:"Contact Form",

        user_name:name,

        user_email:email,

        user_phone:phone,

        message:
        "Service : "+service+
        "\n\nMessage : "+message

    };

    emailjs.send(
        "service_5j3se2i",
        "template_1fkywz5",
        templateParams
    )

    .then(function(){

        alert("Thank you! Your enquiry has been sent successfully.");

        document.getElementById("contactForm").reset();

    })

    .catch(function(error){

        console.log(error);

        alert("Something went wrong.");

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
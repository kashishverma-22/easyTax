function calculateProfit() {

    let costPrice = parseFloat(document.getElementById("costPrice").value);
    let sellingPrice = parseFloat(document.getElementById("sellingPrice").value);
    let quantity = parseFloat(document.getElementById("quantity").value);

    if (!costPrice || !sellingPrice || !quantity) {
        alert("Please fill all fields");
        return;
    }

    let revenue = sellingPrice * quantity;
    let totalCost = costPrice * quantity;
    let profit = revenue - totalCost;

    let margin = (profit / revenue) * 100;

    document.getElementById("revenue").innerHTML =
        "₹" + revenue.toLocaleString();

    document.getElementById("profit").innerHTML =
        "₹" + profit.toLocaleString();

    document.getElementById("margin").innerHTML =
        margin.toFixed(2) + "%";
}

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
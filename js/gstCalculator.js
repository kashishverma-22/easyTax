const amount = document.getElementById("amount");
const gstRate = document.getElementById("gstRate");
const includeGst = document.getElementById("includeGst");
const includeGstText = document.getElementById("includeGstText");
const sameState = document.getElementById("sameState");
const sameStateText = document.getElementById("sameStateText");

const baseAmount = document.getElementById("baseAmount");
const cgstLabel = document.getElementById("cgstLabel");
const sgstLabel = document.getElementById("sgstLabel");
const igstLabel = document.getElementById("igstLabel");
const cgstAmount = document.getElementById("cgstAmount");
const sgstAmount = document.getElementById("sgstAmount");
const igstAmount = document.getElementById("igstAmount");
const totalAmount = document.getElementById("totalAmount");
const sameStateTaxLines = document.getElementById("sameStateTaxLines");
const differentStateTaxLines = document.getElementById("differentStateTaxLines");

function formatRupee(value) {
    return "₹ " + Math.round(Math.max(0, value)).toLocaleString("en-IN");
}

function calculateGST() {
    const enteredAmount = Number(amount.value) || 0;
    const rate = Number(gstRate.value) || 0;
    const isInclusive = includeGst.checked;
    const isSameState = sameState.checked;

    let taxableAmount = enteredAmount;
    let gstAmount = enteredAmount * rate / 100;
    let finalAmount = enteredAmount + gstAmount;

    if (isInclusive) {
        taxableAmount = enteredAmount * 100 / (100 + rate);
        gstAmount = enteredAmount - taxableAmount;
        finalAmount = enteredAmount;
    }

    const halfRate = rate / 2;
    const halfTax = gstAmount / 2;

    includeGstText.innerText = isInclusive ? "Yes" : "No";
    sameStateText.innerText = isSameState ? "Yes" : "No";
    cgstLabel.innerText = `CGST Amount (${halfRate}%)`;
    sgstLabel.innerText = `SGST Amount (${halfRate}%)`;
    igstLabel.innerText = `IGST Amount (${rate}%)`;

    baseAmount.innerText = formatRupee(taxableAmount);
    cgstAmount.innerText = formatRupee(halfTax);
    sgstAmount.innerText = formatRupee(halfTax);
    igstAmount.innerText = formatRupee(gstAmount);
    totalAmount.innerText = formatRupee(finalAmount);

    sameStateTaxLines.classList.toggle("hidden", !isSameState);
    differentStateTaxLines.classList.toggle("hidden", isSameState);
}

[amount, gstRate, includeGst, sameState].forEach(input => {
    input.addEventListener("input", calculateGST);
    input.addEventListener("change", calculateGST);
});

calculateGST();


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
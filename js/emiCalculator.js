// =============================
// EMI Calculator
// =============================

const loanAmount = document.getElementById("loanAmount");
const loanRange = document.getElementById("loanRange");

const interestRate = document.getElementById("interestRate");
const interestRange = document.getElementById("interestRange");

const loanYears = document.getElementById("loanYears");
const loanMonths = document.getElementById("loanMonths");

const monthlyEMI = document.getElementById("monthlyEMI");
const principalAmount = document.getElementById("principalAmount");
const totalInterest = document.getElementById("totalInterest");
const totalPayment = document.getElementById("totalPayment");

const calculateBtn = document.getElementById("calculateEMI");
const resetBtn = document.getElementById("resetEMI");


// =============================
// Currency Format
// =============================

function formatCurrency(value) {

    return "₹" + Number(value).toLocaleString("en-IN", {

        maximumFractionDigits: 0

    });

}



// =============================
// Slider Sync
// =============================

loanRange.addEventListener("input", () => {

    loanAmount.value = loanRange.value;

    calculateEMI();

});


loanAmount.addEventListener("input", () => {

    loanRange.value = loanAmount.value;

    calculateEMI();

});


interestRange.addEventListener("input", () => {

    interestRate.value = interestRange.value;

    calculateEMI();

});


interestRate.addEventListener("input", () => {

    interestRange.value = interestRate.value;

    calculateEMI();

});


loanYears.addEventListener("input", calculateEMI);

loanMonths.addEventListener("input", calculateEMI);



// =============================
// EMI Formula
// =============================

function calculateEMI() {

    let P = parseFloat(loanAmount.value);

    let annualRate = parseFloat(interestRate.value);

    let tenureMonths =
        (parseInt(loanYears.value) * 12)
        + parseInt(loanMonths.value);


    if (P <= 0 || annualRate <= 0 || tenureMonths <= 0) {

        return;

    }

    let R = annualRate / 12 / 100;

    let EMI =
        (P * R * Math.pow(1 + R, tenureMonths))
        /
        (Math.pow(1 + R, tenureMonths) - 1);

    let totalPay = EMI * tenureMonths;

    let interest = totalPay - P;



    monthlyEMI.innerHTML =
        formatCurrency(EMI.toFixed(0));

    principalAmount.innerHTML =
        formatCurrency(P);

    totalInterest.innerHTML =
        formatCurrency(interest.toFixed(0));

    totalPayment.innerHTML =
        formatCurrency(totalPay.toFixed(0));



    // Chart Update

    updateChart(P, interest);

    updateYearlyChart(P, interest, tenureMonths);

    updateBarChart(P, interest);

}



// =============================
// Reset
// =============================

resetBtn.addEventListener("click", () => {

    loanAmount.value = 500000;
    loanRange.value = 500000;

    interestRate.value = 8.5;
    interestRange.value = 8.5;

    loanYears.value = 20;
    loanMonths.value = 0;

    calculateEMI();

});



// =============================
// Button
// =============================

calculateBtn.addEventListener("click", calculateEMI);


let emiChart;

function updateChart(principal, interest) {

    const ctx = document.getElementById("emiChart");

    if (emiChart) {
        emiChart.destroy();
    }

    emiChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: ["Principal", "Interest"],

            datasets: [{

                data: [principal, interest],

                backgroundColor: [
                    "#355872",
                    "#7AAACE"
                ],

                borderWidth: 0,

                hoverOffset: 12

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom",

                    labels: {

                        padding: 20,

                        font: {
                            size: 14
                        }

                    }

                }

            }

        }

    });

}

let loanChart;

function updateYearlyChart(principal, interest, months) {

    const ctx = document.getElementById("loanBalanceChart");

    if (loanChart) {
        loanChart.destroy();
    }

    let labels = [];
    let balance = [];

    let yearlyBalance = principal;

    let yearlyReduction = principal / (months / 12);

    for (let i = 1; i <= months / 12; i++) {

        labels.push("Year " + i);

        yearlyBalance -= yearlyReduction;

        if (yearlyBalance < 0) {
            yearlyBalance = 0;
        }

        balance.push(yearlyBalance);

    }

    loanChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [{

                label: "Remaining Balance",

                data: balance,

                borderColor: "#355872",

                backgroundColor: "rgba(122,170,206,.20)",

                fill: true,

                tension: .35

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}

let yearlyChart;

function updateBarChart(principal, interest) {

    const ctx = document.getElementById("yearlyChart");

    if (yearlyChart) {
        yearlyChart.destroy();
    }

    yearlyChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: ["Loan Summary"],

            datasets: [

                {

                    label: "Principal",

                    data: [principal],

                    backgroundColor: "#355872"

                },

                {

                    label: "Interest",

                    data: [interest],

                    backgroundColor: "#7AAACE"

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}

calculateEMI();
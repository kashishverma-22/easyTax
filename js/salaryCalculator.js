//==========================================
// Salary Calculator
//==========================================

const annualCTC = document.getElementById("annualCTC");
const salaryRange = document.getElementById("salaryRange");
const bonus = document.getElementById("bonus");
const deduction = document.getElementById("deduction");
const taxRegime = document.getElementById("taxRegime");

const totalCTC = document.getElementById("totalCTC");
const totalDeduction = document.getElementById("totalDeduction");
const incomeTax = document.getElementById("incomeTax");
const annualTakeHome = document.getElementById("annualTakeHome");
const monthlyTakeHome = document.getElementById("monthlyTakeHome");
const selectedRegime = document.getElementById("selectedRegime");

// Table

const basicMonthly = document.getElementById("basicMonthly");
const basicYearly = document.getElementById("basicYearly");

const bonusMonthly = document.getElementById("bonusMonthly");
const bonusYearly = document.getElementById("bonusYearly");

const deductionMonthly = document.getElementById("deductionMonthly");
const deductionYearly = document.getElementById("deductionYearly");

const taxMonthly = document.getElementById("taxMonthly");
const taxYearly = document.getElementById("taxYearly");

const netMonthly = document.getElementById("netMonthly");
const netYearly = document.getElementById("netYearly");


//==========================================
// Currency
//==========================================

function money(value){

    return "₹" + Number(value).toLocaleString("en-IN",{
        maximumFractionDigits:0
    });

}


//==========================================
// Slider Sync
//==========================================

salaryRange.addEventListener("input",()=>{

    annualCTC.value = salaryRange.value;

    calculateSalary();

});

annualCTC.addEventListener("input",()=>{

    salaryRange.value = annualCTC.value;

    calculateSalary();

});

bonus.addEventListener("input",calculateSalary);
deduction.addEventListener("input",calculateSalary);
taxRegime.addEventListener("change",calculateSalary);


//==========================================
// Salary Formula
//==========================================

function calculateSalary(){

    let ctc = parseFloat(annualCTC.value);

    let bonusPercent = parseFloat(bonus.value);

    let monthlyDeduction = parseFloat(deduction.value);

    let regime = taxRegime.value;


    let bonusAmount = ctc * bonusPercent / 100;

    let gross = ctc;

    let yearlyDeduction = monthlyDeduction * 12;


    // Standard Deduction

    let taxable = gross - 75000;


    let tax = 0;

    if(regime=="new"){

        if(taxable>1200000){

            tax=(taxable-1200000)*0.10;

        }

    }
    else{

        if(taxable>500000){

            tax=(taxable-500000)*0.20;

        }

    }


    let takeHome = gross - yearlyDeduction - tax;


    //==========================
    // Right Card
    //==========================

    totalCTC.innerHTML = money(gross);

    totalDeduction.innerHTML = money(yearlyDeduction);

    incomeTax.innerHTML = money(tax);

    annualTakeHome.innerHTML = money(takeHome);

    monthlyTakeHome.innerHTML = money(takeHome/12);

    selectedRegime.innerHTML =
    regime=="new" ? "New Regime" : "Old Regime";


    //==========================
    // Table
    //==========================

    basicMonthly.innerHTML = money((gross-bonusAmount)/12);

    basicYearly.innerHTML = money(gross-bonusAmount);

    bonusMonthly.innerHTML = money(bonusAmount/12);

    bonusYearly.innerHTML = money(bonusAmount);

    deductionMonthly.innerHTML = money(monthlyDeduction);

    deductionYearly.innerHTML = money(yearlyDeduction);

    taxMonthly.innerHTML = money(tax/12);

    taxYearly.innerHTML = money(tax);

    netMonthly.innerHTML = "<strong>"+money(takeHome/12)+"</strong>";

    netYearly.innerHTML = "<strong>"+money(takeHome)+"</strong>";


    //==========================
    // Charts
    //==========================

    updateSalaryChart(takeHome,tax,yearlyDeduction);

    updateSalaryBar(gross,bonusAmount,tax,yearlyDeduction);

}


//==========================================
// Buttons
//==========================================

document
.getElementById("calculateSalary")
.addEventListener("click",calculateSalary);


document
.getElementById("resetSalary")
.addEventListener("click",()=>{

    annualCTC.value=1500000;

    salaryRange.value=1500000;

    bonus.value=20;

    deduction.value=0;

    taxRegime.value="new";

    calculateSalary();

});


let salaryChart;

function updateSalaryChart(takeHome, tax, deduction) {

    const ctx = document.getElementById("salaryChart");

    if (salaryChart) {
        salaryChart.destroy();
    }

    salaryChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Take Home",
                "Income Tax",
                "Deductions"
            ],

            datasets: [{

                data: [
                    takeHome,
                    tax,
                    deduction
                ],

                backgroundColor: [
                    "#355872",
                    "#7AAACE",
                    "#9CD5FF"
                ],

                borderWidth: 0,
                hoverOffset: 12

            }]

        },

        options: {

            responsive: true,

            cutout: "68%",

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
let salaryBarChart;

function updateSalaryBar(ctc, bonus, tax, deduction) {

    const ctx = document.getElementById("salaryBarChart");

    if (salaryBarChart) {
        salaryBarChart.destroy();
    }

    salaryBarChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "CTC",
                "Bonus",
                "Income Tax",
                "Deductions"
            ],

            datasets: [{

                data: [
                    ctc,
                    bonus,
                    tax,
                    deduction
                ],

                backgroundColor: [
                    "#355872",
                    "#7AAACE",
                    "#9CD5FF",
                    "#0F172A"
                ],

                borderRadius: 8,

                barThickness: 55

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        callback: function(value) {

                            return "₹" + (value / 100000).toFixed(1) + "L";

                        }

                    }

                }

            }

        }

    });

}
//==========================================
// Auto Load
//==========================================

calculateSalary();
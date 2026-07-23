//======================================
// EPF Calculator
//======================================

const basicSalary = document.getElementById("basicSalary");
const salaryRange = document.getElementById("salaryRange");

const employeeContribution = document.getElementById("employeeContribution");
const employerContribution = document.getElementById("employerContribution");

const interestRate = document.getElementById("interestRate");
const investmentYears = document.getElementById("investmentYears");

const employeeAmount = document.getElementById("employeeAmount");
const employerAmount = document.getElementById("employerAmount");
const interestEarned = document.getElementById("interestEarned");
const totalCorpus = document.getElementById("totalCorpus");

const calculateEPF = document.getElementById("calculateEPF");
const resetEPF = document.getElementById("resetEPF");


//======================================
// Indian Currency
//======================================

function formatCurrency(value){

    return "₹" + Number(value).toLocaleString("en-IN",{

        maximumFractionDigits:0

    });

}


//======================================
// Slider Sync
//======================================

salaryRange.addEventListener("input",()=>{

    basicSalary.value=salaryRange.value;

    calculateEPFValue();

});

basicSalary.addEventListener("input",()=>{

    salaryRange.value=basicSalary.value;

    calculateEPFValue();

});

employeeContribution.addEventListener("input",calculateEPFValue);
employerContribution.addEventListener("input",calculateEPFValue);
interestRate.addEventListener("input",calculateEPFValue);
investmentYears.addEventListener("input",calculateEPFValue);


//======================================
// EPF Formula
//======================================

function calculateEPFValue(){

    let salary=parseFloat(basicSalary.value);

    let empPercent=parseFloat(employeeContribution.value);

    let employerPercent=parseFloat(employerContribution.value);

    let rate=parseFloat(interestRate.value)/100;

    let years=parseInt(investmentYears.value);

    if(salary<=0 || years<=0){

        return;

    }

    let monthlyEmp=(salary*empPercent)/100;

    let monthlyEmployer=(salary*employerPercent)/100;

    let monthlyContribution=monthlyEmp+monthlyEmployer;

    let balance=0;

    let totalEmployee=0;

    let totalEmployer=0;

    for(let y=1;y<=years;y++){

        for(let m=1;m<=12;m++){

            balance+=monthlyContribution;

            totalEmployee+=monthlyEmp;

            totalEmployer+=monthlyEmployer;

        }

        balance+=(balance*rate);

    }

    let interest=balance-(totalEmployee+totalEmployer);

    employeeAmount.innerHTML=formatCurrency(totalEmployee);

    employerAmount.innerHTML=formatCurrency(totalEmployer);

    interestEarned.innerHTML=formatCurrency(interest);

    totalCorpus.innerHTML=formatCurrency(balance);



    // Charts

    updateEPFChart(totalEmployee,totalEmployer,interest);

    updateGrowthChart(years,monthlyContribution,rate);

    updateContributionChart(totalEmployee,totalEmployer);

}



//======================================
// Reset
//======================================

resetEPF.addEventListener("click",()=>{

    basicSalary.value=30000;
    salaryRange.value=30000;

    employeeContribution.value=12;
    employerContribution.value=12;

    interestRate.value=8.25;

    investmentYears.value=25;

    calculateEPFValue();

});


//======================================
// Button
//======================================

calculateEPF.addEventListener("click",calculateEPFValue);

let epfChart;

function updateEPFChart(employee, employer, interest){

    const ctx = document.getElementById("epfChart");

    if(epfChart){
        epfChart.destroy();
    }

    epfChart = new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[
                "Employee",
                "Employer",
                "Interest"
            ],

            datasets:[{

                data:[
                    employee,
                    employer,
                    interest
                ],

                backgroundColor:[
                    "#355872",
                    "#7AAACE",
                    "#9CD5FF"
                ],

                borderWidth:0,

                hoverOffset:15

            }]

        },

        options:{

            responsive:true,

            cutout:"68%",

            plugins:{

                legend:{

                    position:"bottom",

                    labels:{
                        font:{
                            size:13
                        },
                        padding:20
                    }

                }

            }

        }

    });

}
let growthChart;

function updateGrowthChart(years,monthlyContribution,rate){

    const ctx=document.getElementById("growthChart");

    if(growthChart){
        growthChart.destroy();
    }

    let labels=[];
    let data=[];

    let balance=0;

    for(let y=1;y<=years;y++){

        for(let m=1;m<=12;m++){

            balance+=monthlyContribution;

        }

        balance+=(balance*rate);

        labels.push("Year "+y);

        data.push(balance.toFixed(0));

    }

    growthChart=new Chart(ctx,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"EPF Growth",

                data:data,

                borderColor:"#355872",

                backgroundColor:"rgba(122,170,206,.20)",

                fill:true,

                tension:.35,

                pointRadius:4,

                pointHoverRadius:6

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{
                legend:{
                    display:false
                }
            }

        }

    });

}
let contributionChart;

function updateContributionChart(employee, employer){

    const ctx=document.getElementById("contributionChart");

    if(contributionChart){
        contributionChart.destroy();
    }

    contributionChart=new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Contribution"],

            datasets:[

                {

                    label:"Employee",

                    data:[employee],

                    backgroundColor:"#355872",

                    borderRadius:8

                },

                {

                    label:"Employer",

                    data:[employer],

                    backgroundColor:"#7AAACE",

                    borderRadius:8

                }

            ]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{
                legend:{
                    position:"bottom"
                }
            }

        }

    });

}

//======================================
// Auto Load
//======================================

calculateEPFValue();
document.addEventListener("DOMContentLoaded", function () {

    const steps = document.querySelectorAll(".steps li");

    const basicPage = document.querySelector(".basic-page");
    const incomePage = document.querySelector(".income-details-page");
    const deductionPage = document.querySelector(".deduction-page");
    const resultSection = document.getElementById("taxResultSection");
    const calculatorSections = document.querySelectorAll(".calculator2");

    const continueBtn = document.getElementById("continueBtn");
    const backBtn = document.getElementById("backBtn");
    const nextBtn = document.getElementById("nextBtn");

    const backBtn1 = document.getElementById("backBtn1");
    const viewCalcBtn = document.getElementById("viewCalcBtn");
    const recalculateBtn = document.getElementById("recalculateBtn");

    const formatRupee = (amount) => `₹${Math.max(0, Math.round(amount)).toLocaleString("en-IN")}`;
    const getValue = (input) => Number(input?.value || 0);

    function hideAllPages() {
        basicPage.style.display = "none";
        incomePage.style.display = "none";
        deductionPage.style.display = "none";
        resultSection.style.display = "none";
        calculatorSections.forEach(section => {
            section.style.display = "none";
        });
    }

    function showCalculatorSection(page) {
        const wrapper = page.closest(".calculator2");

        if (wrapper) {
            wrapper.style.display = "block";
        }

        page.style.display = "block";
    }

    function calculateTaxBySlab(taxableIncome) {
        const slabs = [
            { limit: 400000, rate: 0 },
            { limit: 800000, rate: 0.05 },
            { limit: 1200000, rate: 0.10 },
            { limit: 1600000, rate: 0.15 },
            { limit: 2000000, rate: 0.20 },
            { limit: 2400000, rate: 0.25 },
            { limit: Infinity, rate: 0.30 }
        ];

        let tax = 0;
        let previousLimit = 0;

        slabs.forEach(slab => {
            if (taxableIncome > previousLimit) {
                const slabAmount = Math.min(taxableIncome, slab.limit) - previousLimit;
                tax += slabAmount * slab.rate;
                previousLimit = slab.limit;
            }
        });

        return taxableIncome <= 1200000 ? 0 : tax;
    }

    function getSurcharge(taxableIncome, tax) {
        if (taxableIncome > 50000000) return tax * 0.25;
        if (taxableIncome > 20000000) return tax * 0.25;
        if (taxableIncome > 10000000) return tax * 0.15;
        if (taxableIncome > 5000000) return tax * 0.10;
        return 0;
    }

    function setText(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = formatRupee(value);
        }
    }

    function setBar(id, value, maxValue) {
        const element = document.getElementById(id);
        const height = maxValue > 0 ? Math.max(5, Math.round((value / maxValue) * 180)) : 5;

        if (element) {
            element.style.height = `${height}px`;
        }
    }

    function updateResult() {
        const incomeInputs = incomePage.querySelectorAll("input");
        const deductionInputs = deductionPage.querySelectorAll("input");
        const yearSelect = basicPage.querySelector("select");

        const salary = getValue(incomeInputs[0]);
        const interest = getValue(incomeInputs[1]);
        const rental = getValue(incomeInputs[2]);
        const digitalAssets = getValue(incomeInputs[3]);
        const exemptAllowances = getValue(incomeInputs[4]);
        const homeLoanSelf = getValue(incomeInputs[5]);
        const homeLoanLetOut = getValue(incomeInputs[6]);
        const otherIncome = getValue(incomeInputs[7]);
        const chapterDeductions = Array.from(deductionInputs).reduce((sum, input) => sum + getValue(input), 0);
        const standardDeduction = salary > 0 ? 75000 : 0;

        const totalIncome = salary + interest + rental + digitalAssets + otherIncome;
        const totalDeduction = exemptAllowances + homeLoanSelf + homeLoanLetOut + chapterDeductions + standardDeduction;
        const taxableIncome = Math.max(0, totalIncome - totalDeduction);
        const incomeTax = calculateTaxBySlab(taxableIncome);
        const surcharge = getSurcharge(taxableIncome, incomeTax);
        const cess = (incomeTax + surcharge) * 0.04;
        const taxPayable = incomeTax + surcharge + cess;
        const maxValue = Math.max(totalIncome, taxableIncome, totalDeduction, taxPayable, 1);
        const financialYear = yearSelect?.value || "FY 2025-2026";
        const years = financialYear.match(/\d{4}/g);

        if (years?.length >= 2) {
            document.getElementById("resultTitle").textContent = `Summary - ${financialYear} (AY ${Number(years[1])}-${Number(years[1]) + 1})`;
        }

        setText("resultTotalIncome", totalIncome);
        setText("resultDeduction", totalDeduction);
        setText("resultExempt", exemptAllowances);
        setText("resultStandard", standardDeduction);
        setText("resultChapter", chapterDeductions + homeLoanSelf + homeLoanLetOut);
        setText("resultTaxableIncome", taxableIncome);
        setText("resultTaxPayable", taxPayable);
        setText("resultIncomeTax", incomeTax);
        setText("resultSurcharge", surcharge);
        setText("resultCess", cess);

        setBar("barTotal", totalIncome, maxValue);
        setBar("barTaxable", taxableIncome, maxValue);
        setBar("barDeduction", totalDeduction, maxValue);
        setBar("barPayable", taxPayable, maxValue);
    }
    continueBtn?.addEventListener("click", () => {
        hideAllPages();
        showCalculatorSection(incomePage);
        activeStep(1);
    });

    backBtn?.addEventListener("click", () => {
        hideAllPages();
        basicPage.style.display = "block";
        activeStep(0);
    });

    nextBtn?.addEventListener("click", () => {
        hideAllPages();
        showCalculatorSection(deductionPage);
        activeStep(2);
    });

    backBtn1?.addEventListener("click", () => {
        hideAllPages();
        showCalculatorSection(incomePage);
        activeStep(1);
    });

    viewCalcBtn?.addEventListener("click", () => {
        updateResult();
        hideAllPages();
        resultSection.style.display = "block";
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    recalculateBtn?.addEventListener("click", () => {
        hideAllPages();
        showCalculatorSection(deductionPage);
        activeStep(2);
        deductionPage.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.querySelector(".email-strip")?.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    function activeStep(index) {

        document.querySelectorAll(".steps").forEach(stepBar => {

            const items = stepBar.querySelectorAll("li");

            items.forEach(li => {
                li.classList.remove("active");
            });

            items[index].classList.add("active");
        });

    }
    document.querySelectorAll(".steps").forEach(stepBar => {

        const items = stepBar.querySelectorAll("li");

        items.forEach((item, index) => {

            item.addEventListener("click", () => {

                hideAllPages();

                if (index === 0) {
                    basicPage.style.display = "block";
                }

                if (index === 1) {
                    showCalculatorSection(incomePage);
                }

                if (index === 2) {
                    showCalculatorSection(deductionPage);
                }

                activeStep(index);

            });

        });

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
// function constructor
function Employee(baseSal, HRA, DA, tax, pf){
    this.baseSalary = baseSal;
    this.HRA = HRA;
    this.DA = DA;
    this.taxes = tax;
    this.proviFund = pf;
}

// HRA = 40 percent of base
function calHRA(baseSal){
    return baseSal * 40 / 100;
}

// DA = 20 percent
function calDA(baseSal){
    return baseSal * 20 / 100;
}

// object creation using the function constructors
let emp1 = new Employee(75000, calHRA(75000), calDA(75000), 20000, 15000);

function calGrossSal(emp){
    return emp.baseSalary + emp.HRA + emp.DA;

}

function calNetSal(emp){
    return calGrossSal(emp) - emp.taxes - emp.proviFund;
}

function deductions(emp){
    return emp.taxes + emp.proviFund;
}

console.log("Gross Salary: " + calGrossSal(emp1));
console.log("Total Deductions: " + deductions(emp1));
console.log("Net Salary: " + calNetSal(emp1));
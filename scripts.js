var GLOBALBALANCE;
var inputFlag = false;

function addBalance() {

    const balanceInput = document.getElementById("balanceInput");
    const balanceBtn = document.getElementById("balanceBtn");
    const balanceDisplay = document.getElementById("balanceDisplay")

    //Condition to add balance
    if (balanceInput.value === "") {
        alert("Enter a balance.");
        return;
    }
    if (balanceInput.value < 0) {
        alert("Amount must be positive");
        return;
    }

    //Convert input into currency
    GLOBALBALANCE = Number(balanceInput.value);
    balanceDisplay.innerText = formattedBalance(balanceInput.value);


    //Hide input until reset
    if (balanceInput.style.display === "none") {
        balanceInput.style.display = "block";
        balanceBtn.style.display = "block";
    } else {
        balanceInput.style.display = "none";
        balanceBtn.style.display = "none";
    }

    inputFlag = true;
    clearBalanceInput();

    return;
}


function formattedBalance(input) {

    const balanceInputNumber = parseFloat(input);
    const balance = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(balanceInputNumber);

    return balance;
}


function addInfo() {

    const descriptionValue = document.getElementById("description").value;
    const amountValue = document.getElementById("amount").value;
    const inOutValue = document.getElementById("inOut").value;
    const dateValue = document.getElementById("date").value;

    //Conditions to add transactions
    if (inputFlag === false) {
        alert("Enter a balance.");
        return;
    }
    if (amountValue === "") {
        alert("Enter an amount.");
        return;
    }
    if (amountValue < 0) {
        alert("Amount must be positive.");
        return;
    }
    if (checkInputInOut(inOutValue) == false) {
        alert("Must input + / -.");
        return;
    }
        
    updateBalance(inOutValue, amountValue);
    createHistoryElement(descriptionValue, amountValue, inOutValue, dateValue);
    updateColor();
    clearInputFields();

    return;
}


function checkInputInOut(input) {
    if (input == "+" || input == "-") {
        return true;
    } else {
        return false;
    }
}


function updateBalance(change, amount) {

    const balanceDisplay = document.getElementById("balanceDisplay")
    GLOBALBALANCE = Number(GLOBALBALANCE);
    amount = Number(amount);

    if (change === "+") {
        GLOBALBALANCE += amount;
    } else {
        GLOBALBALANCE -= amount;
    }
    
    balanceDisplay.innerText = formattedBalance(GLOBALBALANCE);

    return;
}


function createHistoryElement(description, amount, inOut, date) {

    const table = document.getElementById("history").querySelector("tbody");
    const tr = document.createElement("tr");
    const formattedAmount = formattedBalance(amount);

    tr.innerHTML = `
        <td>${description}</td>
        <td>${inOut}${formattedAmount}</td>
        <td>${date}</td>
        <td><button id="deleteBtn" onclick="deleteRow(this)">X</button></td>
    `;

    table.appendChild(tr);
    return;
}


function deleteRow(button) {

    //Get deleted rows information about transaction amount
    const row = button.closest("tr");
    const amountInfo = row.getElementsByTagName("td")[1];
    const amount = amountInfo.textContent || amountInfo.innerText;

    //Inverse the transaction to get correct balance
    //.replace converts the currency value to a numeric value so it can be calculated
    if (amount.startsWith("+")) {
        updateBalance("-", Number(amount.replace(/[^0-9.-]+/g, "")));
    } else if (amount.startsWith("-")) {
        updateBalance("-", Number(amount.replace(/[^0-9.-]+/g, "")));
    }

    row.remove();
}


function clearBalanceInput() {
    document.getElementById("balanceInput").value = "";
    return;
}


function clearInputFields() {
    document.getElementById("inputForm").reset();
    return;
}


function sortTable() {

    var filter = document.getElementById("sortOptions").value;
    var table = document.getElementById("history");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            var amount = td.textContent || td.innerText;
            if (filter === "all") {
                tr[i].style.display = "";
            } else if (filter === "positive" && amount.startsWith("+")) {
                tr[i].style.display = "";
            } else if (filter === "negative" && amount.startsWith("-")) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    return;
}


function updateColor() {

    var table = document.getElementById("history");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            var amount = td.textContent || td.innerText;
            if (amount.startsWith("+")) {
                td.style.color = "green";
            } else if (amount.startsWith("-")) {
                td.style.color = "red";
            }
        }
    }

    return;
}
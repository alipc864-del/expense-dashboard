const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");
const searchInput = document.getElementById("searchInput");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateDashboard() {
    let income = 0;
    let expenses = 0;

    transactions.forEach(function (transaction) {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    const balance = income - expenses;

    balanceElement.textContent = balance.toLocaleString();
incomeElement.textContent = income.toLocaleString();
expensesElement.textContent = expenses.toLocaleString();ر

    renderTransactions();
}

function renderTransactions() {
    const search = searchInput.value.toLowerCase();

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction, index) {
        if (!transaction.description.toLowerCase().includes(search)) {
            return;
        }

        const div = document.createElement("div");
        div.className = "transaction";

        div.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <span>${transaction.type === "income" ? "Income" : "Expense"}</span>
            </div>

            <div>
                <span class="transaction-amount ${transaction.type}">
                    ${transaction.type === "income" ? "+" : "-"}
                    ${transaction.amount.toLocaleString()} 
                </span>

                <button class="delete-btn" onclick="deleteTransaction(${index})">
                    ×
                </button>
            </div>
        `;

        transactionList.appendChild(div);
    });
}

addBtn.addEventListener("click", function () {
    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (description === "" || amount <= 0) {
        return;
    }

    transactions.push({
        description: description,
        amount: amount,
        type: type
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    descriptionInput.value = "";
    amountInput.value = "";

    updateDashboard();
});

searchInput.addEventListener("input", function () {
    renderTransactions();
});

function deleteTransaction(index) {
    transactions.splice(index, 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateDashboard();
}

updateDashboard();


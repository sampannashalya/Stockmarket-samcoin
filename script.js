let stockPrice = 100.00;
let holdings = 0;
let totalInvestment = 0;
let pnl = 0;

function updateStockPrice() {
    let change = (Math.random() - 0.5) * 5;
    stockPrice = Math.max(50, stockPrice + change);
    document.getElementById("stock-price").innerText = `$${stockPrice.toFixed(2)}`;
    updatePnl();
}

function buyStock() {
    let qty = parseInt(document.getElementById("quantity").value);
    if (isNaN(qty) || qty <= 0) return alert("Enter a valid quantity!");

    let cost = qty * stockPrice;
    holdings += qty;
    totalInvestment += cost;

    recordTransaction("Bought", qty, cost);
    updatePnl();
}

function sellStock() {
    let qty = parseInt(document.getElementById("quantity").value);
    if (isNaN(qty) || qty <= 0) return alert("Enter a valid quantity!");
    if (qty > holdings) return alert("Not enough shares to sell!");

    let earnings = qty * stockPrice;
    holdings -= qty;

    if (holdings === 0) {
        totalInvestment = 0;
    } else {
        totalInvestment -= (totalInvestment / (holdings + qty)) * qty;
    }

    recordTransaction("Sold", qty, earnings);
    updatePnl();
}

function updatePnl() {
    pnl = (holdings * stockPrice) - totalInvestment;
    let pnlElement = document.getElementById("pnl");

    pnlElement.innerText = pnl.toFixed(2);
    pnlElement.className = pnl > 0 ? "profit" : pnl < 0 ? "loss" : "neutral";
}

function recordTransaction(type, qty, amount) {
    let history = document.getElementById("transaction-history");
    let item = document.createElement("li");
    item.innerText = `${type} ${qty} shares at $${stockPrice.toFixed(2)} each - Total: $${amount.toFixed(2)}`;
    history.prepend(item);
}

setInterval(updateStockPrice, 5000);
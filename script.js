document.addEventListener("DOMContentLoaded", function () {
    const checkBalanceBtn = document.getElementById("checkBalanceBtn");
    const walletIdInput = document.getElementById("walletId");
    const balanceCard = document.getElementById("balanceCard");
    const userName = document.getElementById("userName");
    const userType = document.getElementById("userType");
    const lastPaid = document.getElementById("lastPaid");
    const balanceAmount = document.getElementById("balanceAmount");
    const errorCard = document.getElementById("errorCard");
    const errorMessage = document.getElementById("errorMessage");

    checkBalanceBtn.addEventListener("click", async () => {
        const walletId = walletIdInput.value;

        if (!walletId) {
            // Display an error message or handle accordingly
            return;
        }

        // Hide the error card if it was previously displayed
        errorCard.classList.add("hidden");
        
        // Hide the balance card initially
        balanceCard.classList.add("hidden");

        // Display loading animation and message
        userName.textContent = 'Loading...';
        userType.textContent = '';
        lastPaid.textContent = '';
        balanceAmount.textContent = 'Checking balance...';

        // Assume the API fetching logic as before
        const apiKey = 'keyu5NxlinuYFmOfG';
        const baseId = 'appkYzaSZokXwritc';
        const tableName = 'redeemcode';

        try {
            const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=code%3D"${walletId}"`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            const data = await response.json();

            if (data.records.length > 0) {
                const name = data.records[0].fields.name;
                const balance = data.records[0].fields.balance;
                const userTypeValue = data.records[0].fields.type;
                const lastPaidValue = data.records[0].fields.lastpaid;

                // Display the result card only when a valid wallet ID is found
                balanceCard.classList.remove("hidden");

                userName.textContent = `Hello, ${name}!`;
                userType.textContent = `Work Type: ${userTypeValue}`;
                lastPaid.textContent = `Last Payment Date: ${lastPaidValue}`;
                balanceAmount.textContent = `Wallet Balance: ₹${balance}`;
            } else {
                // Display the error card with the error message
                errorCard.classList.remove("hidden");
                errorMessage.textContent = 'Wallet ID not found. Please check the ID and try again.';
                // Clear other fields
                userName.textContent = '';
                userType.textContent = '';
                lastPaid.textContent = '';
                balanceAmount.textContent = '';
            }
        } catch (error) {
            // Handle other errors
            userName.textContent = 'An error occurred while fetching data.';
            balanceAmount.textContent = '';
        }
    });
});

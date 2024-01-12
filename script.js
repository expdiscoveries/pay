document.addEventListener("DOMContentLoaded", function () {
    // Element references
    const checkBalanceBtn = document.getElementById("checkBalanceBtn");
    const walletIdInput = document.getElementById("walletId");
    const balanceCard = document.getElementById("balanceCard");
    const userName = document.getElementById("userName");
    const userType = document.getElementById("userType");
    const lastPaid = document.getElementById("lastPaid");
    const balanceAmount = document.getElementById("balanceAmount");
    const errorCard = document.getElementById("errorCard");
    const errorMessage = document.getElementById("errorMessage");

    // Click event listener for the Check Balance button
    checkBalanceBtn.addEventListener("click", async () => {
        const walletId = walletIdInput.value.trim();

        if (!walletId) {
            showErrorMessage('Please enter a Wallet ID.');
            return;
        }

        // Add spinner to button and disable it
        showButtonSpinner(true);

        // API fetching logic
        try {
            const response = await fetchBalance(walletId);
            if (response) {
                showBalance(response);
            } else {
                showErrorMessage('Wallet ID not found. Please check the ID and try again.');
            }
        } catch (error) {
            showErrorMessage('An error occurred while fetching data. Please try again later.');
        } finally {
            // Remove spinner from button and re-enable it
            showButtonSpinner(false);
        }
    });

    function showButtonSpinner(isLoading) {
        if (isLoading) {
            checkBalanceBtn.innerHTML = '<div class="button-spinner"></div>';
            checkBalanceBtn.classList.add('spinner-active');
        } else {
            checkBalanceBtn.textContent = 'Check Balance';
            checkBalanceBtn.classList.remove('spinner-active');
        }
    }

    function showBalance(data) {
        userName.textContent = `Hello, ${data.name}!`;
        userType.textContent = `Work Type: ${data.type}`;
        lastPaid.textContent = `Last Payment Date: ${data.lastPaid}`;
        balanceAmount.textContent = `Wallet Balance: ₹${data.balance}`;

        balanceCard.classList.remove("hidden");
        errorCard.classList.add("hidden");
    }

    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorCard.classList.remove("hidden");
        balanceCard.classList.add("hidden");
    }

    async function fetchBalance(walletId) {
        const apiKey = 'keyu5NxlinuYFmOfG';
        const baseId = 'appkYzaSZokXwritc';
        const tableName = 'redeemcode';
        const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula=code%3D"${walletId}"`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await response.json();
        return data.records.length > 0 ? data.records[0].fields : null;
    }
});

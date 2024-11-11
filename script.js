// Function to calculate the fuel mismatch
function calculateFuel() {
    const fuelChange = parseFloat(document.getElementById('fuelChange').value);
    const fuelUnit = document.getElementById('fuelUnit').value;
    const originalFuel = parseFloat(document.getElementById('originalFuel').value);
    const currentFuel = parseFloat(document.getElementById('currentFuel').value);

    // Convert fuel change to pounds
    let fuelChangePounds = 0;
    if (fuelUnit === "litres") {
        fuelChangePounds = fuelChange * 1.76;
    } else if (fuelUnit === "gallons") {
        fuelChangePounds = fuelChange * 6.67;
    }

    // Calculate mismatch limit
    const mismatchLimit = (fuelChangePounds * 0.01) + 2400;

    // Calculate the fuel mismatch
    const fuelMismatch = (originalFuel + fuelChangePounds) - currentFuel;

    // Display the result
    const result = document.getElementById('result');
    if (Math.abs(fuelMismatch) <= mismatchLimit) {
        result.innerHTML = <p>Fuel mismatch is <strong>GOOD</strong>: ${fuelMismatch.toFixed(2)} lbs (Limit: ${mismatchLimit.toFixed(2)} lbs)</p>;
    } else {
        result.innerHTML = <p>Fuel mismatch is <strong>BAD</strong>: ${fuelMismatch.toFixed(2)} lbs (Limit: ${mismatchLimit.toFixed(2)} lbs)</p>;
    }
}

// Function to handle "Enter" key press
document.getElementById('fuelForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        let focusNext = false;
        
        // Find the currently focused input element
        const activeElement = document.activeElement;

        // Move to the next element in the form
        const formElements = Array.from(document.querySelectorAll('input, select, button'));
        const currentIndex = formElements.indexOf(activeElement);
        if (currentIndex !== -1 && currentIndex < formElements.length - 1) {
            formElements[currentIndex + 1].focus(); // Focus next element
        }
    }
});

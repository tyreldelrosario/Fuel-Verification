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
    result.innerHTML = `<p>${fuelMismatch.toFixed(2)} lbs (Limit: ${mismatchLimit.toFixed(2)} lbs)</p>`;
    
    // Apply color class based on result
    if (Math.abs(fuelMismatch) <= mismatchLimit) {
        result.firstElementChild.classList.add("good-result");
        result.firstElementChild.classList.remove("bad-result");
        result.firstElementChild.innerHTML = `Fuel mismatch is <strong>GOOD</strong>: ${fuelMismatch.toFixed(2)} lbs (Limit: ${mismatchLimit.toFixed(2)} lbs)`;
    } else {
        result.firstElementChild.classList.add("bad-result");
        result.firstElementChild.classList.remove("good-result");
        result.firstElementChild.innerHTML = `Fuel mismatch is <strong>BAD</strong>: ${fuelMismatch.toFixed(2)} lbs (Limit: ${mismatchLimit.toFixed(2)} lbs)`;
    }
}

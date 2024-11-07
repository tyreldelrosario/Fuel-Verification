function calculateFuel() {
    // Get input values
    const fuelChange = parseFloat(document.getElementById("fuelChange").value);
    const fuelUnit = document.getElementById("fuelUnit").value;
    const originalFuel = parseFloat(document.getElementById("originalFuel").value);
    const currentFuel = parseFloat(document.getElementById("currentFuel").value);

    // Convert fuel change to pounds
    let fuelChangeInPounds;
    if (fuelUnit === "litres") {
        fuelChangeInPounds = fuelChange * 1.76;
    } else if (fuelUnit === "gallons") {
        fuelChangeInPounds = fuelChange * 6.67;
    }

    // Calculate mismatch limit
    const mismatchLimit = 2400 + (fuelChangeInPounds * 0.01);

    // Calculate fuel mismatch
    const fuelMismatch = Math.abs((originalFuel + fuelChangeInPounds) - currentFuel);

    // Display result
    const resultDiv = document.getElementById("result");
    if (fuelMismatch <= mismatchLimit) {
        resultDiv.innerHTML = `<p>Good: Fuel mismatch (${fuelMismatch.toFixed(2)} lbs) is within limit (${mismatchLimit.toFixed(2)} lbs).</p>`;
    } else {
        resultDiv.innerHTML = `<p>Bad: Fuel mismatch (${fuelMismatch.toFixed(2)} lbs) exceeds limit (${mismatchLimit.toFixed(2)} lbs).</p>`;
    }
}

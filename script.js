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
    let resultText = '';
    let resultClass = '';
    let tickIcon = '';

    // Determine if the result is pass or fail
    if (Math.abs(fuelMismatch) <= mismatchLimit) {
        resultText = `PASS: ${fuelMismatch.toFixed(2)} lbs`;
        resultClass = 'good'; // Pass -> green
        tickIcon = '✔️'; // Checkmark for "PASS"
    } else {
        resultText = `FAIL: ${fuelMismatch.toFixed(2)} lbs`;
        resultClass = 'bad'; // Fail -> red
        tickIcon = '❌'; // Cross for "FAIL"
    }

    // Add "+/-" in front of the limit and set the result text colour to PASS or FAIL
    result.innerHTML = `<p class="${resultClass}"><span class="icon">${tickIcon}</span>${resultText}</p>
    <p class="limit" style="color: ${resultClass === 'good' ? '#155724' : '#721c24'};">Limit: +/-${mismatchLimit.toFixed(2)} lbs</p>`;
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

        if (currentIndex !== -1) {
            // Skip fuelUnit select if it's the current element
            let nextIndex = currentIndex + 1;
            if (formElements[nextIndex] === document.getElementById('fuelUnit')) {
                nextIndex++; // Skip the select if it's the next element
            }

            if (nextIndex < formElements.length) {
                // Focus the next element
                formElements[nextIndex].focus();
            }

            // If it's the last input, click the calculate button
            if (nextIndex === formElements.length - 1) {
                document.querySelector('button').click(); // Trigger the button's click event
            }
        }
    }
});

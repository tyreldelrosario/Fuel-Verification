function calculateFuel() {
    const fuelChangeField = document.getElementById('fuelChange');
    const fuelUnit = document.getElementById('fuelUnit');
    const originalFuelField = document.getElementById('originalFuel');
    const currentFuelField = document.getElementById('currentFuel');

    const fuelChange = parseFloat(fuelChangeField.value.replace(/,/g, ''));
    const originalFuel = parseFloat(originalFuelField.value.replace(/,/g, ''));
    const currentFuel = parseFloat(currentFuelField.value.replace(/,/g, ''));

    resetErrorStyles();

    let isError = false;
    if (isNaN(fuelChange) || fuelChangeField.value === '') {
        setErrorStyle(fuelChangeField);
        isError = true;
    }
    if (isNaN(originalFuel) || originalFuelField.value === '') {
        setErrorStyle(originalFuelField);
        isError = true;
    }
    if (isNaN(currentFuel) || currentFuelField.value === '') {
        setErrorStyle(currentFuelField);
        isError = true;
    }

    if (isError) {
        displayError("Please fill in all fields with valid numbers");
        return;
    }

    let fuelChangePounds = fuelUnit.value === "litres" ? fuelChange * 1.76 : fuelChange * 6.67;

    const mismatchLimit = (fuelChangePounds * 0.01) + 2400;
    const fuelMismatch = (originalFuel + fuelChangePounds) - currentFuel;

    const result = document.getElementById('result');
    const isPass = Math.abs(fuelMismatch) <= mismatchLimit;
    const resultText = isPass ? `PASS: ${fuelMismatch.toFixed(2)} lbs` : `FAIL: ${fuelMismatch.toFixed(2)} lbs`;
    const resultClass = isPass ? 'good' : 'bad';
    const tickIcon = isPass ? '✔️' : '❌';

    result.innerHTML = `<p class="${resultClass}"><span class="icon">${tickIcon}</span>${resultText}</p>
                        <p class="limit">Limit: +/-${mismatchLimit.toFixed(2)} lbs</p>`;
}

function displayError(message) {
    document.getElementById('result').innerHTML = `<p class="error">${message}</p>`;
}

function setErrorStyle(inputElement) {
    inputElement.classList.add('input-error');
}

function resetErrorStyles() {
    document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
}

// Remove error highlight when input is focused
document.querySelectorAll('input[type="number"], select').forEach(input => {
    input.addEventListener('focus', () => input.classList.remove('input-error'));
    input.addEventListener('input', () => input.value = input.value.replace(/,/g, ''));
});

// Add event listener for Enter key on the form to handle both navigation and submit
document.getElementById('fuelForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const formElements = Array.from(document.querySelectorAll('input, select, button'));
        const activeElement = document.activeElement;
        const activeIndex = formElements.indexOf(activeElement);

        // Check if the active element is the last input/select field (not the unit selection)
        if (activeIndex === formElements.length - 2) {
            // If it is the last element, trigger the button click
            document.querySelector('button').click();
        } else {
            // Otherwise, move to the next element, skipping the unit selection
            let nextIndex = activeIndex + 1;
            if (formElements[nextIndex] === document.getElementById('fuelUnit')) nextIndex++; // Skip unit selection
            if (nextIndex < formElements.length) {
                formElements[nextIndex].focus(); // Focus the next element
            }
        }
    }
});

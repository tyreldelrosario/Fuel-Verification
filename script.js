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

document.getElementById('fuelForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const activeElement = document.activeElement;
        const formElements = Array.from(document.querySelectorAll('input, select, button'));
        let currentIndex = formElements.indexOf(activeElement);

        if (currentIndex !== -1) {
            let nextIndex = currentIndex + 1;
            if (formElements[nextIndex] === document.getElementById('fuelUnit')) nextIndex++;

            // If the current element is the last form element, trigger the button click
            if (nextIndex >= formElements.length) {
                document.querySelector('button').click();  // Trigger button click immediately
            } else {
                formElements[nextIndex].focus(); // Otherwise, focus the next element
            }
        }
    }
});

/* General Styles */
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 10px;
    background-color: #f4f4f4;
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden; /* Prevent page scrolling */
    -webkit-overflow-scrolling: touch; /* For smoother scrolling on iOS */
}

h1 {
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px; /* Max width for larger screens */
    gap: 15px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

label {
    font-size: 1em;
    margin-bottom: 5px;
}

input, select, button {
    font-size: 1em;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
    transition: transform 0.2s ease; /* Prevent zooming when focused */
}

input:focus, select:focus, button:focus {
    outline: none;
    transform: scale(1); /* Prevent zooming on input focus */
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

#result p {
    font-size: 1.1em;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
    color: #333;
}

/* New layout for fuel change and unit selection */
.fuel-change-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.fuel-change-container label {
    margin-bottom: 0; /* Remove bottom margin for label */
}

.fuel-change-container input,
.fuel-change-container select {
    width: auto; /* Allow input and select to adjust width based on content */
}

/* iPhone and small screen optimizations */
@media (max-width: 600px) {
    body {
        padding: 20px;
        background-color: #e9ecef;
    }

    h1 {
        font-size: 1.3em;
        margin-bottom: 15px;
    }

    form {
        padding: 15px;
        border-radius: 8px;
        box-shadow: none;
    }

    label {
        font-size: 0.95em;
    }

    input, select, button {
        font-size: 1.1em;
        padding: 10px;
    }

    #result p {
        font-size: 1em;
    }
}

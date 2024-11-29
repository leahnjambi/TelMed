document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = event.target;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const summaryEmail = document.getElementById('summaryEmail');
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    


    if (password !== confirmPassword) {
        event.preventDefault();
        alert('Passwords do not match.');
        return;
    }

    const isValid = form.checkValidity();

    if (!isValid) {
        event.preventDefault();
        alert('Please fill out all fields.');
    }
    emailInput.addEventListener('input', () => {
        const email = emailInput.value;
        if (!validateEmail(email)) {
            emailError.textContent = 'Invalid email format';
        } else {
            emailError.textContent = '';
        }
        updateSummary();
    });


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateEmail(emailInput.value)) {
            confirmationMessage.textContent = 'Form successfully submitted!';
            form.reset();
        } else {
            emailError.textContent = 'Please enter a valid email';
        }
    });

    function validateEmail(email) {
        const req = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    function updateSummary() {
        summaryEmail.textContent = emailInput.value;
    }
    //send data to server
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    const data = await response.json();

    if (response.ok) {
        alert('New user created!');
    } else {
        alert(data.message);
    }
    
    if (response.ok) {
        alert('Successfully registered in');
           // Redirect to home page
           window.location.href = './index.html';
        } else {
            alert(data.message);
        }
    
    
});
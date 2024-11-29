document.getElementById('loginform').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send data to server
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Successfully logged in');
           // Redirect to home page
           window.location.href = './index.html';
        } else {
            alert(data.message);
        }
    
});

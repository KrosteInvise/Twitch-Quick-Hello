const sendMessage = (username, phrases) => {
    const input = document.querySelector('[data-a-target="chat-input"]');
    if (!input) return;

    const greeting = phrases[Math.floor(Math.random() * phrases.length)] || "peepoSitHey";
    const message = `@${username} ${greeting} `;

    input.focus();
    input.click();

    document.execCommand('selectAll', false, null);
    document.execCommand('delete', false, null);
    
    input.dispatchEvent(new InputEvent('beforeinput', {
        inputType: 'insertText', data: message, bubbles: true
    }));
    document.execCommand('insertText', false, message);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    input.dispatchEvent(new InputEvent('input', { inputType: 'insertText', data: ' ', bubbles: true }));

    setTimeout(() => {
        const enter = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true };
        input.dispatchEvent(new KeyboardEvent('keydown', enter));
        
        const sendBtn = document.querySelector('[data-a-target="chat-send-button"]');
        if (sendBtn && !sendBtn.disabled) sendBtn.click();
    }, 100);
};

const inject = () => {
    const buttonBars = document.querySelectorAll('.seventv-chat-message-buttons');
    
    buttonBars.forEach(bar => {
        if (bar.querySelector('.hello-btn')) return;

        const container = bar.closest('.seventv-chat-message-container');
        const nameEl = container?.querySelector('.seventv-chat-user');
        if (!nameEl) return;

        const btn = document.createElement('div');
        btn.className = 'seventv-button hello-btn';
        btn.innerHTML = '👋';
        btn.style.cssText = 'display:flex; align-items:center; justify-content:center; cursor:pointer; padding:0 4px; font-size:14px;';

        btn.onclick = () => {
            chrome.storage.local.get(['greetings'], (res) => {
                const list = res.greetings || ["привет HeyGuys"];
                sendMessage(nameEl.textContent.trim(), list);
            });
        };
        bar.prepend(btn);
    });
};

setInterval(inject, 400);
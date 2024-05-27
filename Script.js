document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        addMessage('user', userInput);
        await getResponse(userInput);
        document.getElementById('user-input').value = '';
    }
}

function addMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getResponse(question) {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer SUA_API_KEY` // Substitua 'SUA_API_KEY' pela sua chave de API real
            },
            body: JSON.stringify({
                prompt: question,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7
            })
        });
        const data = await response.json();
        if (data.choices && data.choices[0].text) {
            addMessage('bot', data.choices[0].text.trim());
        } else {
            addMessage('bot', 'Desculpe, não consegui encontrar uma resposta.');
        }
    } catch (error) {
        addMessage('bot', 'Ocorreu um erro ao obter a resposta.');
        console.error('Error:', error);
    }
}

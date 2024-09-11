
// app.js

// Get the OpenAI API key from your OpenAI account
const apiKey = 'your-api-key'; 

document.getElementById('submitBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === "") return;

    // Show user question in the chat box
    const responseBox = document.getElementById('response');
    responseBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Clear input field
    document.getElementById('userInput').value = '';

    // Call the OpenAI API
    const response = await askGPT(userInput);
    
    // Show AI response in the chat box
    responseBox.innerHTML += `<p><strong>AI:</strong> ${response}</p>`;
    responseBox.scrollTop = responseBox.scrollHeight; // Auto scroll to the bottom
});

// Function to call the OpenAI API
async function askGPT(question) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // or "gpt-4" if available
            messages: [{"role": "user", "content": question}],
            max_tokens: 100
        })
    };
    
    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, there was an error. Please try again later.";
    }
}

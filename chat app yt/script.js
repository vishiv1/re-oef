const johnSelectorBTN = document.querySelector('#john-selector');
const janeSelectorBTN = document.querySelector('#jane-selector');
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button') /*--1*/

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Jageer' ? 'blue-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>   
    </div>
`                                                                      /*--2*/

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'Jageer'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`    /*--5*/

    if (name ==='Jageer') {
        johnSelectorBTN.classList.add('active-person')
        janeSelectorBTN.classList.remove('active-person')
    }
    if (name ==='Jane') {
        janeSelectorBTN.classList.add('active-person')
        johnSelectorBTN.classList.remove('active-person')
    }

    chatInput.focus()                                             /*--7*/
}

johnSelectorBTN.onclick = () => updateMessageSender(`Jageer`)
janeSelectorBTN.onclick = () => updateMessageSender(`Jane`)   /*--6*/

const sendMessage = (e) => {
    e.preventDefault()                                                 /*--3*/

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,

    }                                                     /*--4*/
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(message))
    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight            /*--7*/
}

chatInputForm.addEventListener('submit', sendMessage)    /*--8*/

clearChatBtn.addEventListener('click', () =>{
    localStorage.clear()
    chatMessages.innerHTML = ''
})                                                            /*--9*/

"use strict";

// Elementen
const johnSelectorBTN  = document.querySelector("#john-selector");
const janeSelectorBTN  = document.querySelector("#jane-selector");
const chatHeader       = document.querySelector(".chat-header");
const chatMessages     = document.querySelector(".chat-messages");
const chatInputForm    = document.querySelector(".chat-input-form");
const chatInput        = document.querySelector(".chat-input");
const clearChatBtn     = document.querySelector(".clear-chat-button");

// Constantes
const STORAGE_KEY = "messages";

// Huidige zender
let messageSender = "John";

// Helpers
const formatTime = (date = new Date()) =>
    new Intl.DateTimeFormat("nl-BE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(date);

const loadMessages = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const saveMessages = (msgs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
};

const messages = loadMessages();

const createMessageElement = ({ sender, text, timestamp }) => {
    // Gebruik textContent om HTML-injectie te voorkomen
    const wrapper = document.createElement("div");
    wrapper.className = `message ${sender === "John" ? "blue-bg" : "gray-bg"}`;

    const senderEl = document.createElement("div");
    senderEl.className = "message-sender";
    senderEl.textContent = sender;

    const textEl = document.createElement("div");
    textEl.className = "message-text";
    textEl.textContent = text;

    const timeEl = document.createElement("div");
    timeEl.className = "message-timestamp";
    timeEl.textContent = timestamp;

    wrapper.append(senderEl, textEl, timeEl);
    return wrapper;
};

const renderAllMessages = () => {
    chatMessages.innerHTML = "";
    const frag = document.createDocumentFragment();
    messages.forEach((m) => frag.appendChild(createMessageElement(m)));
    chatMessages.appendChild(frag);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const setActivePersonUI = () => {
    chatHeader.textContent = `${messageSender} chatting...`;
    chatInput.placeholder = `Type here, ${messageSender}...`;

    const isJohn = messageSender === "John";
    johnSelectorBTN.classList.toggle("active-person", isJohn);
    janeSelectorBTN.classList.toggle("active-person", !isJohn);
};

const updateMessageSender = (name) => {
    messageSender = name;
    setActivePersonUI();
    chatInput.focus();
};

const sendMessage = (e) => {
    e.preventDefault();

    const text = chatInput.value.trim();
    if (!text) return; // niets versturen als het leeg is

    const message = {
        sender: messageSender,
        text,
        timestamp: formatTime()
    };

    messages.push(message);
    saveMessages(messages);

    chatMessages.appendChild(createMessageElement(message));
    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Events
document.addEventListener("DOMContentLoaded", () => {
    renderAllMessages();
    setActivePersonUI();
    chatInput.focus();
});

johnSelectorBTN.addEventListener("click", () => updateMessageSender("John"));
janeSelectorBTN.addEventListener("click", () => updateMessageSender("Jane"));

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY); // alleen onze key verwijderen
    messages.length = 0; // array leegmaken in memory
    chatMessages.innerHTML = "";
    chatInput.focus();
});

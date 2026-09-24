(function () {
  class QueryChatbot {
    constructor(config = {}) {
      // Default configurations
      this.config = {
        theme: config.theme || 'light',
        greeting: config.greeting || 'Hello! I am your AI assistant. How can I help you navigate your document database today?',
        apiUrl: 'https://query-backend-v8pn.onrender.com/api/query' || 'http://localhost:7000/api/query',
        secretKey: config.secretKey || null,
        suggestions: config.suggestions || [
          ''
        ]
      };

      this.widgetId = 'query-chatbot-widget-' + Math.random().toString(36).substring(2, 9);
      this.chatHistory = [];
      this.init();
    }

    init() {
      // Load stylesheet dynamically if not already loaded
      if (!document.querySelector('link[href="/chatbot-plugin.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/chatbot-plugin.css';
        document.head.appendChild(link);
      }

      // Create main widget wrapper
      this.widgetContainer = document.createElement('div');
      this.widgetContainer.id = this.widgetId;
      this.widgetContainer.className = 'query-chatbot-root';
      
      // Apply theme to root wrapper
      if (this.config.theme === 'dark') {
        this.widgetContainer.classList.add('dark');
      }

      // Inject HTML layout
      this.widgetContainer.innerHTML = `
        <!-- Trigger Button -->
        <button class="query-chatbot-trigger" aria-label="Open Chat">
          <svg viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        <!-- Chat Window -->
        <div class="query-chatbot-window" data-lenis-prevent>
          <!-- Header -->
          <div class="query-chatbot-header">
            <div class="query-chatbot-header-info">
              <div class="query-chatbot-avatar">
                <img src="https://res.cloudinary.com/dctw36awu/image/upload/v1786784127/ChatGPT_Image_Aug_15_2026_01_55_23_PM.png" alt="Query Logo" class="query-chatbot-avatar-img" />
              </div>
              <div>
                <h4 class="query-chatbot-header-title">Query Support</h4>
                <div class="query-chatbot-header-status">
                  AI Agent • <a href="http://linkedin.com/in/shibin-siyad-k" target="_blank" rel="noopener noreferrer" class="query-chatbot-header-brand-link">Powered by Shibin Siyad</a>
                </div>
              </div>
            </div>
            <div class="query-chatbot-header-actions">
              <button class="query-chatbot-fullscreen-btn" aria-label="Toggle Fullscreen">
                <!-- Maximize Icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="query-chatbot-icon-maximize">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <!-- Minimize Icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="query-chatbot-icon-minimize" style="display: none;">
                  <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="query-chatbot-close-btn" aria-label="Close Chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Messages Viewport -->
          <div class="query-chatbot-messages" data-lenis-prevent>
            <div class="query-chatbot-msg-row bot">
              <div class="query-chatbot-msg-bubble">
                ${this.formatMessage(this.config.greeting)}
              </div>
            </div>
            
            <!-- Suggestions Area -->
            <div class="query-chatbot-suggestions">
              ${this.config.suggestions.map(s => `
                <button class="query-chatbot-suggestion-btn" data-query="${this.escapeHTML(s)}">${this.escapeHTML(s)}</button>
              `).join('')}
            </div>
          </div>

          <!-- Footer Input -->
          <div class="query-chatbot-footer">
            <div class="query-chatbot-input-wrapper">
              <input type="text" class="query-chatbot-input" placeholder="Type a message..." />
            </div>
            <button class="query-chatbot-send-btn" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(this.widgetContainer);

      // Cache DOM elements
      this.triggerBtn = this.widgetContainer.querySelector('.query-chatbot-trigger');
      this.chatWindow = this.widgetContainer.querySelector('.query-chatbot-window');
      this.fullscreenBtn = this.widgetContainer.querySelector('.query-chatbot-fullscreen-btn');
      this.closeBtn = this.widgetContainer.querySelector('.query-chatbot-close-btn');
      this.sendBtn = this.widgetContainer.querySelector('.query-chatbot-send-btn');
      this.messageInput = this.widgetContainer.querySelector('.query-chatbot-input');
      this.messagesContainer = this.widgetContainer.querySelector('.query-chatbot-messages');

      // Bind context
      this.toggleChat = this.toggleChat.bind(this);
      this.toggleFullscreen = this.toggleFullscreen.bind(this);
      this.handleSendMessage = this.handleSendMessage.bind(this);

      // Register listeners
      this.triggerBtn.addEventListener('click', this.toggleChat);
      this.fullscreenBtn.addEventListener('click', this.toggleFullscreen);
      this.closeBtn.addEventListener('click', this.toggleChat);
      this.sendBtn.addEventListener('click', this.handleSendMessage);
      
      this.messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleSendMessage();
        }
      });

      this.registerSuggestionListeners();
    }

    toggleChat() {
      const isOpen = this.chatWindow.classList.toggle('open');
      this.triggerBtn.classList.toggle('active', isOpen);
      if (isOpen) {
        this.messageInput.focus();
        this.scrollToBottom();
      }
    }

    toggleFullscreen() {
      this.chatWindow.classList.toggle('fullscreen');
      this.scrollToBottom();
    }

    registerSuggestionListeners() {
      const suggestionsContainer = this.widgetContainer.querySelector('.query-chatbot-suggestions');
      if (!suggestionsContainer) return;
      
      const suggestionBtns = suggestionsContainer.querySelectorAll('.query-chatbot-suggestion-btn');
      suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const queryText = btn.getAttribute('data-query');
          if (queryText) {
            this.messageInput.value = queryText;
            this.handleSendMessage();
            suggestionsContainer.remove();
          }
        });
      });
    }

    async handleSendMessage() {
      const text = this.messageInput.value.trim();
      if (!text) return;

      this.addMessage(text, 'user');
      this.messageInput.value = '';
      this.scrollToBottom();

      const suggestionsContainer = this.widgetContainer.querySelector('.query-chatbot-suggestions');
      if (suggestionsContainer) {
        suggestionsContainer.remove();
      }

      this.showTypingIndicator();

      // Add user message to history cache
      this.chatHistory.push({ role: 'user', text: text });
      
      // Get the last 8 messages to pass as context
      const historyToSend = this.chatHistory.slice(-8);

// api calling
      try {
        const response = await fetch(this.config.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: text,
            message: text,
            secretKey: this.config.secretKey,
            history: historyToSend
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.removeTypingIndicator();

        const botResponse = data.response || data.answer || data.text || data.reply || data.message || "No response received.";
        
        // Add model/bot response to history cache
        this.chatHistory.push({ role: 'model', text: botResponse });
        
        this.addMessage(botResponse, 'bot');
      } catch (error) {
        console.error("Error communicating with chatbot API:", error);
        this.removeTypingIndicator();
        this.addMessage("Sorry, I am having trouble connecting to the support server. Please try again later.", 'bot');
      }
      this.scrollToBottom();
    }
//- end 
    addMessage(text, sender) {
      const msgRow = document.createElement('div');
      msgRow.className = `query-chatbot-msg-row ${sender}`;
      msgRow.innerHTML = `
        <div class="query-chatbot-msg-bubble">
          ${this.formatMessage(text)}
        </div>
      `;
      this.messagesContainer.appendChild(msgRow);
    }

    showTypingIndicator() {
      if (this.widgetContainer.querySelector('.query-chatbot-typing-row')) return;
      const typingRow = document.createElement('div');
      typingRow.className = 'query-chatbot-msg-row bot query-chatbot-typing-row';
      typingRow.innerHTML = `
        <div class="query-chatbot-typing-bubble">
          <div class="query-chatbot-dot"></div>
          <div class="query-chatbot-dot"></div>
          <div class="query-chatbot-dot"></div>
        </div>
      `;
      this.messagesContainer.appendChild(typingRow);
      this.scrollToBottom();
    }

    removeTypingIndicator() {
      const typingRow = this.widgetContainer.querySelector('.query-chatbot-typing-row');
      if (typingRow) typingRow.remove();
    }

    scrollToBottom() {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }

    formatMessage(text) {
      let escaped = this.escapeHTML(text);
      // Replace **text** with <strong>text</strong>
      let formatted = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Replace *text* with <em>text</em>
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Replace \n with <br />
      formatted = formatted.replace(/\n/g, '<br />');
      return formatted;
    }

    getMockResponse(query) {
      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
        return "Hi there! How can I assist you with your document database search today?";
      }
      if (lowerQuery.includes('document') || lowerQuery.includes('file') || lowerQuery.includes('upload')) {
        return "You can upload and catalog your documents using the upload options inside the 'Catalog Database' page on your Admin/Vendor dashboard.";
      }
      if (lowerQuery.includes('search') || lowerQuery.includes('vector')) {
        return "We support full semantic vector search! This allows you to find documents based on their conceptual meaning rather than just matching exact keywords.";
      }
      if (lowerQuery.includes('api') || lowerQuery.includes('key') || lowerQuery.includes('credential')) {
        return "You can find your API Access Token and integration credentials inside the 'API Configurations' tab in your profile settings.";
      }
      return "Thank you for asking! I'm currently in mock demo mode. Once the backend RAG pipeline is fully integrated, I will be able to search and answer from your actual uploaded documents!";
    }

    // Programmatic cleanup
    destroy() {
      if (this.widgetContainer) {
        this.widgetContainer.remove();
      }
    }
  }

  // Expose class globally
  window.QueryChatbot = QueryChatbot;

  // Auto-initialize unless explicitly opted-out
  const currentScript = document.currentScript;
  if (currentScript) {
    const autoInit = currentScript.getAttribute('data-auto-init');
    if (autoInit !== 'false') {
      const theme = currentScript.getAttribute('data-theme') || 'light';
      const greeting = currentScript.getAttribute('data-greeting');
      const apiUrl = currentScript.getAttribute('data-api-url');
      const secretKey = currentScript.getAttribute('data-secret-key');
      const suggestionsStr = currentScript.getAttribute('data-suggestions');
      const suggestions = suggestionsStr ? suggestionsStr.split(',').map(s => s.trim()) : undefined;

      const initWidget = () => {
        window.chatbotInstance = new QueryChatbot({
          theme,
          greeting,
          apiUrl,
          secretKey,
          suggestions
        });
      };

      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', initWidget);
      } else {
        initWidget();
      }
    }
  }
})();

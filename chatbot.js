/* Airnet AI Chatbot Logic */

// Toggle chat window open/closed
function toggleChatWindow(initialMessage = null) {
    const chatWindow = document.getElementById('ai-chat-window');
    if (!chatWindow) return;

    if (chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        chatWindow.classList.add('flex');
        
        // Add initial message if provided and chat is empty or new context is set
        if (initialMessage) {
            addChatMessage(initialMessage, 'user');
            
            // Generate bot reply after short delay
            setTimeout(() => {
                const query = initialMessage.toLowerCase();
                const response = getBotResponse(query);
                addChatMessage(response.text, 'bot', response.products);
            }, 800);
        }
    } else {
        chatWindow.classList.add('hidden');
        chatWindow.classList.remove('flex');
    }
}

// Function to add messages to the chat window
function addChatMessage(text, type, productsList = []) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;

    const div = document.createElement('div');
    div.className = `flex flex-col ${type === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`;
    
    const contentClass = type === 'user' 
        ? 'bg-primary text-on-primary rounded-tr-none rounded-2xl p-4 max-w-[85%] text-body-md shadow-sm' 
        : 'bg-surface-container-high text-on-surface rounded-tl-none rounded-2xl p-4 max-w-[85%] text-body-md shadow-sm';

    // Build product HTML if products are attached
    let productsHtml = '';
    if (productsList && productsList.length > 0) {
        productsHtml = `
            <div class="mt-3 grid grid-cols-1 gap-2 w-full max-w-sm">
                ${productsList.map(prod => `
                    <div class="bg-white border border-outline-variant/30 rounded-xl p-3 flex gap-3 shadow-sm hover:border-primary/30 transition-all">
                        <img src="${prod.image}" alt="${prod.name}" class="w-16 h-16 object-cover rounded-lg">
                        <div class="flex-1 flex flex-col justify-between min-w-0">
                            <h4 class="text-[13px] font-semibold text-primary truncate leading-tight">${prod.name}</h4>
                            <div class="flex items-center justify-between mt-1">
                                <span class="text-[13px] font-bold text-primary">₹${prod.price.toLocaleString('en-IN')}</span>
                                <button onclick="addToCart('${prod.id}'); event.stopPropagation();" class="bg-primary text-on-primary text-[10px] font-semibold px-2.5 py-1.5 rounded-full hover:opacity-90 active:scale-95 transition-all">
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    div.innerHTML = `
        <div class="${contentClass}">
            <div>${text}</div>
            ${productsHtml}
        </div>
        <span class="text-[10px] text-on-surface-variant/40 mt-1 ${type === 'user' ? 'mr-1' : 'ml-1'}">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    `;
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulated NLP Keyword Matcher
function getBotResponse(query) {
    query = query.toLowerCase();
    
    // Quick Replies responses
    if (query === 'timings') {
        return {
            text: "Our Kalkaji showroom is open **daily from 9:00 AM to 10:00 PM**. Feel free to drop by for live product demonstrations!",
            products: []
        };
    }
    
    if (query === 'book visit') {
        // Trigger page action
        setTimeout(() => {
            openBookingModal('In-Store Consultation');
        }, 1000);
        return {
            text: "Opening the Booking Form for you! You can choose your preferred date, time, and service. We'll send a confirmation to your number.",
            products: []
        };
    }
    
    if (query === 'ac catalog') {
        const matching = products.filter(p => p.category === 'ac').slice(0, 3);
        return {
            text: "Here are some of our best-selling Air Conditioners. You can add them to your cart directly, or filter details on the main page.",
            products: matching
        };
    }

    if (query === 'laundry catalog') {
        const matching = products.filter(p => p.category === 'laundry').slice(0, 3);
        return {
            text: "Check out our premium washing machines and laundry solutions. Designed for maximum efficiency and fabric care.",
            products: matching
        };
    }
    
    // Fuzzy search responses
    if (query.includes('mitsubishi') || query.includes('heavy')) {
        const matching = products.filter(p => p.brand === 'MITSUBISHI');
        return {
            text: "Mitsubishi Electric is renowned for silent cooling and exceptional durability. Here are our top models:",
            products: matching
        };
    }
    
    if (query.includes('electrolux') || query.includes('washing') || query.includes('laundry')) {
        const matching = products.filter(p => p.brand === 'ELECTROLUX');
        return {
            text: "Electrolux represents premium European engineering, offering intelligent washing technology and eco-friendly silent cooling. Here are some options:",
            products: matching
        };
    }

    if (query.includes('panasonic')) {
        const matching = products.filter(p => p.brand === 'PANASONIC');
        return {
            text: "Panasonic offers smart appliances with MirAIe IoT integration. Here are our featured smart devices:",
            products: matching
        };
    }

    if (query.includes('ac') || query.includes('cooling') || query.includes('conditioner') || query.includes('aircon')) {
        const matching = products.filter(p => p.category === 'ac').slice(0, 3);
        return {
            text: "We have split, window, and cassette ACs from top brands like Mitsubishi, Electrolux, and Panasonic. Here are some recommended products:",
            products: matching
        };
    }

    if (query.includes('price') || query.includes('cost') || query.includes('how much') || query.includes('cheap')) {
        return {
            text: "Our premium ACs range from **₹29,990** (Lloyd Window) to **₹98,500** (O'General Cassette). Our washing machines start from **₹24,990**. We also offer interest-free EMI plans in-store! Which category are you interested in?",
            products: []
        };
    }

    if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('maps') || query.includes('store')) {
        return {
            text: "We are located at **Shop No. K-106, Lower Ground Floor, Opposite Haldiram, Kalkaji, Delhi-110019**. Drop by to test our products or click the 'Open in Maps' button on the showroom section below.",
            products: []
        };
    }

    if (query.includes('contact') || query.includes('phone') || query.includes('number') || query.includes('whatsapp') || query.includes('call')) {
        return {
            text: "You can reach us at **07942694246** or WhatsApp us at **+917942694246**. You can also schedule a direct phone consultation using our booking tool.",
            products: []
        };
    }
    
    // Default reply
    return {
        text: "I'd be happy to help with that! Try typing words like **'AC'**, **'Mitsubishi'**, **'Price'**, or **'Location'** to see relevant details, or select one of the quick options below.",
        products: []
    };
}

// Form submit event handler
function handleChatSubmit() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;

    const text = chatInput.value.trim();
    if (!text) return;

    // Add user message to log
    addChatMessage(text, 'user');
    chatInput.value = '';

    // Simulate thinking and answer
    setTimeout(() => {
        const response = getBotResponse(text);
        addChatMessage(response.text, 'bot', response.products);
    }, 1000);
}

// Initializing Quick Reply Buttons inside Chat window
function renderChatQuickReplies() {
    const chatWindow = document.getElementById('ai-chat-window');
    if (!chatWindow) return;

    // Check if quick replies element already exists
    let qrDiv = document.getElementById('chat-quick-replies');
    if (!qrDiv) {
        qrDiv = document.createElement('div');
        qrDiv.id = 'chat-quick-replies';
        qrDiv.className = 'flex flex-wrap gap-1.5 p-3 bg-surface border-t border-outline-variant/20 overflow-x-auto whitespace-nowrap scrollbar-none';
        
        const replies = [
            { label: '🕒 Store Timings', action: 'timings' },
            { label: '❄️ Show ACs', action: 'ac catalog' },
            { label: '🧺 Laundry Collection', action: 'laundry catalog' },
            { label: '📅 Book Showroom Visit', action: 'book visit' }
        ];

        qrDiv.innerHTML = replies.map(r => `
            <button onclick="triggerQuickReply('${r.action}')" class="text-[11px] font-semibold bg-white text-primary border border-outline-variant/50 px-3 py-1.5 rounded-full hover:bg-primary hover:text-on-primary hover:border-primary active:scale-95 transition-all cursor-pointer">
                ${r.label}
            </button>
        `).join('');

        // Insert before the chat input area
        const formArea = chatWindow.querySelector('div.border-t');
        chatWindow.insertBefore(qrDiv, formArea);
    }
}

// Trigger Quick Reply Action
function triggerQuickReply(action) {
    const labels = {
        'timings': "What are your showroom timings?",
        'ac catalog': "Show me your AC Collection.",
        'laundry catalog': "Show me your Washing Machines.",
        'book visit': "I want to book a showroom visit."
    };
    
    // Add User Message
    addChatMessage(labels[action] || action, 'user');
    
    // Simulate Response
    setTimeout(() => {
        const response = getBotResponse(action);
        addChatMessage(response.text, 'bot', response.products);
    }, 800);
}

// Initialize quick replies when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for chatbot UI to be in DOM
    setTimeout(renderChatQuickReplies, 500);
});

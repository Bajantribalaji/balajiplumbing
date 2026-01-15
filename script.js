/* ==========================================
   BALAJI PLUMBING - JAVASCRIPT
   Interactive Features & Functionality
   ========================================== */

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    showOfferPopupAfterDelay();
});

function initializeApp() {
    setupScrollAnimations();
    setupMobileMenu();
    setupDarkMode();
    setupChatbot();
    registerServiceWorker();
}

// ========== OFFER POPUP ==========

function showOfferPopupAfterDelay() {
    const offerPopup = document.getElementById('offerPopup');
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 2.5 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2500);
    
    // Show offer popup after 3 seconds
    setTimeout(() => {
        if (offerPopup) {
            offerPopup.style.display = 'flex';
        }
    }, 3000);
}

function closeOfferPopup() {
    const offerPopup = document.getElementById('offerPopup');
    if (offerPopup) {
        offerPopup.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            offerPopup.style.display = 'none';
        }, 300);
    }
}

// ========== NAVIGATION ==========

function toggleMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ========== DARK MODE ==========

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function setupDarkMode() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// ========== SCROLL ANIMATIONS ==========

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section, .service-card, .pricing-card, .review-card').forEach(el => {
        observer.observe(el);
    });
}

// ========== SMOOTH SCROLLING ==========

function scrollToBooking() {
    closeOfferPopup();
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========== CONTACT FUNCTIONS ==========

function makeCall() {
    window.location.href = 'tel:+919392545262';
}

function openWhatsApp() {
    const message = encodeURIComponent('Hello! I am interested in your plumbing services. Please provide more details.');
    window.open(`https://wa.me/919392545262?text=${message}`, '_blank');
}

function shareReferral() {
    const referralLink = 'Balaji Plumbing Services - Join now and get ₹500 cashback! https://balajiplumbing.com';
    
    if (navigator.share) {
        navigator.share({
            title: 'Balaji Plumbing Services',
            text: referralLink,
            url: 'https://balajiplumbing.com'
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(referralLink).then(() => {
            showNotification('Referral link copied to clipboard!');
        });
    }
}

// ========== BOOKING FORM ==========

function submitBooking(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const bookingData = {
        name: form.querySelector('input[type="text"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        service: form.querySelector('select').value,
        date: form.querySelectorAll('input[type="date"]')[0].value,
        time: form.querySelector('input[type="time"]').value,
        address: form.querySelector('textarea').value,
        whatsapp: form.querySelector('#whatsapp').checked,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (demo)
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    // Show success notification
    showNotification('✓ Booking confirmed! Check WhatsApp for confirmation.');
    
    // Send WhatsApp message if enabled
    if (bookingData.whatsapp) {
        const whatsappMessage = encodeURIComponent(
            `Booking Confirmation\nName: ${bookingData.name}\nService: ${bookingData.service}\nDate: ${bookingData.date}\nTime: ${bookingData.time}\nWill call you shortly!`
        );
        setTimeout(() => {
            window.open(`https://wa.me/919392545262?text=${whatsappMessage}`, '_blank');
        }, 1000);
    }
    
    form.reset();
    setTimeout(() => {
        scrollToBooking();
    }, 500);
}

// ========== CONTACT FORM ==========

function submitContact(event) {
    event.preventDefault();
    
    const form = event.target;
    const contactData = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        message: form.querySelector('textarea').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (demo)
    const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    existingContacts.push(contactData);
    localStorage.setItem('contacts', JSON.stringify(existingContacts));
    
    showNotification('✓ Message sent! We will contact you shortly.');
    form.reset();
}

// ========== FAQ TOGGLE ==========

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ========== QUOTATION & INVOICE ==========

function viewQuotation() {
    showNotification('Opening invoice...');
    setTimeout(() => {
        alert('Invoice: BP-2026-0155\nAmount: ₹3,980\nStatus: Completed\nDownload PDF from the quotation section.');
    }, 500);
}

function downloadPDF() {
    showNotification('📥 Generating PDF...');
    setTimeout(() => {
        // This is a demo - in real implementation, generate actual PDF
        const pdfContent = `
        BALAJI PLUMBING SERVICES
        Invoice #BP-2026-0155
        Date: 15-01-2026
        
        Services: Leak Detection & Repair - ₹2,500
        Materials: Pipes, Fittings - ₹1,200
        Labor: ₹800
        Discount (BALAJI10): -₹520
        
        TOTAL: ₹3,980
        `;
        
        // Download simulation
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdfContent));
        element.setAttribute('download', 'Invoice_BP-2026-0155.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        showNotification('✓ Invoice downloaded successfully!');
    }, 1000);
}

function shareInvoice() {
    const invoiceData = 'Invoice #BP-2026-0155, Amount: ₹3,980. View at: https://balajiplumbing.com/invoice/BP-2026-0155';
    
    if (navigator.share) {
        navigator.share({
            title: 'Invoice - Balaji Plumbing',
            text: invoiceData
        });
    } else {
        navigator.clipboard.writeText(invoiceData).then(() => {
            showNotification('✓ Invoice link copied!');
        });
    }
}

function viewCoupons() {
    const coupons = [
        { code: 'BALAJI10', discount: '10%', status: 'Active' },
        { code: 'FESTIVE25', discount: '25%', status: 'Active' },
        { code: 'REFER500', discount: '₹500 cashback', status: 'Active' },
        { code: 'NEWYEAR20', discount: '20%', status: 'Expired' }
    ];
    
    let message = '🎉 Active Coupons:\n\n';
    coupons.forEach(coupon => {
        if (coupon.status === 'Active') {
            message += `${coupon.code} - ${coupon.discount} OFF\n`;
        }
    });
    
    showNotification(message);
}

// ========== CHATBOT ==========

function setupChatbot() {
    const chatbotHeader = document.querySelector('.chatbot-header');
    if (chatbotHeader) {
        chatbotHeader.addEventListener('click', toggleChatbot);
    }
}

function toggleChatbot() {
    const chatbotWidget = document.getElementById('chatbotWidget');
    chatbotWidget.classList.toggle('collapsed');
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const userMessage = chatInput.value.trim();
    
    if (!userMessage) return;
    
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    const userMessageEl = document.createElement('div');
    userMessageEl.className = 'chat-message user';
    userMessageEl.textContent = userMessage;
    chatMessages.appendChild(userMessageEl);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // AI Response (Demo)
    setTimeout(() => {
        const botResponse = getAIChatbotResponse(userMessage);
        const botMessageEl = document.createElement('div');
        botMessageEl.className = 'chat-message bot';
        botMessageEl.textContent = botResponse;
        chatMessages.appendChild(botMessageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

function getAIChatbotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    const responses = {
        'service': 'We offer plumbing repairs, drainage solutions, installation, heating systems, and home maintenance. Which service interests you?',
        'price': 'Our pricing starts from ₹500 for basic service. Premium packages at ₹1,999/month. Would you like more details?',
        'booking': 'You can book online through our website or call +91 11223 34455. Instant confirmation within 30 minutes!',
        'emergency': 'Emergency service available 24/7! Call +91 11223 34455 or WhatsApp for immediate assistance.',
        'location': 'We serve Proddatur, Andhra Pradesh. Would you like to book a service?',
        'warranty': '6 months warranty on all repairs. Free service if same issue occurs within warranty period.',
        'contact': 'Phone: +91 11223 34455\nWhatsApp: +91 11223 34455\nEmail: Bajantribalaji939@gmail.com',
        'discount': 'Use code BALAJI10 for 10% discount! Also check our referral program for ₹500 cashback.',
        'hello': 'Hello! 👋 How can I help you today? Ask about our services, pricing, or booking.',
        'hi': 'Hi there! 👋 Welcome to Balaji Plumbing Services. How can I assist?'
    };
    
    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }

    return 'Thanks for your question! Please call +91 9392545262 or email Bajantribalaji939@gmail.com for more details. 😊';
}

// ========== NOTIFICATIONS ==========

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #0066FF, #0052CC);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 102, 255, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
        font-weight: 600;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========== PWA & SERVICE WORKER ==========

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed', err));
    }
}

// ========== VISITOR TRACKING (Demo) ==========

function trackVisitor() {
    const visitorData = {
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        referrer: document.referrer,
        userAgent: navigator.userAgent
    };
    
    const visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
    visitors.push(visitorData);
    localStorage.setItem('visitors', JSON.stringify(visitors));
}

// Track on page load
trackVisitor();

// ========== LANGUAGE TOGGLE (Demo) ==========

let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'te' : 'en';
    updateLanguage();
}

function updateLanguage() {
    const translations = {
        'en': {
            'hero-title': 'Premium Plumbing & Home Services',
            'services': 'Our Services',
            'booking': 'Book Your Appointment'
        },
        'te': {
            'hero-title': 'ప్రీమియం ప్లంబింగ్ & హోమ్ సర్వీసెస్',
            'services': 'మా సేవలు',
            'booking': 'మీ అపాయింట్‌మెంట్ బుక్ చేయండి'
        }
    };
    
    console.log('Language switched to:', currentLanguage);
    showNotification(`Language switched to ${currentLanguage === 'en' ? 'English' : 'Telugu'}`);
}

// ========== SMART SERVICE SUGGESTIONS ==========

function getSuggestedServices() {
    const services = [
        { name: 'Leak Repairs', emoji: '🚰', description: 'Fix water leaks quickly' },
        { name: 'Emergency Service', emoji: '🚨', description: '24/7 available' },
        { name: 'Geyser Repair', emoji: '🔧', description: 'Water heating solutions' },
        { name: 'Drain Cleaning', emoji: '🚽', description: 'Unclog blocked drains' }
    ];
    
    return services.sort(() => Math.random() - 0.5).slice(0, 2);
}

// ========== GOOGLE BUSINESS PROFILE ==========

function openGoogleBusiness() {
    window.open('https://www.google.com/maps/place/Proddatur,+Andhra+Pradesh/', '_blank');
}

// ========== SOCIAL MEDIA LINKS ==========

function openFacebook() {
    window.open('https://facebook.com', '_blank');
}

function openInstagram() {
    window.open('https://instagram.com', '_blank');
}

// ========== EMAIL SIMULATION ==========

function sendEmail(to, subject, message) {
    const email = {
        to: to,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    const emails = JSON.parse(localStorage.getItem('emails') || '[]');
    emails.push(email);
    localStorage.setItem('emails', JSON.stringify(emails));
    
    console.log('Email sent:', email);
}

// ========== VISITOR BEHAVIOR TRACKING ==========

function trackUserBehavior() {
    const behaviorData = {
        lastVisit: new Date().toISOString(),
        pagesViewed: [window.location.pathname],
        timeSpent: 0,
        clicks: 0,
        scrollDepth: 0
    };
    
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollDepth = Math.max(scrollDepth, scrollPercent);
        behaviorData.scrollDepth = scrollDepth;
    });
    
    document.addEventListener('click', () => {
        behaviorData.clicks++;
    });
    
    setInterval(() => {
        behaviorData.timeSpent++;
        localStorage.setItem('userBehavior', JSON.stringify(behaviorData));
    }, 1000);
}

trackUserBehavior();

// ========== APPOINTMENT REMINDER ==========

function setAppointmentReminder(appointmentDate) {
    const reminder = new Date(appointmentDate);
    reminder.setHours(reminder.getHours() - 24);
    
    const timeUntilReminder = reminder - new Date();
    
    if (timeUntilReminder > 0) {
        setTimeout(() => {
            showNotification('📌 Reminder: Your appointment is tomorrow!');
        }, timeUntilReminder);
    }
}

// ========== PERFORMANCE MONITORING ==========

window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

// ========== PAYMENT GATEWAY SIMULATION ==========

function initiatePayment(amount, service) {
    const paymentData = {
        amount: amount,
        service: service,
        status: 'pending',
        transactionId: 'TXN-' + Date.now(),
        timestamp: new Date().toISOString()
    };
    
    console.log('Payment initiated:', paymentData);
    
    showNotification(`Processing payment of ₹${amount} for ${service}...`);
    
    setTimeout(() => {
        paymentData.status = 'success';
        localStorage.setItem('lastPayment', JSON.stringify(paymentData));
        showNotification(`✓ Payment successful! Transaction ID: ${paymentData.transactionId}`);
    }, 2000);
}

// ========== LEAD CAPTURE & AUTO SAVE ==========

document.addEventListener('change', function(e) {
    if (e.target.matches('input, textarea, select')) {
        const formData = {
            fieldName: e.target.name || e.target.id,
            value: e.target.value,
            timestamp: new Date().toISOString()
        };
        
        const formHistory = JSON.parse(localStorage.getItem('formHistory') || '[]');
        formHistory.push(formData);
        localStorage.setItem('formHistory', JSON.stringify(formHistory.slice(-20))); // Keep last 20 entries
    }
});

// ========== EXIT POPUP ==========

window.addEventListener('beforeunload', function() {
    // Could trigger an exit offer popup here
    // Keeping it subtle to avoid annoying users
});

// ========== CONSOLE EASTER EGG ==========

console.log('%c🔧 Balaji Plumbing Services', 'font-size: 20px; color: #0066FF; font-weight: bold;');
console.log('%cPremium Plumbing Solutions in Proddatur, Andhra Pradesh', 'color: #0066FF;');
console.log('%cCall: +91 9392545262 | WhatsApp: +91 9392545262', 'color: #25D366;');

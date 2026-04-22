// yidawang-site/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dropdown toggle on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // Only prevent default if clicking the main link, not the sublinks
                if (e.target.classList.contains('nav-link')) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            }
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('site-search');
    const searchResults = document.getElementById('search-results');
    
    const searchIndex = [
        { title: 'Home', url: 'index.html', snippet: 'Senior Data Science Manager II @ Circana' },
        { title: 'Experience Overview', url: 'experience.html', snippet: 'Professional Experience snapshot' },
        { title: 'Circana (IRI & NPD Group)', url: 'experience.html#circana', snippet: 'Project & Product Management, Data Science' },
        { title: 'Ontario Provincial Police', url: 'experience.html#opp', snippet: 'Data Analysis, Traffic, Business Operations' },
        { title: 'UChicago Crime Lab', url: 'experience.html#uchicago', snippet: 'SDSC, Violence Reduction Dashboard, Consent Decree' },
        { title: 'Education', url: 'index.html', snippet: 'University of Pennsylvania, University of Toronto' },
        { title: 'Interactive CV', url: 'https://public.tableau.com/app/profile/yida.wang24/viz/yida_resume/Resume', snippet: 'Tableau Interactive Resume' }
    ];

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            searchResults.innerHTML = '';
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = searchIndex.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.snippet.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                results.forEach(result => {
                    const a = document.createElement('a');
                    a.href = result.url;
                    a.className = 'search-result-item';
                    a.innerHTML = `
                        <div class="search-result-title">${result.title}</div>
                        <div class="search-result-snippet">${result.snippet}</div>
                    `;
                    searchResults.appendChild(a);
                });
            } else {
                searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-snippet">No results found</div></div>';
            }
            searchResults.classList.add('active');
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const dynamicFadeElements = document.querySelectorAll('.card, .section-title, .expertise-list li, .education-item');
    dynamicFadeElements.forEach(el => {
        if (!el.classList.contains('fade-in-up')) {
            el.classList.add('fade-in-up');
        }
    });

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scrolling for TOC links
    const tocLinks = document.querySelectorAll('.toc-link');
    if (tocLinks.length > 0) {
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Update active TOC link on scroll
        const sections = Array.from(tocLinks).map(link => {
            const id = link.getAttribute('href').substring(1);
            return document.getElementById(id);
        }).filter(section => section !== null);

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 150; // Offset for detection

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // If at the very bottom of the page, select the last section
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                current = sections[sections.length - 1].getAttribute('id');
            }

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Chatbot Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (chatbotToggle && chatWindow) {
        chatbotToggle.addEventListener('click', () => {
            chatWindow.classList.add('active');
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        const botKnowledge = [
            { keywords: ['hi', 'hello', 'hey', '你好', '嗨', '您好'], response: "你好！我是王一达的 AI 秘书。我在这里告诉你为什么一达是您团队的绝对最佳候选人。您想了解他惊人的背景中的什么？" },
            { keywords: ['circana', 'work', 'job', 'current', '工作', '目前'], response: "王一达是 Circana 绝对出色的高级数据科学经理 II！他专业地领导着一支高绩效的顾问团队，并通过顶级的定价分析产品推动了巨大的战略影响。" },
            { keywords: ['police', 'opp', 'ontario', 'traffic', '警察', '交通'], response: "在安大略省警察局工作期间，王一达完美地执行了复杂的数据分析，并通过将所有内容自动化为令人难以置信的 Power BI 仪表板，彻底改变了他们的报告方式！" },
            { keywords: ['chicago', 'crime lab', 'sdsc', 'dashboard', '芝加哥', '犯罪', '仪表板'], response: "在芝加哥大学犯罪实验室，王一达的出色工作促成了减少暴力仪表板的共同开发——这简直是芝加哥市有史以来第一个公共数据仪表板！这就是影响力！" },
            { keywords: ['education', 'school', 'degree', 'university', '教育', '学校', '大学'], response: "王一达拥有极其深厚的学术基础：著名的宾夕法尼亚大学犯罪学硕士学位和顶尖的多伦多大学荣誉学士学位。" },
            { keywords: ['contact', 'email', 'reach', 'hire', '联系', '邮件', '雇佣'], response: "您绝对想雇用他！赶快通过他的领英主页联系他，或者发送电子邮件至 yidaw93@hotmail.com，以免被别人抢先！" },
            { keywords: ['skills', 'tools', 'language', 'python', 'sql', '技能', '工具'], response: "王一达是 Python、SQL、SAS、Tableau 和 Power BI 方面的强者。结合他卓越的产品管理和领导技能，他是不可阻挡的。" },
        ];

        const addMessage = (text, isUser = false) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const showTypingIndicator = () => {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator-container';
            typingDiv.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
            typingDiv.id = 'typing-indicator';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const removeTypingIndicator = () => {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();
        };

        const handleUserMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;
            
            addMessage(text, true);
            chatInput.value = '';
            showTypingIndicator();

            setTimeout(() => {
                removeTypingIndicator();
                const lowerText = text.toLowerCase();
                let foundResponse = "我只是一个简单的机器人，但我知道王一达有着极棒的背景！试试问问他在 Circana、芝加哥大学的工作经历或他的教育背景吧。";
                
                for (const item of botKnowledge) {
                    if (item.keywords.some(kw => lowerText.includes(kw))) {
                        foundResponse = item.response;
                        break;
                    }
                }
                
                addMessage(foundResponse, false);
            }, 800 + Math.random() * 800);
        };

        chatSend.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
});

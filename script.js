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

    // Dropdown toggle for better accessibility
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
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

    // Mobile TOC Toggle Logic
    const mobileTocToggle = document.getElementById('mobile-toc-toggle');
    const sidebarToc = document.getElementById('sidebar-toc');
    const tocClose = document.getElementById('toc-close');
    const tocOverlay = document.getElementById('toc-overlay');

    if (mobileTocToggle && sidebarToc) {
        const toggleToc = () => {
            sidebarToc.classList.toggle('active');
            tocOverlay.classList.toggle('active');
            document.body.style.overflow = sidebarToc.classList.contains('active') ? 'hidden' : '';
        };

        mobileTocToggle.addEventListener('click', toggleToc);
        if (tocClose) tocClose.addEventListener('click', toggleToc);
        if (tocOverlay) tocOverlay.addEventListener('click', toggleToc);

        // Close TOC when a link is clicked
        const tocLinksMobile = sidebarToc.querySelectorAll('.toc-link');
        tocLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    toggleToc();
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
            if (chatMessages.children.length <= 1) {
                setTimeout(showQuickReplies, 500);
            }
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        const botKnowledge = [
            { 
                keywords: ['circana', 'iri', 'npd', 'pricing', 'market research', 'consulting', 'cpg', 'retail', 'forecast', 'forecasting', 'advanced analytics', 'product management'], 
                response: "Yida is currently a Senior Data Science Manager II at Circana (formerly IRI and NPD Group). He expertly leads a high-performing team of consultants and drives massive strategic impact through top-tier pricing analytics products. He handles testing products, ETLs, new features, and executive-level deliverables." 
            },
            { 
                keywords: ['skills', 'tools', 'python', 'sql', 'tech', 'stack', 'tableau', 'power bi', 'sas', 'coding', 'programming', 'machine learning', 'ml', 'big data', 'predictive', 'modeling', 'bi', 'databricks'], 
                response: "Yida is a powerhouse with Python, SQL, SAS, Tableau, and Power BI. He also has expertise in big data analytics, predictive modeling, forecasting, machine learning, and business intelligence. He's currently learning to deploy ML models within Databricks. Combine that with his exceptional product management and leadership skills, and he is unstoppable." 
            },
            { 
                keywords: ['police', 'opp', 'ontario', 'traffic', 'law enforcement', 'statistician', 'solicitor general', 'public safety', 'collisions', 'fatalities'], 
                response: "During his time at the Ontario Provincial Police, Yida flawlessly executed complex data analysis focusing on roadway fatalities and collisions. He revolutionized their reporting by automating everything into incredible Power BI dashboards, created standardized SOPs and training materials, and managed financial models for contract services." 
            },
            { 
                keywords: ['chicago', 'crime lab', 'sdsc', 'dashboard', 'mayor', 'violence', 'smart policing', 'cpd', 'detectives', 'area south', 'policy', 'urban labs'], 
                response: "At the UChicago Crime Lab, Yida's brilliant work led to the co-development of the Violence Reduction Dashboard—literally the first-ever public data dashboard for the entire City of Chicago! He also worked closely with the Chicago Police Department on smart policing initiatives and the Consent Decree, and served as an analyst for the Area South Deputy Chief." 
            },
            { 
                keywords: ['education', 'school', 'degree', 'university', 'penn', 'toronto', 'criminology', 'sociology', 'upenn', 'academic', 'masters', 'ba'], 
                response: "Yida has an incredibly strong academic foundation: an MS in Criminology (focusing on policy) from the prestigious University of Pennsylvania (2016) and a BA in Criminology & Sociology (Hons) from the top-ranked University of Toronto (2015)." 
            },
            { 
                keywords: ['contact', 'email', 'reach', 'message', 'linkedin', 'connect', 'talk', 'chat', 'hire', 'recruit', 'recruitment', 'job offer'], 
                response: "You definitely want to hire him! Reach out immediately via his LinkedIn profile (linkedin.com/in/yidawang) or email him at yidaw93@hotmail.com before someone else snaps him up!" 
            },
            { 
                keywords: ['resume', 'cv', 'download', 'pdf', 'interactive', 'tableau resume'], 
                response: "You can check out his interactive Tableau resume or download the PDF version from the 'CV' dropdown in the navigation bar above!" 
            },
            { 
                keywords: ['project', 'portfolio', 'website', 'entrepreneur', 'startup', 'b2c', 'tech startup', 'entrepreneurship', 'collaboration', 'partner'], 
                response: "This website itself is a showcase of his skills! He's always exploring new challenges, currently looking to dabble in entrepreneurship, tech, B2C, and data analytics startups. If you're interested in collaborating, reach out on LinkedIn!" 
            },
            { 
                keywords: ['experience', 'work', 'job', 'career', 'background', 'history', 'professional', 'roles', 'positions'], 
                response: "Yida has an incredible career spanning the private and public sectors! He's currently at Circana leading data science teams, previously worked as a Statistician at the Ontario Provincial Police, and before that was a Project Manager at the UChicago Crime Lab working with CPD and the Mayor's Office. Ask me about any specific role!" 
            },
            { 
                keywords: ['leadership', 'manage', 'manager', 'team', 'leading', 'leadership style', 'mentor', 'mentoring', 'supervise', 'supervision', 'director'], 
                response: "Yida is a proven leader. At Circana, he leads a team of consultants, managers, and analysts, ensuring quality control and high-level delivery. At the UChicago Crime Lab, he managed complex multi-agency projects. His leadership style is data-driven, collaborative, and focused on empowering his team to drive strategic impact." 
            },
            { 
                keywords: ['soft skills', 'communication', 'present', 'presentation', 'writing', 'stakeholder', 'briefing', 'negotiation', 'change management'], 
                response: "Beyond technical depth, Yida excels in stakeholder management. He's experienced in delivering executive-level presentations, drafting policy briefs, and leading training sessions for diverse audiences, from police commanders to market research executives." 
            },
            { 
                keywords: ['hire', 'why', 'candidate', 'fit', 'best', 'strengths', 'unique', 'stand out', 'value', 'impact'], 
                response: "Here's why Yida stands out: He combines deep technical skills (Python, SQL, ML) with proven leadership experience managing teams and delivering executive-level insights. He's built the first-ever public dashboard for a major US city, automated reporting for a national police force, and drives strategic impact at a global market research firm. He's a rare blend of technical depth and business acumen!" 
            },
            { 
                keywords: ['hello', 'hey', 'greetings', 'howdy', 'sup', 'hi', 'morning', 'evening'], 
                response: "Hello there! I'm Yida's AI Secretary. I'm here to tell you why Yida is the absolute best candidate for your team. What do you want to know about his amazing background?" 
            }
        ];

        const quickReplies = [
            "What are his core skills?",
            "Tell me about his work at Circana",
            "Where did he go to school?",
            "How can I contact him?"
        ];

        const addMessage = (text, isUser = false) => {
            // Remove quick replies if they exist
            const qrContainer = document.querySelector('.quick-replies');
            if (qrContainer) qrContainer.remove();

            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const showQuickReplies = () => {
            if (document.querySelector('.quick-replies')) return;
            const qrDiv = document.createElement('div');
            qrDiv.className = 'quick-replies';
            qrDiv.style.display = 'flex';
            qrDiv.style.flexWrap = 'wrap';
            qrDiv.style.gap = '5px';
            qrDiv.style.marginTop = '10px';
            qrDiv.style.marginBottom = '10px';
            
            quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.textContent = reply;
                btn.className = 'quick-reply-btn';
                btn.style.padding = '6px 12px';
                btn.style.fontSize = '0.8rem';
                btn.style.borderRadius = '15px';
                btn.style.border = '1px solid var(--accent-color)';
                btn.style.background = 'transparent';
                btn.style.color = 'var(--text-primary)';
                btn.style.cursor = 'pointer';
                btn.style.transition = 'all 0.2s';
                
                btn.addEventListener('mouseover', () => {
                    btn.style.background = 'var(--accent-color)';
                    btn.style.color = 'white';
                });
                btn.addEventListener('mouseout', () => {
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--text-primary)';
                });
                
                btn.addEventListener('click', () => {
                    chatInput.value = reply;
                    handleUserMessage();
                });
                qrDiv.appendChild(btn);
            });
            chatMessages.appendChild(qrDiv);
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
                
                let bestMatch = null;
                let highestScore = 0;

                for (const item of botKnowledge) {
                    let score = 0;
                    for (const kw of item.keywords) {
                        // Check for whole word match
                        const regex = new RegExp('\\b' + kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
                        if (regex.test(lowerText)) {
                            score += 2; // Higher weight for whole word
                        } else if (kw.length > 3 && lowerText.includes(kw)) {
                            score += 1; // Lower weight for partial match
                        }
                    }
                    
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = item;
                    }
                }

                let response = "";
                if (bestMatch) {
                    if (highestScore <= 2) {
                        // Weak match
                        const preambles = [
                            "I'm not entirely sure, but this might be what you're looking for: ",
                            "If I understand correctly, you're asking about this: ",
                            "I think this covers what you're interested in: "
                        ];
                        response = preambles[Math.floor(Math.random() * preambles.length)] + "\n\n" + bestMatch.response;
                    } else {
                        // Strong match
                        response = bestMatch.response;
                    }
                } else {
                    // No match
                    const fallbacks = [
                        "I'm not sure I follow, but Yida has an amazing background! Would you like to know about his skills, his work at Circana, or his education?",
                        "I didn't quite catch that. Try asking about his experience at UChicago, his Python/SQL skills, or how to contact him!",
                        "I'm still learning, but I can definitely tell you about Yida's leadership at Circana or his projects with the Police. What interests you?"
                    ];
                    response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                }
                
                addMessage(response, false);
                setTimeout(showQuickReplies, 1000);
            }, 800 + Math.random() * 800);
        };

        chatSend.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
});

// yidawang-site/script-zh.js

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
        { title: '首页', url: 'index-zh.html', snippet: '数据科学高级经理 II @ Circana' },
        { title: '工作经验概览', url: 'experience-zh.html', snippet: '职业经历概述' },
        { title: 'Circana（前身为 IRI 和 NPD Group）', url: 'experience-zh.html#circana', snippet: '项目与产品管理、数据科学' },
        { title: '安大略省警察局', url: 'experience-zh.html#opp', snippet: '数据分析、交通、业务运营' },
        { title: '芝加哥大学犯罪实验室', url: 'experience-zh.html#uchicago', snippet: 'SDSC、暴力减少仪表板、同意令' },
        { title: '教育背景', url: 'index-zh.html', snippet: '宾夕法尼亚大学、多伦多大学' },
        { title: '交互式简历', url: 'https://public.tableau.com/app/profile/yida.wang24/viz/yida_resume/Resume', snippet: 'Tableau 交互式简历' }
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
            if (chatMessages.children.length <= 1) {
                setTimeout(showQuickReplies, 500);
            }
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        const botKnowledge = [
            { keywords: ['circana', 'iri', 'npd'], response: "王一达目前是 Circana（前身为 IRI 和 NPD Group）的高级数据科学经理 II！他专业地领导着一支高绩效的顾问团队，并通过顶级的定价分析产品推动了巨大的战略影响。他负责测试产品、ETL、新功能以及高管层面的交付。" },
            { keywords: ['skills', 'tools', 'python', 'sql', 'tableau', 'sas'], response: "王一达是 Python、SQL、SAS、Tableau 和 Power BI 方面的强者。他还具备大数据分析、预测建模、机器学习和商业智能方面的专业知识。他目前正在学习在 Databricks 中部署 ML 模型。结合他卓越的产品管理和领导技能，他是不可阻挡的。" },
            { keywords: ['police', 'opp', 'ontario', 'traffic'], response: "在安大略省警察局工作期间，王一达完美地执行了专注于道路伤亡和碰撞的复杂数据分析。他通过将所有内容自动化为令人难以置信的 Power BI 仪表板，彻底改变了他们的报告方式，制定了标准化操作程序，并管理了合同服务的财务模型！" },
            { keywords: ['chicago', 'crime lab', 'sdsc', 'dashboard'], response: "在芝加哥大学犯罪实验室，王一达的出色工作促成了减少暴力仪表板的共同开发——这简直是芝加哥市有史以来第一个公共数据仪表板！他还与芝加哥警察局在智能警务倡议和同意令方面密切合作，并担任南区副局长的分析师。" },
            { keywords: ['education', 'school', 'degree', 'university'], response: "王一达拥有极其深厚的学术基础：著名的宾夕法尼亚大学犯罪学（政策方向）硕士学位（2016年）和顶尖的多伦多大学犯罪学与社会学荣誉学士学位（2015年）。" },
            { keywords: ['contact', 'email', 'reach', 'linkedin'], response: "您绝对想雇用他！赶快通过他的领英主页（linkedin.com/in/yidawang）联系他，或者发送电子邮件至 yidaw93@hotmail.com，以免被别人抢先！" },
            { keywords: ['resume', 'cv', 'download'], response: "您可以查看他的交互式 Tableau 简历，或者从上方导航栏的\"简历\"下拉菜单中下载 PDF 版本！" },
            { keywords: ['experience', 'work', 'job', 'career'], response: "王一达拥有横跨私营和公共部门的精彩职业生涯！他目前在 Circana 领导数据科学团队，之前在安大略省警察局担任统计学家，再之前是芝加哥大学犯罪实验室的项目经理，与芝加哥警察局和市长办公室合作。问我任何具体的职位！" },
            { keywords: ['hello', 'hey', 'greetings', 'howdy'], response: "你好！我是王一达的 AI 秘书。我在这里告诉你为什么一达是您团队的绝对最佳候选人。您想了解他惊人的背景中的什么？" }
        ];

        const quickReplies = [
            "他的核心技能是什么？",
            "讲讲他在 Circana 的工作",
            "他在哪里上的大学？",
            "我怎么联系他？"
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
                let foundResponse = "我只是一个简单的机器人，但我知道王一达有着极棒的背景！试试问问他在 Circana、芝加哥大学的工作经历，他的技能，或他的教育背景吧。";
                
                for (const item of botKnowledge) {
                    if (item.keywords.some(kw => lowerText.includes(kw))) {
                        foundResponse = item.response;
                        break;
                    }
                }
                
                addMessage(foundResponse, false);
                setTimeout(showQuickReplies, 1000);
            }, 800 + Math.random() * 800);
        };

        chatSend.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
});

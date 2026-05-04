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
                keywords: ['circana', 'iri', 'npd', '定价', '市场研究', '咨询', '快消', '零售', '预测', '分析', '产品管理', '高级经理'], 
                response: "王一达目前是 Circana（前身为 IRI 和 NPD Group）的高级数据科学经理 II！他专业地领导着一支高效顾问团队，通过顶级定价分析产品推动重大战略影响。他负责测试产品、ETL 流程和新功能，并确保质量控制和调试以实现最佳性能。" 
            },
            { 
                keywords: ['skills', 'tools', 'python', 'sql', 'tableau', 'sas', '技能', '核心', '能力', '工具', '技术', '编程', '机器学习', 'ml', '大数据', '建模', '商业智能', 'bi', 'databricks'], 
                response: "一达精通 Python、SQL、SAS、Tableau 和 Power BI。他还具备大数据分析、预测建模、预测、机器学习和商业智能方面的专业知识。他目前正在学习在 Databricks 中部署 ML 模型。结合他卓越的产品管理和领导技能，他是不可阻挡的！" 
            },
            { 
                keywords: ['police', 'opp', 'ontario', 'traffic', '警察', '安大略', '执法', '统计师', '公共安全', '交通', '事故', '伤亡'], 
                response: "在安大略省警察局任职期间，一达出色地执行了复杂的数据分析工作，重点关注道路死亡和碰撞事故。他通过将所有报告自动化为令人印象深刻的 Power BI 仪表板，彻底革新了他们的报告流程，创建了标准化操作程序和培训材料，并管理合同服务的财务模型！" 
            },
            { 
                keywords: ['chicago', 'crime lab', 'sdsc', 'dashboard', '芝加哥', '犯罪', '仪表板', '市长', '暴力', '智能警务', 'cpd', '警察局', '副局长', '政策', '城市实验室'], 
                response: "在芝加哥大学犯罪实验室，一达的出色工作促成了暴力减少仪表板的共同开发——这是芝加哥市有史以来第一个公共数据仪表板！他还与芝加哥警察局密切合作开展智能警务计划和同意令，并担任南区副局长的分析师。" 
            },
            { 
                keywords: ['education', 'school', 'degree', 'university', '教育', '学校', '大学', '学位', '学历', '宾夕法尼亚', '宾大', '多伦多', '多大', '犯罪学', '社会学', '硕士', '本科'], 
                response: "一达有非常扎实的学术背景：宾夕法尼亚大学犯罪学硕士（政策方向）学位（2016年）和多伦多大学犯罪学与社会学荣誉学士学位（2015年）。" 
            },
            { 
                keywords: ['contact', 'email', 'reach', 'linkedin', '联系', '邮箱', '邮件', '招聘', '雇用', '联系方式', '简历', '交流'], 
                response: "您一定想雇用他！请立即通过他的 LinkedIn（linkedin.com/in/yidawang）联系他，或发送邮件至 yidaw93@hotmail.com，赶快行动吧！" 
            },
            { 
                keywords: ['resume', 'cv', 'download', '简历', '下载', 'pdf', '交互式', '在线简历'], 
                response: "您可以查看他的 Tableau 交互式简历，或从导航栏上方的'CV'下拉菜单下载 PDF 版本！" 
            },
            { 
                keywords: ['project', 'portfolio', 'website', 'entrepreneur', 'startup', '创业', '初创', '项目', '合作', '合伙', '技术创业', 'b2c'], 
                response: "这个网站本身就是他技能的展示！他总是在探索新的挑战，目前正寻求在创业、技术、B2C 和数据分析初创公司领域有所作为。如果您有兴趣合作，请通过 LinkedIn 联系！" 
            },
            { 
                keywords: ['experience', 'work', 'job', 'career', '经验', '工作', '职业', '经历', '专业', '背景', '履历'], 
                response: "一达拥有令人印象深刻的多元化职业经历！他目前在 Circana 担任高级管理职位，此前曾在安大略省警察局从事数据分析和业务运营，还在芝加哥大学犯罪实验室参与了多个开创性项目，包括开发芝加哥市首个公共数据仪表板！" 
            },
            { 
                keywords: ['leadership', 'manage', 'manager', 'team', 'leading', '领导', '管理', '经理', '团队', '带人', '导师', '主管', '监督', '总监'], 
                response: "一达是一位经受过考验的领导者。在 Circana，他领导着一支由顾问、经理和分析师组成的团队，确保质量控制和高水平交付。在芝加哥大学犯罪实验室，他管理着复杂的多机构合作项目。他的领导风格是数据驱动、协作式的，并专注于赋能团队以推动战略影响。" 
            },
            { 
                keywords: ['soft skills', 'communication', 'present', 'presentation', 'writing', '沟通', '表达', '演示', '讲解', '利益相关者', '汇报', '写作', '汇报', '变革管理'], 
                response: "除了技术深度，一达在利益相关者管理方面也表现出色。他拥有向高管层进行演示、起草政策简报以及为从警察指挥官到市场研究高管等不同受众主持培训课程的丰富经验。" 
            },
            { 
                keywords: ['hire', 'why', 'candidate', 'fit', 'best', 'strengths', '为什么', '优选', '理由', '独特', '出众', '价值', '影响', '优势', '人选'], 
                response: "这就是一达脱颖而出的原因：他将深厚的技术技能（Python、SQL、机器学习）与管理团队和提供高管层见解的成熟领导经验相结合。他为美国主要城市建立了第一个公共仪表板，为国家警察部队实现了报告自动化，并在全球市场研究公司推动战略影响。他是技术深度与商业头脑的罕见结合体！" 
            },
            { 
                keywords: ['hello', 'hey', 'greetings', 'howdy', '你好', '嗨', '您好', '早安', '午安', '晚安', '在吗'], 
                response: "你好！我是王一达的 AI 秘书。问问我为什么一达是您下一个大项目的完美人选吧！了解他的核心技能、工作经历或任何您想知道的信息。" 
            }
        ];

        const quickReplies = [
            "他的核心技能是什么？",
            "讲讲他在 Circana 的工作",
            "他在哪里上的大学？",
            "我怎么联系他？"
        ];

        const addMessage = (text, isUser = false) => {
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
                        if (lowerText.includes(kw.toLowerCase())) {
                            score += kw.length;
                        }
                    }
                    
                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = item;
                    }
                }

                let response = "";
                if (bestMatch) {
                    if (highestScore < 3) {
                        const preambles = [
                            "我不完全确定，但这可能是您想了解的内容：",
                            "如果我理解正确的话，您是在问这个：",
                            "我想这应该涵盖了您感兴趣的内容："
                        ];
                        response = preambles[Math.floor(Math.random() * preambles.length)] + "\n\n" + bestMatch.response;
                    } else {
                        response = bestMatch.response;
                    }
                } else {
                    const fallbacks = [
                        "我不太明白您的意思，但一达的背景非常出色！您想了解他的技能、在 Circana 的工作还是他的教育背景？",
                        "我没太听懂。您可以尝试询问他在芝加哥大学的经历、他的 Python/SQL 技能，或者如何联系他！",
                        "我还在学习中，但我绝对可以告诉您一达在 Circana 的领导经历或他在警察局的项目。您对什么感兴趣？"
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

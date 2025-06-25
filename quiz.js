// Security Assessment Quiz Implementation
class SecurityQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.questions = [
            {
                id: 1,
                category: "passwords",
                question: "How do you currently manage your social media passwords?",
                options: [
                    { text: "I use the same password for all platforms", score: 0 },
                    { text: "I use similar passwords with slight variations", score: 1 },
                    { text: "I use different passwords but store them in browser", score: 2 },
                    { text: "I use a dedicated password manager", score: 4 }
                ]
            },
            {
                id: 2,
                category: "authentication",
                question: "Do you have two-factor authentication (2FA) enabled?",
                options: [
                    { text: "No, I don't use 2FA on any accounts", score: 0 },
                    { text: "Yes, but only on my most important accounts", score: 2 },
                    { text: "Yes, on most of my social media accounts", score: 3 },
                    { text: "Yes, on all accounts with 2FA support", score: 4 }
                ]
            },
            {
                id: 3,
                category: "devices",
                question: "How do you secure your devices used for content creation?",
                options: [
                    { text: "Basic built-in security only", score: 1 },
                    { text: "Screen lock with PIN/password", score: 2 },
                    { text: "Antivirus software and regular updates", score: 3 },
                    { text: "Enterprise-grade security with encryption", score: 4 }
                ]
            },
            {
                id: 4,
                category: "backup",
                question: "How often do you backup your content and important data?",
                options: [
                    { text: "I don't have a backup strategy", score: 0 },
                    { text: "Occasionally, when I remember", score: 1 },
                    { text: "Monthly manual backups", score: 2 },
                    { text: "Automated daily/weekly backups", score: 4 }
                ]
            },
            {
                id: 5,
                category: "privacy",
                question: "How do you handle your personal information online?",
                options: [
                    { text: "I share personal details freely", score: 0 },
                    { text: "I'm somewhat careful about what I share", score: 2 },
                    { text: "I keep most personal info private", score: 3 },
                    { text: "I have strict privacy protocols in place", score: 4 }
                ]
            },
            {
                id: 6,
                category: "emails",
                question: "How do you handle suspicious emails and links?",
                options: [
                    { text: "I click on most links without thinking", score: 0 },
                    { text: "I'm sometimes suspicious but often click anyway", score: 1 },
                    { text: "I verify sender before clicking links", score: 3 },
                    { text: "I never click suspicious links and verify everything", score: 4 }
                ]
            },
            {
                id: 7,
                category: "wifi",
                question: "How do you connect to WiFi when working in public spaces?",
                options: [
                    { text: "I connect to any available free WiFi", score: 0 },
                    { text: "I use café/hotel WiFi with their password", score: 1 },
                    { text: "I prefer to use my mobile hotspot", score: 3 },
                    { text: "I always use a VPN on public networks", score: 4 }
                ]
            },
            {
                id: 8,
                category: "monitoring",
                question: "Do you monitor your accounts for suspicious activity?",
                options: [
                    { text: "No, I only notice if something major happens", score: 0 },
                    { text: "I check occasionally", score: 1 },
                    { text: "I review account activity monthly", score: 2 },
                    { text: "I have alerts set up and check regularly", score: 4 }
                ]
            },
            {
                id: 9,
                category: "collaboration",
                question: "How do you share account access with team members?",
                options: [
                    { text: "I share my main passwords directly", score: 0 },
                    { text: "I create shared accounts with same passwords", score: 1 },
                    { text: "I use platform-specific team features when available", score: 3 },
                    { text: "I use professional access management tools", score: 4 }
                ]
            },
            {
                id: 10,
                category: "updates",
                question: "How do you handle software and app updates?",
                options: [
                    { text: "I ignore update notifications", score: 0 },
                    { text: "I update when forced to", score: 1 },
                    { text: "I update monthly or when convenient", score: 2 },
                    { text: "I enable automatic updates for security patches", score: 4 }
                ]
            },
            {
                id: 11,
                category: "brandProtection",
                question: "Do you monitor for impersonation or content theft?",
                options: [
                    { text: "No, I hope people tell me if they see something", score: 0 },
                    { text: "I occasionally search for my name/brand", score: 1 },
                    { text: "I set up Google alerts for my brand", score: 2 },
                    { text: "I use professional monitoring services", score: 4 }
                ]
            },
            {
                id: 12,
                category: "recovery",
                question: "Do you have account recovery plans in place?",
                options: [
                    { text: "No, I'd be lost if I got locked out", score: 0 },
                    { text: "I have some recovery emails set up", score: 2 },
                    { text: "I have backup codes and recovery info", score: 3 },
                    { text: "I have comprehensive recovery procedures", score: 4 }
                ]
            },
            {
                id: 13,
                category: "training",
                question: "How do you stay updated on cybersecurity threats?",
                options: [
                    { text: "I don't actively learn about security", score: 0 },
                    { text: "I read about major breaches in the news", score: 1 },
                    { text: "I follow some security blogs/resources", score: 2 },
                    { text: "I regularly educate myself on latest threats", score: 4 }
                ]
            },
            {
                id: 14,
                category: "incident",
                question: "What would you do if you suspected a security breach?",
                options: [
                    { text: "I'd panic and not know where to start", score: 0 },
                    { text: "I'd change my passwords and hope for the best", score: 1 },
                    { text: "I'd follow platform-specific security steps", score: 2 },
                    { text: "I have a detailed incident response plan", score: 4 }
                ]
            },
            {
                id: 15,
                category: "revenue",
                question: "How do you protect your revenue streams and financial accounts?",
                options: [
                    { text: "Same security as my other accounts", score: 1 },
                    { text: "Basic additional security like 2FA", score: 2 },
                    { text: "Separate email and enhanced security", score: 3 },
                    { text: "Business-grade security with monitoring", score: 4 }
                ]
            }
        ];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showScreen('quiz-start');
    }

    bindEvents() {
        document.getElementById('start-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('quiz-exit').addEventListener('click', () => this.exitQuiz());
        document.getElementById('retake-quiz').addEventListener('click', () => this.retakeQuiz());
        document.getElementById('share-results').addEventListener('click', () => this.shareResults());
    }

    showScreen(screenId) {
        document.querySelectorAll('.quiz-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    startQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showScreen('quiz-questions');
        this.renderQuestion();
    }

    renderQuestion() {
        const question = this.questions[this.currentQuestion];
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="question">
                <h3>Question ${this.currentQuestion + 1} of ${this.questions.length}</h3>
                <h2>${question.question}</h2>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <label class="option">
                            <input type="radio" name="question-${question.id}" value="${index}" 
                                   ${this.answers[this.currentQuestion] === index ? 'checked' : ''}>
                            <span class="option-text">${option.text}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;

        // Update progress
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `Question ${this.currentQuestion + 1} of ${this.questions.length}`;

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentQuestion === 0;
        
        // Bind option change events
        container.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.answers[this.currentQuestion] = parseInt(e.target.value);
                document.getElementById('next-btn').disabled = false;
                
                if (this.currentQuestion === this.questions.length - 1) {
                    document.getElementById('next-btn').innerHTML = 'Get Results <i class="fas fa-chart-line"></i>';
                }
            });
        });

        // Check if already answered
        if (this.answers[this.currentQuestion] !== undefined) {
            document.getElementById('next-btn').disabled = false;
        } else {
            document.getElementById('next-btn').disabled = true;
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.renderQuestion();
        }
    }

    calculateScore() {
        let totalScore = 0;
        let maxScore = 0;
        const categoryScores = {};

        this.questions.forEach((question, index) => {
            const answerScore = question.options[this.answers[index]].score;
            totalScore += answerScore;
            maxScore += 4; // Maximum score per question

            // Track category scores
            if (!categoryScores[question.category]) {
                categoryScores[question.category] = { score: 0, maxScore: 0 };
            }
            categoryScores[question.category].score += answerScore;
            categoryScores[question.category].maxScore += 4;
        });

        return {
            score: Math.round((totalScore / maxScore) * 100),
            totalScore,
            maxScore,
            categoryScores
        };
    }

    getSecurityLevel(score) {
        if (score >= 85) return { level: "Excellent", color: "#22C55E", description: "Your security practices are outstanding!" };
        if (score >= 70) return { level: "Good", color: "#3B82F6", description: "You have solid security foundations with room for improvement." };
        if (score >= 50) return { level: "Fair", color: "#F59E0B", description: "Your security needs significant improvements." };
        if (score >= 30) return { level: "Poor", color: "#EF4444", description: "Your digital presence is at high risk." };
        return { level: "Critical", color: "#DC2626", description: "Immediate action required to protect your brand." };
    }

    getRecommendations(score, categoryScores) {
        const recommendations = [];
        
        // Check each category and provide specific recommendations
        Object.entries(categoryScores).forEach(([category, data]) => {
            const categoryScore = Math.round((data.score / data.maxScore) * 100);
            
            if (categoryScore < 70) {
                switch (category) {
                    case 'passwords':
                        recommendations.push({
                            icon: "fas fa-key",
                            title: "Improve Password Security",
                            description: "Use a password manager and unique passwords for each account",
                            priority: "high"
                        });
                        break;
                    case 'authentication':
                        recommendations.push({
                            icon: "fas fa-shield-alt",
                            title: "Enable Two-Factor Authentication",
                            description: "Set up 2FA on all your social media and business accounts",
                            priority: "high"
                        });
                        break;
                    case 'devices':
                        recommendations.push({
                            icon: "fas fa-laptop",
                            title: "Secure Your Devices",
                            description: "Install enterprise-grade security software and enable encryption",
                            priority: "medium"
                        });
                        break;
                    case 'backup':
                        recommendations.push({
                            icon: "fas fa-cloud-upload-alt",
                            title: "Implement Regular Backups",
                            description: "Set up automated backups for all your content and important data",
                            priority: "high"
                        });
                        break;
                    case 'monitoring':
                        recommendations.push({
                            icon: "fas fa-eye",
                            title: "Monitor Account Activity",
                            description: "Set up alerts and regularly review account access logs",
                            priority: "medium"
                        });
                        break;
                    case 'brandProtection':
                        recommendations.push({
                            icon: "fas fa-search",
                            title: "Monitor Your Brand",
                            description: "Use monitoring services to detect impersonation and content theft",
                            priority: "medium"
                        });
                        break;
                }
            }
        });

        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    getSuggestedPlan(score) {
        if (score >= 70) {
            return {
                name: "Starter Shield",
                price: "$99/month",
                description: "Perfect for maintaining your good security practices",
                features: ["Account Security Audit", "Basic Privacy Protection", "Monthly Security Check-ins"],
                highlight: "Maintain your excellent security foundation"
            };
        } else if (score >= 40) {
            return {
                name: "Creator Pro",
                price: "$299/month",
                description: "Comprehensive protection to address your security gaps",
                features: ["Everything in Starter Shield", "24/7 Brand Monitoring", "Security Training", "Incident Response"],
                highlight: "Most popular for creators like you"
            };
        } else {
            return {
                name: "Enterprise Guardian",
                price: "$799/month",
                description: "Complete security overhaul for high-risk situations",
                features: ["Everything in Creator Pro", "Dedicated Security Manager", "24/7 Emergency Support", "Custom Solutions"],
                highlight: "Immediate protection required"
            };
        }
    }

    showResults() {
        const results = this.calculateScore();
        const securityLevel = this.getSecurityLevel(results.score);
        const recommendations = this.getRecommendations(results.score, results.categoryScores);
        const suggestedPlan = this.getSuggestedPlan(results.score);

        // Update score display
        document.getElementById('final-score').textContent = results.score;
        document.getElementById('security-level').textContent = securityLevel.level;
        document.getElementById('security-description').textContent = securityLevel.description;
        
        // Style score circle based on level
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.borderColor = securityLevel.color;
        
        // Render category scores
        const categoryContainer = document.getElementById('category-scores');
        categoryContainer.innerHTML = Object.entries(results.categoryScores)
            .map(([category, data]) => {
                const categoryScore = Math.round((data.score / data.maxScore) * 100);
                return `
                    <div class="category-item">
                        <span class="category-name">${this.formatCategoryName(category)}</span>
                        <div class="category-bar">
                            <div class="category-fill" style="width: ${categoryScore}%; background-color: ${this.getCategoryColor(categoryScore)}"></div>
                        </div>
                        <span class="category-score">${categoryScore}%</span>
                    </div>
                `;
            }).join('');

        // Render recommendations
        const recommendationContainer = document.getElementById('recommendation-list');
        recommendationContainer.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item ${rec.priority}">
                <i class="${rec.icon}"></i>
                <div class="rec-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
                <span class="priority-badge">${rec.priority}</span>
            </div>
        `).join('');

        // Render plan suggestion
        const planContainer = document.getElementById('plan-suggestion');
        planContainer.innerHTML = `
            <div class="plan-header">
                <h4>${suggestedPlan.name}</h4>
                <div class="plan-price">${suggestedPlan.price}</div>
            </div>
            <p class="plan-description">${suggestedPlan.description}</p>
            <ul class="plan-features">
                ${suggestedPlan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
            <div class="plan-highlight">${suggestedPlan.highlight}</div>
        `;

        this.showScreen('quiz-results');
    }

    formatCategoryName(category) {
        const names = {
            passwords: "Password Security",
            authentication: "Two-Factor Auth",
            devices: "Device Security",
            backup: "Data Backup",
            privacy: "Privacy Protection",
            emails: "Email Security", 
            wifi: "Network Security",
            monitoring: "Account Monitoring",
            collaboration: "Team Access",
            updates: "Software Updates",
            brandProtection: "Brand Protection",
            recovery: "Account Recovery",
            training: "Security Awareness",
            incident: "Incident Response",
            revenue: "Financial Security"
        };
        return names[category] || category;
    }

    getCategoryColor(score) {
        if (score >= 80) return "#22C55E";
        if (score >= 60) return "#3B82F6";
        if (score >= 40) return "#F59E0B";
        return "#EF4444";
    }

    exitQuiz() {
        if (confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
            this.showScreen('quiz-start');
            this.currentQuestion = 0;
            this.answers = [];
        }
    }

    retakeQuiz() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showScreen('quiz-start');
    }

    shareResults() {
        const results = this.calculateScore();
        const text = `I just completed the Kaguya Security Assessment and scored ${results.score}/100! Take the quiz to see how secure your creator brand is.`;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'Kaguya Security Assessment Results',
                text: text,
                url: url
            });
        } else {
            // Fallback to copying to clipboard
            navigator.clipboard.writeText(`${text} ${url}`).then(() => {
                alert('Results copied to clipboard!');
            });
        }
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SecurityQuiz();
});

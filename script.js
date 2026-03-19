// 移动端汉堡菜单
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ 手风琴效果
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // 关闭其他所有项
        faqItems.forEach(i => i.classList.remove('active'));
        
        // 切换当前项
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// 联系表单提交
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加表单提交逻辑，比如发送到后端API
        alert('感谢您的咨询！我们会尽快与您联系。');
        contactForm.reset();
    });
}

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 立即咨询弹窗
function openConsultModal() {
    const modal = document.getElementById('consultModal');
    if (modal) {
        modal.classList.add('active');
    } else {
        // 如果弹窗不存在，滚动到联系区域
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

function closeConsultModal() {
    const modal = document.getElementById('consultModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 点击模态框外部关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeConsultModal();
    }
});

// 添加卡片交互动画
const cards = document.querySelectorAll('.service-card, .lawyer-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// 统计数字动画
const statItems = document.querySelectorAll('.stat-item h3');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    
    const statsSection = document.querySelector('.hero-stats');
    const statsTop = statsSection.getBoundingClientRect().top;
    
    if (statsTop < window.innerHeight) {
        statItems.forEach(item => {
            const finalValue = item.innerText;
            if (!isNaN(parseInt(finalValue))) {
                let current = 0;
                const target = parseInt(finalValue);
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        item.innerText = finalValue;
                        clearInterval(timer);
                    } else {
                        item.innerText = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
                    }
                }, 30);
            }
        });
        statsAnimated = true;
    }
};

window.addEventListener('scroll', animateStats);
animateStats(); // 初始检查

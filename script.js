
/* =========================================================
   ANNABIUM INDUSTRIES
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. جلب العناصر الأساسية
   ========================================================= */

const themeBtn = document.getElementById('theme-toggle');
const siteLogo = document.getElementById('site-logo');


/* =========================================================
   2. تهيئة أيقونات Lucide عند تحميل الصفحة
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // تحديث أيقونة الوضع الداكن والشعار
    updateThemeIcon();

});


/* =========================================================
   3. الوضع الداكن Dark Mode
   ========================================================= */

/**
 * تحديث أيقونتي الشمس والقمر ولون الزر والشعار.
 * نحافظ على SVG الموجودة في HTML ولا نستبدلها.
 */
function updateThemeIcon() {

    const btn = document.getElementById('theme-toggle');
    const logo = document.getElementById('site-logo');

    if (!btn) return;

    const isDark = document.body.classList.contains('dark-mode');

    // جلب أيقونتي SVG من HTML
    const sunIcon = btn.querySelector('.sun-icon');
    const moonIcon = btn.querySelector('.moon-icon');

    // الوضع الفاتح: الشمس
    // الوضع الداكن: القمر
    if (sunIcon) {
        sunIcon.style.display = isDark ? 'none' : 'block';
    }

    if (moonIcon) {
        moonIcon.style.display = isDark ? 'block' : 'none';
    }

    // تغيير لون الأيقونة
    btn.style.color = isDark ? '#FACC15' : '#64748B';

    // تحديث شعار الشركة
    if (logo) {
        logo.src = isDark
            ? 'images/logo-dark.png'
            : 'images/logo-light.png';
    }

}


// الاستماع إلى النقر على زر الوضع الداكن
if (themeBtn) {

    themeBtn.addEventListener('click', () => {

        // تبديل الوضع الداكن
        document.body.classList.toggle('dark-mode');

        // تحديث الأيقونة والشعار
        updateThemeIcon();

    });

}


/* =========================================================
   4. التحكم بقائمة اللغات والأعلام
   ========================================================= */

/**
 * فتح وإغلاق قائمة اللغات
 */
function toggleLangMenu(event) {

    if (event) {
        event.stopPropagation();
    }

    const optionsList = document.getElementById('langOptionsList');

    if (optionsList) {
        optionsList.classList.toggle('show');
    }

}


/**
 * اختيار اللغة وتحديث العلم والنص
 */
function selectLang(langCode, flagSrc, langText) {

    const btn = document.getElementById('current-lang-btn');

    if (btn) {

        const imgEl = btn.querySelector('img');
        const spanEl = btn.querySelector('span');

        if (imgEl) {
            imgEl.src = flagSrc;
        }

        if (spanEl) {
            spanEl.innerText = langText;
        }

    }

    // إغلاق قائمة اللغات بعد الاختيار
    const optionsList = document.getElementById('langOptionsList');

    if (optionsList) {
        optionsList.classList.remove('show');
    }

    // تغيير لغة الموقع
    switchLanguage(langCode);

}


/**
 * إغلاق قائمة اللغات عند النقر خارجها
 */
document.addEventListener('click', (event) => {

    if (!event.target.closest('.custom-lang-dropdown')) {

        const optionsList = document.getElementById('langOptionsList');

        if (optionsList) {
            optionsList.classList.remove('show');
        }

    }

});


/* =========================================================
   5. تبديل لغة الموقع
   ========================================================= */

function switchLanguage(lang) {

    // ضبط اتجاه الصفحة واللغة
    if (lang === 'ar') {

        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';

    } else {

        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang;

    }

    // تحديث النصوص وفق اللغة المختارة
    const elements = document.querySelectorAll('[data-ar]');

    elements.forEach((el) => {

        let translatedText = null;

        if (lang === 'ar') {
            translatedText = el.getAttribute('data-ar');
        } else if (lang === 'en') {
            translatedText = el.getAttribute('data-en');
        } else if (lang === 'fr') {
            translatedText = el.getAttribute('data-fr');
        }

        // عدم استبدال النص إذا لم تتوفر ترجمته
        if (translatedText !== null) {
            el.textContent = translatedText;
        }

    });

}


/* =========================================================
   6. مراقبة التمرير وإظهار بطاقات الخدمات
   ========================================================= */

function initServiceCards() {

    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceCards.length === 0) return;

    // التأكد من دعم المتصفح للمراقبة
    if (!('IntersectionObserver' in window)) {

        serviceCards.forEach((card) => {
            card.classList.add('active');
        });

        return;

    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // إظهار البطاقة
                entry.target.classList.add('active');

                // إيقاف مراقبتها بعد ظهورها
                observer.unobserve(entry.target);

            }

        });

    }, observerOptions);

    // بدء مراقبة بطاقات الخدمات
    serviceCards.forEach((card) => {
        cardObserver.observe(card);
    });

}


/* =========================================================
   7. إظهار وإخفاء محتوى بطاقات المميزات
   ========================================================= */

function toggleFeature(headerElement) {

    if (!headerElement) return;

    const card = headerElement.parentElement;

    if (card) {
        card.classList.toggle('active');
    }

}


/* =========================================================
   8. إظهار العناصر عند التمرير Scroll Reveal
   ========================================================= */

function initScrollReveal() {

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length === 0) return;

    const checkScroll = () => {

        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach((el) => {

            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.classList.add('is-visible');
            }

        });

    };

    // مراقبة التمرير
    window.addEventListener('scroll', checkScroll, {
        passive: true
    });

    // فحص العناصر عند تحميل الصفحة
    checkScroll();

}


/* =========================================================
   9. تهيئة الحركات عند تحميل الصفحة
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // بطاقات الخدمات
    initServiceCards();

    // العناصر التي تظهر أثناء التمرير
    initScrollReveal();

});
// تفعيل الظهور التدريجي لقسم "من نحن" عند التمرير لأسفل
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('#about');

    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2 // يبدأ الظهور عند وصول 20% من القسم إلى الشاشة
        });

        observer.observe(aboutSection);
    }
});
/* ═══════════════════════════════════════════════════════════════
   Raithu Bazaar — Multilingual Support (lang.js)
   Supports: English (en), Telugu (te), Hindi (hi)
   ═══════════════════════════════════════════════════════════════ */

const RaithuLang = (() => {
    const translations = {
        en: {
            'hero.badge': 'Now Serving Telangana & Andhra Pradesh',
            'hero.welcome': 'Welcome to',
            'hero.brand': 'Raithu Bazaar',
            'hero.tagline': 'Fresh from Farm to Your Home — No Middlemen, Better Prices',
            'hero.desc': "India's trusted farm-to-customer marketplace. Connect with local farmers, get chemical-free fresh produce delivered within 12-24 hours of harvest.",
            'mission.statement': 'Raithu Bazaar is not just an app — it is a movement to empower India\'s backbone, the farmer.',
            'nav.shop': 'Shop',
            'nav.howItWorks': 'How It Works',
            'nav.farmers': 'Farmers',
            'nav.forFarmers': 'For Farmers',
            'nav.contact': 'Contact',
            'nav.about': 'About Us',
            'cta.shopFresh': 'Shop Fresh Produce',
            'cta.registerFarmer': 'Register as Farmer',
            'cta.startShopping': 'Start Shopping Fresh',
        },
        te: {
            'hero.badge': 'తెలంగాణ & ఆంధ్రప్రదేశ్‌లో సేవలు',
            'hero.welcome': 'స్వాగతం',
            'hero.brand': 'రైతు బజార్',
            'hero.tagline': 'పొలం నుండి మీ ఇంటికి — మధ్యవర్తులు లేరు, మంచి ధరలు',
            'hero.desc': 'భారతదేశం నమ్మకమైన రైతు-నుండి-వినియోగదారు మార్కెట్‌ప్లేస్. స్థానిక రైతులతో అనుసంధానం, రసాయన రహిత తాజా కూరగాయలు 12-24 గంటలలో డెలివరీ.',
            'mission.statement': 'రైతు బజార్ కేవలం యాప్ కాదు — భారతదేశ వెన్నెముక అయిన రైతును శక్తివంతం చేసే ఉద్యమం.',
            'nav.shop': 'షాప్',
            'nav.howItWorks': 'ఎలా పనిచేస్తుంది',
            'nav.farmers': 'రైతులు',
            'nav.forFarmers': 'రైతుల కోసం',
            'nav.contact': 'సంప్రదించండి',
            'nav.about': 'మా గురించి',
            'cta.shopFresh': 'తాజా ఉత్పత్తులు కొనండి',
            'cta.registerFarmer': 'రైతుగా నమోదు చేయండి',
            'cta.startShopping': 'షాపింగ్ ప్రారంభించండి',
        },
        hi: {
            'hero.badge': 'अब तेलंगाना और आंध्र प्रदेश में सेवा',
            'hero.welcome': 'स्वागत है',
            'hero.brand': 'रैतू बाज़ार',
            'hero.tagline': 'खेत से सीधे आपके घर — बिचौलिये नहीं, बेहतर दाम',
            'hero.desc': 'भारत का विश्वसनीय किसान-से-ग्राहक मार्केटप्लेस। स्थानीय किसानों से जुड़ें, रसायन मुक्त ताज़ी सब्ज़ियाँ 12-24 घंटों में डिलीवरी।',
            'mission.statement': 'रैतू बाज़ार सिर्फ़ एक ऐप नहीं है — यह भारत की रीढ़, किसान को सशक्त बनाने का आंदोलन है।',
            'nav.shop': 'शॉप',
            'nav.howItWorks': 'कैसे काम करता है',
            'nav.farmers': 'किसान',
            'nav.forFarmers': 'किसानों के लिए',
            'nav.contact': 'संपर्क करें',
            'nav.about': 'हमारे बारे में',
            'cta.shopFresh': 'ताज़ी उपज खरीदें',
            'cta.registerFarmer': 'किसान के रूप में रजिस्टर करें',
            'cta.startShopping': 'शॉपिंग शुरू करें',
        }
    };

    function getLang() {
        return localStorage.getItem('rb_lang') || 'en';
    }

    function setLang(lang) {
        localStorage.setItem('rb_lang', lang);
        applyTranslations(lang);
        // Update language switcher buttons
        document.querySelectorAll('[data-lang-btn]').forEach(btn => {
            const isActive = btn.getAttribute('data-lang-btn') === lang;
            btn.className = `px-2.5 py-1 rounded-full text-xs font-bold transition-all ${isActive ? 'bg-gold text-forest' : 'text-white bg-white/20 hover:bg-white/30'}`;
        });
    }

    function t(key, lang) {
        const l = lang || getLang();
        return (translations[l] && translations[l][key]) || (translations.en && translations.en[key]) || key;
    }

    function applyTranslations(lang) {
        const l = lang || getLang();
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = t(key, l);
            if (text && text !== key) {
                el.textContent = text;
            }
        });
    }

    return { getLang, setLang, t, applyTranslations };
})();

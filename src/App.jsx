import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// --- BILINGUAL DICTIONARY DATA SYSTEM ---
const translationData = {
  en: {
    dir: 'ltr',
    nav: { home: 'Home', works: 'Works', about: 'About me', contact: 'Contact' },
    hero: { part1: "Let's make", part2: "something awesome." },
    sectionHeader: "Cool things I have built",
    about: {
      title: "About Me",
      bio: "My name is Saif addin, and I am a Multitalented Computer Science graduate specializing in AI, machine learning, and full-stack development. I focus heavily on structural visual systems, programmatic micro-interactions, and visual clean web design properties."
    },
    projects: [
      {
        title: "Inventory Management System",
        desc: "A cross-platform ecosystem featuring an asynchronous architecture pipeline. Engineered with automatic stock deduction states, real-time lifecycle tracking components, and an automated 10-second data refreshing operations console. Optimized using role-based JWT authentication layers and a custom Arabic RTL presentation interface.",
        action: "Request a similar system"
      },
      {
        title: "Clinic AI Assistant Engine",
        desc: "An intelligence module built into a clinic orchestration framework. Developed using natural language interaction trees to handle live user queries. Integrated through a server-side Python backend to bridge user intent seamlessly with secure database services.",
        action: "Check Out the demo"
      },
      {
        title: "Reinforcement Learning Agent",
        desc: "A custom programmatic environment operating on tabular Q-learning matrix loops. Implemented with epsilon-greedy exploration logic, custom decay calculations, and reward shaping variables. Features local data persistence utilizing serialized Q-tables combined with an interactive real-time command-line interface.",
        action: "Agent's Code"
      },
      {
        title: "Supervised Predictive Models",
        desc: "A mathematical modeling array containing classification and regression workflows. Includes Random Forest sentiment analysis, Logistic Regression diagnostics, and Multiple Linear Regression metrics. Designed with rigorous data preprocessing, advanced feature engineering pipelines, and strict RMSE validation benchmarks.",
        action: "Analyze Models' Results and Accuracy"
      }
    ]
  },
  ar: {
    dir: 'rtl',
    nav: { home: 'الرئيسية', works: 'أعمالي', about: 'من أنا' , contact: 'اتصل بي'},
    hero: { part1: "يلا نبني", part2: "حاجة مذهلة." },
    sectionHeader: "مشاريع رائعة قمت ببنائها",
    about: {
      title: "من أنا",
      bio: "أسمي سيف الدين، وأنا خريج علوم حاسب متخصص في الذكاء الاصطناعي، تعلم الآلة، وتطوير الويب و البرامج . أركز بشكل مكثف على الأنظمة البصرية الهيكلية، التفاعلات البرمجية الدقيقة، وخصائص تصميم الويب البصري النظيف."
    },
    projects: [
      {
        title: "نظام إدارة المخزون",
        desc: "نظام ادارة المخازن اللي اشتغلت عليه هو نظام متكامل لإدارة المخزون، معمول باستخدام Python (FastAPI) في الـ backend، وReact للويب، وFlutter للموبايل، مع قاعدة بيانات MongoDB النظام بيوفر إدارة كاملة للمخزون بشكل فوري، بحيث أي عملية بيع أو إلغاء طلب بتأثر مباشرة على الكميات. كمان فيه نظام صلاحيات (Admin / Supervisor / Staff) للتحكم في الوصول،",
        action: "طلب نظام مشابه"
      },
      {
        title: " المساعد الذكي للعيادات",
        desc: "مشروع الـمساعد الذكي في نظام إدارة العيادات كان جزء من مشروع التخرج بتاعي، وكان الهدف منه إني أبسط استخدام السيستم لأي حد حتى لو مش تقني, الفكرة ببساطة إن بدل ما المستخدم يتعامل مع نظام معقد أو يدور على كل حاجة بنفسه، يقدر بس يكتب سؤاله بشكل عادي زي “عايز أحجز معاد” أو “مواعيد الدكتور إمتى؟”، والـ chatbot يفهمه ويرد عليه أو يساعده يوصل للمعلومة بسرعة, أنا طورت الـ chatbot باستخدام Flowise خلال فترة تنفيذ مشروع التخرج، وده ساعدني أربط نموذج ذكاء اصطناعي بالنظام نفسه. يعني مش مجرد ردود محفوظة، لكن يقدر يتعامل مع بيانات حقيقية من السيستم عن طريق الربط مع الـ backend.",
        action: "جرب تكلم المساعد"
      },
      {
        title: "عميل التعلم المعزز",
        desc: "مشروع الـ XO agent كان عبارة عن بناء نموذج ذكاء اصطناعي بيتعلم يلعب اللعبة بنفسه باستخدام Reinforcement Learning (Q-learning),عملت بيئة اللعبة من الصفر، وخليت الـ AI يتعلم من خلال انه يلاعب نفسه ، بحيث يجرب قرارات مختلفة ويتحسن مع الوقت بناءً على نظام rewards و penalties.",
        action: " كود العميل"
      },
      {
        title: "نماذج التوقع الخاضعة للإشراف",
        desc: "مجموعة نماذج رياضية تحتوي على مسارات عمل التصنيف والانحدار. تشمل تحليل المشاعر بالغابات العشوائية، تشخيصات الانحدار اللوجستي، ومقاييس الانحدار الخطي المتعدد. تم تصميمها بمعالجة مسبقة صارمة للبيانات، مسارات هندسية متقدمة للميزات، ومعايير تقييم RMSE دقيقة.",
        action: "شوف نتايج و دقة النماذج"
      }
    ]
  }
};

export default function App() {
  const [lang, setLang] = useState('en'); 
  const t = translationData[lang]; 
  const [isContactOpen, setIsContactOpen] = useState(false);
  const sliderRef = useRef(null);

 useEffect(() => {

  const slider = sliderRef.current;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;

    slider.scrollLeft = scrollLeft - walk;
  });

  }, []);

  const [displayedCode, setDisplayedCode] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  const stateRef = useRef({ snippetIndex: 0, characterIndex: 0 });

  const codeSnippets = [
    `const profile = {\n  name: "Saif Addin",\n  role: "AI & Full-Stack Developer",\n  status: "Available"\n};`,
    `function init() {\n  connectSystem("FastAPI", "React");\n  runMLModels();\n}`
  ];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  // Terminal Typewriter Engine loop running the snippets code text script
  useEffect(() => {
    let timer;
    const typeCode = () => {
      const state = stateRef.current;
      const currentSnippet = codeSnippets[state.snippetIndex];
      if (state.characterIndex < currentSnippet.length) {
        setDisplayedCode(currentSnippet.substring(0, state.characterIndex + 1));
        state.characterIndex++;
        timer = setTimeout(typeCode, 45);
      } else {
        timer = setTimeout(eraseCode, 2800);
      }
    };

    const eraseCode = () => {
      const state = stateRef.current;
      const currentSnippet = codeSnippets[state.snippetIndex];
      if (state.characterIndex > 0) {
        setDisplayedCode(currentSnippet.substring(0, state.characterIndex - 1));
        state.characterIndex--;
        timer = setTimeout(eraseCode, 15);
      } else {
        state.snippetIndex = (state.snippetIndex + 1) % codeSnippets.length;
        timer = setTimeout(typeCode, 500);
      }
    };

    typeCode();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const sectionOptions = { root: null, threshold: 0.2, rootMargin: "0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.getAttribute('id'));
      });
    }, sectionOptions);

    document.querySelectorAll('header, div.works-container-block, section').forEach(sect => {
      if (sect.getAttribute('id')) observer.observe(sect);
    });
    return () => observer.disconnect();
  }, []);

  const handleMouseEnterTarget = () => document.body.classList.add('cursor-hover');
  const handleMouseLeaveTarget = () => document.body.classList.remove('cursor-hover');

  return (
    <>
      <div id="custom-cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />

      <button 
        className="lang-switcher-btn"
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        onMouseEnter={handleMouseEnterTarget}
        onMouseLeave={handleMouseLeaveTarget}
      >
        {lang === 'en' ? 'العربية' : 'English'}
      </button>

      <nav className="floating-nav">
        <a href="#home" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>{t.nav.home}</a>
        <a href="#projects-target" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className={`nav-link ${activeSection === 'projects-target' ? 'active' : ''}`}>{t.nav.works}</a>
        <a href="#about" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>{t.nav.about}</a>
          {/* NEW: Contact text list element button trigger */}
        <button 
            onClick={() => setIsContactOpen(true)}
            onMouseEnter={handleMouseEnterTarget} 
            onMouseLeave={handleMouseLeaveTarget} 
            className={`nav-link-btn ${isContactOpen ? 'active' : ''}`}
        >
            {t.nav.contact}
        </button>
      </nav>

      {/* 1. RETRO DESK ENV OVERLAY SCREEN AT THE TOP ROW */}
      <header id="home" className="hero-section">
        <div className="radial-glow" />
        <div className="hero-content">
          <h1 onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget}>
            {t.hero.part1} <br />
            <span className="serif-italic">{t.hero.part2}</span>
          </h1>
        </div>

        <div className="footer-graphic-box">
          <div className="exact-scene-canvas structural-freeze">
            <img src="/public/Generated_Images.png" alt="Thibaut Desk Environment Setup" className="scene-background-plate" />
            <div className="live-screen-viewport">
              <div className="scanlines" />
              <pre className="terminal-content">{displayedCode}</pre>
            </div>
          </div>
        </div>
      </header>

      {/* 2. CASE STUDIES ACCENT GRID LAYOUT GROUP */}
      <div id="projects-target" className="works-container-block">
        <div className="projects-header-wrapper">
          <h2 className="global-works-grid-heading">{t.sectionHeader}</h2>
        </div>

        <main className="projects-section">
          
          {/* Item 1 - Inventory Management System */}
          <div className="project-item">
            <div className="project-details">
              <h2>{t.projects[0].title}</h2>
              <p>{t.projects[0].desc}</p>
              <a href="mailto:saifaddinraafat@hotmail.com" target="_blank" rel="noreferrer" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className="email-btn">{t.projects[0].action}</a>
            </div>
            <div className="project-visual-wrapper slider-container">
              <div className="image-slider" ref={sliderRef}>
                <img src="/public/Screenshot (454).png" alt="Dashboard Panel Interface View" />
                <img src="/public/Screenshot (455).png" alt="Dashboard Panel Interface View" />
                <img src="/public/Screenshot (456).png" alt="Dashboard Panel Interface View" />
                <img src="/public/Screenshot (457).png" alt="Dashboard Panel Interface View" />
                <img src="/public/Screenshot (458).png" alt="Dashboard Panel Interface View" />
                <img src="/public/Screenshot (459).png" alt="Dashboard Panel Interface View" />
                <img src="/public/Screenshot (460).png" alt="Dashboard Panel Interface View" />
              </div>
            </div>
          </div>

          {/* Item 2 - Clinic AI Assistant Engine */}
          <div className="project-item">
            <div className="project-details">
              <h2>{t.projects[1].title}</h2>
              <p>{t.projects[1].desc}</p>
              <a href="https://cloud.flowiseai.com/chatbot/95832782-11c9-4c77-a59e-71eff19cb60e" target="_blank" rel="noreferrer" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className="email-btn">{t.projects[1].action}</a>
            </div>
            <div className="project-visual-wrapper video-container">
              <video src="/public/Proffy.mp4" muted autoPlay loop playsInline className="showcase-video" />
            </div>
          </div>

          {/* Item 3 - Reinforcement Learning Agent */}
          <div className="project-item">
            <div className="project-details">
              <h2>{t.projects[2].title}</h2>
              <p>{t.projects[2].desc}</p>
              <a href="https://github.com/Saiffuddiny/q-learning-tic-tac-toe" target="_blank" rel="noreferrer" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className="email-btn">{t.projects[2].action}</a>
            </div>
            <div className="project-visual-wrapper video-container">
              <iframe height="400" width="100%" src="https://www.youtube.com/embed/bkQCffqWj2A" muted autoPlay loop playsInline className="showcase-video1" />
            </div>
          </div>

          {/* Item 4 - Supervised Predictive Models */}
          <div className="project-item">
            <div className="project-details">
              <h2>{t.projects[3].title}</h2>
              <p>{t.projects[3].desc}</p>
              <a href="https://github.com/Saiffuddiny/breast-Cancer-detection-ML/blob/main/Logistic_Regression.ipynb" target="_blank" rel="noreferrer" onMouseEnter={handleMouseEnterTarget} onMouseLeave={handleMouseLeaveTarget} className="email-btn">{t.projects[3].action}</a>
            </div>
            <div className="project-visual-wrapper">
              <img src="/public/Screenshot (500).png" alt="" className="showcase-video" />
              
            </div>
          </div>
        </main>
      </div>

      {/* 3. BIO DESCRIPTION PANEL PROFILE WITH WIDE LAPTOP MOUNTED IN THE FOOTER */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2>{t.about.title}</h2>
          <p>{t.about.bio}</p>
        </div>

        <div className="hero-laptop-chassis">
          <img src="/public/Mechanical Keyboard.png" alt="Modern Laptop Casing Showcase" className="laptop-hardware-image" />
        </div>
      </section>
        <div className={`contact-slide-drawer ${isContactOpen ? 'open' : ''}`}>
        {/* Translucent overlay backdrop block clicks out */}
        <div className="drawer-overlay" onClick={() => setIsContactOpen(false)} />
        
        {/* Main Sliding White Sheet Box Container Panel */}
        <div className="drawer-sheet-body">
          <button 
            className="drawer-close-x" 
            onClick={() => setIsContactOpen(false)}
            onMouseEnter={handleMouseEnterTarget}
            onMouseLeave={handleMouseLeaveTarget}
          >
            ✕
          </button>
          
          <div className="drawer-content-inner">
            <h3 className="drawer-heading">Get in touch</h3>
            <p className="drawer-subtext">Have a project in mind or want to talk systems architecture? Drop a line.</p>
            
            <a 
              href="mailto:saifaddinraafat@hotmail.com" 
              className="drawer-email-action-link"
              onMouseEnter={handleMouseEnterTarget}
              onMouseLeave={handleMouseLeaveTarget}
            >
              saifaddinraafat@hotmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

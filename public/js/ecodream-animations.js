/* 
   NDSE EcoDream Animations
   Core: GSAP + ScrollTrigger
*/

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initial Appearance
    gsap.to('body', { opacity: 1, duration: 1 });

    // Hero Entry Animation
    const heroTl = gsap.timeline();
    heroTl.from('.intro-section h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    })
        .from('.intro-section .img-fluid', {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)'
        }, '-=0.8');

    // Section Reveal Animations
    const sections = document.querySelectorAll('.site-section, .block-2, .footer');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Service Card Stagger
    gsap.from('.service-1', {
        scrollTrigger: {
            trigger: '.services-1-wrap',
            start: 'top 70%'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Float Animations
    gsap.to('.quick-contact-icons', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
    });

    // Sticky Navbar Transition
    ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => gsap.to('.site-navbar', {
            backgroundColor: 'rgba(5, 26, 26, 0.95)',
            paddingTop: '10px',
            paddingBottom: '10px',
            duration: 0.4
        }),
        onLeaveBack: () => gsap.to('.site-navbar', {
            backgroundColor: 'rgba(5, 26, 26, 0.8)',
            paddingTop: '20px',
            paddingBottom: '20px',
            duration: 0.4
        })
    });
});

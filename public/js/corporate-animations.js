document:addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in Page Reveal
    gsap.to('body', { opacity: 1, duration: 0.8 });

    // Hero Text Split Animation (Enhanced)
    gsap.from('.intro-section h1', {
        y: 50,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power4.out'
    });

    gsap.from('.intro-section p', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Subtle Section Slide-Up
    const sections = document.querySelectorAll('.site-section, .block-2');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 90%'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'expo.out'
        });
    });

    // Card & Image Reveal (Sequential)
    const revealTargets = ".service-1, .project-item, .contact-item-premium, .img-animate-premium";
    ScrollTrigger.batch(revealTargets, {
        onEnter: batch => gsap.to(batch, {
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            duration: 0.8, 
            ease: 'back.out(1.7)',
            overwrite: true 
        }),
        start: 'top 85%',
    });

    // Ensure initial state for animated items
    gsap.set(revealTargets, { opacity: 0, y: 40 });

    // Glass Effect Reveal
    gsap.from('.glass-effect', {
        scrollTrigger: {
            trigger: '.glass-effect',
            start: 'top 85%'
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Logo & Footer Reveal
    gsap.from('.footer .col-lg-3, .footer .col-lg-2', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
    });
});

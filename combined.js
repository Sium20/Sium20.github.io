window.onload = function() {
    // ===== Initialize Particles =====
    initParticles();
    
    // ===== Setup Scroll To Top Button =====
    setupScrollToTop();
    
    // ===== Setup Audio Controls =====
    setupAudioControls();
};

// Function to handle the scroll to top button
function setupScrollToTop() {
    // Get the button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
}

// Function to scroll to top when button is clicked
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to initialize particles
function initParticles() {
    particlesJS("particles", {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.8,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: true,
                    mode: "push"
                },
                onClick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    
    console.log('Particles initialized');
}

// Function to setup audio controls
function setupAudioControls() {
    const audio = document.getElementById('backgroundMusic');
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = audioToggle.querySelector('i');
    
    // Set volume to a pleasant level
    audio.volume = 0.4;
    
    // Audio is paused by default
    let isPlaying = false;
    
    // Toggle audio playback
    function toggleAudio() {
        if (isPlaying) {
            audio.pause();
            audioToggle.classList.remove('playing');
            audioIcon.className = 'bx bx-play';
        } else {
            // Use promise to handle autoplay restrictions
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        audioToggle.classList.add('playing');
                        audioIcon.className = 'bx bx-pause';
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                        // User interaction required message
                        if (error.name === 'NotAllowedError') {
                            const tooltip = document.createElement('div');
                            tooltip.className = 'audio-tooltip';
                            tooltip.textContent = 'Click to enable audio';
                            audioToggle.appendChild(tooltip);
                            
                            setTimeout(() => {
                                tooltip.remove();
                            }, 3000);
                        }
                    });
            }
        }
        
        isPlaying = !isPlaying;
    }
    
    // Add click event listener
    audioToggle.addEventListener('click', toggleAudio);
    
    // Reset when audio ends
    audio.addEventListener('ended', function() {
        isPlaying = false;
        audioToggle.classList.remove('playing');
        audioIcon.className = 'bx bx-play';
        
        // Optional: if you want the audio to loop
        // audio.currentTime = 0;
        // toggleAudio();
    });
    
    // Add pulse animation to indicate audio available
    setTimeout(() => {
        audioToggle.classList.add('pulse-animation');
        setTimeout(() => {
            audioToggle.classList.remove('pulse-animation');
        }, 2000);
    }, 1500);
}

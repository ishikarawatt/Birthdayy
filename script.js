document.addEventListener('DOMContentLoaded', function() {

    // --- UNIVERSAL SCRIPT: Continuous Background Music ---
    const myAudio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-music');

    function saveAudioState() {
        if (myAudio && !myAudio.paused) {
            sessionStorage.setItem('audioTime', myAudio.currentTime);
            sessionStorage.setItem('audioPlaying', 'true');
        } else {
            sessionStorage.removeItem('audioPlaying');
        }
    }

    function loadAudioState() {
        const audioTime = sessionStorage.getItem('audioTime');
        const isPlaying = sessionStorage.getItem('audioPlaying');
        if (myAudio && isPlaying === 'true' && audioTime) {
            myAudio.currentTime = parseFloat(audioTime);
            myAudio.play().catch(e => {
                console.log("Audio play was interrupted by browser.");
                if (playBtn) playBtn.style.display = 'block';
            });
            if (playBtn) playBtn.style.display = 'none';
        }
    }

    loadAudioState();

    if (playBtn && myAudio) {
        playBtn.addEventListener('click', function() {
            myAudio.play();
            if (playBtn) playBtn.style.display = 'none';
        });
    }

    window.addEventListener('beforeunload', saveAudioState);
    
    // --- END OF UNIVERSAL SCRIPT ---


    // --- PAGE-SPECIFIC SCRIPTS ---

    // 1. SCRIPT FOR HOMEPAGE (index.html)
    // This will only run if it finds the element with the ID '#calendar-grid'
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        const birthdayDate = 27;
        const daysInMonth = 31; // August
        const startDayOffset = 4; // August 1st, 2025 is a Friday, so we need 4 empty spots (Mon-Thu)

        // Add empty divs for days before the 1st
        for (let i = 0; i < startDayOffset; i++) {
            const emptyDay = document.createElement('div');
            calendarGrid.appendChild(emptyDay);
        }

        // Add the days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;
            if (i === birthdayDate) {
                dayElement.classList.add('birthday');
            }
            calendarGrid.appendChild(dayElement);
        }
    }
    // 1. SCRIPT FOR JOURNEY PAGE (journey.html)
    const parallaxScenes = document.querySelectorAll('.p-scene');
    if (parallaxScenes.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.3 });
        parallaxScenes.forEach(scene => observer.observe(scene));
    }

    // 2. SCRIPT FOR REASONS PAGE (gifts.html)
   // 2. SCRIPT FOR REASONS PAGE (gifts.html)
const galaxyContainer = document.getElementById('galaxy');
if (galaxyContainer) {
    const modal = document.getElementById('reasonModal');
    const reasonText = document.getElementById('reasonText');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const reasons = [
        "You were just a stranger but became my home 🤗",

"Even in silence, you understand my loudest cries 🥺",

"You laugh at my stupidest jokes like they’re world-class 😂",

"You scold me but 2 min later protect me like a bodyguard 🌹",

"You text me at the exact time I need you 👼",

"You’ve seen my worst sides yet still call me ‘cute’ ✨",

"5 years & not a single fight broke us 🌍",

"You listen to my rants like they’re breaking news 💗",

"You never judge me—even when I’m the villain of my own story 🫶",

"You get happier for my success than I do myself 🏆",

"God gave me a real sis, but also gifted me you as my forever chosen one 🌷",

"One second you give lecture like mummy, next second gossip like bestie 🙈",

"You save me from overthinking more than Google ever could 📚",

"You proved that ‘family’ is not always by blood, it’s by bond 🌼",

"Your ‘hmm’ replies heal more than medicine ☀️",

"I look up to you but also bully you for fun 💪",

"Even your mood swings are my entertainment 😆",

"You drag me out of my darkest thoughts 🌈",

"You’re my all-time gossip partner, certified 👑",

"Even my boring day feels like a movie when I tell you 🌹",

"No one can replace your place in my life ✨",

"I’ll keep loving you beyond time, distance & everything ♾️",
    ];

    const stars = []; // Store star elements for the parallax effect

    reasons.forEach((reason) => {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 4 + 2; // 2px to 6px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Store initial position and parallax depth
        const starData = {
            element: star,
            x: Math.random() * 90 + 5, // %
            y: Math.random() * 80 + 10, // %
            depth: Math.random() * 0.4 + 0.1 // How much it moves
        };
        star.style.left = `${starData.x}%`;
        star.style.top = `${starData.y}%`;
        
        galaxyContainer.appendChild(star);
        stars.push(starData);
        // Fade in stars after a delay
    setTimeout(() => {
        star.style.opacity = 1;
    }, 1500 + Math.random() * 500); // 1.5s to 2s delay

        star.addEventListener('click', () => {
            reasonText.textContent = reason; // Add a title
            modal.classList.add('visible');
        });
    });

    // Parallax Mouse Movement Logic
    window.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        stars.forEach(starData => {
            const moveX = mouseX * starData.depth;
            const moveY = mouseY * starData.depth;
            starData.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // Modal closing logic
    closeModalBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
    });
}

// --- Stardust Text Reveal Script ---
const stardustTitle = document.getElementById('stardust-title');
if (stardustTitle) {
    const text = stardustTitle.textContent;
    stardustTitle.textContent = ''; // Clear original text
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('stardust-char');
        // Stagger the animation start for each letter
        span.style.animationDelay = `${i * 0.05}s`;
        
        // Handle spaces
        if (char === ' ') {
            span.style.width = '0.5em';
        }
        
        stardustTitle.appendChild(span);
    }
}

    // 4. SCRIPT FOR CAKE PAGE (cake.html)
const flameElement = document.getElementById('flame');
if (flameElement) {
    const wishText = document.getElementById('wishText');
    const micInstruction = document.getElementById('mic-instruction');
    const blowButton = document.getElementById('blow');
    let candleBlownOut = false;

    // Function to extinguish the candle
    function blowOutCandle() {
        if (candleBlownOut) return;
        candleBlownOut = true;

        flameElement.style.transition = 'opacity 0.5s ease-out';
        flameElement.style.opacity = '0';
        micInstruction.style.display = 'none';
        
        // Show the wish and confetti
        setTimeout(() => {
            wishText.textContent = 'Happy Birthday, Di! Wish Granted! 💖';
            wishText.classList.add('visible');
            if (typeof burstConfetti === 'function') {
                burstConfetti();
            }
        }, 500);
    }

    // Attempt to use the microphone
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
            analyser.fftSize = 512;
            const buffer = new Uint8Array(analyser.frequencyBinCount);

            function detectBlow() {
                analyser.getByteFrequencyData(buffer);
                let sum = buffer.reduce((a, b) => a + b, 0);
                let average = sum / buffer.length;

                // Threshold for "blowing" sound
                if (average > 100) { 
                    blowOutCandle();
                } else {
                    if (!candleBlownOut) {
                        requestAnimationFrame(detectBlow);
                    }
                }
            }
            detectBlow();
        }).catch(err => {
            console.log("Microphone access denied:", err);
            // Fallback: show the button if mic access is denied
            micInstruction.style.display = 'none';
            blowButton.style.display = 'inline-block';
        });
    } else {
        // Fallback for older browsers
        micInstruction.style.display = 'none';
        blowButton.style.display = 'inline-block';
    }

    // Button click is a fallback
    blowButton.addEventListener('click', blowOutCandle);

    // Confetti Logic (assuming it's here)
    const confettiCanvas = document.getElementById('confetti');
    if (confettiCanvas) {
        const ctx = confettiCanvas.getContext('2d');
        let W, H; let pieces = []; let running = false;
        const colors = ['#ff6fb5', '#7cf7ff', '#ffd166', '#b69cff', '#7CFFB2'];
        function resize() { W = confettiCanvas.width = window.innerWidth; H = confettiCanvas.height = window.innerHeight; }
        window.addEventListener('resize', resize); resize();
        
        window.burstConfetti = function() {
            for (let i = 0; i < 200; i++) {
                pieces.push({
                    x: W / 2, y: H / 2, r: 4 + Math.random() * 6,
                    vx: (Math.random() - 0.5) * 10, vy: -(5 + Math.random() * 10),
                    g: .1, rot: Math.random() * 360,
                    col: colors[(Math.random() * colors.length) | 0]
                });
            }
            if (!running) { running = true; requestAnimationFrame(loop); setTimeout(() => { running = false; pieces = []; }, 4000); }
        }

        function loop() {
            if (!running) return;
            ctx.clearRect(0, 0, W, H);
            for (const p of pieces) {
                p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += 6;
                ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
                ctx.restore();
            }
            requestAnimationFrame(loop);
        }
    }
}
});
// --- Interactive Constellation Hero Script ---
const canvas = document.getElementById('constellation-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let mouse = { x: null, y: null };
    let maxDist = 150; // Max distance to draw a line between stars

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    // Star object
    class Star {
        constructor(x, y, radius, dx, dy) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    // Create stars
    function init() {
        stars = [];
        let numberOfStars = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfStars; i++) {
            let radius = Math.random() * 1.5 + 1;
            let x = Math.random() * (canvas.width - radius * 2) + radius;
            let y = Math.random() * (canvas.height - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * 0.2;
            let dy = (Math.random() - 0.5) * 0.2;
            stars.push(new Star(x, y, radius, dx, dy));
        }
    }

    // Draw lines between stars
    function connect() {
        for (let i = 0; i < stars.length; i++) {
            for (let j = i; j < stars.length; j++) {
                let distance = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
                if (distance < maxDist) {
                    ctx.strokeStyle = `rgba(124, 247, 255, ${1 - distance / maxDist})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.stroke();
                }
            }
            // Connect to mouse
            if (mouse.x && mouse.y) {
                 let distanceToMouse = Math.sqrt((stars[i].x - mouse.x) ** 2 + (stars[i].y - mouse.y) ** 2);
                 if(distanceToMouse < maxDist) {
                    ctx.strokeStyle = `rgba(255, 111, 181, ${1 - distanceToMouse / maxDist})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                 }
            }
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => star.update());
        connect();
    }

    // Event listeners
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        init();
    });
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y - canvas.getBoundingClientRect().top;
    });
     window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    init();
    animate();
}
document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.hearts-container');
    const totalHearts = 20;

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 15 + 10}s`; // Random duration
        heart.style.animationDelay = `${Math.random() * 10}s`; // Stagger the animation
        heartsContainer.appendChild(heart);
    }

    for (let i = 0; i < totalHearts; i++) {
        createHeart();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize confetti
    const confettiContainer = document.getElementById('confetti');
    // More vibrant color palette
    const colors = ['#ff3b30', '#4cd964', '#007aff', '#ffcc00', '#5856d6', '#ff2d55', '#00c7be'];
    let isMobile = window.innerWidth <= 768;
    
    // Adjust confetti count based on device type
    const confettiCount = {
        initial: isMobile ? 15 : 30,
        onClick: isMobile ? 80 : 150
    };
    
    // Update isMobile on resize
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 768;
    });
    
    // Create random confetti pieces
    function createConfetti(count) {
        // Clear existing confetti to prevent performance issues on multiple clicks
        if (confettiContainer.children.length > 200) {
            confettiContainer.innerHTML = '';
        }
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            // Random position
            const xPos = Math.random() * 100;
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size - smaller on mobile
            const size = Math.random() * (isMobile ? 8 : 10) + (isMobile ? 3 : 5);
            
            // Random rotation
            const rotation = Math.random() * 360;
            
            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            // Apply styles
            confetti.style.left = `${xPos}%`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.background = color;
            confetti.style.bottom = '-10px'; // Position at bottom
            confetti.style.animation = `shimmer ${Math.random() * 2 + 1}s infinite`;
            
            // Set shape
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${color}`;
                confetti.style.background = 'transparent';
            }
            
            // Append to container
            confettiContainer.appendChild(confetti);
            
            // Animate
            animateConfetti(confetti);
        }
    }
    
    // Animate confetti
    function animateConfetti(confetti) {
        // Random duration - shorter on mobile
        const duration = Math.random() * (isMobile ? 2 : 3) + (isMobile ? 1.5 : 2);
        
        // Random end positions - now going upward
        const endX = (Math.random() - 0.5) * (isMobile ? 200 : 400);
        const endY = -(Math.random() * (isMobile ? 400 : 600) + (isMobile ? 200 : 400)); // Negative to go upward
        
        // Animation keyframes - from bottom to top
        const animation = confetti.animate([
            { transform: `translate(0, 0) rotate(0)`, opacity: 0.9 },
            { transform: `translate(${endX}px, ${endY}px) rotate(720deg)`, opacity: 0.7 }
        ], {
            duration: duration * 500,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });
        
        animation.onfinish = function() {
            // Remove element if it still exists in DOM
            if (confetti.parentNode) {
                confetti.remove();
            }
        };
    }
    
    // Make a wish button
    const wishButton = document.getElementById('wishButton');
    
    // Function to handle both click and touch
    function handleWishButtonEvent() {
        createConfetti(confettiCount.onClick);
        
        // Button text change
        wishButton.textContent = 'Wish Made!';
        wishButton.disabled = true;
        
        // Add active class for visual feedback on mobile
        wishButton.classList.add('active');
        
        // Re-enable after 5 seconds
        setTimeout(() => {
            wishButton.textContent = 'Make a Wish';
            wishButton.disabled = false;
            wishButton.classList.remove('active');
        }, 5000);
    }
    
    // Add event listeners for both click and touch events
    wishButton.addEventListener('click', handleWishButtonEvent);
    
    // Prevent double triggering on touch devices
    wishButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleWishButtonEvent();
    });
    
    // Initial animation - fewer confetti pieces
    setTimeout(() => {
        createConfetti(confettiCount.initial);
    }, 1000);
    
    // Optimize video playback for mobile
    const video = document.getElementById('background-video');
    
    // Handle visibility changes to pause video when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            video.pause();
        } else {
            video.play();
        }
    });
}); 
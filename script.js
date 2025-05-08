document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.hearts');
    
    // Create floating hearts
    for (let i = 0; i < 40; i++) {
        createHeart(heartsContainer);
    }
    
    // Create a new heart every second
    setInterval(() => {
        createHeart(heartsContainer);
        
        // Remove some hearts to prevent too many elements
        if (heartsContainer.children.length > 70) {
            heartsContainer.removeChild(heartsContainer.children[0]);
        }
    }, 800);
    
    // Ensure video plays on all platforms
    const video = document.querySelector('video');
    if (video) {
        video.play().catch(error => {
            console.log("Video autoplay failed:", error);
            // Add a play button if autoplay fails
            const playButton = document.createElement('button');
            playButton.innerHTML = "Play Video";
            playButton.className = "play-button";
            playButton.addEventListener('click', () => {
                video.play();
                playButton.style.display = 'none';
            });
            document.body.appendChild(playButton);
        });
    }
});

function createHeart(container) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.className = 'heart';
    
    // Random properties for each heart
    const size = Math.random() * 30 + 15; // Increased size
    const left = Math.random() * 100;
    const animDuration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.3 + 0.7; // Higher opacity
    
    // Apply styles
    heart.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: ${left}%;
        font-size: ${size}px;
        color: rgba(255, 51, 153, ${opacity});
        animation: float ${animDuration}s linear forwards;
        animation-delay: ${delay}s;
        z-index: -1;
        filter: drop-shadow(0 0 5px rgba(255, 51, 153, 0.7));
    `;
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    }, (animDuration + delay) * 1000);
}

// Add the float animation and other styles to the stylesheet
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
    }
}

.play-button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    padding: 15px 30px;
    background-color: rgba(255, 51, 153, 0.8);
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 0 15px rgba(255, 51, 153, 0.5);
}

.play-button:hover {
    background-color: rgba(255, 51, 153, 1);
}
`;
document.head.appendChild(style); 
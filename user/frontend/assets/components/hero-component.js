class HeroComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.images = [
            '../assets/image/Homepage 2.jpg',
            '../assets/image/Homepage 3.jpg',
            '../assets/image/Homepage 4.jpg'
     
        ];
        this.currentImageIndex = 0;
    }

    connectedCallback() {
        this.render();
        this.setupDots();
        this.startSlider();
    }

    disconnectedCallback() {
        this.stopSlider();
    }

    render() {
        // Create the main structure inside the shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Great+Vibes&display=swap');
                
                :host {
                    display: block;
                    position: relative;
                    overflow: hidden; /* Hide extra images */
                    height: 100vh; /* Set height for the host */
                }

                .slider-container {
                    display: flex;
                    height: 100%;
                    transition: transform 0.8s ease-in-out; /* Smooth sliding transition */
                }

                .slider-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    flex-shrink: 0; /* Prevent shrinking */
                }

                .hero-content {
                    position: absolute;
                    bottom: 2rem;
                    left: 2rem;
                    transform: none;
                    text-align: left;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                    width: 50%; 
                    padding: 0 1rem; 
                    z-index: 10; 
                }
                .hero-content h1 {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                }
                .hero-content p {
                    font-size: 1.5rem;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 400;
                }
                
                .slider-dots {
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 20; 
                    display: flex;
                    gap: 0.5rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    background-color: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .dot.active {
                    background-color: white;
                }

                @media (max-width: 768px) {
                     :host {
                        height: 60vh; /* Adjust height for smaller screens */
                    }
                    .slider-container img {
                         height: 60vh;
                     }
                    .hero-content {
                        width: 80%;
                        left: 50%;
                        bottom: 5rem; 
                        padding: 0;
                        text-align: center;
                        transform: translateX(-50%);
                    }
                    .hero-content h1 {
                        font-size: 2.5rem;
                    }
                    .hero-content p {
                        font-size: 1.2rem;
                    }
                }

               @media (max-width: 480px) {
                    :host {
                        height: 40vh; /* Reduce hero height for very small screens */
                    }
                    .slider-container img {
                        height: 40vh;
                    }
                    .hero-content {
                        width: 98vw;
                        left: 1vw;
                        bottom: 1rem;
                        padding: 0;
                        text-align: center;
                        transform: none;
                    }
                    .hero-content h1 {
                        font-size: 1.1rem;
                        margin-bottom: 0.5rem;
                        line-height: 1.2;
                        word-break: break-word;
                    }
                    .hero-content p {
                        font-size: 0.9rem;
                        line-height: 1.3;
                    }
                    .slider-dots {
                        bottom: 0.5rem;
                    }
                }
            </style>
            <div class="slider-container"></div>
            <div class="hero-content">
                <h1>Make Yourself<br>at Home</h1>
                <p>Every moment feels like the first time</p>
            </div>
            <div class="slider-dots"></div>
        `;

        // Dynamically add images to the slider container
        const sliderContainer = this.shadowRoot.querySelector('.slider-container');
        this.images.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = "Hotel Image"; // Add a meaningful alt text
            sliderContainer.appendChild(img);
        });
    }

    setupDots() {
        const dotsContainer = this.shadowRoot.querySelector('.slider-dots');
        dotsContainer.innerHTML = ''; // Clear existing dots

        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === this.currentImageIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                this.stopSlider(); // Stop auto slide on manual navigation
                this.showImage(index);
                // Don't restart slider immediately after manual click for better user control
                this.startSlider(); // Restart auto slide
            });
            dotsContainer.appendChild(dot);
        });
    }

    updateDots() {
        const dots = this.shadowRoot.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    showImage(index) {
        const sliderContainer = this.shadowRoot.querySelector('.slider-container');
        const imageWidth = this.shadowRoot.querySelector('.slider-container img').clientWidth;
        
        // Calculate the amount to translate based on the image index and width
        sliderContainer.style.transform = `translateX(${-index * imageWidth}px)`;

        this.currentImageIndex = index;
        this.updateDots(); // Update dots after image change
    }

    startSlider() {
         // Clear any existing interval before starting a new one
        this.stopSlider(); 
        this.sliderInterval = setInterval(() => {
            const nextIndex = (this.currentImageIndex + 1) % this.images.length;
            this.showImage(nextIndex);
        }, 3000); // Change image every 3 seconds
    }

    stopSlider() {
        if (this.sliderInterval) {
            clearInterval(this.sliderInterval);
        }
    }
}

customElements.define('hero-component', HeroComponent); 
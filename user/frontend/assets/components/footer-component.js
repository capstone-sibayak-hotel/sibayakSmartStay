class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Great+Vibes&display=swap');
                
                :host {
                    display: block;
                }
                .footer {
                    background-color: #5a4825;
                    color: white;
                    padding: 2rem 0;
                    margin-top: 2rem;
                }
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }
                .footer-logo h2 {
                    font-family: 'Great Vibes', cursive;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }
                .footer-contact p {
                    margin-bottom: 0.5rem;
                    font-family: 'Montserrat', sans-serif;
                }
                .footer-bottom {
                    text-align: center;
                    padding-top: 2rem;
                    margin-top: 2rem;
                    border-top: 1px solid rgba(255,255,255,0.1);
                    font-family: 'Montserrat', sans-serif;
                }

                @media (max-width: 900px) {
                    .footer-container {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1.5rem;
                        padding: 0 1rem;
                    }
                    .footer-logo h2 {
                        font-size: 1.3rem;
                    }
                }
                @media (max-width: 600px) {
                    .footer {
                        padding: 1rem 0;
                    }
                    .footer-logo h2 {
                        font-size: 1.1rem;
                    }
                    .footer-bottom {
                        padding-top: 1rem;
                        margin-top: 1rem;
                    }
                    .footer-container {
                        padding: 0 0.5rem;
                    }
                    .footer-contact p {
                        font-size: 0.95rem;
                    }
                }
            </style>
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-logo">
                        <h2>Sibayak Multi</h2>
                    </div>
                    <address class="footer-contact">
                        <p>Contact Us</p>
                        <p>Email: info@sibayakmulti.com</p>
                        <p>Phone: +62 812-6030-2590</p>
                    </address> 
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Sibayak Multi. All Rights Reserved.</p>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent); 
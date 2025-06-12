class ServiceComponent extends HTMLElement {
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
                .service {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .service-box {
                    display: flex;
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .service-box aside {
                    flex: 1;
                }
                .service-box aside figure {
                    margin: 0;
                    height: 100%;
                }
                .service-box aside figure img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .service-box article {
                    flex: 1;
                    padding: 2rem;
                }
                .service-title-row {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                .service-title-row h2 {
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                    color: #333;
                    font-size: 1.5rem;
                    margin: 0;
                    letter-spacing: 1px;
                }
                .service-line {
                    width: 50px;
                    border: none;
                    border-top: 3px solid #333;
                    height: 0;
                    margin: 0;
                }
                .strive {
                    font-size: 2rem;
                    margin-bottom: 2rem;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                    color: #333;
                }
                .service-list {
                    list-style: none;
                    padding: 0;
                }
                .service-list li {
                    margin-bottom: 1rem;
                    padding-left: 1.5rem;
                    position: relative;
                    font-family: 'Montserrat', sans-serif;
                    color: #666;
                }
                .service-list li:before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: #333;
                }

            
                @media (max-width: 900px) {
                    .service {
                        padding: 1rem;
                    }
                    .service-box {
                        flex-direction: column;
                    }
                    .service-box article {
                        padding: 1rem;
                    }
                }
                @media (max-width: 600px) {
                    .service {
                        padding: 0.5rem;
                    }
                    .service-box {
                        flex-direction: column;
                    }
                    .service-box aside figure img {
                        height: 180px;
                    }
                    .service-box article {
                        padding: 0.5rem;
                    }
                    .strive {
                        font-size: 1.2rem;
                    }
                    .service-title-row h2 {
                        font-size: 1.1rem;
                    }
                    .service-list li {
                        font-size: 1rem;
                    }
                }
            </style>
            <section class="service">
                <div class="service-box">
                    <aside>
                        <figure>
                            <img src="../assets/image/Service.png" alt="Hotel Services">
                        </figure>
                    </aside>
                    <article>
                        <div class="service-info">
                            <div class="service-title-row">
                                <h2>SERVICES</h2>
                                <hr class="service-line">
                            </div>
                            <h1 class="strive">Strive Only For The Best.</h1>
                            <ul class="service-list">
                                <li>Free Dining Restaurants</li>
                                <li>Kid-Friendly / Family Activities</li>
                                <li>Large Garden Area</li>
                                <li>Unused Cottage With A Large Outdoor Fireplace</li>
                                <li>Internet Access</li>
                                <li>Free Parking</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </section>
        `;
    }
}

customElements.define('service-component', ServiceComponent); 
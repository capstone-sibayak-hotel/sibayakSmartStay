class RoomComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        const bookingButtons = this.shadowRoot.querySelectorAll('.booking');
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const roomBox = button.closest('.room-box');
                const roomName = roomBox.querySelector('h2').textContent;
                const roomImage = roomBox.querySelector('img').src;
                const roomPrice = roomBox.querySelector('.price').textContent;

                // Simpan data kamar ke localStorage
                const roomData = {
                    name: roomName,
                    image: roomImage,
                    price: roomPrice
                };
                localStorage.setItem('selectedRoom', JSON.stringify(roomData));

                // Redirect ke halaman booking
                window.location.href = 'booking.html';
            });
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Great+Vibes&display=swap');
                
                :host {
                    display: block;
                }
                .room {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .room-box {
                    display: flex;
                    margin-bottom: 2rem;
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .room-box aside {
                    flex: 1;
                }
                .room-box aside figure {
                    margin: 0;
                    height: 100%;
                }
                .room-box aside figure img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .room-box article {
                    flex: 1;
                    padding: 2rem;
                }
                .room-info h2 {
                    margin-bottom: 1rem;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                    color: #333;
                }
                .room-info p {
                    margin-bottom: 1rem;
                    line-height: 1.6;
                    font-family: 'Montserrat', sans-serif;
                    color: #666;
                }
                .price {
                    color: #333;
                    font-size: 1.2rem;
                    font-weight: 700;
                }
                .button {
                    margin-top: 1rem;
                }
                .booking {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background-color: #A17640;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                }
                .booking:hover {
                    background-color: #8a6533;
                }
                
                /* ...existing styles... */
                @media (max-width: 900px) {
                    .room {
                        padding: 1rem;
                    }
                    .room-box {
                        flex-direction: column;
                    }
                    .room-box article {
                        padding: 1rem;
                    }
                }
                @media (max-width: 600px) {
                    .room {
                        padding: 0.5rem;
                    }
                    .room-box {
                        flex-direction: column;
                    }
                    .room-box aside figure img {
                        height: 180px;
                    }
                    .room-box article {
                        padding: 0.5rem;
                    }
                    .room-info h2 {
                        font-size: 1.1rem;
                    }
                    .room-info p, .price {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 900px) {
                .footer-container {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;
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
            }
            </style>
            <section class="room">
                <div class="room-box">
                    <aside>
                        <figure>
                            <img src="../assets/image/Twin Room.jpg" alt="Twin Room">
                        </figure>
                    </aside>
                    <article>
                        <div class="room-info">
                            <h2>Twin Room</h2>
                            <p>Equipped with a plush king-size bed or twin beds, a stylish ensuite bathroom, and a cozy sitting area, guests can unwind in style and enjoy a restful night's sleep.</p>
                            <p>Starting from <b class="price">Rp 300.000</b><span><b>/night</b></span></p>
                            <div class="button">
                                <a href="#" class="booking">Book Now</a>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="room-box">
                    <aside>
                        <figure>
                            <img src="../assets/image/Standard Room.jpg" alt="Deluxe Double Room">
                        </figure>
                    </aside>
                    <article>
                        <div class="room-info">
                            <h2>Deluxe Double Room</h2>
                            <p>Each room here comes with a comfortable private bathroom, complete with toiletries and fresh towels. Your comfort is assured with trash cans available.</p>
                            <p>Starting from <b class="price">Rp 350.000</b><span><b>/night</b></span></p>
                            <div class="button">
                                <a href="#" class="booking">Book Now</a>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="room-box">
                    <aside>
                        <figure>
                            <img src="../assets/image/Promotion Room.jpg" alt="Promotion Room">
                        </figure>
                    </aside>
                    <article>
                        <div class="room-info">
                            <h2>Promotion Room</h2>
                            <p>Featuring a combination of bedding options, including a king-size bed and additional twin beds or a pull-out sofa bed, ensuring a comfortable stay for families or groups.</p>
                            <p>Starting from <b class="price">Rp 500.000</b><span><b>/night</b></span></p>
                            <div class="button">
                                <a href="#" class="booking">Book Now</a>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="room-box">
                    <aside>
                        <figure>
                            <img src="../assets/image/Villa.jpg" alt="Villa House">
                        </figure>
                    </aside>
                    <article>
                        <div class="room-info">
                            <h2>Villa House</h2>
                            <p>Nestled In Timeless Charm, This Villa Blends A Grand King-Size Bed With Cozy Twin Beds Or A Pull-Out Sofa, Offering An Elegant Yet Comfortable Retreat For Families Or Companions Alike..</p>
                            <p>Starting from <b class="price">Rp 2.000.000</b><span><b>/night</b></span></p>
                            <div class="button">
                                <a href="#" class="booking">Book Now</a>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        `;
    }
}

customElements.define('room-component', RoomComponent); 
class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.updateAuthButton();
  }

  render() {
    this.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Great+Vibes&display=swap');
            
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 2rem;
                background-color: white;
                position: fixed;
                width: 100%;
                top: 0;
                z-index: 1000;
                box-sizing: border-box;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .logo {
                font-family: 'Great Vibes', cursive;
                font-size: 2rem;
                color: #333;
                text-decoration: none;
            }
            .burger {
                display: none;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #A17640;
                margin-left: 1rem;
            }
            nav {
                display: flex;
                gap: 2rem;
                align-items: center;
            }
            nav a, nav .sign-in-btn, nav .logout-btn {
                text-decoration: none;
                color: #333;
                font-weight: 500;
                transition: color 0.3s;
                font-family: 'Montserrat', sans-serif;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem 1rem;
                border-radius: 5px;
            }
            nav a:hover, nav .sign-in-btn:hover, nav .logout-btn:hover {
                color: #666;
                background-color: #f5f5f5;
            }
            .sign-in-btn, .logout-btn {
                background-color: #A17640;
                color: white;
                transition: background-color 0.3s;
            }
            .sign-in-btn:hover, .logout-btn:hover {
                background-color: #8a6533;
            }
            @media (max-width: 700px) {
                header {
                    padding: 0.7rem 1rem;
                }
                .logo {
                    font-size: 1.2rem;
                }
                .burger {
                    display: block;
                }
                nav {
                    display: none;
                    position: absolute;
                    top: 60px;
                    left: 0;
                    width: 100vw;
                    background: #fff;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    z-index: 10;
                    padding: 0.5rem 0;
                }
                nav.open {
                    display: flex;
                }
                nav a, nav .sign-in-btn, nav .logout-btn {
                    width: 100%;
                    text-align: left;
                    border-bottom: 1px solid #eee;
                    background: none;
                    color: #333;
                }
            }
        </style>
        <header>
            <a href="index.html" class="logo">Sibayak Multi</a>
            <button class="burger" aria-label="Open navigation">&#9776;</button>
            <nav>
                <a href="index.html#">Home</a>
                <a href="index.html#about">About</a>
                <a href="index.html#room">Rooms</a>
                <a href="index.html#service">Service</a>
                <a href="review.html">Review</a>
                <span id="authButton"></span>
            </nav>
        </header>
    `;

    // Burger menu logic
    const burger = this.querySelector(".burger");
    const nav = this.querySelector("nav");
    burger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  updateAuthButton() {
    const authButton = this.querySelector("#authButton");
    const isLoggedIn = localStorage.getItem("token") !== null;

    if (isLoggedIn) {
      authButton.innerHTML = `
        <button class="logout-btn" id="logoutBtn">LOGOUT</button>
      `;
      this.querySelector("#logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login.html";
      });
    } else {
      authButton.innerHTML = `
        <a href="login.html" class="sign-in-btn">SIGN IN</a>
      `;
    }
  }
}

customElements.define("header-component", HeaderComponent);

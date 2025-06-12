class TopbarComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Dashboard";
    const template = `
      <style>
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .topbar h1 {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .admin-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4B5563;
          font-size: 1.125rem;
        }
        .logout-btn {
          cursor: pointer;
          color: #DC2626;
          font-size: 0.9rem;
          margin-left: 1rem;
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        .logout-btn:hover {
          color: #B91C1C;
        }
        svg {
          width: 2rem;
          height: 2rem;
          stroke: #4B5563;
        }
      </style>

      <div class="topbar">
        <h1>${title}</h1>
        <div class="admin-info">
          <svg fill="none" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.28.535 6.121 1.485M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="font-semibold">Admin</span>
          <span class="logout-btn" id="logoutBtn">Logout</span>
        </div>
      </div>
    `;

    this.innerHTML = template;

    // Handle logout
    this.querySelector('#logoutBtn')?.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'login-admin.html';
    });
  }
}

customElements.define('topbar-component', TopbarComponent);

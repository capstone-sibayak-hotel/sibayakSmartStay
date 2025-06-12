class StatCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const value = this.getAttribute('value') || '0';
    const label = this.getAttribute('label') || 'Unknown';

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 3px 3px rgba(0,0,0,0.1);
          text-align: center;
        }
        .value {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .label {
          color: #4b5563;
          margin-top: 0.25rem;
        }
      </style>
      <div class="card">
        <p class="value">${value}</p>
        <p class="label">${label}</p>
      </div>
    `;
  }
}

customElements.define('stat-card', StatCard);

class PercentageBar extends HTMLElement {
  connectedCallback() {
    const value = this.getAttribute('value') || '0';
    const label = this.getAttribute('label') || 'Unknown';

    this.innerHTML = `
      <div class="mb-4">
        <div class="flex justify-between mb-1">
          <span>${label}</span><span class="text-sm text-gray-500">${value}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${value}%"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('percentage-bar', PercentageBar);

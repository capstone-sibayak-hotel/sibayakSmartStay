class SidebarComponent extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname.split("/").pop();

    const template = `
      <aside class="w-64 bg-white shadow-md border-r">
        <figure class="p-6 mt-3">
          <img src="../assets/images/logo-sibayak.svg" alt="Logo sibayak multi">
        </figure>
        <h1 class="px-6 text-xl font-bold mt-8">Dashboard</h1>
        <nav class="mt-6">
          ${this.linkItem("index.html", "home", "Home", currentPath)}
          ${this.linkItem(
            "reservation-data.html",
            "cs-data",
            "Reservation Data",
            currentPath
          )}
          ${this.linkItem(
            "room-data.html",
            "roomdata",
            "Room Data",
            currentPath
          )}
        </nav>
      </aside>
    `;

    this.innerHTML = template;
  }

  linkItem(href, iconBaseName, label, currentPath) {
    const isActive = href.includes(currentPath);
    const iconSrc = `../assets/images/${iconBaseName}${
      isActive ? "-white" : ""
    }.svg`;
    const linkClass = `flex gap-2 px-6 py-3 ${
      isActive
        ? "font-medium bg-[#7C6A46] text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;
    return `
      <a href="./${href}" class="${linkClass}">
        <img src="${iconSrc}" alt="">${label}
      </a>
    `;
  }
}

customElements.define("sidebar-component", SidebarComponent);

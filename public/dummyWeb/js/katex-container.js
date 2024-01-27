class KatexContainer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.textContent.trim();
        this.innerHTML = '';
        this.appendChild(element);
      }
}

customElements.define('katex-container', KatexContainer);
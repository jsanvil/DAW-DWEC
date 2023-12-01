class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.name = this.getAttribute("name") || "Sin nombre"
    this.min = this.getAttribute("min") || 0;
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      :host {
        display: inline-block;
        border: 1px solid #3336;
        border-radius: 6px;
        padding: 1em;
      }
      h1 {
        color: red;
      }
    </style>

          <h1>Hello ${this.name}</h1>
          <slot name="card-content"></slot>
          <slot name="card-footer" class="footer"></slot>
      `;
    
      this.shadowRoot.querySelector('[name="card-footer"]').addEventListener('click', () => this.evento())
  }

  evento() {
    // alert("hola")
    this.shadowRoot.querySelector('h1').textContent = "Cambiado";
    this.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  }
}

customElements.define("hello-world", HelloWorld);

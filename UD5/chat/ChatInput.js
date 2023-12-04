class ChatInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // almacena el nombre de usuario, por defecto es 'desconocido'
    this.user = this.getAttribute("user") || "desconocido";
    // genera un id único para el usuario
    this.userId = crypto.randomUUID();
    this.position = this.getAttribute("position") || "right";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <form class="chat-form">
        <label for="chatInput">${this.user}</label>
        <div class="chat-input-container">
          <input id="chatInput"
                 type="text"
                 class="chat-input"
                 placeholder="mensaje..."
                 maxlength="100" />
          <button type="submit">Enviar</button>
        </div>
      </form>
    `;

    // añade un listener al evento 'submit' del formulario
    this.shadowRoot.querySelector(".chat-form").addEventListener("submit", this);
    // Registra el evento submit en 'this'
    // esto se hace en las clases para que
    // el método 'handleEvent'
    // pueda acceder a las propiedades de la clase
  }

  handleEvent(event) {
    switch (event.type) {
      case "submit":
        // evita que se envíe el formulario y se recargue la página
        event.preventDefault();

        const input = event.target.chatInput;
        const message = input.value;
        input.value = "";
        input.focus();

        // crea un objeto con los datos a enviar
        const messageData = {
          userId: this.userId,
          user: this.user,
          message: message,
          timestamp: Date.now(),
          position: this.position,
        };

        // crea un nuevo evento personalizado
        const customEvent = new CustomEvent("chat:send-message", {
          // en 'detail' se almacenan los datos a enviar
          detail: messageData,
          // Los siguientes atributos son necesarios para que
          // el evento pueda atravesar el shadow DOM
          bubbles: true,
          composed: true,
        });

        // envía el evento personalizado
        this.dispatchEvent(customEvent);

        break;

      default:
        console.warn("evento no manejado", event);
    }
  }
}

customElements.define("chat-input", ChatInput);

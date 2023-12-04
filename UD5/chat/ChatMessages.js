class ChatMessages extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.messages = [];
  }

  connectedCallback() {
    // Registra un listener en el documento
    // para capturar el evento 'chat:send-message'
    document.addEventListener("chat:send-message", (event) => {
      this.messages.unshift(event.detail);
      console.log(this.messages);
      this.render();
    });

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ `
      <div class="chat-messages-container">
        ${
          // Utiliza Array.map() para recorrer el array de mensajes
          // generando un nuevo Array que contiene strings
          // con el html que se mostrará para cada mensaje.
          // Al terminar, utiliza Array.join() para unir todos los strings
          this.messages.map((message) => `
                <div class="chat-message ${message.position}">
                    <p class="chat-message-user">${message.user}</p>
                    <p class="chat-message-text">${message.message}</p>
                    <p class="chat-message-timestamp">
                        ${new Date(message.timestamp).toLocaleString()}
                    </p>
                </div>
                `
            ).join("")
        }
      </div>
    `;
  }
}

customElements.define("chat-messages", ChatMessages);
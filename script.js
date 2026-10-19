console.log("HumanYDesignTwo: JavaScript conectado");

    document.getElementById("year").textContent =
      new Date().getFullYear();

// ===== CONFIGURACIÓN DE CONTACTO =====

// Sustituye este correo cuando tengas uno definido.
const BUSINESS_EMAIL = "humanydesigntwo@gmail.com";

// Sustituye este número por tu WhatsApp real.
// Formato: código de país + número, solo dígitos.
// Ejemplo de formato mexicano: 52 seguido de los 10 dígitos.
const BUSINESS_WHATSAPP = "526565860067";

// ===== FORMULARIO DE COTIZACIÓN =====

const quoteForm = document.getElementById("quoteForm");
const emailButton = document.getElementById("emailQuote");
const whatsappButton = document.getElementById("whatsappQuote");
const formMessage = document.getElementById("formMessage");

function getQuoteData() {
  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    return null;
  }

  const data = new FormData(quoteForm);

  return {
    name: data.get("clientName").trim(),
    company: data.get("company").trim() || "No especificada",
    email: data.get("clientEmail").trim(),
    service: data.get("service"),
    details: data.get("projectDetails").trim()
  };
}

function buildQuoteMessage(quote) {
  return [
    "SOLICITUD DE COTIZACIÓN - HumanYDesignTwo",
    "",
    `Nombre: ${quote.name}`,
    `Empresa: ${quote.company}`,
    `Correo del cliente: ${quote.email}`,
    `Servicio solicitado: ${quote.service}`,
    "",
    "Descripción del proyecto:",
    quote.details
  ].join("\n");
}

// Botón para preparar un correo electrónico.
if (emailButton && quoteForm && formMessage) {
  emailButton.addEventListener("click", function () {
    const quote = getQuoteData();
    if (!quote) return;

    if (BUSINESS_EMAIL === "humanydesigntwo@gmail.com") {
      formMessage.textContent =
        "humanydesigntwo@gmail.coml.";
      return;
    }

    const subject = encodeURIComponent(
      `Solicitud de cotización - ${quote.service}`
    );
    const body = encodeURIComponent(buildQuoteMessage(quote));

    window.location.href =
      `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  });
}

// Botón para continuar por WhatsApp.
if (whatsappButton && quoteForm && formMessage) {
  whatsappButton.addEventListener("click", function () {
    const quote = getQuoteData();
    if (!quote) return;

    if (BUSINESS_WHATSAPP.includes("X")) {
      formMessage.textContent =
        "526565860067";
      return;
    }

    const message = encodeURIComponent(buildQuoteMessage(quote));
    const url = `https://wa.me/${BUSINESS_WHATSAPP}?text=${message}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
}

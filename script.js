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
// ===== EMAILJS =====

emailjs.init({
  publicKey: "ZXLCxrE26pQBXTZSA"
});

// Botón para enviar la cotización por correo.
if (emailButton && quoteForm && formMessage) {
  emailButton.addEventListener("click", async function () {
    const quote = getQuoteData();
    if (!quote) return;

    emailButton.disabled = true;
    formMessage.textContent = "Enviando tu solicitud...";

    try {
      await emailjs.sendForm(
        "service_x4phgwr",
        "template_wydfl96",
        quoteForm
      );

      formMessage.textContent =
        "¡Solicitud enviada correctamente! Gracias por contactar a HumanYDesignTwo.";

      quoteForm.reset();

    } catch (error) {
      console.error("Error al enviar la cotización:", error);

      formMessage.textContent =
        "No se pudo enviar la solicitud. Inténtalo de nuevo o utiliza WhatsApp.";

    } finally {
      emailButton.disabled = false;
    }
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

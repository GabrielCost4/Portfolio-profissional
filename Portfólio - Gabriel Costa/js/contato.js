// Inicialização do EmailJS
(function () {
  emailjs.init("vFrQJBpdZDrp97uep");
})();

// Seletores
const form = document.getElementById("contato-form");
const msg = document.getElementById("form-msg");

// Evento de envio
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Validações
  if (nome.length < 3) {
    showMessage("Digite um nome válido.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Digite um e-mail válido.", "error");
    return;
  }

  if (mensagem.length < 10) {
    showMessage("A mensagem deve ter pelo menos 10 caracteres.", "error");
    return;
  }

  // Feedback de envio
  showMessage("Enviando mensagem...", "loading");

  // Envio EmailJS
  emailjs.send(
    "service_jfa3d1l",
    "template_h3sfd9o",
    {
      name: nome,
      email: email,
      message: mensagem, 
      title: "Novo contato pelo portfólio"
    }
  )
  .then(() => {
    showMessage("Mensagem enviada com sucesso! 🚀", "success");
    form.reset();
  })
  .catch((error) => {
    console.error("Erro EmailJS:", error);
    showMessage("Erro ao enviar. Tente novamente.", "error");
  });
});

// Funções auxiliares
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(text, type) {
  msg.textContent = text;
  msg.className = type;
}

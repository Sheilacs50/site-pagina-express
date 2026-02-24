// ====== CONFIGURE AQUI (troque quando quiser) ======
const CONFIG = {
  nome: "Sheila Nascimento",
  tag: "Cartão de Visita • 1 Clique",
  papel: "Criadora Digital • Cartão 1 Clique",

  // WhatsApp (55 + DDD + número, sem espaços)
  whatsappNumero: "5511985556223",
  // Mensagens automáticas (você pode trocar)
  whatsappMensagemGeral: "Olá! Quero uma Página 'Cartão de Visita 1 Clique'. Pode fazer uma prévia grátis com meu nome? 😊",
  whatsappMensagemPlano: (plano) => `Olá! Quero o plano ${plano} do Cartão de Visita 1 Clique. Pode me explicar e fazer minha prévia grátis? 😊`,

  // Links (troque quando tiver)
  instagramUrl: "https://instagram.com/Sheila.paginasexpress",
  // Pix
  pixChave: "sheilanascimento.tdr@gmail.com",
};

// ====== MODELOS EXEMPLO (portfólio) ======
const MODELOS = [
  {
    titulo: "Cartão 1 Clique • Salão de Beleza",
    desc: "Agendamento, serviços, antes/depois e botão direto pro WhatsApp.",
    tags: ["WhatsApp", "Serviços", "Agenda"],
    corpo: renderPreview([
      "Topo com foto + nome do salão",
      "Botões: Agendar, WhatsApp, Instagram, Localização",
      "Cards de serviços + preços",
      "Depoimentos + CTA final",
    ]),
  },
  {
    titulo: "Cartão 1 Clique • Loja (Variedades)",
    desc: "Link da bio com catálogo, Pix e botão de compra/orçamento.",
    tags: ["Pix", "Catálogo", "Vendas"],
    corpo: renderPreview([
      "Banner com promoções",
      "Botões: Comprar, Catálogo, Pix, WhatsApp",
      "Seção: produtos em destaque",
      "FAQ de entrega e pagamento",
    ]),
  },
  {
    titulo: "Cartão 1 Clique • Confeitaria",
    desc: "Cardápio, pedidos, encomendas e Instagram com fotos.",
    tags: ["Cardápio", "Pedidos", "Instagram"],
    corpo: renderPreview([
      "Botões: Cardápio, Encomendar, WhatsApp",
      "Tabela de sabores / preços",
      "Galeria de fotos",
      "CTA com mensagem pronta",
    ]),
  },
  {
    titulo: "Cartão 1 Clique • Diarista",
    desc: "Serviços, áreas atendidas e botão rápido para orçamento.",
    tags: ["Orçamento", "Serviços", "Contato"],
    corpo: renderPreview([
      "Seção: o que faço + cidades",
      "Botões: Orçamento, WhatsApp, Avaliações",
      "Checklist de serviços",
      "CTA final",
    ]),
  },
  {
    titulo: "Cartão 1 Clique • Consultora",
    desc: "Apresentação, portfólio, depoimentos e agendamento.",
    tags: ["Portfólio", "Depoimentos", "Agenda"],
    corpo: renderPreview([
      "Sobre + resultados",
      "Botões: Agendar, WhatsApp, Instagram",
      "Prova social",
      "Perguntas frequentes",
    ]),
  },
  {
    titulo: "Cartão 1 Clique • Mecânica",
    desc: "Serviços, localização, horário e chamar no WhatsApp.",
    tags: ["Localização", "Horários", "Contato"],
    corpo: renderPreview([
      "Mapa + como chegar",
      "Botões: Chamar, Orçar, Localização",
      "Lista de serviços",
      "CTA rápido",
    ]),
  },
];

function renderPreview(itens){
  return `
    <div class="miniPreview">
      <div class="pv">
        ${itens.map(t => `<div class="pvItem">• ${escapeHtml(t)}</div>`).join("")}
      </div>
      <div class="pvNote">Isso é uma prévia do layout. Eu adapto com seu nome, cores e links.</div>
    </div>
  `;
}

function escapeHtml(str){
  return str
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// ====== HELPERS ======
function waLink(msg){
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(msg)}`;
}

function setHref(id, href){
  const el = document.getElementById(id);
  if (el) el.href = href;
}

function setText(id, text){
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ====== INIT ======
document.addEventListener("DOMContentLoaded", () => {
  // Top texts
  setText("brandName", CONFIG.nome);
  setText("brandTag", CONFIG.tag);
  setText("phoneName", CONFIG.nome);
  setText("phoneRole", CONFIG.papel);
  setText("pixKey", CONFIG.pixChave);

  // WhatsApp links
  const wGeneral = waLink(CONFIG.whatsappMensagemGeral);
  setHref("navWhats", wGeneral);
  setHref("mobileWhats", wGeneral);
  setHref("btnWhatsHero", wGeneral);
  setHref("ctaWhatsModels", wGeneral);
  setHref("btnWhatsFinal", wGeneral);
  setHref("floatWhats", wGeneral);
  setHref("miniWhats", wGeneral);

  // Instagram
  setHref("miniInsta", CONFIG.instagramUrl);

  // Pricing buttons
  setHref("buyBasic", waLink(CONFIG.whatsappMensagemPlano("Básico")));
  setHref("buyPro", waLink(CONFIG.whatsappMensagemPlano("Pro")));
  setHref("buyPremium", waLink(CONFIG.whatsappMensagemPlano("Premium")));

  // Copy Pix
  const copyPixBtn = document.getElementById("copyPixBtn");
  const miniPix = document.getElementById("miniPix");
  if (copyPixBtn) copyPixBtn.addEventListener("click", () => copiar(CONFIG.pixChave, "pixCopyMsg"));
  if (miniPix) miniPix.addEventListener("click", () => copiar(CONFIG.pixChave, "pixMsg"));

  // Menu mobile
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav){
    menuBtn.addEventListener("click", () => mobileNav.classList.toggle("show"));
    mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("show")));
  }

  // Render models
  renderModels();

  // Reveal on scroll
  setupReveal();

  // Modal
  setupModal();
});

function copiar(texto, msgId){
  navigator.clipboard.writeText(texto).then(() => {
    const el = document.getElementById(msgId);
    if (!el) return;
    el.textContent = "✅ Copiado! Agora é só colar no app do banco.";
    setTimeout(() => el.textContent = "", 3500);
  }).catch(() => {
    const el = document.getElementById(msgId);
    if (!el) return;
    el.textContent = "Não consegui copiar automaticamente. Copie manualmente a chave.";
    setTimeout(() => el.textContent = "", 3500);
  });
}

function renderModels(){
  const grid = document.getElementById("modelsGrid");
  if (!grid) return;

  grid.innerHTML = MODELOS.map((m, idx) => `
    <article class="modelCard reveal" data-model="${idx}">
      <div class="modelCard__top">
        <h3>${escapeHtml(m.titulo)}</h3>
        <span class="tag">Ver</span>
      </div>
      <p>${escapeHtml(m.desc)}</p>
      <div class="tagRow">
        ${m.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
      <div class="preview" aria-hidden="true">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </article>
  `).join("");

  // Open modal on click
  grid.querySelectorAll(".modelCard").forEach(card => {
    card.addEventListener("click", () => {
      const idx = Number(card.getAttribute("data-model"));
      openModel(idx);
    });
  });
}

function setupReveal(){
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
}

let modalEl, overlayEl, closeEl, okEl, bodyEl, titleEl, subEl, modalWhatsEl;
function setupModal(){
  modalEl = document.getElementById("modal");
  overlayEl = document.getElementById("modalOverlay");
  closeEl = document.getElementById("modalClose");
  okEl = document.getElementById("modalOk");
  bodyEl = document.getElementById("modalBody");
  titleEl = document.getElementById("modalTitle");
  subEl = document.getElementById("modalSubtitle");
  modalWhatsEl = document.getElementById("modalWhats");

  if (!modalEl) return;

  const close = () => closeModal();
  overlayEl?.addEventListener("click", close);
  closeEl?.addEventListener("click", close);
  okEl?.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("show")) close();
  });
}

function openModel(idx){
  const m = MODELOS[idx];
  if (!m || !modalEl) return;

  titleEl.textContent = m.titulo;
  subEl.textContent = "Prévia do layout";
  bodyEl.innerHTML = `
    <div style="color: rgba(255,255,255,.86); line-height:1.65; font-size: 14px;">
      <p style="margin:0 0 10px; color: rgba(255,255,255,.75)">${escapeHtml(m.desc)}</p>
      ${m.corpo}
    </div>
  `;

  const msg = `Olá! Quero um Cartão de Visita 1 Clique no modelo: ${m.titulo}. Pode fazer uma prévia grátis com meu nome? 😊`;
  modalWhatsEl.href = waLink(msg);

  modalEl.classList.add("show");
  modalEl.setAttribute("aria-hidden", "false");
}

function closeModal(){
  if (!modalEl) return;
  modalEl.classList.remove("show");
  modalEl.setAttribute("aria-hidden", "true");
}
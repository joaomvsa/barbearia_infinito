/* =========================================================
   Infinito Barbearia: galeria, lightbox, menu e agendamento
   ========================================================= */

/* ---------------------------------------------------------
   GALERIA DE CORTES

   Como adicionar uma foto nova:
   1. Converta a foto para .webp com no máximo 1200px de largura
      (dá pra fazer de graça em https://squoosh.app).
   2. Salve em img/cortes/ (ex.: img/cortes/cut7.webp).
   3. Opcional: salve também uma versão menor (600px) com o mesmo
      nome + "-thumb" (ex.: img/cortes/cut7-thumb.webp). Ela carrega
      mais rápido na grade. Se não existir, o site usa a foto grande.
   4. Adicione uma linha na lista abaixo, copiando o formato:
      { arquivo: "cut7.webp", titulo: "Nome do corte", alt: "Descrição da foto" },

   A ordem da lista é a ordem em que as fotos aparecem.
   --------------------------------------------------------- */
const GALERIA = [
  { arquivo: "cut1.webp", titulo: "Clássico penteado para trás", alt: "Corte clássico penteado para trás com barba grisalha aparada" },
  { arquivo: "cut2.webp", titulo: "Crop com franja reta", alt: "Corte crop com franja reta e degradê" },
  { arquivo: "cut3.webp", titulo: "Degradê baixo", alt: "Degradê baixo com topo curto" },
  { arquivo: "cut4.webp", titulo: "Degradê médio", alt: "Degradê médio visto de perfil" },
  { arquivo: "cut5.webp", titulo: "Degradê com topete e barba", alt: "Degradê com topete e barba desenhada" },
  { arquivo: "cut6.webp", titulo: "Cacheado com degradê", alt: "Cabelo cacheado com degradê" },
];

/* ---------------------------------------------------------
   AGENDAMENTO (Cal.com)

   Cada item vira uma aba. "slug" é o final do link do evento
   no Cal.com. Ex.: cal.com/infinito-barbearia/corte → slug "corte".
   Para criar uma aba nova (ex.: Química), crie o
   evento no Cal.com e adicione uma linha aqui.
   --------------------------------------------------------- */
const CAL_USUARIO = "infinito-barbearia";
const SERVICOS_CAL = [
  { nome: "Corte", preco: "R$ 55", slug: "agenda-corte" },
  { nome: "Corte e Sobrancelha", preco: "R$ 75", slug: "agendamento-de-corte-e-sobrancelha" },
  { nome: "Corte e Barba", preco: "R$ 100", slug: "agendamento-corte-e-barba" },
];

/* ========================================================= */

document.getElementById("ano").textContent = new Date().getFullYear();

/* ---------- Menu mobile ---------- */
(function menu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("menu");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

/* ---------- Galeria + lightbox ---------- */
(function galeria() {
  const list = document.getElementById("gallery");
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector(".lb-img");
  const lbCaption = lb.querySelector(".lb-caption");
  const btnClose = lb.querySelector(".lb-close");
  const btnPrev = lb.querySelector(".lb-prev");
  const btnNext = lb.querySelector(".lb-next");
  let atual = 0;
  let voltarFoco = null;

  const full = (item) => "img/cortes/" + item.arquivo;
  const thumb = (item) => "img/cortes/" + item.arquivo.replace(/(\.\w+)$/, "-thumb$1");

  GALERIA.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "gallery-item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-btn";
    btn.setAttribute("aria-label", "Ampliar foto: " + item.titulo);

    const img = document.createElement("img");
    img.src = thumb(item);
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";
    img.width = 600;
    img.height = 800;
    img.onload = () => {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
    };
    // Sem miniatura? Usa a foto grande.
    img.onerror = () => {
      img.onerror = null;
      img.src = full(item);
    };

    const cap = document.createElement("span");
    cap.className = "gallery-caption";
    cap.textContent = item.titulo;

    btn.append(img, cap);
    btn.addEventListener("click", () => abrir(i));
    li.appendChild(btn);
    list.appendChild(li);
  });

  function mostrar(i) {
    atual = (i + GALERIA.length) % GALERIA.length;
    const item = GALERIA[atual];
    lbImg.src = full(item);
    lbImg.alt = item.alt;
    lbCaption.textContent = item.titulo + " · " + (atual + 1) + "/" + GALERIA.length;
    // Pré-carrega a próxima
    new Image().src = full(GALERIA[(atual + 1) % GALERIA.length]);
  }

  function abrir(i) {
    voltarFoco = document.activeElement;
    mostrar(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function fechar() {
    lb.hidden = true;
    document.body.style.overflow = "";
    lbImg.src = "";
    if (voltarFoco) voltarFoco.focus();
  }

  btnClose.addEventListener("click", fechar);
  btnPrev.addEventListener("click", () => mostrar(atual - 1));
  btnNext.addEventListener("click", () => mostrar(atual + 1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) fechar();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") fechar();
    else if (e.key === "ArrowLeft") mostrar(atual - 1);
    else if (e.key === "ArrowRight") mostrar(atual + 1);
    else if (e.key === "Tab") {
      // Mantém o foco dentro do lightbox
      const focaveis = [btnClose, btnPrev, btnNext];
      const idx = focaveis.indexOf(document.activeElement);
      e.preventDefault();
      const prox = e.shiftKey ? idx - 1 : idx + 1;
      focaveis[(prox + focaveis.length) % focaveis.length].focus();
    }
  });

  // Swipe no celular
  let x0 = null;
  let y0 = null;
  lb.addEventListener("touchstart", (e) => {
    x0 = e.touches[0].clientX;
    y0 = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      mostrar(dx < 0 ? atual + 1 : atual - 1);
    } else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) {
      fechar(); // arrastar para baixo fecha
    }
    x0 = y0 = null;
  });
})();

/* ---------- Agendamento Cal.com ---------- */
(function agendamento() {
  const tabs = document.getElementById("cal-tabs");
  const panels = document.getElementById("cal-panels");
  const fallback = document.getElementById("cal-fallback");
  const fallbackLink = document.getElementById("cal-fallback-link");
  const section = document.getElementById("agendar");
  const iniciados = new Set();
  let scriptPronto = false;
  let atual = 0;

  SERVICOS_CAL.forEach((s, i) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = "tab";
    tab.id = "tab-" + i;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "cal-" + i);
    tab.setAttribute("aria-selected", String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.innerHTML = s.nome + (s.preco ? '<span class="tab-price">' + s.preco + "</span>" : "");
    tab.addEventListener("click", () => selecionar(i));
    tabs.appendChild(tab);

    const panel = document.createElement("div");
    panel.className = "cal-panel";
    panel.id = "cal-" + i;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", "tab-" + i);
    panel.hidden = i !== 0;
    panel.innerHTML = '<p class="cal-loading">Carregando agenda…</p>';
    panels.appendChild(panel);
  });

  // Setas do teclado entre as abas
  tabs.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = SERVICOS_CAL.length;
    const prox = (atual + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
    selecionar(prox);
    document.getElementById("tab-" + prox).focus();
  });

  function selecionar(i) {
    atual = i;
    SERVICOS_CAL.forEach((_, j) => {
      const tab = document.getElementById("tab-" + j);
      tab.setAttribute("aria-selected", String(j === i));
      tab.tabIndex = j === i ? 0 : -1;
      document.getElementById("cal-" + j).hidden = j !== i;
    });
    fallbackLink.href = "https://cal.com/" + CAL_USUARIO + "/" + SERVICOS_CAL[i].slug;
    if (scriptPronto) iniciar(i);
  }

  function mostrarFallback() {
    fallback.hidden = false;
  }

  // Snippet oficial do Cal.com (embed.js)
  function carregarCal() {
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = d.createElement("script");
          s.src = A;
          s.onerror = mostrarFallback;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    scriptPronto = true;
    iniciar(atual);
  }

  function iniciar(i) {
    if (iniciados.has(i)) return;
    iniciados.add(i);

    const ns = "servico" + i;
    const panel = document.getElementById("cal-" + i);
    let carregou = false;

    Cal("init", ns, { origin: "https://app.cal.com" });
    Cal.ns[ns]("inline", {
      elementOrSelector: "#cal-" + i,
      calLink: CAL_USUARIO + "/" + SERVICOS_CAL[i].slug,
      config: { layout: "month_view", theme: "dark" },
    });
    Cal.ns[ns]("ui", {
      theme: "dark",
      layout: "month_view",
      hideEventTypeDetails: false,
      cssVarsPerTheme: { dark: { "cal-brand": "#f3f2ef" } },
    });
    Cal.ns[ns]("on", {
      action: "linkReady",
      callback: () => {
        carregou = true;
        const loading = panel.querySelector(".cal-loading");
        if (loading) loading.remove();
      },
    });
    Cal.ns[ns]("on", { action: "linkFailed", callback: mostrarFallback });

    // Se em 15s nada carregou, mostra as alternativas
    setTimeout(() => {
      if (!carregou) mostrarFallback();
    }, 15000);
  }

  fallbackLink.href = "https://cal.com/" + CAL_USUARIO + "/" + SERVICOS_CAL[0].slug;

  // Só carrega o Cal.com quando a pessoa chega perto da seção (site mais rápido)
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        carregarCal();
      }
    }, { rootMargin: "600px 0px" });
    io.observe(section);
  } else {
    carregarCal();
  }
})();

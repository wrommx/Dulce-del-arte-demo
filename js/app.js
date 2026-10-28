/* JavaScript sin dependencias. Funciona con file:// o con un servidor estático. */
(() => {
  "use strict";
  const products = window.DULCE_PRODUCTS;
  const config = window.DULCE_CONFIG;
  const $ = (selector) => document.querySelector(selector);
  const money = new Intl.NumberFormat("es-MX", {style:"currency",currency:"MXN",maximumFractionDigits:0});
  const grid = $("#product-grid");
  const form = $("#quote-form");
  const result = $("#quote-result");
  const productSelect = $("#product-select");
  const dateInput = form.elements.date;
  let currentSummary = "";
  let modalTrigger = null;

  function todayLocal() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  }
  dateInput.min = todayLocal();
  $("#year").textContent = new Date().getFullYear();

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function renderProducts(category = "todos") {
    const visible = products.filter(product => category === "todos" || product.category === category);
    grid.replaceChildren();
    visible.forEach(product => {
      const card = element("article", "product-card");
      const imageBox = element("div", "product-image");
      const img = element("img");
      Object.assign(img, {src:product.image,alt:product.alt,width:400,height:460,loading:"lazy"});
      imageBox.append(img, element("span", "product-badge", product.badge));
      const bottom = element("div", "product-bottom");
      const price = element("span", "product-price");
      price.append(element("small", "", "Desde "), document.createTextNode(money.format(product.price)));
      const pick = element("button", "product-pick", "Lo quiero ");
      pick.type = "button";
      pick.setAttribute("aria-label", `Cotizar ${product.name}`);
      const arrow = element("span", "", "↗");
      arrow.setAttribute("aria-hidden", "true");
      pick.append(arrow);
      pick.addEventListener("click", () => {
        productSelect.value = product.id;
        invalidateSummary();
        $("#cotizar").scrollIntoView({behavior:reducedMotion() ? "instant" : "smooth"});
        productSelect.focus({preventScroll:true});
      });
      bottom.append(price, pick);
      card.append(imageBox, element("h3", "", product.name), element("p", "", `${product.description} ${product.servings}.`), bottom);
      grid.append(card);
    });
    $("#catalog-status").textContent = `${visible.length} productos de demostración en esta categoría.`;
  }
  products.forEach(product => {
    const option = element("option", "", product.name);
    option.value = product.id;
    productSelect.append(option);
  });
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(other => {
      const active = other === button;
      other.classList.toggle("active", active);
      other.setAttribute("aria-pressed", String(active));
    });
    renderProducts(button.dataset.filter);
  }));
  renderProducts();

  const menu = $(".menu-toggle");
  const navigation = $("#navigation");
  function closeMenu() { navigation.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); }
  menu.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) { closeMenu(); menu.focus(); }
  });
  document.addEventListener("click", event => { if (!event.target.closest(".header")) closeMenu(); });

  function openDialog(dialog, trigger) {
    modalTrigger = trigger;
    dialog.showModal();
    document.body.classList.add("modal-open");
  }
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => { document.body.classList.remove("modal-open"); modalTrigger?.focus({preventScroll:true}); });
  });
  document.querySelectorAll(".gallery-item").forEach(button => button.addEventListener("click", () => {
    $("#lightbox-image").src = button.dataset.image;
    $("#lightbox-image").alt = button.dataset.caption;
    $("#photo-caption").textContent = button.dataset.caption;
    openDialog($("#photo-dialog"), button);
  }));

  function whatsapp(message, trigger) {
    const number = String(config.whatsappNumber || "").trim();
    // Un dato vacío o inválido jamás genera enlaces a números de ejemplo.
    if (!/^[1-9]\d{7,14}$/.test(number)) {
      openDialog($("#whatsapp-dialog"), trigger);
      return;
    }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  $("#whatsapp-button").addEventListener("click", event => whatsapp(config.whatsappMessage, event.currentTarget));
  $("#go-to-quote").addEventListener("click", () => {
    modalTrigger = null;
    $("#whatsapp-dialog").close();
    form.elements.name.focus({preventScroll:true});
  });

  function invalidateSummary() {
    result.hidden = true;
    currentSummary = "";
    $("#quote-feedback").textContent = "";
  }
  form.addEventListener("input", () => { dateInput.setCustomValidity(""); form.elements.name.setCustomValidity(""); invalidateSummary(); });
  form.addEventListener("change", invalidateSummary);
  form.addEventListener("submit", event => {
    event.preventDefault();
    dateInput.min = todayLocal();
    dateInput.setCustomValidity(dateInput.value < todayLocal() ? "Elige una fecha de hoy en adelante." : "");
    form.elements.name.setCustomValidity(form.elements.name.value.trim() ? "" : "Escribe un nombre de ejemplo.");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const product = products.find(item => item.id === data.get("product"));
    const formattedDate = new Intl.DateTimeFormat("es-MX", {dateStyle:"long"}).format(new Date(`${data.get("date")}T12:00:00`));
    currentSummary = [
      "DULCE ARTE · SOLICITUD DE DEMOSTRACIÓN", "No es un pedido ni una cotización comercial.", "",
      `Nombre de ejemplo: ${String(data.get("name")).trim()}`,
      `Ocasión: ${data.get("occasion")}`, `Fecha: ${formattedDate}`, `Personas: ${data.get("guests")}`,
      `Inspiración: ${product ? product.name : "Diseño personalizado"}`,
      ...(product ? [`Precio de referencia: desde ${money.format(product.price)} MXN (${product.servings}). No es un total calculado.`] : []),
      `Idea: ${String(data.get("details")).trim() || "Por definir"}`, "", "No se han enviado datos ni confirmado disponibilidad."
    ].join("\n");
    $("#quote-summary").textContent = currentSummary;
    result.hidden = false;
    result.focus({preventScroll:true});
    result.scrollIntoView({behavior:reducedMotion() ? "instant" : "smooth",block:"nearest"});
  });
  $("#download-quote").addEventListener("click", () => {
    if (!currentSummary) return;
    const url = URL.createObjectURL(new Blob([currentSummary], {type:"text/plain;charset=utf-8"}));
    const link = element("a");
    link.href = url;
    link.download = "dulce-arte-solicitud-demo.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("#quote-feedback").textContent = "Resumen preparado para descargar. No se han enviado datos.";
  });
  $("#quote-whatsapp").addEventListener("click", event => { if (currentSummary) whatsapp(currentSummary, event.currentTarget); });
  function reducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  if ("IntersectionObserver" in window && !reducedMotion()) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove("reveal-pending"); observer.unobserve(entry.target); }
    }), {threshold:0.08});
    document.querySelectorAll(".section-heading, .custom-grid, .quote-copy").forEach(section => {
      section.classList.add("reveal", "reveal-pending");
      observer.observe(section);
    });
  }
})();

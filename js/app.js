// Say What storefront behaviour: product cards, quick view, cart drawer, forms.
// Cart lives in localStorage; checkout and email forms are not connected to a backend yet.

(function () {
  const CART_KEY = "saywhat-cart";
  const $ = (sel, root = document) => root.querySelector(sel);

  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const selected = Object.fromEntries(PRODUCTS.map((p) => [p.id, 0]));
  let cart = loadCart();

  // ---------- Helpers ----------

  function money(n) {
    return "₹" + n.toLocaleString("en-IN");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function variantOf(p, idx = selected[p.id]) {
    return p.option ? p.option.values[idx] : null;
  }

  function priceOf(p, idx) {
    const v = variantOf(p, idx);
    return v ? { price: v.price, compare: v.compare } : { price: p.price, compare: p.compare };
  }

  function mainImageOf(p, idx) {
    const v = variantOf(p, idx);
    return v && v.image ? v.image : p.images[0];
  }

  function galleryOf(p) {
    const variantImages = p.option ? p.option.values.map((v) => v.image).filter(Boolean) : [];
    return [...new Set([...variantImages, ...p.images])];
  }

  function isBuyable(p) {
    return p.status === "available";
  }

  function priceHtml(p, idx) {
    const { price, compare } = priceOf(p, idx);
    const off = compare ? Math.round((1 - price / compare) * 100) : 0;
    return `<div class="price">
      <span class="now">${money(price)}</span>
      ${compare ? `<span class="was"><span class="sr-only">Was </span>${money(compare)}</span><span class="off">${off}% off</span>` : ""}
    </div>`;
  }

  function badgesHtml(p, idx) {
    const out = [];
    if (p.status === "sold-out") out.push(`<span class="sticker sticker-ink">Sold out</span>`);
    if (p.status === "coming-soon") out.push(`<span class="sticker sticker-mustard">Coming soon</span>`);
    if (p.status === "available" && priceOf(p, idx).compare) out.push(`<span class="sticker sticker-sale">Sale</span>`);
    if (p.badge) out.push(`<span class="sticker sticker-pink">${escapeHtml(p.badge)}</span>`);
    return out.join("");
  }

  function optionHtml(p, idx, compact) {
    if (!p.option) return "";
    const { name, type, values } = p.option;
    if (compact && type === "pill") {
      return `<p class="option-label">${values.length} ${name.toLowerCase()}s to pick from</p>`;
    }
    const buttons = values
      .map((v, i) =>
        type === "swatch"
          ? `<button class="swatch" style="background:${v.swatch}" data-select="${p.id}" data-index="${i}" aria-pressed="${i === idx}" aria-label="${escapeHtml(v.label)}" title="${escapeHtml(v.label)}"></button>`
          : `<button class="pill" data-select="${p.id}" data-index="${i}" aria-pressed="${i === idx}">${escapeHtml(v.label)}</button>`
      )
      .join("");
    return `<div class="option">
      <p class="option-label">${escapeHtml(name)}: <strong>${escapeHtml(values[idx].label)}</strong></p>
      <div class="${type === "swatch" ? "swatches" : "pills"}" role="group" aria-label="${escapeHtml(name)}">${buttons}</div>
    </div>`;
  }

  // ---------- Product cards ----------

  function cardHtml(p) {
    const idx = selected[p.id];
    const v = variantOf(p, idx);
    const alt = v ? `${p.alt} (${v.label})` : p.alt;
    return `<article class="card reveal in" data-card="${p.id}">
      <button class="card-media bg-${p.accent}" data-open="${p.id}" aria-label="Quick view ${escapeHtml(p.name)}">
        <img src="${imageUrl(mainImageOf(p, idx), 700)}" alt="${escapeHtml(alt)}" loading="lazy" width="560" height="700">
        <span class="badges">${badgesHtml(p, idx)}</span>
      </button>
      <div class="card-body">
        <p class="card-fact">${escapeHtml(p.fact)}</p>
        <h3 class="card-name"><button data-open="${p.id}">${escapeHtml(p.name)}</button></h3>
        <p class="card-blurb">${escapeHtml(p.blurb)}</p>
        ${priceHtml(p, idx)}
        ${optionHtml(p, idx, true)}
        <div class="card-actions">
          ${
            isBuyable(p)
              ? `<button class="btn btn-primary" data-add="${p.id}">Add to cart</button>`
              : `<button class="btn btn-secondary" data-open="${p.id}">Get notified</button>`
          }
        </div>
      </div>
    </article>`;
  }

  function renderGrid() {
    $("#productGrid").innerHTML = PRODUCTS.map(cardHtml).join("");
  }

  function rerenderCard(id) {
    const old = document.querySelector(`[data-card="${id}"]`);
    if (!old) return;
    const tmp = document.createElement("div");
    tmp.innerHTML = cardHtml(byId[id]);
    old.replaceWith(tmp.firstElementChild);
  }

  $("#productGrid").addEventListener("click", (e) => {
    const sel = e.target.closest("[data-select]");
    if (sel) {
      const id = sel.dataset.select;
      selected[id] = Number(sel.dataset.index);
      rerenderCard(id);
      document.querySelector(`[data-card="${id}"] [data-select][data-index="${selected[id]}"]`)?.focus();
      return;
    }
    const open = e.target.closest("[data-open]");
    if (open) return openQuickView(open.dataset.open, open);
    const add = e.target.closest("[data-add]");
    if (add) addToCart(add.dataset.add, selected[add.dataset.add], 1);
  });

  // ---------- Quick view ----------

  const qv = $("#quickview");
  const qvBody = $("#qvBody");
  let qvState = null;
  let lastTrigger = null;

  function openQuickView(id, trigger) {
    lastTrigger = trigger || null;
    qvState = { id, qty: 1, image: mainImageOf(byId[id], selected[id]) };
    renderQuickView();
    if (typeof qv.showModal === "function") qv.showModal();
    else qv.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  }

  function renderQuickView() {
    const p = byId[qvState.id];
    const idx = selected[p.id];
    const thumbs = galleryOf(p)
      .map(
        (img, i) =>
          `<button class="qv-thumb" data-thumb="${img}" aria-label="Show photo ${i + 1}" aria-current="${img === qvState.image}">
            <img src="${imageUrl(img, 160)}" alt="" loading="lazy">
          </button>`
      )
      .join("");
    const details = p.details.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join("");
    const buy = isBuyable(p)
      ? `<div class="qv-buy">
          <div class="qty" role="group" aria-label="Quantity">
            <button data-qty="-1" aria-label="Decrease quantity">−</button>
            <span aria-live="polite">${qvState.qty}</span>
            <button data-qty="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="btn btn-primary" data-qv-add>Add to cart · ${money(priceOf(p, idx).price * qvState.qty)}</button>
        </div>`
      : `<form class="notify-form" data-notify novalidate>
          <label for="notifyEmail" class="sr-only">Email address</label>
          <input type="email" id="notifyEmail" placeholder="you@email.com" autocomplete="email" required>
          <button type="submit" class="btn btn-primary">Get notified</button>
          <p class="form-msg" role="status"></p>
        </form>`;

    qvBody.innerHTML = `
      <div class="qv-gallery">
        <div class="qv-main bg-${p.accent}"><img src="${imageUrl(qvState.image, 1000)}" alt="${escapeHtml(p.alt)}"></div>
        <div class="qv-thumbs">${thumbs}</div>
      </div>
      <div class="qv-info">
        <div class="badges">${badgesHtml(p, idx)}</div>
        <p class="card-fact">${escapeHtml(p.fact)}</p>
        <h2 class="h1" id="qvTitle">${escapeHtml(p.name)}</h2>
        <p class="card-blurb">${escapeHtml(p.blurb)}</p>
        ${priceHtml(p, idx)}
        ${optionHtml(p, idx, false)}
        ${buy}
        <p class="qv-desc">${escapeHtml(p.description)}</p>
        <dl class="qv-details">${details}</dl>
        ${p.note ? `<p class="qv-note">${escapeHtml(p.note)}</p>` : ""}
      </div>`;
  }

  qvBody.addEventListener("click", (e) => {
    const p = byId[qvState.id];
    const sel = e.target.closest("[data-select]");
    if (sel) {
      selected[p.id] = Number(sel.dataset.index);
      qvState.image = mainImageOf(p, selected[p.id]);
      renderQuickView();
      rerenderCard(p.id);
      qvBody.querySelector(`[data-select][data-index="${selected[p.id]}"]`)?.focus();
      return;
    }
    const thumb = e.target.closest("[data-thumb]");
    if (thumb) {
      qvState.image = thumb.dataset.thumb;
      renderQuickView();
      qvBody.querySelector(`[data-thumb="${CSS.escape(qvState.image)}"]`)?.focus();
      return;
    }
    const qty = e.target.closest("[data-qty]");
    if (qty) {
      qvState.qty = Math.min(9, Math.max(1, qvState.qty + Number(qty.dataset.qty)));
      renderQuickView();
      qvBody.querySelector(`[data-qty="${qty.dataset.qty}"]`)?.focus();
      return;
    }
    if (e.target.closest("[data-qv-add]")) {
      addToCart(p.id, selected[p.id], qvState.qty);
      closeQuickView();
    }
  });

  qvBody.addEventListener("submit", (e) => {
    const form = e.target.closest("[data-notify]");
    if (!form) return;
    e.preventDefault();
    const input = form.querySelector("input");
    const msg = form.querySelector(".form-msg");
    if (!input.checkValidity()) {
      msg.textContent = "That email looks off. Try again?";
      msg.classList.add("error");
      return;
    }
    msg.classList.remove("error");
    msg.textContent = `Done. We'll tell you when ${byId[qvState.id].name} is back.`;
    input.value = "";
  });

  function closeQuickView() {
    if (qv.open) qv.close();
  }

  qv.addEventListener("close", () => {
    document.body.style.overflow = "";
    lastTrigger?.focus?.();
  });
  qv.addEventListener("click", (e) => {
    if (e.target === qv) closeQuickView();
  });
  $("#qvClose").addEventListener("click", closeQuickView);

  // ---------- Cart ----------

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((i) => byId[i.id]) : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }

  function addToCart(id, idx, qty) {
    const p = byId[id];
    if (!isBuyable(p)) return;
    const existing = cart.find((i) => i.id === id && i.idx === idx);
    if (existing) existing.qty = Math.min(9, existing.qty + qty);
    else cart.push({ id, idx, qty });
    saveCart();
    renderCart();
    const v = variantOf(p, idx);
    toast(`${p.name}${v ? ` (${v.label})` : ""} added. Say what!`);
    const count = $("#cartCount");
    count.classList.remove("bump");
    void count.offsetWidth;
    count.classList.add("bump");
  }

  function renderCart() {
    const totalQty = cart.reduce((n, i) => n + i.qty, 0);
    const subtotal = cart.reduce((n, i) => n + priceOf(byId[i.id], i.idx).price * i.qty, 0);
    $("#cartCount").textContent = totalQty;
    $("#cartOpen").setAttribute("aria-label", `Open cart, ${totalQty} item${totalQty === 1 ? "" : "s"}`);
    $("#cartSubtotal").textContent = money(subtotal);
    $("#checkoutBtn").disabled = cart.length === 0;

    $("#cartItems").innerHTML = cart.length
      ? cart
          .map((item, n) => {
            const p = byId[item.id];
            const v = variantOf(p, item.idx);
            return `<div class="cart-item">
              <img src="${imageUrl(mainImageOf(p, item.idx), 160)}" alt="">
              <div>
                <h3>${escapeHtml(p.name)}</h3>
                ${v ? `<p class="variant">${escapeHtml(v.label)}</p>` : ""}
                <div class="qty" role="group" aria-label="Quantity for ${escapeHtml(p.name)}">
                  <button data-line="${n}" data-delta="-1" aria-label="Decrease quantity">−</button>
                  <span>${item.qty}</span>
                  <button data-line="${n}" data-delta="1" aria-label="Increase quantity">+</button>
                </div>
              </div>
              <div>
                <p class="line-price">${money(priceOf(p, item.idx).price * item.qty)}</p>
                <button class="remove" data-remove="${n}">Remove</button>
              </div>
            </div>`;
          })
          .join("")
      : `<div class="drawer-empty"><strong>Empty. Say what?</strong>Nothing here yet. Go find something weird.</div>`;
  }

  $("#cartItems").addEventListener("click", (e) => {
    const delta = e.target.closest("[data-delta]");
    if (delta) {
      const item = cart[Number(delta.dataset.line)];
      item.qty += Number(delta.dataset.delta);
      if (item.qty < 1) cart.splice(Number(delta.dataset.line), 1);
      else item.qty = Math.min(9, item.qty);
    }
    const remove = e.target.closest("[data-remove]");
    if (remove) cart.splice(Number(remove.dataset.remove), 1);
    if (delta || remove) {
      saveCart();
      renderCart();
    }
  });

  const drawer = $("#cartDrawer");
  const backdrop = $("#drawerBackdrop");

  function openCart() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    $("#cartClose").focus();
  }

  function closeCart() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
    $("#checkoutMsg").textContent = "";
    $("#cartOpen").focus();
  }

  $("#cartOpen").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("open")) closeCart();
  });
  $("#checkoutBtn").addEventListener("click", () => {
    $("#checkoutMsg").textContent = "Checkout is coming soon. Your cart is saved on this device.";
  });

  // ---------- Newsletter ----------

  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#newsletterEmail");
    const msg = $("#newsletterMsg");
    if (!input.checkValidity()) {
      msg.textContent = "That email looks off. Try again?";
      msg.classList.add("error");
      return;
    }
    msg.classList.remove("error");
    msg.textContent = "You're on the list. Say what!";
    input.value = "";
  });

  // ---------- Toast ----------

  let toastTimer;
  function toast(text) {
    const el = $("#toast");
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
  }

  // ---------- Header, menu, reveal ----------

  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = $("#menuBtn");
  const nav = $("#nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }

  $("#year").textContent = new Date().getFullYear();

  renderGrid();
  renderCart();
})();

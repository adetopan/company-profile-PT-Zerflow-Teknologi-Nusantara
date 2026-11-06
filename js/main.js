(function () {
  "use strict";

  var header = document.getElementById("header");
  var nav = document.getElementById("nav-menu");
  var navToggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  document.querySelectorAll("[data-select-custom]").forEach(function (wrap) {
    var select = wrap.querySelector(".select-native");
    var trigger = wrap.querySelector(".select-trigger");
    var label = wrap.querySelector(".select-trigger-text");
    var menu = wrap.querySelector(".select-menu");
    if (!select || !trigger || !label || !menu) return;

    function buildMenu() {
      menu.innerHTML = "";
      Array.prototype.forEach.call(select.options, function (opt) {
        var li = document.createElement("li");
        li.className = "select-option";
        li.setAttribute("role", "option");
        li.dataset.value = opt.value;
        li.textContent = opt.textContent;
        if (!opt.value) {
          li.classList.add("is-disabled");
          li.setAttribute("aria-disabled", "true");
        }
        if (opt.selected && opt.value) {
          li.classList.add("is-selected");
          li.setAttribute("aria-selected", "true");
        } else {
          li.setAttribute("aria-selected", "false");
        }
        menu.appendChild(li);
      });
    }

    function syncTriggerFromSelect() {
      var opt = select.options[select.selectedIndex];
      if (!opt || !opt.value) {
        label.textContent = "Pilih layanan";
        label.classList.add("is-placeholder");
      } else {
        label.textContent = opt.textContent;
        label.classList.remove("is-placeholder");
      }
      menu.querySelectorAll(".select-option").forEach(function (item) {
        var on = item.dataset.value === select.value && select.value !== "";
        item.classList.toggle("is-selected", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function closeMenu() {
      wrap.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }

    function openMenu() {
      wrap.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    }

    buildMenu();
    syncTriggerFromSelect();

    trigger.addEventListener("click", function () {
      if (wrap.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.addEventListener("click", function (e) {
      var item = e.target.closest(".select-option");
      if (!item || !item.dataset.value) return;
      select.value = item.dataset.value;
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncTriggerFromSelect();
      closeMenu();
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    form &&
      form.addEventListener("reset", function () {
        setTimeout(syncTriggerFromSelect, 0);
        closeMenu();
      });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!formStatus) return;

      formStatus.textContent = "";
      formStatus.classList.remove("error");

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var message = form.message.value.trim();

      if (!name || !email || !service || !message) {
        formStatus.textContent = "Lengkapi semua field terlebih dahulu.";
        formStatus.classList.add("error");
        return;
      }

      var serviceSelect = form.service;
      var serviceLabel =
        serviceSelect && serviceSelect.options[serviceSelect.selectedIndex]
          ? serviceSelect.options[serviceSelect.selectedIndex].textContent
          : service;

      var subject = encodeURIComponent("Inquiry Zerflow — " + serviceLabel);
      var body = encodeURIComponent(
        "Nama: " +
          name +
          "\nEmail: " +
          email +
          "\nLayanan: " +
          serviceLabel +
          "\n\n" +
          message
      );

      formStatus.textContent = "Membuka klien email…";
      window.location.href = "mailto:zerflowtech@gmail.com?subject=" + subject + "&body=" + body;

      setTimeout(function () {
        formStatus.textContent =
          "Terima kasih! Jika email tidak terbuka, kirim manual ke zerflowtech@gmail.com";
        form.reset();
      }, 800);
    });
  }
})();

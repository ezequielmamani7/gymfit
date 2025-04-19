$(document).ready(() => {
  // ===== MEGA MENÚ =====
  // Ajustar posición del mega menú
  $(".dropdown").on("show.bs.dropdown", function () {
    var $dropdown = $(this).find(".dropdown-menu")
    var offset = $(this).offset()
    var width = $dropdown.width()
    var docWidth = $(window).width()

    if (offset.left + width > docWidth) {
      $dropdown.css({
        left: "auto",
        right: 0,
      })
    }
  })

  // ===== CONTADOR ANIMADO =====
  // Iniciar contador cuando el elemento es visible
  function startCounter() {
    $(".counter").each(function () {
      var $this = $(this)
      var countTo = $this.attr("data-count")

      $({ countNum: 0 }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.floor(this.countNum))
          },
          complete: function () {
            $this.text(this.countNum)
          },
        },
      )
    })
  }

  // Iniciar contador cuando se hace scroll a la sección
  var counterSection = $(".counter-section")
  if (counterSection.length) {
    var counterOffset = counterSection.offset().top
    var windowHeight = $(window).height()
    var counterStarted = false

    $(window).scroll(() => {
      var scrollPos = $(window).scrollTop()

      if (scrollPos > counterOffset - windowHeight + 200 && !counterStarted) {
        startCounter()
        counterStarted = true
      }
    })
  }

  // ===== CARRUSEL DE TESTIMONIOS =====
  // Pausar carrusel al hacer hover
  $("#testimonialCarousel").hover(
    function () {
      $(this).carousel("pause")
    },
    function () {
      $(this).carousel("cycle")
    },
  )

  // ===== FILTROS DE CLASES =====
  // Filtrar clases por categoría
  $(".filter-btn").click(function () {
    var filterValue = $(this).attr("data-filter")

    $(".filter-btn").removeClass("active")
    $(this).addClass("active")

    if (filterValue === "all") {
      $(".class-item").fadeIn(300)
    } else {
      $(".class-item").hide()
      $("." + filterValue).fadeIn(300)
    }
  })

  // ===== BARRAS DE HABILIDADES ANIMADAS =====
  // Animar barras de progreso cuando son visibles
  function animateSkills() {
    $(".progress-bar").each(function () {
      var $this = $(this)
      var width = $this.attr("style")
        ? Number.parseInt($this.attr("style").replace("width: ", "").replace("%;", ""))
        : 0

      $this.css("width", "0%")

      $this.animate(
        {
          width: width + "%",
        },
        1000,
      )
    })
  }

  // Iniciar animación cuando se hace scroll a la sección
  var trainersSection = $(".trainers")
  if (trainersSection.length) {
    var trainersOffset = trainersSection.offset().top
    var windowHeight = $(window).height()
    var skillsAnimated = false

    $(window).scroll(() => {
      var scrollPos = $(window).scrollTop()

      if (scrollPos > trainersOffset - windowHeight + 200 && !skillsAnimated) {
        animateSkills()
        skillsAnimated = true
      }
    })
  }

  // ===== SISTEMA DE RATING CON ESTRELLAS =====
  // Actualizar valor del rating al seleccionar estrellas
  $(".rating-input").change(() => {
    var rating = $('input[name="rating"]:checked').val()
    $(".rating-value").text(rating + "/5")
  })

  // Hover en las estrellas para previsualizar selección
  $(".rating-label").hover(
    function () {
      var index = $(".rating-label").index(this)
      var labels = $(".rating-label")

      for (var i = 0; i <= index; i++) {
        $(labels[i]).addClass("hover")
      }
    },
    () => {
      $(".rating-label").removeClass("hover")
    },
  )

  // ===== TOGGLE MENSUAL/ANUAL =====
  // Cambiar entre precios mensuales y anuales
  $("#pricingToggle").change(function () {
    if ($(this).is(":checked")) {
      $(".monthly-price").addClass("d-none")
      $(".annual-price").removeClass("d-none")
      $("#monthlyLabel").removeClass("active")
      $("#annualLabel").addClass("active")
      $(".period").text("/año")
    } else {
      $(".annual-price").addClass("d-none")
      $(".monthly-price").removeClass("d-none")
      $("#annualLabel").removeClass("active")
      $("#monthlyLabel").addClass("active")
      $(".period").text("/mes")
    }
  })

  // ===== TOOLTIPS =====
  // Inicializar tooltips de Bootstrap
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // ===== VALIDACIÓN DE FORMULARIOS =====
  // Validación de Bootstrap para todos los formularios
  var forms = document.querySelectorAll(".needs-validation")

  Array.prototype.slice.call(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        event.preventDefault()

        // Mostrar spinner
        var submitBtn = form.querySelector('button[type="submit"]')
        var spinner = submitBtn.querySelector(".spinner-border")
        var text = submitBtn.querySelector("span:not(.spinner-border)")

        spinner.classList.remove("d-none")
        text.textContent = "Enviando..."

        // Simular envío (en producción, aquí iría el código para enviar el formulario)
        setTimeout(() => {
          spinner.classList.add("d-none")
          text.textContent = text.getAttribute("data-original-text") || "Enviar"

          // Mostrar modal de confirmación si es el formulario de contacto
          if (form.id === "contactForm") {
            var confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"))
            confirmationModal.show()
          } else {
            // Para otros formularios, mostrar mensaje de éxito
            var successAlert =
              '<div class="alert alert-success alert-dismissible fade show mt-3" role="alert">' +
              "Formulario enviado correctamente." +
              '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
              "</div>"
            $(form).append(successAlert)
          }

          // Resetear formulario
          form.reset()
          form.classList.remove("was-validated")
        }, 2000)
      }

      form.classList.add("was-validated")
    })
  })

  // ===== FILTROS DE BLOG =====
  // Filtrar artículos del blog por etiquetas
  $(".blog-filter").click(function (e) {
    e.preventDefault()
    var filterValue = $(this).attr("data-filter")

    $(".blog-filter").removeClass("active")
    $(this).addClass("active")

    if (filterValue === "all") {
      $(".blog-item").fadeIn(300)
    } else {
      $(".blog-item").hide()
      $('.blog-item[data-tags*="' + filterValue + '"]').fadeIn(300)
    }
  })

  // ===== SCROLL REVEAL =====
  // Revelar elementos al hacer scroll
  function revealOnScroll() {
    var currentWindowHeight = $(window).height()
    var scrollTop = $(window).scrollTop()

    $(".scroll-reveal").each(function () {
      var elementTop = $(this).offset().top

      if (elementTop < scrollTop + currentWindowHeight - 100) {
        $(this).addClass("revealed")
      }
    })
  }

  // Inicializar elementos con animación al cargar la página
  $(".counter-item, .featured-card, .testimonial-item, .class-card, .trainer-card, .pricing-card").addClass(
    "scroll-reveal",
  )

  // Ejecutar al cargar la página y al hacer scroll
  revealOnScroll()
  $(window).scroll(() => {
    revealOnScroll()
  })

  // Guardar texto original de los botones para restaurarlo después de enviar
  $('button[type="submit"]').each(function () {
    var textSpan = $(this).find("span:not(.spinner-border)")
    if (textSpan.length) {
      textSpan.attr("data-original-text", textSpan.text())
    }
  })
})

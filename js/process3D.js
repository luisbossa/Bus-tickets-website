var intervalcont;

function iniciarCountdown(e) {
  var k = e * 60;
  intervalcont = setInterval(function () {
    var p = Math.floor(k / 60),
      d = k % 60;
    p = p < 10 ? "0" + p : p;
    d = d < 10 ? "0" + d : d;

    $("#countdown").text(
      "El formulario de pago expira en: " + p + ":" + d + " min"
    );
    k--;

    if (k < 0) {
      clearInterval(intervalcont);
      mostrarNotificacion("Su tiempo para realizar el pago ha expirado.");
      setTimeout(() => {
        window.location.href = "/app/index.html";
      }, 4000);
    }
  }, 1000);
}

function mostrarNotificacion(mensaje, duracion = 4000) {
  const noti = document.getElementById("custom-notification");
  const notiMsg = document.getElementById("notification-message");

  notiMsg.textContent = mensaje;
  noti.classList.add("show");

  setTimeout(() => {
    noti.classList.remove("show");
  }, duracion);
}

function detenerContador() {
  clearInterval(intervalcont);
}
$(document).ready(function () {
  function e() {
    return $("#users-device-size").find("div:visible").first().attr("id");
  }

  function k(a) {
    $.post(C, JSON.stringify(a), function (b, c) {
      b[0].Result_Code
        ? ((q = b[0].Result_Code),
          $("#myIframeformtdc").hide(),
          q == "00"
            ? ($("#Form_full").hide(),
              $("#load").css("display", "none"),
              $("#transactiondate").text(b[0].transactiondate),
              $("#div_loader_procesarpago").css("display", "none"),
              $("#div_loader_procesarpagolocal").hide(),
              $("#autoritation_no").text(b[0].Reference_code),
              $("#success").show())
            : q == "-99"
            ? ($("#Form_full").hide(),
              $("#load").css("display", "none"),
              $("#div_loader_procesarpago").css("display", "none"),
              $("#div_loader_procesarpagolocal").hide(),
              $("#comunication").show(),
              $("#transactiondatecomunication").text(b[0].transactiondate))
            : ($("#Form_full").hide(),
              $("#load").css("display", "none"),
              $("#div_loader_procesarpago").css("display", "none"),
              $("#div_loader_procesarpagolocal").hide(),
              $("#declined").show(),
              $("#transactiondatedeclined").text(b[0].transactiondate)))
        : ($("#Form_full").hide(),
          $("#load").css("display", "none"),
          $("#div_loader_procesarpago").css("display", "none"),
          $("#div_loader_procesarpagolocal").hide(),
          $("#declined").show(),
          $("#transactiondatedeclined").text(b[0].transactiondate));
      u = b[0].urlredirect;
      p($("#autoredirecttime").val(), b[0].Result_Code);
    });
  }

  function p(a, b) {
    if ($("#enableautoredirect").val().toUpperCase() == "TRUE")
      var c = setInterval(function () {
        var n = a % 60;
        n =
          "Usted ser\u00e1 redireccionado en " +
          (n < 10 ? "0" + n : n) +
          " segundos.";
        $(".segredirect_result").text(n);
        a--;
        a < 0 &&
          (clearInterval(c),
          (window.top.location.href =
            b !== "00" ? $("#UrlResultNotOk").val() : $("#UrlResultOk").val()));
      }, 1e3);
  }
  history.pushState(
    {
      page: 1,
    },
    "Title 1",
    "#no-back"
  );
  window.onhashchange = function (a) {
    window.location.hash = "no-back";
  };
  $("#contenedorIframe").hide();
  $("#div_loader_procesarpagolocal").hide();
  (window.opr && opr.addons) ||
    window.opera ||
    navigator.userAgent.indexOf(" OPR/");
  /constructor/i.test(window.HTMLElement);
  var d = !!document.documentMode;
  window.chrome &&
    (window.chrome.webstore || window.chrome.runtime) &&
    navigator.userAgent.indexOf("Edg");
  d && $("#card_view").hide();
  var f = "",
    u = "",
    l = "",
    q = "",
    C = "";
  let t = !1;
  C =
    "https://gateway.afinia.site/gatewayjws/Service1.svc/AFINIA_PaymentNewProcess?rand=";
  urlpaymentrisk =
    "https://gateway.afinia.site/gatewayjws/Service1.svc/AFINIA_RiskScore?rand=";
  try {
    $.getJSON(
      atob("aHR0cHM6Ly9pcGluZm8uaW8vP3Rva2VuPTBjMGUwOTE5N2QyYTUw"),
      function (a) {
        f = a.ip;
        l = a.country;
        //console.log(a);
      }
    )
      .done(function (a) {
        f = a.ip;
        l = a.country;
        //console.log(a);
      })
      .fail(function (a) {
        $.get(atob("aHR0cHM6Ly9hcGkuaXBpZnkub3Jn"))
          .done(function (b) {
            b.length != 0 && ((f = b), (l = ""));
          })
          .fail(function (b) {
            f = "N/A";
            l = "";
          });
      });
  } catch (a) {
    $.get(atob("aHR0cHM6Ly9hcGkuaXBpZnkub3Jn"))
      .done(function (b) {
        b.length != 0 && ((f = b), (l = ""));
      })
      .fail(function (b) {
        f = "N/A";
        l = "";
      });
  }
  var v = document.getElementById("Title_USer"),
    w = document.getElementById("Card_number_input"),
    x = document.getElementById("cardExpiry");
  d = document.getElementById("cardCVC");
  document.getElementById("output");
  var y = document.getElementById("ccsingle"),
    z = new IMask(d, {
      mask: "0000",
    }),
    A = function (a) {
      for (
        var b = document.querySelectorAll(".darkcolor"), c = 0;
        c < b.length;
        c++
      )
        b[c].setAttribute("class", ""),
          b[c].setAttribute("class", "darkcolor " + a);
      b = document.querySelectorAll(".lightcolor");
      for (c = 0; c < b.length; c++)
        b[c].setAttribute("class", ""),
          b[c].setAttribute("class", "lightcolor " + a);
    };
  document.querySelector(".preload").classList.remove("preload");
  document.querySelector(".creditcard").addEventListener("click", function () {
    this.classList.contains("flipped")
      ? this.classList.remove("flipped")
      : this.classList.add("flipped");
  });
  v.addEventListener("input", function () {
    v.value.length == 0
      ? ((document.getElementById("svgname").innerHTML = "Afinia "),
        (document.getElementById("svgnameback").innerHTML = "Afinia "))
      : ((document.getElementById("svgname").innerHTML = this.value),
        (document.getElementById("svgnameback").innerHTML = this.value));
  });
  w.oninput = function () {
    document.getElementById("svgnumber").innerHTML = w.value;
    $.payment.cardType($("#Card_number_input").val()) == "visa"
      ? ((y.innerHTML =
          '<svg version="1.1" id="Layer_1" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="750px" height="471px" viewBox="0 0 750 471" enable-background="new 0 0 750 471" xml:space="preserve"><title>Slice 1</title><desc>Created with Sketch.</desc><g id="visa" sketch:type="MSLayerGroup"><path id="Shape" sketch:type="MSShapeGroup" fill="#0E4595" d="M278.198,334.228l33.36-195.763h53.358l-33.384,195.763H278.198L278.198,334.228z"/><path id="path13" sketch:type="MSShapeGroup" fill="#0E4595" d="M524.307,142.687c-10.57-3.966-27.135-8.222-47.822-8.222c-52.725,0-89.863,26.551-90.18,64.604c-0.297,28.129,26.514,43.821,46.754,53.185c20.77,9.597,27.752,15.716,27.652,24.283c-0.133,13.123-16.586,19.116-31.924,19.116c-21.355,0-32.701-2.967-50.225-10.274l-6.877-3.112l-7.488,43.823c12.463,5.466,35.508,10.199,59.438,10.445c56.09,0,92.502-26.248,92.916-66.884c0.199-22.27-14.016-39.216-44.801-53.188c-18.65-9.056-30.072-15.099-29.951-24.269c0-8.137,9.668-16.838,30.559-16.838c17.447-0.271,30.088,3.534,39.936,7.5l4.781,2.259L524.307,142.687"/><path id="Path" sketch:type="MSShapeGroup" fill="#0E4595" d="M661.615,138.464h-41.23c-12.773,0-22.332,3.486-27.941,16.234l-79.244,179.402h56.031c0,0,9.16-24.121,11.232-29.418c6.123,0,60.555,0.084,68.336,0.084c1.596,6.854,6.492,29.334,6.492,29.334h49.512L661.615,138.464L661.615,138.464z M596.198,264.872c4.414-11.279,21.26-54.724,21.26-54.724c-0.314,0.521,4.381-11.334,7.074-18.684l3.607,16.878c0,0,10.217,46.729,12.352,56.527h-44.293V264.872L596.198,264.872z"/><path id="path16" sketch:type="MSShapeGroup" fill="#0E4595" d="M232.903,138.464L180.664,271.96l-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767,171.204l56.455-0.064l84.004-195.386L232.903,138.464"/><path id="path18" sketch:type="MSShapeGroup" fill="#F2AE14" d="M131.92,138.464H45.879l-0.682,4.073c66.939,16.204,111.232,55.363,129.618,102.415l-18.709-89.96C152.877,142.596,143.509,138.896,131.92,138.464"/></g></svg>'),
        A("lime"))
      : $.payment.cardType($("#Card_number_input").val()) == "mastercard"
      ? ((y.innerHTML =
          '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="482.51" height="374" viewBox="0 0 482.51 374"> <title>mastercard</title> <g> <path d="M220.13,421.67V396.82c0-9.53-5.8-15.74-15.32-15.74-5,0-10.35,1.66-14.08,7-2.9-4.56-7-7-13.25-7a14.07,14.07,0,0,0-12,5.8v-5h-7.87v39.76h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78h7.87V398.89c0-7,4.14-10.35,9.94-10.35s9.11,3.73,9.11,10.35v22.78Zm129.22-39.35h-14.5v-12H327v12h-8.28v7H327V408c0,9.11,3.31,14.5,13.25,14.5A23.17,23.17,0,0,0,351,419.6l-2.49-7a13.63,13.63,0,0,1-7.46,2.07c-4.14,0-6.21-2.49-6.21-6.63V389h14.5v-6.63Zm73.72-1.24a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76h7.87V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-111.41,4.14c-4.14-2.9-9.94-4.14-16.15-4.14-9.94,0-16.15,4.56-16.15,12.43,0,6.63,4.56,10.35,13.25,11.6l4.14.41c4.56.83,7.46,2.49,7.46,4.56,0,2.9-3.31,5-9.53,5a21.84,21.84,0,0,1-13.25-4.14l-4.14,6.21c5.8,4.14,12.84,5,17,5,11.6,0,17.81-5.38,17.81-12.84,0-7-5-10.35-13.67-11.6l-4.14-.41c-3.73-.41-7-1.66-7-4.14,0-2.9,3.31-5,7.87-5,5,0,9.94,2.07,12.43,3.31Zm120.11,16.57c0,12,7.87,20.71,20.71,20.71,5.8,0,9.94-1.24,14.08-4.56l-4.14-6.21a16.74,16.74,0,0,1-10.35,3.73c-7,0-12.43-5.38-12.43-13.25S445,389,452.07,389a16.74,16.74,0,0,1,10.35,3.73l4.14-6.21c-4.14-3.31-8.28-4.56-14.08-4.56-12.43-.83-20.71,7.87-20.71,19.88h0Zm-55.5-20.71c-11.6,0-19.47,8.28-19.47,20.71s8.28,20.71,20.29,20.71a25.33,25.33,0,0,0,16.15-5.38l-4.14-5.8a19.79,19.79,0,0,1-11.6,4.14c-5.38,0-11.18-3.31-12-10.35h29.41v-3.31c0-12.43-7.46-20.71-18.64-20.71h0Zm-.41,7.46c5.8,0,9.94,3.73,10.35,9.94H364.68c1.24-5.8,5-9.94,11.18-9.94ZM268.59,401.79V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm306.08-20.71a12.39,12.39,0,0,0-10.77,5.8v-5h-7.87v39.76H532V399.31c0-6.63,3.31-10.77,8.7-10.77a24.24,24.24,0,0,1,5.38.83l2.49-7.46a28,28,0,0,0-5.8-.83Zm-30.65,20.71V381.91h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25-7.87.41-12.43-5.8-12.43-13.25Zm111.83,0V366.17h-7.87v20.71c-2.9-3.73-7-5.8-12.84-5.8-11.18,0-19.47,8.7-19.47,20.71s8.28,20.71,19.47,20.71c5.8,0,9.94-2.07,12.84-5.8v5h7.87V401.79Zm-31.89,0c0-7.46,4.56-13.25,12.43-13.25,7.46,0,12,5.8,12,13.25,0,7.87-5,13.25-12,13.25C564.73,415.46,560.17,409.25,560.17,401.79Z" transform="translate(-132.74 -48.5)"/> <g> <rect x="169.81" y="31.89" width="143.72" height="234.42" fill="#ff5f00"/> <path d="M317.05,197.6A149.5,149.5,0,0,1,373.79,80.39a149.1,149.1,0,1,0,0,234.42A149.5,149.5,0,0,1,317.05,197.6Z" transform="translate(-132.74 -48.5)" fill="#eb001b"/> <path d="M615.26,197.6a148.95,148.95,0,0,1-241,117.21,149.43,149.43,0,0,0,0-234.42,148.95,148.95,0,0,1,241,117.21Z" transform="translate(-132.74 -48.5)" fill="#f79e1b"/> </g> </g></svg>'),
        A("lightblue"))
      : ((y.innerHTML = ""), A("grey"));
  };
  x.oninput = function () {
    document.getElementById("svgexpire").innerHTML = x.value
      .replace(" ", "")
      .trim();
  };
  z.on("accept", function () {
    z.value.length == 0
      ? (document.getElementById("svgsecurity").innerHTML = "985")
      : (document.getElementById("svgsecurity").innerHTML = z.value);
  });
  v.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.remove("flipped");
  });
  w.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.remove("flipped");
  });
  x.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.remove("flipped");
  });
  d.addEventListener("focus", function () {
    document.querySelector(".creditcard").classList.add("flipped");
  });
  $("#Card_number_input").val() != "" &&
    ($.payment.cardType($("#Card_number_input").val()) == "amex"
      ? ($("#card_image").html("<img src='images/american.png'/>"),
        e() == "xs" || e() == "sm"
          ? $("#imagen_ayuda").attr("src", "images/CVV_AMEX_MOBILE.png")
          : $("#imagen_ayuda").attr("src", "images/CVV_AMEX.png"))
      : ($.payment.cardType($("#Card_number_input").val()) == "visa"
          ? $("#card_image").html("<img src='images/visa.png'/>")
          : $.payment.cardType($("#Card_number_input").val()) == "mastercard"
          ? $("#card_image").html("<img src='images/master.png'/>")
          : $.payment.cardType($("#Card_number_input").val()) == "carnet"
          ? $("#card_image").html("<img src='images/carnet.png'/>")
          : $("#card_image").html("<i class='fa fa-credit-card'></i>"),
        e() == "xs" || e() == "sm"
          ? $("#imagen_ayuda").attr("src", "images/CVV_VISA_MASTER_MOBILE.png")
          : $("#imagen_ayuda").attr("src", "images/CVV_VISA_MASTER.png")));
  $("#success").hide();
  $("#declined").hide();
  $("#comunication").hide();
  var m = $("#payment_form");
  m.find(".subscribe").on("click", function (a) {
    a.preventDefault();
    var b = G.form();
    b &&
      (m
        .find(".subscribe")
        .html('Validating <i class="fa fa-spinner fa-pulse"></i>')
        .prop("disabled", !0),
      b &&
        (m
          .find(".subscribe")
          .html('Procesando <i class="fa fa-spinner fa-pulse"></i>'),
        $("#load").css("display", ""),
        detenerContador(),
        (b = {
          cardnumber: $("#Card_number_input").val(),
          cardholdername: $("#Title_USer").val(),
          cardCVC: $("#cardCVC").val(),
          cardExpiry: $("#cardExpiry").val(),
          totalamount: $("#total_amount").val(),
          email: $("#email").val(),
          cellphone: $("#cellphone").val(),
          tokenid: $("#TokenID").val(),
          urlresultok: $("#UrlResultOk").val(),
          urlresultnotok: $("#UrlResultNotOk").val(),
          clientIp: f,
          countryip: l,
          doblefactor: $("#doublefactor").val(),
        }),
        $.post(urlpaymentrisk, JSON.stringify(b), function (c, n) {
          Url_ExternalRiskScore = c.Url_ExternalRiskScore;
          ActionRiskScore = c.ActionRiskScore;
          t = c.SendPay;
          n = {
            cardnumber: $("#Card_number_input").val(),
            cardholdername: $("#Title_USer").val(),
            cardCVC: $("#cardCVC").val(),
            cardExpiry: $("#cardExpiry").val(),
            totalamount: $("#total_amount").val(),
            email: $("#email").val(),
            cellphone: $("#cellphone").val(),
            tokenid: $("#TokenID").val(),
            urlresultok: $("#UrlResultOk").val(),
            urlresultnotok: $("#UrlResultNotOk").val(),
            clientIp: f,
            countryip: l,
            doblefactor: $("#doublefactor").val(),
            sendpay: t,
            dataipinfofinal: "",
            Bandpay: t,
          };
          ActionRiskScore != 4 && k(n);
          if (ActionRiskScore == 4 && t) {
            let r = $("#email").val();
            if (r == "" || r == void 0 || r == "undefined")
              r = $("#span_email_text").text();
            var B = {};
            try {
              B = {
                cardnumber: $("#Card_number_input").val(),
                token: $("#TokenID").val(),
                cardExpiryDate: $("#cardExpiry").val(),
                ip: f,
                browserAcceptHeader: String(navigator.userAgent),
                browserJavaEnabled: String(navigator.javaEnabled()),
                browserLanguage: String(navigator.language),
                browserColorDepth: String(screen.colorDepth),
                browserScreenHeight: String(screen.height),
                browserScreenWidth: String(screen.width),
                browserTZ: String(new Date().getTimezoneOffset()),
                browserUserAgent: String(navigator.userAgent),
                formtype: $("#formtype").val(),
                emailuser: r,
                cardholdername: $("#Title_USer").val(),
              };
            } catch (g) {
              B = {
                cardnumber: $("#Card_number_input").val(),
                token: $("#TokenID").val(),
                cardExpiryDate: $("#cardExpiry").val(),
                ip: f,
                browserAcceptHeader: "",
                browserJavaEnabled: "",
                browserLanguage: "",
                browserColorDepth: "",
                browserScreenHeight: "",
                browserScreenWidth: "",
                browserTZ: "",
                browserUserAgent: "",
                formtype: $("#formtype").val(),
                emailuser: r,
                cardholdername: $("#Title_USer").val(),
              };
            }
            var h = {
              cardnumber: $("#Card_number_input").val(),
              cardholdername: $("#Title_USer").val(),
              cardCVC: $("#cardCVC").val(),
              cardExpiry: $("#cardExpiry").val(),
              totalamount: $("#total_amount").val(),
              email: $("#email").val(),
              cellphone: $("#cellphone").val(),
              tokenid: $("#TokenID").val(),
              urlresultok: $("#UrlResultOk").val(),
              urlresultnotok: $("#UrlResultNotOk").val(),
              clientIp: f,
              countryip: l,
              doblefactor: $("#doublefactor").val(),
              sendpay: c.SendPay,
              dataipinfofinal: "",
              Bandpay: c.SendPay,
            };
            $.ajax({
              type: "POST",
              url: "Process.asmx/ThreeDRequest",
              data: JSON.stringify(B),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              cache: !1,
              success: function (g) {
                g.d.StatusThreeD == "C"
                  ? ($("#threeDSServerTransID").val(g.d.threeDSServerTransID),
                    $("#acsTransID").val(g.d.acsTransID),
                    $("#acsURL").val(g.d.acsURL),
                    $("#payment_form").attr("action", "SecureIframe3DGeneral"),
                    $("#payment_form").submit(),
                    a.preventDefault())
                  : ((h.acsTransId = g.d.acsTransID),
                    (h.dsTransactionId = g.d.threeDSServerTransID),
                    (h.authenticationValue = g.d.authenticationValue),
                    (h.eci = g.d.eci),
                    (h.status = g.d.StatusThreeD),
                    (h.Isthreeed = "1"),
                    (h.dsTransID = g.d.dsTransID),
                    k(h));
              },
              error: function (g, I, J) {
                h.sendpay = !1;
                h.Bandpay = !1;
                k(h);
              },
            });
          }
          ActionRiskScore != 4 || t || k(n);
        }),
        m.find(".payment-errors").closest(".row").hide(),
        m.find(".payment-errors").text("")));
  });
  d = (navigator.language || navigator.userLanguage).split("-")[0];
  $.payment.cardType($("#Card_number_input").val());
  var G = m.validate({
      lang: d,
      rules: {
        cardNumber: {
          required: !0,
          cardNumber: !0,
        },
        cardExpiry: {
          required: !0,
          cardExpiry: !0,
        },
        cardCVC: {
          required: !0,
          cardCVC: !0,
        },
        email_client: {
          required: !0,
          email: !0,
        },
        cellphone: {
          required: !0,
          number: !0,
          phoneno: !0,
        },
        doublefactor: {
          required: !0,
        },
      },
      highlight: function (a) {
        $(a).closest(".form-control").removeClass("success").addClass("error");
      },
      unhighlight: function (a) {
        $(a).closest(".form-control").removeClass("error").addClass("success");
      },
      errorPlacement: function (a, b) {
        $(b).closest(".form-group").append(a);
      },
    }),
    D = (d = ""),
    E = "",
    F = "";
  $("#Title_USer").attr("placeholder", "Como aparece en su tarjeta");
  $("#cardExpiry").attr("placeholder", "MM / AA");
  $("#cardCVC").attr("placeholder", "CVV");
  $("#email").attr("placeholder", "Correo electr\u00f3nico");
  $("#cellphone").attr("placeholder", "Tel\u00e9fono");
  $("#doublefactortitle").attr(
    "placeholder",
    "Doble factor de autenticaci\u00f3n"
  );
  $("#Order").text("Referencia");
  $("#Amount").text("Monto");
  $("#tryagain_d").text("Intentar Nuevamente");
  $("#Name").text("Nombre del titular");
  $("#t_titular").text("Nombre del titular");
  $("#t_cod_security").text("CVV");
  $("#Card_number").text("N\u00famero de Tarjeta");
  $("#t_cardnumber").text("N\u00famero de Tarjeta");
  $("#Card_number_input").attr(
    "placeholder",
    "N\u00famero de tarjeta v\u00e1lida"
  );
  $("#Date_Expire").text("Fecha de expiraci\u00f3n");
  $("#t_expiration").text("Fecha Exp.");
  $("#Date_Expire_xs").text("Fecha Exp.");
  $("#Code_CVC").text("CVV");
  $("#Code_CVC_xs").text("CVV");
  $("#Email_title").text("Correo electr\u00f3nico");
  $("#Phonetitle").text("Tel\u00e9fono");
  $("#doublefactortitle").text("Doble factor de autenticaci\u00f3n");
  $("#message").text(
    "Su pago se realizar\u00e1 de forma segura con encriptaci\u00f3n TLS 1.2"
  );
  $("#message_expired").text(
    "La p\u00e1gina ha expirado, por favor intente nuevamente"
  );
  $("#name_buttom_continue").text("Continuar");
  $("#name_buttom_continue_d").text("Continuar");
  $("#name_buttom_continue_c").text("Continuar");
  d = "C\u00f3digo CVV inv\u00e1lido";
  D = "Escriba un tel\u00e9fono v\u00e1lido";
  E = "Escriba un n\u00famero de tarjeta v\u00e1lido";
  F = "Escriba una fecha v\u00e1lida.";
  $.extend($.validator.messages, {
    required: "Campo obligatorio.",
    remote: "Campo obligatorio.",
    email: "Escriba una direcci\u00f3n de correo v\u00e1lida.",
    url: "Escriba una URL v\u00e1lida.",
    date: "Escriba una fecha v\u00e1lida.",
    dateISO: "Escriba una fecha (ISO) v\u00e1lida.",
    number: "Escriba un n\u00famero v\u00e1lido.",
    digits: "Escriba s\u00f3lo d\u00edgitos.",
    creditcard: "Escriba un n\u00famero de tarjeta v\u00e1lido.",
    equalTo: "Escriba el mismo valor de nuevo.",
    extension: "Escriba un valor con una extensi\u00f3n aceptada.",
    maxlength: $.validator.format("No escriba m\u00e1s de {0} caracteres."),
    minlength: $.validator.format("No escriba menos de {0} caracteres."),
    rangelength: $.validator.format(
      "Escriba un valor entre {0} y {1} caracteres."
    ),
    range: $.validator.format("Escriba un valor entre {0} y {1}."),
    max: $.validator.format("Escriba un valor menor o igual a {0}."),
    min: $.validator.format("Escriba un valor mayor o igual a {0}."),
    nifES: "Escriba un NIF v\u00e1lido.",
    nieES: "Escriba un NIE v\u00e1lido.",
    cifES: "Escriba un CIF v\u00e1lido.",
  });
  jQuery.validator.addMethod(
    "cardNumber",
    function (a, b) {
      return this.optional(b) || $.payment.validateCardNumber(a);
    },
    E
  );
  jQuery.validator.addMethod(
    "cardExpiry",
    function (a, b) {
      a = $.payment.cardExpiryVal(a);
      return this.optional(b) || $.payment.validateCardExpiry(a.month, a.year);
    },
    F
  );
  jQuery.validator.addMethod(
    "cardCVC",
    function (a, b) {
      return $.payment.cardType($("#Card_number_input").val()) == "amex"
        ? this.optional(b) || a.length == 4
        : $.payment.cardType($("#Card_number_input").val()) != "amex"
        ? this.optional(b) || a.length == 3
        : this.optional(b) || $.payment.validateCardCVC(a);
    },
    d
  );
  $("#Card_number_input").val() == "" &&
    ($("#card_image").html("<i class='fa fa-credit-card'></i>"),
    e() == "xs" || e() == "sm"
      ? $("#imagen_ayuda").attr("src", "images/CVV_VISA_MASTER_MOBILE.png")
      : $("#imagen_ayuda").attr("src", "images/CVV_VISA_MASTER.png"));
  $("#Card_number_input").keypress(function () {
    $.payment.cardType($("#Card_number_input").val()) == "amex"
      ? ($("#card_image").html("<img src='images/american.png'/>"),
        e() == "xs" || e() == "sm"
          ? $("#imagen_ayuda").attr("src", "images/CVV_AMEX_MOBILE.png")
          : $("#imagen_ayuda").attr("src", "images/CVV_AMEX.png"))
      : ($.payment.cardType($("#Card_number_input").val()) == "visa"
          ? $("#card_image").html("<img src='images/visa.png'/>")
          : $.payment.cardType($("#Card_number_input").val()) == "mastercard"
          ? $("#card_image").html("<img src='images/master.png'/>")
          : $.payment.cardType($("#Card_number_input").val()) == "carnet"
          ? $("#card_image").html("<img src='images/carnet.png'/>")
          : $("#card_image").html("<i class='fa fa-credit-card'></i>"),
        e() == "xs" || e() == "sm"
          ? $("#imagen_ayuda").attr("src", "images/CVV_VISA_MASTER_MOBILE.png")
          : $("#imagen_ayuda").attr("src", "images/CVV_VISA_MASTER.png"));
  });
  jQuery.validator.addMethod(
    "phoneno",
    function (a, b) {
      a = a.replace(/\s+/g, "");
      return (
        this.optional(b) ||
        (a.length > 9 &&
          a.match(
            /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/
          ))
      );
    },
    D
  );
  $.myjQuery = function () {
    var a = {
      cardnumber: $("#Card_number_input").val(),
      cardholdername: $("#Title_USer").val(),
      cardCVC: $("#cardCVC").val(),
      cardExpiry: $("#cardExpiry").val(),
      totalamount: $("#total_amount").val(),
      email: $("#email").val(),
      cellphone: $("#cellphone").val(),
      tokenid: $("#TokenID").val(),
      urlresultok: $("#UrlResultOk").val(),
      urlresultnotok: $("#UrlResultNotOk").val(),
      clientIp: f,
      countryip: l,
      doblefactor: $("#doublefactor").val(),
      sendpay: "true",
      successopenpay: $("#successopenpay3d").val(),
      deviceSessionId: $("#deviceSessionId3d").val(),
      tokenopenpayid: $("#tokenopenpayid3d").val(),
      dataipinfofinal: "",
      Bandpay: "true",
      Isthreeed: "1",
    };
    k(a);
  };
  $("#continue_s").click(function () {
    q == "00" && (window.top.location.href = u);
  });
  $("#continue_d").click(function () {
    q != "00" && (window.top.location.href = u);
  });
  $("#continue_c").click(function () {
    q != "00" && (window.top.location.href = u);
  });
  $("input[name=cardNumber]").payment("formatCardNumber");
  $("input[name=cardCVC]").payment("formatCardCVC");
  $("input[name=cardExpiry]").payment("formatCardExpiry");
  var H = setInterval(function () {
    var a =
      m.find("[name=cardNumber]").hasClass("success") &&
      m.find("[name=cardExpiry]").hasClass("success") &&
      m.find("[name=cardCVC]").val().length > 1
        ? !0
        : !1;
    a && (m.find(".subscribe").prop("disabled", !1), clearInterval(H));
  }, 250);
  $("#image_help_div").hide();
  $("#help_cvv")
    .mouseover(function () {
      $("#image_help_div").stop(!0, !0).show(300);
    })
    .mouseout(function () {
      $("#image_help_div").stop(!0, !0).hide(300);
    });
});

/*------------ SHOW THE INFO -----------*/

document.addEventListener("DOMContentLoaded", function () {
  const totalAmount = sessionStorage.getItem("totalAmount");
  const codigoReferencia = sessionStorage.getItem("codigoReferencia");

  // Mostrar total
  if (totalAmount) {
    const formattedNumber = Number(totalAmount).toLocaleString("es-CR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    document.getElementById("totalamount").textContent = "₡ " + formattedNumber;
  }
  // Mostrar código de referencia
  if (codigoReferencia) {
    document.getElementById("Order_post").textContent = codigoReferencia;
  }
});

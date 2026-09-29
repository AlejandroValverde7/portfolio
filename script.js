const banderaEspaña = `<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 750 500" width="30" height="20" aria-label="Bandera de España">
  <rect width="750" height="500" fill="#c60b1e"/>
  <rect y="125" width="750" height="250" fill="#ffc400"/>
</svg>`;

const banderaReinoUnido = `<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 40" width="30" height="20" aria-label="Bandera de Reino Unido">
  <rect width="60" height="40" fill="#012169"/>
  <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" stroke-width="10"/>
  <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" stroke-width="5"/>
  <path d="M30 0 V40 M0 20 H60" stroke="#fff" stroke-width="14"/>
  <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" stroke-width="8"/>
</svg>`;

// Para texto animado en idiomas distintos
let words = {
  es: [
    "Siempre aprendiendo",
    "Full Stack Developer",
    "JavaScript | TypeScript | Vue.js",
    "PHP | Node.js",
    "Java | Mockito",
    "Codigo limpio",
  ],
  en: [
    "Always Learning",
    "Full Stack Developer",
    "JavaScript | TypeScript | Vue.js",
    "PHP | Node.js",
    "Java | Mockito",
    "Clean Code",
  ],
};

//Variables

let curLang = "es", //Idioma actual
  w = words.es, //array de palabras a mostrar
  i = 0,
  j = 0, //Indices del texto
  d = false, //Indica si borra o escribe
  el = document.getElementById("type"); //Elemento donde se mostrará el texto animado

function t() {
  // Obtenemos el texto que corresponde al índice actual.
  var s = w[i];

  // Mostramos solamente los caracteres que corresponden a la posición j.
  el.textContent = s.slice(0, j);

  // Si estamos escribiendo
  if (!d && j < s.length) {
    // Aumentamos en 1 los caracteres.
    j++;

    // Ejecutamos después de 70 milisegundos.
    setTimeout(t, 70);
  }

  // Al terminar de escribir
  else if (!d) {
    // Activamos el modo borrado.
    d = true;

    // Esperamos antes de empezar a borrar.
    setTimeout(t, 1400);
  }

  // Mientras borramos j > 0 significa que todavía quedan caracteres.
  else if (j > 0) {
    // Quitamos un carácter.
    j--;

    // Volvemos a ejecutar la función.
    setTimeout(t, 35);
  }

  // Terminamos de borrar
  else {
    // Volvemos al modo escritura.
    d = false;

    // Pasamos al siguiente texto en el array.
    i = (i + 1) % w.length;

    // Esperamos antes de empezar el siguiente texto.
    setTimeout(t, 300);
  }
}
//Activamos la animacion
t();

//Boton para cambiar de idioma
let langBtn = document.getElementById("langBtn");

// Añadimos un evento click al botón.
langBtn.addEventListener("click", function () {
  // Cambiamos el idioma actual.
  curLang = curLang === "es" ? "en" : "es";

  document.documentElement.lang = curLang;

  // Cambiar bandera
  langBtn.innerHTML = curLang === "es" ? banderaReinoUnido : banderaEspaña;

  // Cambiar texto de los elementos con data-es y data-en
  document.querySelectorAll("[data-es]").forEach(function (elx) {
    elx.textContent = elx.getAttribute("data-" + curLang);
  });

  //Botones para copiar el correo
  let cpBtn = document.getElementById("copyEmailBtn");
  let cpLabel = cpBtn.getAttribute("data-title-" + curLang);

  // Cambiar el título y el aria-label del botón
  cpBtn.title = cpLabel;
  cpBtn.setAttribute("aria-label", cpLabel);

  //Cambiar el texto animado
  w = words[curLang];
  i = 0;
  j = 0;
  d = false;
});

// Botón para volver arriba
let toTop = document.getElementById("toTop");

// Mostrar el botón cuando se hace scroll hacia abajo
window.addEventListener("scroll", function () {
  toTop.classList.toggle("show", window.scrollY > 400);
});

// Botón para copiar el correo electrónico
let copyBtn = document.getElementById("copyEmailBtn");

// Guardar el HTML del icono de copiar para restaurarlo después
let copyIconHTML = document.getElementById("copyIcon").outerHTML;

// Guardar el HTML del icono de check para mostrarlo temporalmente
let checkIconHTML =
  '<svg id="copyIcon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent2)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText("alexpatroller@gmail.com").then(function () {
    copyBtn.innerHTML = checkIconHTML;
    setTimeout(function () {
      copyBtn.innerHTML = copyIconHTML;
    }, 1500);
  });
});

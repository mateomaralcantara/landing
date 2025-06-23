const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const HTML_FILE = path.join(__dirname, "index.html");
const EXPECTED_IMAGE = "https://totalcash.xyz/images/preview.jpg";

async function verificarOpenGraph() {
  console.log(">>> Verificando archivo index.html...");

  if (!fs.existsSync(HTML_FILE)) {
    console.error("ERROR: No se encontró index.html en este directorio.");
    return;
  }

  const html = fs.readFileSync(HTML_FILE, "utf8");
  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr("content");

  if (!ogImage) {
    console.error("ERROR: No se encontró la meta tag og:image");
  } else if (ogImage !== EXPECTED_IMAGE) {
    console.warn(`ADVERTENCIA: og:image apunta a otra URL: ${ogImage}`);
  } else {
    console.log("✔ og:image está correctamente configurado.");
  }

  console.log(">>> Verificando que la imagen sea accesible en línea...");

  try {
    const response = await fetch(EXPECTED_IMAGE);
    if (!response.ok) {
      console.error(`ERROR: No se pudo acceder a la imagen. Código HTTP: ${response.status}`);
      return;
    }

    const contentType = response.headers.get("content-type") || "desconocido";
    const contentLength = parseInt(response.headers.get("content-length"), 10) || 0;

    console.log(`✔ Imagen encontrada: ${EXPECTED_IMAGE}`);
    console.log(`   Tipo: ${contentType}`);
    console.log(`   Peso: ${(contentLength / 1024).toFixed(2)} KB`);

    if (!contentType.includes("jpeg") && !contentType.includes("png")) {
      console.warn("ADVERTENCIA: La imagen no es JPEG ni PNG. Podría no mostrarse en redes sociales.");
    }

    if (contentLength > 1048576) {
      console.warn("ADVERTENCIA: La imagen pesa más de 1MB. Puede que no se cargue bien en previews.");
    }
  } catch (err) {
    console.error("ERROR: Al intentar acceder a la imagen:", err.message);
  }
}

verificarOpenGraph();

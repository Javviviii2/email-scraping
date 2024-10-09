/**
 * Funciones de expresiones regulares específicas para Fotocasa.
 */

function getFotocasaAddress(html) {
  var regex = /<a[^>]*class=".*?sizePropiedades.*?".*?>(?:<span[^>]*>.*?<\/span>)*([\w\s·,áéíóúÁÉÍÓÚ]+)<\/a>/i;
  var match = html.match(regex);
  return match ? match[1].trim() : "Dirección no encontrada";
}

function getFotocasaPrice(html) {
  var regex = /<a[^>]*class="txtPrecio"[^>]*>([\d.,]+ ?€)<\/a>/i;
  var match = html.match(regex);
  return match ? match[1].trim() : "Precio no encontrado";
}

function getFotocasaFeatures(html) {
  // Definir la expresión regular específica para las características de Fotocasa
  var regex = /(\d+)\s*habs?\s*·\s*(\d+)\s*m²\s*·\s*(\d+)\s*baños?/i;
  
  // Aplicar la expresión regular al HTML
  var match = html.match(regex);
  
  // Si se encuentra la coincidencia, construir la descripción
  if (match) {
    var habitaciones = match[1];
    var metrosCuadrados = match[2];
    var banos = match[3];

    // Construir la descripción final
    var description = `${metrosCuadrados} m², ${habitaciones} habs, ${banos} baños`;
    return description.trim();
  } else {
    return "Características no encontradas";
  }
}


function getFotocasaURL(html) {
  var regex = /<a href="(https:\/\/www.fotocasa.es\/es\/alquiler\/vivienda\/.*?)"/;
  var match = html.match(regex);
  return match ? match[1].trim() : "URL no encontrada";
}

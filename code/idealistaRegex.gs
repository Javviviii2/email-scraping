/**
 * Funciones de expresiones regulares específicas para Idealista.
 */

function getIdealistaAddress(html) {
  var regex = /<a[^>]*href="https:\/\/www\.idealista\.com\/inmueble\/[^"]*"[^>]*title="([^"]+)"/i;
  var match = html.match(regex);
  return match ? match[1].trim() : "Dirección no encontrada";
}

function getIdealistaPrice(html) {
  var regex = /<td[^>]*>(?:\s*<[^>]*>)*\s*([\d,.]+ ?€\/mes)\s*(?:<[^>]*>)*<\/td>/;
  var match = html.match(regex);
  return match ? match[1].trim() : "Precio no encontrado";
}

function getIdealistaFeatures(html) {
  // Buscar metros cuadrados
  var regexM2 = /(\d+)\s*m²/;
  var matchM2 = html.match(regexM2);
  var metrosCuadrados = matchM2 ? `${matchM2[1]} m²` : "";

  // Buscar número de habitaciones
  var regexHabitaciones = /(\d+)\s*hab\.?/i;
  var matchHabitaciones = html.match(regexHabitaciones);
  var habitaciones = matchHabitaciones ? `${matchHabitaciones[1]} habs` : "";

  // Buscar número de baños
  var regexBanos = /(\d+)\s*baños?/i;
  var matchBanos = html.match(regexBanos);
  var banos = matchBanos ? `${matchBanos[1]} baños` : "";

  // Construir la descripción final solo con los datos encontrados
  var description = [metrosCuadrados, habitaciones, banos].filter(Boolean).join(", ");
  
  return description.trim() || "Características no encontradas";
}


function getIdealistaURL(html) {
  var regex = /<a href="(https:\/\/www.idealista.com\/inmueble\/.*?)"/;
  var match = html.match(regex);
  return match ? match[1].trim() : "URL no encontrada";
}

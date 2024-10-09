/**
 * Función para extraer el HTML de un correo con la etiqueta y remitente especificado y escribirlo en un documento de Google Docs.
 * TESTING. Solo para obtener el HTML y analizar para adecuar los regex
 */
function escribirHTMLdeRemitenteEnDoc() {
  // Configuración de la etiqueta y remitente a utilizar
  var labelName = "buscar-piso"; // Nombre de la etiqueta en Gmail
  var remitente = "enviosfotocasa@fotocasa.es"; // Dirección de correo del remitente a filtrar

  // Obtener la etiqueta y los hilos de correos
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    Logger.log("No se encontró la etiqueta especificada.");
    return;
  }

  var threads = label.getThreads(); // Obtener los hilos con la etiqueta especificada
  if (threads.length === 0) {
    Logger.log("No hay correos etiquetados con '" + labelName + "'.");
    return;
  }

  // Filtrar correos solo del remitente especificado
  var foundMessage = null;
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages(); // Obtener todos los mensajes del hilo

    // Buscar el primer mensaje del remitente especificado
    for (var j = 0; j < messages.length; j++) {
      if (messages[j].getFrom().indexOf(remitente) !== -1) {
        foundMessage = messages[j];
        break;
      }
    }
    if (foundMessage) break; // Salir del bucle si se encontró un mensaje
  }

  if (!foundMessage) {
    Logger.log("No se encontraron correos del remitente: " + remitente);
    return;
  }

  // Extraer el contenido HTML del mensaje encontrado
  var htmlContent = foundMessage.getBody(); // Obtener el cuerpo HTML del correo

  // Crear un nuevo documento de Google Docs
  var doc = DocumentApp.create("Correo HTML de " + remitente);
  var body = doc.getBody();

  // Insertar el HTML como texto en el documento
  body.appendParagraph("Contenido HTML del correo del remitente: " + remitente);
  body.appendParagraph(htmlContent); // Insertar el contenido HTML en el documento

  // Guardar y mostrar el enlace al documento
  Logger.log("HTML escrito en el documento: " + doc.getUrl());
}

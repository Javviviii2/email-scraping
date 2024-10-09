
function main() {
  // Obtener email de la etiqueta buscar-piso
  var label = GmailApp.getUserLabelByName("buscar-piso");
  var threads = label.getThreads();
  var sheet = SpreadsheetApp.openById('1muP0wk9GiuO7IGYUrrfOlpjBrRIn5q6TZjUZvyt35Is').getSheetByName('pisos');


  var lastEntyRow = getLastEntyRow(sheet, [7,8,9]) // Si columnas 6, 7 u 8 están vacias, entonces poder escribir en esa línea.

  // Process each email
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages(); // [0] obtener solo 1º para test

    // Process only unread emails
    var unreadMessages = messages.filter(function(message) {
      return message.isUnread(); // Retorna true solo para mensajes no leídos
    });
    
    // ## MAIN. Process each unread email //

    for (var unreadMessage = 0; unreadMessage < unreadMessages.length; unreadMessage++){
      var message = unreadMessages[unreadMessage];
      var htmlContent = message.getBody();
      var emailFrom = message.getFrom();

      // Get email date
      var receivedDate = message.getDate(); // Devuelve un objeto Date
      var formattedDate = Utilities.formatDate(receivedDate, Session.getScriptTimeZone(), "dd-MM-yy HH:mm");
      
      var address, priceMonth, rooms, url;
      if (emailFrom.includes('fotocasa.es')){
        address = getFotocasaAddress(htmlContent);
        priceMonth = getFotocasaPrice(htmlContent);
        rooms = getFotocasaFeatures(htmlContent);
        url = getFotocasaURL(htmlContent);
      } else if (emailFrom.includes){
        address = getIdealistaAddress(htmlContent);
        priceMonth = getIdealistaPrice(htmlContent);
        rooms = getIdealistaFeatures(htmlContent);
        url = getIdealistaURL(htmlContent);
      } else {
        Logger.log("Remitente no reconocido: " + emailFrom);
        continue; // Ignorar mensajes de remitentes no reconocidos
      }
      /** 
      * Logger.log("Remitente: " + emailFrom);
      * Logger.log("Fecha email: " + formattedDate)
      * Logger.log("Calle: " + address);
      * Logger.log("Precio/mes: " + priceMonth);
      * Logger.log("Habitaciones: " + rooms);
      * Logger.log("URL: " + url);
      */

      var lastEntyRow = getLastEntyRow(sheet, [7,8,9]); // Si columnas 7, 8 o 9 están vacias, entonces poder escribir en esa línea.

      writeSheet(sheet, lastEntyRow, formattedDate, address, priceMonth, rooms, url);

      message.markRead();
    }
    //break; // Testing, process just 1
  }
}

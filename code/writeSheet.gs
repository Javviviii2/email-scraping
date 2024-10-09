/**
 * Función para escribir cada variable en una columna específica.
 *
 * @param {Object} sheet - La hoja de cálculo donde se escribe.
 * @param {string} adress - Valor de la dirección.
 * @param {string} priceMonth - Valor del precio mensual.
 * @param {string} rooms - Valor del número de habitaciones.
 * @param {string} url - URL del anuncio.
 */
function writeSheet(sheet, row, date, adress, priceMonth, rooms, url) {

  // number = colum
  sheet.getRange(row, 1).setValue(date);       // email date
  sheet.getRange(row, 3).setValue(adress);     // address
  sheet.getRange(row, 4).setValue(priceMonth); // price
  sheet.getRange(row, 6).setValue(rooms);      // features
  sheet.getRange(row, 9).setValue(url);       // url
}

/**
 * Función para obtener la última fila vacía basándose en tres columnas específicas.
 * La fila se considera vacía si las tres columnas están vacías en esa fila.
 *
 * @param {Object} sheet - La hoja de cálculo donde se va a buscar.
 * @param {Array} columnas - Array con los números de las columnas que se deben verificar (ej. [1, 2, 3] para columnas A, B y C).
 * @return {number} - El número de la fila vacía o la próxima fila disponible.
 */
function getLastEntyRow(sheet, columnas) {
  var lastRow = sheet.getLastRow(); // Última fila con contenido en cualquier columna
  var data = sheet.getRange(1, 1, lastRow, Math.max(...columnas)).getValues(); // Obtener los valores hasta la última fila en las columnas a verificar

  // Recorrer la hoja desde la última fila hacia arriba
  for (var i = data.length - 1; i >= 0; i--) {
    var filaVacia = columnas.every(function(colIndex) {
      return data[i][colIndex - 1] === '' || data[i][colIndex - 1] === null;
    });

    // Si las tres columnas están vacías, devolver esa fila como la siguiente vacía
    if (filaVacia) {
      return i + 1; // +1 porque los índices en `getValues()` comienzan en 0
    }
  }

  return lastRow + 1; // Si no encuentra ninguna fila vacía, devolver la siguiente fila disponible
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById("1iN-Smvi3GJThgX2tps6MdV5adhYXAH8-9bk5NJTXzQw");
    const sheet = ss.getSheetByName("hoja 1");

    const data = e.parameter;

    // Guardar datos en la hoja
    sheet.appendRow([
      new Date(),
      data.nombre || "Sin nombre",
      data.email || "Sin email",
      data.mensaje || "Sin mensaje"
    ]);

    // Responder rápido sin enviar email aquí
    return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message).setMimeType(ContentService.MimeType.TEXT);
  }
}


function sendEmailOnNewRow(e) {
  try {
    const sheet = e.source.getSheetByName("hoja 1");
    const lastRow = sheet.getLastRow();
    const rowData = sheet.getRange(lastRow, 1, 1, 4).getValues()[0];

    const fecha = rowData[0];
    const nombre = rowData[1];
    const email = rowData[2];
    const mensaje = rowData[3];

    MailApp.sendEmail({
      to: "kevineluna94@gmail.com",
      subject: "Nuevo mensaje desde portfolio",
      htmlBody: `<p><strong>Fecha:</strong> ${fecha}</p>
                 <p><strong>Nombre:</strong> ${nombre}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Mensaje:</strong><br>${mensaje}</p>`
    });
  } catch (error) {
    Logger.log("Error al enviar email: " + error.message);
  }
}

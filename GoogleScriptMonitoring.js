function doPost(e) {
  // Buka sheet
  // google spreadsheet
  let sheetUrl = `https://docs.google.com/spreadsheets/d/1k364O3WgbtFMs8wV4BH2lIofUBnPqnzyoMG8mnDMosg/edit?gid=1731109526#gid=1731109526`;
  let file = SpreadsheetApp.openByUrl(sheetUrl);

  // nama worksheet
  let sheet = file.getSheetByName("Boredpile");

  let data = JSON.parse(e.postData.contents);
  let sender = data.senderName;
  let message = data.senderMessage;

  // Mengurai isi pesan
  let parsedMessage = message.split("#");
  // ['bp', 'sta 50+400', '10/12/2024', '5', '6', '7', '210', 'galian']

  let lokasiPekerjaan = parsedMessage[1].trim().toLocaleLowerCase();
  let tanggalPekerjaan = parsedMessage[2].trim();
  let panjangPekerjaan = parsedMessage[3].trim();
  let lebarPekerjaan = parsedMessage[4].trim();
  let tinggiPekerjaan = parsedMessage[5].trim();
  let volumePekerjaan = parsedMessage[6].trim();
  let keteranganPekerjaan = parsedMessage[7].trim().slice(0, -1);

  // Membuat ID
  let row = sheet.getLastRow() + 1;

  // Insert data
  sheet.getRange(`A${row}`).setValue(lokasiPekerjaan);
  sheet.getRange(`B${row}`).setValue(tanggalPekerjaan);
  sheet.getRange(`C${row}`).setValue(panjangPekerjaan);
  sheet.getRange(`D${row}`).setValue(lebarPekerjaan);
  sheet.getRange(`E${row}`).setValue(tinggiPekerjaan);
  sheet.getRange(`F${row}`).setValue(volumePekerjaan);
  sheet.getRange(`G${row}`).setValue(keteranganPekerjaan);

  // Respon
  let response = {
    data: [
      {
        message: `Terima kasih ${sender} telah melakukan penginputan data.`,
      },
    ],
  };

  return ContentService.createTextOutput(JSON.stringify(response));
}

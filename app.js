const canvas = document.getElementById('signature');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function generateQR() {
  const file = document.getElementById('fileUpload').files[0];
  if (!file) {
    alert("Pilih file PDF terlebih dahulu!");
    return;
  }

  const repoUrl = "https://raw.githubusercontent.com/ryanarifw/tanda-tangan-barcode/main/uploads/";
  const fullUrl = repoUrl + encodeURIComponent(file.name);

  QRCode.toCanvas(document.getElementById('qrcode'), fullUrl, error => {
    if (error) console.error(error);
    else console.log("QR Code berhasil dibuat!");
  });

  alert("Upload file PDF ke folder 'uploads' di GitHub Anda dengan nama yang sama.");
}

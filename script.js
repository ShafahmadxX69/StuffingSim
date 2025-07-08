function simulateStuffing() {
  const L = +document.getElementById("length").value;
  const W = +document.getElementById("width").value;
  const H = +document.getElementById("height").value;
  const Q = +document.getElementById("quantity").value;

  const containerL = 1200; // cm (40ft ~12m)
  const containerW = 230;
  const containerH = 230;

  const volItem = (L * W * H) / 1e6; // m³
  const volContainer = (containerL * containerW * containerH) / 1e6; // m³

  const maxFitLength = Math.floor(containerL / L);
  const maxFitWidth = Math.floor(containerW / W);
  const maxFitHeight = Math.floor(containerH / H);
  const maxPerLayer = maxFitLength * maxFitWidth;
  const maxTotal = maxPerLayer * maxFitHeight;

  const used = Math.min(Q, maxTotal);
  const unused = Q - used;

  const resultHTML = `
    <strong>Item Volume:</strong> ${volItem.toFixed(3)} m³<br/>
    <strong>Container Volume:</strong> ${volContainer.toFixed(3)} m³<br/>
    <strong>Max per Layer:</strong> ${maxPerLayer}<br/>
    <strong>Max Total in Container:</strong> ${maxTotal}<br/>
    <strong>Used in Simulation:</strong> ${used}<br/>
    <strong>Unused:</strong> ${unused}<br/>
  `;
  document.getElementById("result").innerHTML = resultHTML;

  // Drawing
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const scale = canvas.width / containerL;
  const boxW = L * scale;
  const boxH = H * scale * 0.5;
  let count = 0;
  let y = 0;

  for (let i = 0; i < maxFitHeight; i++) {
    for (let j = 0; j < maxFitWidth; j++) {
      for (let k = 0; k < maxFitLength; k++) {
        if (count >= used) return;
        ctx.fillStyle = `rgba(0, 123, 255, 0.7)`;
        ctx.fillRect(k * boxW, y, boxW - 2, boxH - 2);
        count++;
      }
    }
    y += boxH;
  }
}

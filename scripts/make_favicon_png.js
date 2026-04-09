const fs = require('fs');
const zlib = require('zlib');
const WIDTH = 64;
const HEIGHT = 64;
const rows = [];

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (~c) >>> 0;
}

for (let y = 0; y < HEIGHT; y++) {
  const row = Buffer.alloc(WIDTH * 4);
  for (let x = 0; x < WIDTH; x++) {
    const dx = x - WIDTH / 2 + 0.5;
    const dy = y - HEIGHT / 2 + 0.5;
    const d = Math.sqrt(dx * dx + dy * dy);
    let r = 0, g = 0, b = 0, a = 0;
    if (d < 4) {
      r = 15; g = 23; b = 42; a = 255;
    } else if (d < 16) {
      r = 255; g = 219; b = 0; a = 255;
    } else if (d < 30) {
      r = 255; g = 45; b = 149; a = 255;
    } else if (d < 44) {
      r = 0; g = 188; b = 212; a = 255;
    }
    const idx = x * 4;
    row[idx] = r;
    row[idx + 1] = g;
    row[idx + 2] = b;
    row[idx + 3] = a;
  }
  rows.push(Buffer.concat([Buffer.from([0]), row]));
}

const rawData = Buffer.concat(rows);
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type), data])), 0);
  return Buffer.concat([len, Buffer.from(type), data, crc]);
}

const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(WIDTH, 0);
ihdr.writeUInt32BE(HEIGHT, 4);
ihdr[8] = 8;
ihdr[9] = 6;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;
const png = Buffer.concat([header, chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(rawData)), chunk('IEND', Buffer.alloc(0))]);
fs.writeFileSync('public/favicon.png', png);
console.log('favicon.png written');

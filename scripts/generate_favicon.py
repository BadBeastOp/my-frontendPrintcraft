import zlib
import struct

WIDTH = 64
HEIGHT = 64

# Build RGBA pixels for a rings icon
pixels = []
for y in range(HEIGHT):
    row = []
    for x in range(WIDTH):
        dx = x - WIDTH // 2
        dy = y - HEIGHT // 2
        d = (dx * dx + dy * dy) ** 0.5
        if 20 <= d < 28:
            row.extend((0, 188, 212, 255))
        elif 14 <= d < 20:
            row.extend((255, 45, 149, 255))
        elif 8 <= d < 14:
            row.extend((255, 219, 0, 255))
        elif d < 4:
            row.extend((15, 23, 42, 255))
        else:
            row.extend((0, 0, 0, 0))
    pixels.append(bytes(row))

raw_data = b""
for row in pixels:
    raw_data += b"\x00" + row

png = b"\x89PNG\r\n\x1a\n"

def chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

png += chunk(b'IHDR', struct.pack('>IIBBBBB', WIDTH, HEIGHT, 8, 6, 0, 0, 0))
png += chunk(b'IDAT', zlib.compress(raw_data, level=9))
png += chunk(b'IEND', b'')

with open('public/favicon.png', 'wb') as f:
    f.write(png)
print('favicon.png created')

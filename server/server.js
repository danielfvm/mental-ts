const http = require("http");

const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef";
const BASE64 = "ghijklmnopqrstuvwxyz0123456789+/";
const COLORS = 4;

const canvas = Array(32 * 32).fill(0);
const host = 'localhost';
const port = 8000;

const encode = (canvas) => {
    let data = "";
    for (let i = 0; i < canvas.length; i++)
        data += BASE32[canvas[i]];

    let compressed = "";
    let count = 0;
    for (let i = 0; i < data.length - 1; i += 1) {
        const a = data.charAt(i);
        const b = data.charAt(i + 1);

        if (a == b && count < 31) {
            count++;
        } else {
            if (count != 0) {
                compressed += BASE64[count] + "" + a;
            } else {
                compressed += a;
            }
            count = 0;
        }
    }

    if (count != 0) {
        compressed += count + "" + data.charAt(data.length - 1);
    } else {
        compressed += data.charAt(data.length - 1);
    }

    return compressed;
};

const requestListener = (req, res) => {
    // get ip from req
    const ip = req.socket.remoteAddress;
    console.log(`Client IP: ${ip}`);

    // get path
    const path = req.url;
    console.log(`Path: ${path}`);

    const values = path.split("/");

    if (values.length == 3) {
        const place = parseInt(values[1]);
        const color = parseInt(values[2]);
        if (place >= 0 && place < canvas.length && color >= 0 && color < COLORS) {
            canvas[place] = color;
        }
    }

	res.setHeader("Content-Type", "text/plain");
	res.writeHead(200);
    res.end(encode(canvas));
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

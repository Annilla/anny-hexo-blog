import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const outputDirectory = resolve(".output/public");
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";
const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".wasm", "application/wasm"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error("PORT 必須是 0 到 65535 之間的整數。");
}

try {
  const outputStats = await stat(outputDirectory);
  if (!outputStats.isDirectory()) {
    throw new Error(`${outputDirectory} 不是資料夾。`);
  }
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(`找不到靜態輸出 ${outputDirectory}，請先執行 npm run generate。`);
  } else {
    console.error(`無法讀取靜態輸出 ${outputDirectory}。`, error);
  }
  process.exitCode = 1;
  process.exit();
}

function sendText(response, statusCode, message, headers = {}) {
  const body = Buffer.from(`${message}\n`);
  response.writeHead(statusCode, {
    "content-length": body.byteLength,
    "content-type": "text/plain; charset=utf-8",
    "x-content-type-options": "nosniff",
    ...headers,
  });
  response.end(body);
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "不支援此 HTTP 方法。", { allow: "GET, HEAD" });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url ?? "/", "http://localhost").pathname,
    );
  } catch {
    sendText(response, 400, "網址格式不正確。");
    return;
  }

  const requestedPath = resolve(outputDirectory, `.${pathname}`);
  if (
    requestedPath !== outputDirectory &&
    !requestedPath.startsWith(`${outputDirectory}${sep}`)
  ) {
    sendText(response, 404, "找不到頁面。");
    return;
  }

  const candidates = pathname.endsWith("/")
    ? [resolve(requestedPath, "index.html")]
    : [requestedPath, resolve(requestedPath, "index.html")];
  let filePath;
  let fileStats;

  for (const candidate of candidates) {
    try {
      const candidateStats = await stat(candidate);
      if (candidateStats.isFile()) {
        filePath = candidate;
        fileStats = candidateStats;
        break;
      }
    } catch (error) {
      if (error.code !== "ENOENT" && error.code !== "ENOTDIR") {
        console.error(`讀取靜態檔案失敗：${candidate}`, error);
        sendText(response, 500, "讀取靜態檔案失敗。");
        return;
      }
    }
  }

  if (!filePath || !fileStats) {
    sendText(response, 404, "找不到頁面。");
    return;
  }

  response.writeHead(200, {
    "content-length": fileStats.size,
    "content-type":
      contentTypes.get(extname(filePath).toLowerCase()) ??
      "application/octet-stream",
    "x-content-type-options": "nosniff",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  const stream = createReadStream(filePath);
  stream.on("error", (error) => {
    console.error(`傳送靜態檔案失敗：${filePath}`, error);
    if (response.headersSent) {
      response.destroy(error);
      return;
    }
    sendText(response, 500, "傳送靜態檔案失敗。");
  });
  stream.pipe(response);
});

server.on("error", (error) => {
  console.error("無法啟動靜態預覽伺服器。", error);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("無法取得靜態預覽伺服器連接埠。");
  }
  console.log(`靜態預覽網址：http://${host}:${address.port}`);
});

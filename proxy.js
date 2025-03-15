const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

// Enable CORS for the proxy server
app.use(cors({
    origin: "http://127.0.0.1:8080", // Allow requests from your frontend
    methods: ["GET", "POST"],       // Specify allowed HTTP methods
}));

app.use(
    "/api",
    createProxyMiddleware({
        target: "https://api.silentwolf.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // Remove '/api' from the proxied request
        onProxyRes: (proxyRes) => {
            // Add CORS headers to the response
            proxyRes.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:8080";
            proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST";
            proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type";
        }
    })
);

app.listen(3000, () => {
    console.log("Proxy server running on http://localhost:3000");
});

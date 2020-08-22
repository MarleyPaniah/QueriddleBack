"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
let ChatServer = /** @class */ (() => {
    class ChatServer {
        constructor() {
            this.createApp();
            this.config();
            this.createServer();
            this.sockets();
            this.listen();
        }
        createApp() {
            this.app = express_1.default();
            this.app.use(cors_1.default());
        }
        createServer() {
            this.server = http.createServer(this.app);
        }
        config() {
            this.port = process.env.PORT || ChatServer.PORT;
        }
        sockets() {
            this.io = require("socket.io").listen(this.server, { origins: '*:*' });
        }
        listen() {
            this.server.listen(this.port, () => {
                console.log("Running server on port %s", this.port);
            });
            this.io.on("connect", (socket) => {
                console.log("Connected client on port %s.", this.port);
                socket.on("message", (m) => {
                    console.log("[server](message): %s", JSON.stringify(m));
                    this.io.emit("message", m);
                });
                socket.on("disconnect", () => {
                    console.log("Client disconnected");
                });
            });
        }
        getApp() {
            return this.app;
        }
    }
    ChatServer.PORT = 8080;
    return ChatServer;
})();
exports.ChatServer = ChatServer;

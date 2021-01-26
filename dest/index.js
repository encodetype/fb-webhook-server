"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
async function main() {
    const app = express_1.default();
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.get('/', (req, res) => {
        res.sendStatus(200);
    });
    app.get('/webhook', (req, res) => {
        console.log(req.query);
        res.status(200).send(req.query['hub.challenge']);
    });
    app.post('/webhook', (req, res) => {
        console.log(req.body);
        console.log(req.body.entry);
        res.status(200).json(req.body);
    });
    app.get('/verify', (req, res) => {
        console.log(req.query);
        res.status(200).json({
            status: 'ok'
        });
    });
    app.listen(config_1.APP_PORT, () => {
        console.log('Server running : ' + config_1.APP_PORT);
    });
}
main();

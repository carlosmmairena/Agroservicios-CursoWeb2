import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import ROUTER from "./routes";

const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {

    // create express app
    const app = express();
    
    // middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    // routes
    app.use("/api", ROUTER);

    // start express server
    app.listen(PORT);

    console.log(`The server has started on port ${PORT}. Open http://localhost:${PORT}/api/login`);

}).catch(error => console.log(error));

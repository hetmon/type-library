"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const library_service_1 = require("../library-system/library.service");
const router = (0, express_1.Router)();
router.post("/add-book", (req, res) => {
    req.accepts("application/json");
    const response = (0, library_service_1.addNewBook)(req);
    if (response.httpStatus === 400) {
        res.status(400).send(response);
        console.log("Make book was not successful");
    }
    res.status(201).send(response);
    console.log("Make book was successful");
});
router.put("/update-book/:id", (req, res) => {
    req.accepts("application/json");
    const response = (0, library_service_1.updateBook)(req);
    if (response.httpStatus === 400) {
        res.status(400).send(response);
        console.log("Update book was not successful");
    }
    res.status(200).send(response);
    console.log("Update book was successful");
});
exports.default = router;
//# sourceMappingURL=library.routes.js.map
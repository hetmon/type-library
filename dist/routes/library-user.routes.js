"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/user", (req, rep) => {
    console.log(req.accepts("application/json"));
    rep.send("hello user");
});
router.get("/user/vmi", (req, rep) => {
    console.log(req.accepts("application/json"));
    rep.send("hello user vmi");
});
exports.default = router;
//# sourceMappingURL=library-user.routes.js.map
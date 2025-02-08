import { Router } from "express";

const router = Router();

router.get("/user", (req, rep) => {
    console.log(req.accepts("application/json"));
    rep.send("hello user");
});

router.get("/user/vmi", (req, rep) => {
    console.log(req.accepts("application/json"));
    rep.send("hello user vmi");
});

export default router;
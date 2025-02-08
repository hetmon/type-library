import { Router } from "express";
import { addNewBook, updateBook } from "../library-system/library.service";

const router = Router();

router.post("/add-book", (req, res) => {
    req.accepts("application/json");
    const response = addNewBook(req);
    if (response.httpStatus === 400) {
        res.status(400).send(response);
        console.log("Make book was not successful")
    }
    res.status(201).send(response);
    console.log("Make book was successful")
});

router.put("/update-book/:id", (req, res) => {
    req.accepts("application/json");
    const response = updateBook(req);
    if (response.httpStatus === 400) {
        res.status(400).send(response);
        console.log("Update book was not successful")
    }
    res.status(200).send(response);
    console.log("Update book was successful")
});




export default router;
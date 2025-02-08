const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const libraryRoutes = require("./routes/library.routes").default;
const libraryUserRoutes = require("./routes/library-user.routes").default;


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/api/library", libraryRoutes);
app.use("/api/library-user", libraryUserRoutes);

app.listen(PORT, () => {
    console.log(`✅ Szerver fut: http://localhost:${PORT}`);
});
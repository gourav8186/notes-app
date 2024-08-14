const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.use(authRoutes);
app.use(noteRoutes);

app.get("/", (req, res) => {
    res.json({ data: "Hello" });
});

module.exports = app;

const express = require("express");

const app = express();

// const config server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at port:${PORT}`));

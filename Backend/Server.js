const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const taskRoutes = require('./routes/taskRoutes')

app.use((req,res,next) => {
    console.log("path " + req.path + "method" + req.method);
});

app.use(express.json());

// app.get("/",(req,res) => {
//     res.send("Hello word");
// });

//db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected Successfully listening to " + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

  app.use("/api/tasks",taskRoutes)

const express =  require("express");
const fileUpload =  require("express-fileUpload");
const UserRoute =  require("./routes/userRoute");
const cors =  require("cors");
const dotenv =  require("dotenv");
// const  dbConnect  = require ("./config/db");

dotenv.config();
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(fileUpload({
    createParentPath: true
}));
// dbConnect()
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/userapi", UserRoute());

app.get("/", (req, res) => {
  res.send({
    code: 200,
  });
});
app.listen(process.env.PORT || 3001, () => {
  console.log(`Listning ${process.env.PORT}`);
});
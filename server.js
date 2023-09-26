const express = require("express");
const app = express();
const User = require("./model/userSchema");
const Message = require("./model/messageSchema");
const bodyParser = require("body-parser");
const router = express.Router();
require("./db");
app.use(bodyParser.json());
// const PORT = process.env.PORT
app.listen(8080, () => {
  console.log("Server Started at port no. 8080");
});
app.get("/", (req, res) => {
  res.send("Hello Jee Kaise ho");
});
// app.post('/cars/apis',(req,res)=>{
//     const{name,model} = req.body
//     console.log(name)
//     console.log(model);
//     res.send("Successfull")
// })
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  if (!name || !email || !password) {
    return res.status(422).json({ message: "Plz fill all the data" });
  } else {
    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(422).json({ message: "email already exits" });
      } else {
        const user = new User({ name, email, password });
        let result = await user.save();
        console.log("Successfully Created");
        return res
          .status(200)
          .json({
            message: "register successfully",
            status: 200,
            result: result,
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(name);
  console.log(email);
  console.log(password);
  res.send("Successfully Created");
});
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data properly" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      // const isMatchUser = await compare(password, userLogin.password);
      const isMatchUser = password === userLogin.password;
      if (!isMatchUser) {
        res.status(400).json({ message: "Invalid Credientials" });
      } else {
        return res.status(200).json({
          message: "user Signin successfully",
          status: 200,
          user: userLogin,
        });
      }
    } else {
      res.status(400).json({ message: "Invalid Email" });
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/getlist", async (req, res) => {
  try {
    let users = [];
    for (let i = 0; i < User.length; i++) {
      const userdetails = await User.find({});
      let user = { name: userdetails[i].name, email: userdetails[i].email };
      users.push(user);
    }
    console.log(users);
    res.send("Successfully get all user list");
  } catch (err) {
    console.log(err);
  }
});
app.post("/sendmsg", async (req, res) => {
  try {
    const { fromemail, toemail, message } = req.body;
    if (!toemail || !fromemail) {
      return res.status(400).json({ error: "please fill the emailId" });
    }
    const findUserTo = await User.findOne({ email: toemail });
    const findUserFrom = await User.findOne({ email: fromemail });
    if (!findUserTo || !findUserFrom) {
      res.status(400).json({ message: "Invalid Email" });
    } else {
      const msg = new Message({
        msg_to: findUserTo,
        msg: message,
        msg_from: findUserFrom,
      });
      await msg.save();
      console.log("Message send successfully");
      return res.status(200).json({ message: "Message send successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/recvmsg", async (req, res) => {
  try {
    let messages=[]
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "please fill the emailId" });
    }
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      res.status(400).json({ message: "Invalid Email" });
    } else {
        const x  = await Message.count();
        console.log(x)
        console.log(findUser.email)
    //   for (let i = 0; i < Message.length; i++) {
        const msgdetails = await Message.find({msg_to:findUser.id});
        console.log(msgdetails)
        for(var i = 0;i<msgdetails.length;i++){
            let msg = { message: msgdetails[i].msg };
            
        messages.push(msg);

        }
        
        // console.log(msg)
      console.log("Message get successfully");
      console.log(messages)
      return res.status(200).json({ message: "Message get successfully",messages });
    }
  } catch (err) {
    console.log(err);
  }
});

const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendEmail = async (email, uniqueString) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "userMindhubMailTemp@gmail.com",
      pass: "mindhubvillagra",
    },
  });

  let sender = "userMindhubMailTemp@gmail.com";
  let mailOptions = {
    from: sender,
    to: email,
    subject: "User verification ",
    html: `
        <div >
        <h1 style="color:red">Press <a href=http://localhost:4000/api/verify/${uniqueString}>here</a> to verify your email </h1>
        </div>
        `,
  };
  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent");
    }
  });
};

const usersControllers = {
  verifyEmail: async (req, res) => {
    const { uniqueString } = req.params;

    const user = await User.findOne({ uniqueString: uniqueString });
    console.log(user)
    if (user) {
      user.verifiedEmail = true;
      await user.save();
      res.redirect("http://localhost:3000/SignIn");
      return  res.json({success:true, response:"Your email has been verified successfully"})
    } else {
      res.json({ success: false, response: "Your email has not been verified" });
    }
  },

  signUpUsers: async (req, res) => {
    console.log(req.body);
    let { name, lastName, email, password, from, country } = req.body.userData;
    const test = req.body.test;

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        console.log(userExist.from.indexOf(from));
        if (userExist.from.indexOf(from) !== -1) {
          console.log(
            "if result" + (userExist.from.indexOf(from) !== 0)
          );
          res.json({
            success: false,
            from: "signup",
            message:
              "You have already made your sign up in this way, please sign in",
          });
        } else {
          const hashedPassword = bcryptjs.hashSync(password, 10);

          userExist.from.push(from);
          userExist.password.push(hashedPassword);
          if (from === "form-Signup") {
            userExist.uniqueString = crypto.randomBytes(15).toString("hex");
            await userExist.save();
            await sendEmail(email, userExist.uniqueString);
            res.json({
              success: true,
              from: "signup",
              message:
                "We sent you an email to validate it, please check your box to complete the sign up and add it to your sign in methods ",
            });
          } else {
            userExist.save();

            res.json({
              success: true,
              from: "signup",
              message:
                "We add " + from + " to your methods to do a sign in",
            });
          }
        }
      } else {
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await new User({
          name,
          lastName,
          email,
          password: [hashedPassword],
          uniqueString: crypto.randomBytes(15).toString("hex"),
          verifiedEmail: false,
          from: [from],
          country,
        });
        if (from !== "form-Signup") {
          await newUser.save();
          res.json({
            success: true,
            from: "signup",
            message: "Congratulations, your user has been created with " + from,
          });
        } else {
          await newUser.save();
          await sendEmail(email, newUser.uniqueString);
          res.json({
            success: true,
            from: "siggup",
            message:
              "We sent you an email to validate it, please check your box to complete the sign up",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    try {
      const userExist = await User.findOne({ email });
      console.log(userExist.from);
      console.log(from);
      const indexpass = userExist.from.indexOf(from);
      console.log(userExist.password[indexpass]);

      if (!userExist) {
        res.json({
          success: false,
          message: "Your user have not been registered, please sign up",
        });
      } else {
        if (from !== "form-Signup") {
          let passwordMatch = userExist.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );

          if (passwordMatch.length > 0) {
            const userData = {
              id: userExist._id,
              name: userExist.name,
              lastName: userExist.lastName,
              email: userExist.email,
              from: from,
            };
            await userExist.save();

            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24,
            });

            res.json({
              success: true,
              from: from,
              response: { token, userData },
              message: "Welcome Again " + userData.name,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You did'nt registered with " +
                from +
                "if you want to sign in whith this method, you have to sign up with " +
                from,
            });
          }
        } else {
          if (userExist.verifiedEmail) {
            let passwordMatch = userExist.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );
            console.log(passwordMatch);
            console.log(
              "Password Result" +
                (passwordMatch.length > 0)
            );
            if (passwordMatch.length > 0) {
              const userData = {
                id: userExist._id,
                name: userExist.name,
                lastName: userExist.lastName,
                email: userExist.email,
                from: from,
              };
              const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                expiresIn: 60 * 60 * 24,
              });
              res.json({
                success: true,
                from: from,
                response: { token, userData },
                message: "Welcome again " + userData.name,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "The user or password does'nt match",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You have not verified your email, please check your email box to complete your sign up",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong try again in a few minutes",
      });
    }
  },
  signOutUser: async (req, res) => {
    const email = req.body.closeuser;
    const user = await User.findOne({ email });
    await user.save();
    res.json(console.log("loged out" + email));
  },
  verifyToken: (req, res) => {
    console.log(req.user);
    if (!req.err) {
      res.json({
        success: true,
        response: {
          id: req.user.id,
          name: req.user.name,
          lastName: req.user.lastName,
          email: req.user.email,
          from: "token",
        },
        message: "Welcome again " + req.user.name,
      });
    } else {
      res.json({
        success: false,
        message: "please sign in again",
      });
    }
  },
};
module.exports = usersControllers;

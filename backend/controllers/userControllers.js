const User = require("../models/usersModel");
const bcryptjs = require("bcryptjs");

const usersControllers = {
  signUpUsers: async (req, res) => {
    let { firstName, lastName, email, password, from } = req.body.userData;

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        console.log(userExist.from.indexOf(from));
        if (userExist.from.indexOf(from) === 0) {
          res.json({
            success: false,
            from: "signup",
            message:
              "You already made your sing up in this way, please sign in",
          });
        } else {
          const hashedPassword = bcryptjs.hashSync(password, 10);
          userExist.from.push(from);
          userExist.password.push(hashedPassword);
          if (from === "form-Signup") {
            await userExist.save();

            res.json({
              success: true,
              from: "signup",
              message:
                "We sent you an email to validate it, please check your box to complete the sign up and add it to your Sign in methods ",
            });
          } else {
            userExist.save();

            res.json({
              success: true,
              from: "signup",
              message:
                "We add " + from + " we add an image to your media to sign in",
            });
          }
        }
      } else {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = await new User({
          firstName,
          lastName,
          email,
          password: [hashedPassword],
          verifiedEmail: true,
          from: [from],
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

          res.json({
            success: true,
            from: "signup",
            message:
              "We sent you an email to validate it, please check your email to complete the signUp",
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong, try again in a few minutes",
      });
    }
  },
  signInUser: async (req, res) => {
    const { email, password, from } = req.body.logedUser;
    try {
      const userExist = await User.findOne({ email });

      if (!userExist) {
        res.json({
          success: false,
          message: "Your user has'nt been registered, please sign in",
        });
      } else {
        if (from !== "form-Signin") {
          let passwordMatch = userExist.password.filter((pass) =>
            bcryptjs.compareSync(password, pass)
          );

          if (passwordMatch.length > 0) {
            const userData = {
              firstName: userExist.firstName,
              lastName: userExist.lastName,
              email: userExist.email,
              from: userExist.from,
            };
            await userExist.save();

            res.json({
              success: true,
              from: from,
              response: { userData },
              message:
                "Welcome again " + userData.firstName + userData.lastName,
            });
          } else {
            res.json({
              success: false,
              from: from,
              message:
                "You did'nt register " +
                from +
                "if you want to sing up this way, sign up with " +
                from,
            });
          }
        } else {
          if (userExist.verifiedEmail) {
            let passwordMatch = userExist.password.filter((pass) =>
              bcryptjs.compareSync(password, pass)
            );
            if (passwordMatch.length > 0) {
              const userData = {
                firstName: userExist.firstName,
                lastName: userExist.lastName,
                email: userExist.email,
                from: userExist.from,
              };

              res.json({
                success: true,
                from: from,
                response: { userData },
                message:
                  "Welcome again " + userData.firstName + userData.lastName,
              });
            } else {
              res.json({
                success: false,
                from: from,
                message: "User or Password dont match",
              });
            }
          } else {
            res.json({
              success: false,
              from: from,
              message: "You did'nt verified your mail, please do it to sign up",
            });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong, try again in a few minutes",
      });
    }
  },
  signOutUser: async (req, res) => {
    const email = req.body.closeuser;
    const user = await User.findOne({ email });
    await user.save();
    res.json(console.log("Signed out " + email));
  },
};
module.exports = usersControllers;

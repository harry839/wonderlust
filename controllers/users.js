import User from "../models/user.js"; 

const signUpForm = (req, res) => {
  res.render("users/singup.ejs");
};

const signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    //can print registeredUser for checking purpose
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User Registered Successfully, Welcome!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/user/signup");
  }
};

const loginForm = (req, res) => {
  res.render("users/login.ejs");
};

const login = async (req, res) => {
  try {
    req.flash("success", "Welcome to Wonderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/user/login");
  }
};

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out Successfully!");
    res.redirect("/listings");
  });
};

export { signUpForm, signUp, loginForm, login, logOut };

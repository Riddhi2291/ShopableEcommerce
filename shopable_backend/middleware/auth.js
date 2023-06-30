const firebaseAdmin =  require("../services/firebase.js");

exports.authCheck = async(req, res, next) => {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];
console.log('firebaseToken......', firebaseToken)
    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      // Unauthorized
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const usersCollection = req.app.locals.db.collection("user");

    const user = await usersCollection.findOne({
      firebaseId: firebaseUser.user_id
    });

    if (!user) {
      // Unauthorized
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    //Unauthorized
    res.status(401).json({
      error: "Unauthorized",
    });
  }
}
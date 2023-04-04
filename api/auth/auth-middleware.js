const model = require("../users/users-model");
const bcrypt = require("bcryptjs");

/*
  Kullanıcının sunucuda kayıtlı bir oturumu yoksa

  status: 401
  {
    "message": "Geçemezsiniz!"
  }
*/
function sinirli(req, res, next) {
  try {
    if (req.session && req.session.user_id) {
      next();
    } else {
      next({
        status: 401,
        message: "Geçemezsiniz!",
      });
    }
  } catch (error) {
    next(error);
  }
}

/*
  req.body de verilen username halihazırda veritabanında varsa

  status: 422
  {
    "message": "Username kullaniliyor"
  }
*/
async function usernameBostami(req, res, next) {
  //burası kayıt olurken kullanılır. uniq olması gerekir.
  try {
    let isExistUser = await userModel.goreBul({ username: req.body.username });
    if (isExistUser && isExistUser.length) {
      next({
        status: 422,
        message: "Username kullaniliyor",
      });
    } else {
      req.body.password = bcrypt.hashSync(req.body.password);
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
  req.body de verilen username veritabanında yoksa

  status: 401
  {
    "message": "Geçersiz kriter"
  }
*/
async function usernameVarmi(req, res, next) {
  try {
    let isExistUser = await userModel.goreBul({ username: req.body.username });
    if (!isExistUser || isExistUser.length == 0) {
      next({
        status: 401,
        message: "Geçersiz kriter",
      });
    } else {
      req.ExistUsers = isExistUser[0];
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
  req.body de şifre yoksa veya 3 karakterden azsa

  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
*/
async function sifreGecerlimi(req, res, next) {
  try {
    let { password } = req.body;
    if (!password || password.length < 3) {
      next({
        status: 422,
        message: "Şifre 3 karakterden fazla olmalı",
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.

module.exports = {
  usernameVarmi,
  usernameBostami,
  sifreGecerlimi,
  sinirli,
};

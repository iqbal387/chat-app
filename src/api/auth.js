const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation/auth");
const { secretOrKey } = require("../config/keys");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/test", (req, res) =>
  res.json({
    message: "Auth api is works",
  })
);

router.post("/register", async (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { email, password, fullName, profilePic } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const response = await prisma.user.create({
      data: {
        email,
        password: hash,
        fullName,
        profilePic,
      },
    });

    if (!response) throw null;

    res.json({ register: "Register sukses" });
  } catch (error) {
    console.log(error);
    if (error) {
      if (error.code === "P2002") {
        errors.email = "Email sudah terdaftar";
        return res.status(400).json(errors);
      }

      return res.status(404).json({ error });
    }

    res.status(404).json({ error: { message: "Server error" } });
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = loginValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      errors.email = "Email tidak terdaftar";
      return res.status(400).json(errors);
    }

    const { id: userId, password: userPassword } = user;

    await bcrypt.compare(password, userPassword).then((isMatch) => {
      if (!isMatch) {
        errors.password = "Password tidak sesuai";
        return res.status(400).json(errors);
      }
    });

    const token = jwt.sign({ id: userId }, secretOrKey, { expiresIn: "365d" });

    // save token to database
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token,
      },
    });

    if (!response) throw null;

    res.cookie("token", token, { httpOnly: true });
    res.json({ success: true, token: `Bearer ${token}` });
  } catch (error) {
    if (error) {
      return res.status(404).json({ error });
    }

    res.status(404).json({ error: { message: "Server error" } });
  }
});

router.post("/logout", async (req, res) => {
  const token = req?.cookies?.token || null;

  try {
    const user = await prisma.user.update({
      where: {
        token,
      },
      data: {
        token: null,
      },
    });

    if (!user) {
      throw null;
    }

    res.clearCookie("token");
    res.json({ success: true });
  } catch (error) {
    if (error) {
      return res.status(404).json({ error });
    }

    res.status(404).json({ error: { message: "Server error" } });
  }
});

module.exports = router;

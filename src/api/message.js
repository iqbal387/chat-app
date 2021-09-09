const express = require("express");
const { PrismaClient } = require("@prisma/client");
const Pusher = require("pusher");

const { isTokenValid } = require("../validation/auth");

const pusher = new Pusher({
  appId: "1263727",
  key: "4f16841c2063028217d2",
  secret: "dda8f1b166db37826a83",
  cluster: "ap1",
  useTLS: true,
});

const router = express.Router();
const prisma = new PrismaClient();

router.get("/test", (req, res) =>
  res.json({
    message: "Message api is works",
  })
);

router.post("/send", async (req, res) => {
  const token = req?.cookies?.token || null;

  const isValid = isTokenValid(token);

  if (!isValid) {
    return res.status(401).json({
      error: {
        message: "Token tidak valid",
      },
    });
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      fullName: true,
      profilePic: true,
    },
    where: {
      token,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: {
        message: "Token tidak valid",
      },
    });
  }

  const receiverId = parseInt(req?.body?.receiverId);
  const message = req?.body?.message;

  const messages = await prisma.message.create({
    data: {
      senderId: user.id,
      receiverId,
      message,
    },
  });

  pusher.trigger("chat", `${receiverId}`, {
    message: messages,
  });

  res.json({ messages });
});

router.get("/", async (req, res) => {
  const token = req?.cookies?.token || null;

  const isValid = isTokenValid(token);

  if (!isValid) {
    return res.status(401).json({
      error: {
        message: "Token tidak valid",
      },
    });
  }

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      fullName: true,
      profilePic: true,
    },
    where: {
      token,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: {
        message: "Token tidak valid",
      },
    });
  }

  const anotherUserId = parseInt(req?.query?.anotherUserId);

  const messages = await prisma.message.findMany({
    where: {
      AND: [
        {
          senderId: {
            in: [user.id, anotherUserId],
          },
        },
        {
          receiverId: {
            in: [user.id, anotherUserId],
          },
        },
      ],
    },
  });

  res.json({ messages });
});

module.exports = router;

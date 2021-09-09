const express = require("express");
const { PrismaClient } = require("@prisma/client");

const { isTokenValid } = require("../validation/auth");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/test", (req, res) =>
  res.json({
    message: "User api is works",
  })
);

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

  res.json({ user });
});

router.get("/list", async (req, res) => {
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

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullName: true,
      profilePic: true,
      messageSent: {
        where: {
          receiverId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      messageReceived: {
        where: {
          senderId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    where: {
      NOT: {
        id: user.id,
      },
    },
  });

  users.forEach(({ messageReceived, messageSent }, index) => {
    switch (true) {
      case Boolean(messageReceived.length && messageSent.length):
        const receiveDate = new Date(messageReceived[0].createdAt);
        const sentDate = new Date(messageSent[0].createdAt);

        users[index].lastMessage =
          receiveDate.getTime() <= sentDate.getTime()
            ? messageSent[0]
            : messageReceived[0];
        break;
      case Boolean(messageReceived.length && !messageSent.length):
        users[index].lastMessage = messageReceived[0];
        break;
      case Boolean(!messageReceived.length && messageSent.length):
        users[index].lastMessage = messageSent[0];
        break;
      default:
        users[index].lastMessage = null;
        break;
    }

    delete users[index].messageReceived;
    delete users[index].messageSent;
  });

  res.json({ users });
});

module.exports = router;

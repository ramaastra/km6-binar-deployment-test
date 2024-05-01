const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getAll: async (req, res) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    res.status(200).json({
      status: true,
      message: `Fetched ${users.length} record(s)`,
      data: users
    });
  },
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          status: false,
          message: `Field 'name', 'email', and 'password' are required`,
          data: null
        });
      }

      const hashedPassword = await bcrypt.hash(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      res.status(201).json({
        status: true,
        message: 'Successfully created a new record',
        data: user
      });
    } catch (error) {
      if (
        error.name === 'PrismaClientKnownRequestError' &&
        error.code === 'P2002'
      ) {
        return res.status(400).json({
          status: false,
          message: 'Email already registered',
          data: null
        });
      }
    }
  }
};

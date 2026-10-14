const bcrypt = require('bcryptjs');
const { sequelize, User, Item, Claim } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();

    await Claim.destroy({ where: {} });
    await Item.destroy({ where: {} });

    const email = 'demo.user.20261014@example.com';
    const password = 'Demo123!';

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      console.log('Demo user already exists:', email);
      await sequelize.close();
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name: 'Demo User',
      phone: '5551234567',
      password_hash,
      role: 'student',
    });

    console.log('Demo account created:', {
      id: user.id,
      email,
      password,
      name: user.name,
    });

    await sequelize.close();
  } catch (error) {
    console.error('Demo user creation failed:', error);
    process.exit(1);
  }
})();

// index.js

import UserServices from './services/user.services.js';
import EmailServices from './services/email.services.js';
import Authservices from './services/auth.services.js';

async function startApp() {
  await UserServices.start();
  await EmailServices.start();
  await Authservices.start();
  try {
    const newUser = await UserServices.call('user.createUser', {
      username: 'John',
      email: 'johndoe@gmail.com',
    });
    console.log('New user created:', newUser);

    const users = await UserServices.call('user.getUsers');
    console.log('Users:', users);

    const emailResult = await EmailServices.call('email.sendEmail', {
      recipient: 'example@example.com',
      subject: 'Test Subject',
      content: 'This is a test email content',
    });

    console.log('Email result:', emailResult);

    const authResult = await Authservices.call('auth.authUser', {
      username: 'admin',
      password: 'password',
    });

    console.log('Auth result:', authResult);
  } catch (error) {
    console.error('Error occurred:', error.message);
  } finally {
    await UserServices.stop();
  }
}

// Start the application
startApp();

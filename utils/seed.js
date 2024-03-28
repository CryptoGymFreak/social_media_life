const connection = require('../config/connection');
const { User } = require('../models'); // ..models/index.js

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Delete the collections if they exist
    let check = await connection.db.listCollections({ name: 'users' }).toArray();
    if (check.length) {
      await connection.dropCollection('users');
    }

    // Create the collection users
    let users = []
    users.push({
      username:"johndoe",
      email:"johndoe@gmail.com",
    });
    users.push({
      username:"maryjane",
      email:"maryjane@gmail.com",
    });

  // Add students to the collection and await the results
  await User.collection.insertMany(users);


  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

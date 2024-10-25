import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }

    const hash = sha1(password);

    try {
      const collection = dbClient.db.collection('users');
      const user1 = await collection.findOne({ email });

      if (user1) {
        res.status(400).json({ error: 'Already exist' });
      } else {
        collection.insertOne({ email, password: hash });
        const newUser = await collection.findOne(
          { email },
          { projection: { email: 1 } },
        );
        res.status(201).json({ id: newUser._id, email: newUser.email });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export default UsersController;

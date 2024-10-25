import mongodb from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;
    this.client = new mongodb.MongoClient(url, { useUnifiedTopology: true });
    this.connect().then(() => {
      console.log('Connection Successful');
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  async connect() {
    try {
      await this.client.connect();
      await this.client.db().createCollection('users');
      await this.client.db().createCollection('files');
    } catch (error) {
      console.error('Error creating collections:', error);
      throw error;
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

export const dbClient = new DBClient();

export default dbClient;

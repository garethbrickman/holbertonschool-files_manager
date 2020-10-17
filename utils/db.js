import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.db = null;
    // Use either env vars or defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB client connection

    const url = `mongodb://${host}:${port}/`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
      if (err) console.log(err);
      this.db = db.db(database);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    const countUsers = await this.db.collection('users').countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const countFiles = await this.db.collection('files').countDocuments();
    return countFiles;
  }

  async findUser(query) {
    const user = await this.db.collection('users').findOne(query);

    return user;
  }

  async createUser(email, password) {
    await this.db.collection('users').insertOne({ email, password });

    const newUser = await this.db.collection('users').findOne({ email });

    return { id: newUser._id, email: newUser.email };
  }
}
const dbClient = new DBClient();
export default dbClient;

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.db = null;
    /* use env variables or specified defaults */
    const port = process.env.DB_HOST || 'localhost';
    const host = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    /* MongoDB connection */

    MongoClient.connect(`mongodb://${host}:${port}/`, function (err, client) {
      if (err) console.log(err);
      this.db = client.db(database);
      this.db.createCollection('users');
      this.db.createCollection('files');
    });
  }

  // Methods

  isAlive() {
    return !this.db;
  }

  async nbUsers() {
    const countUsers = await this.db.collection('users').countDocuments();
    return countUsers;
  }

  async nbFiles() {
    const countFiles = await this.db.collection('files').countDocuments();
    return countFiles;
  }
}
const dbClient = new DBClient();
export default dbClient;

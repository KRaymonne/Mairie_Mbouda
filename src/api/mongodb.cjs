
const { MongoClient, ServerApiVersion } = require('mongodb');


// MongoDB connection URI - should be moved to environment variables in production
const uri = "MONGODB_URI=mongodb+srv://raymonnekemayou_db_user:X6VSFxnhqxXHrBsF@cluster0.deru1gw.mongodb.net/crud";

// MongoDB client configuration
const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a new MongoClient
const client = new MongoClient(uri, clientOptions);

// Database connection instance
let dbInstance = null;

/**
 * Initialize database connection
 * @returns {Promise<MongoClient>}
 */
async function connectToDatabase() {
  try {
    if (dbInstance) {
      return dbInstance;
    }

    // Connect to MongoDB
    await client.connect();
    
    // Verify connection
    await client.db("mairie").command({ ping: 1 });
    console.log("Successfully connected to MongoDB Atlas!");
    
    // Store the connected client
    dbInstance = client;
    return dbInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

/**
 * Create a new employee in the database
 * @param {Object} employeeData - The employee data to be inserted
 * @returns {Promise<Object>} The created employee document
 */
async function createEmployee(employeeData) {
  try {
    const db = await connectToDatabase();
    const collection = db.db("mairie").collection("employees");

    // Check if matricule already exists
    const existingEmployee = await collection.findOne({ matricule: employeeData.matricule });
    if (existingEmployee) {
      throw new Error("Employee with this matricule already exists");
    }

    // Add timestamps
    const employeeWithTimestamps = {
      ...employeeData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(employeeWithTimestamps);
    return { ...employeeWithTimestamps, _id: result.insertedId };
  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

/**
 * Get database instance
 * @param {string} dbName - Name of the database
 * @returns {Promise<Db>}
 */
async function getDb(dbName = 'mairie') {
  if (!dbInstance) {
    await connectToDatabase();
  }
  return dbInstance.db(dbName);
}

/**
 * Close database connection
 */
async function closeConnection() {
  try {
    if (dbInstance) {
      await dbInstance.close();
      dbInstance = null;
      console.log("MongoDB connection closed.");
    }
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

module.exports = {
  connectToDatabase,
  getDb,
  closeConnection
};

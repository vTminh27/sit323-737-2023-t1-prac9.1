const MongoClient = require('mongodb').MongoClient;

const host = process.env.MONGODB_HOST;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;

const url = `mongodb://${user}:${password}@${host}/${database}`;

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }

  const db = client.db();
  console.log('Connected to MongoDB!');

  // Perform CRUD operations for testing

  // Create a document
  const collection = db.collection('documents');
  const newDocument = { name: 'John Doe', age: 30 };
  collection.insertOne(newDocument, function(err, result) {
    if (err) {
      console.error('Failed to create document:', err);
      client.close();
      return;
    }
    console.log('Document created:', result.insertedId);

    // Read documents
    collection.find().toArray(function(err, documents) {
      if (err) {
        console.error('Failed to read documents:', err);
        client.close();
        return;
      }
      console.log('Documents:', documents);

      // Update a document
      const filter = { name: 'John Doe' };
      const update = { $set: { age: 35 } };
      collection.updateOne(filter, update, function(err, result) {
        if (err) {
          console.error('Failed to update document:', err);
          client.close();
          return;
        }
        console.log('Document updated:', result.modifiedCount);

        // Delete a document
        collection.deleteOne(filter, function(err, result) {
          if (err) {
            console.error('Failed to delete document:', err);
            client.close();
            return;
          }
          console.log('Document deleted:', result.deletedCount);

          // Close the connection
          client.close();
        });
      });
    });
  });
});

// UPDATED CODE

/*
const { MongoClient, Logger } = require('mongodb');

const host = process.env.MONGODB_HOST;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;

const url = `mongodb://${user}:${password}@${host}/${database}`;

async function monitorMongoDB() {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
  
    // Enable MongoDB performance monitoring
    Logger.setLevel('debug'); // Set the desired logging level
  
    // Perform CRUD operations and monitor performance
  
    // Create a document
    const collection = db.collection('documents');
    const newDocument = { name: 'John Doe', age: 30 };
    const insertResult = await collection.insertOne(newDocument);
    console.log('Document created:', insertResult.insertedId);
  
    // Read documents
    const findResult = await collection.find().toArray();
    console.log('Documents:', findResult);
  
    // Update a document
    const filter = { name: 'John Doe' };
    const update = { $set: { age: 35 } };
    const updateResult = await collection.updateOne(filter, update);
    console.log('Document updated:', updateResult.modifiedCount);
  
    // Delete a document
    const deleteResult = await collection.deleteOne(filter);
    console.log('Document deleted:', deleteResult.deletedCount);
  
    // Close the connection
    client.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

// Call the monitorMongoDB function to start monitoring
monitorMongoDB();




*/
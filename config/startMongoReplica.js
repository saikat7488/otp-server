const { spawn, exec } = require("child_process");
const fs = require("fs");

// MongoDB Paths (Update if needed)
const mongoDataPaths = {
  primary: "C:\\databaseData\\mailServer\\data\\db",
  replica1: "C:\\databaseData\\mailServer\\data\\replica1",
  replica2: "C:\\databaseData\\mailServer\\data\\replica2",
  replica3: "C:\\databaseData\\mailServer\\data\\replica3",
};

// MongoDB Ports
const mongoPorts = {
  primary: 27017,
  replica1: 27018,
  replica2: 27019,
  replica3: 27020,
};

// MongoDB Executables (Update paths if needed)
const mongodPath = "mongod"; // Change to full path if necessary
const mongoshPath = "mongosh"; // Change to full path if necessary

// Function to start MongoDB instance
const startMongoInstance = (dbPath, port) => {
  console.log(`Starting MongoDB instance on port ${port}...`);

  // Ensure the database directory exists
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  const process = spawn(
    mongodPath,
    [
      "--replSet", "rs0",
      "--port", port.toString(),
      "--dbpath", dbPath,
      "--bind_ip", "localhost",
    ],
    { shell: true }
  );

  process.stdout.on("data", (data) => console.log(`[MongoDB:${port}] ${data}`));
  process.stderr.on("data", (data) => console.error(`[MongoDB:${port} ERROR] ${data}`));
  process.on("exit", (code) => console.log(`[MongoDB:${port}] exited with code ${code}`));
};

// Start all MongoDB instances
Object.keys(mongoDataPaths).forEach((key) => {
  startMongoInstance(mongoDataPaths[key], mongoPorts[key]);
});

// Wait for MongoDB instances to start before configuring the replica set
setTimeout(() => {
  console.log("Configuring MongoDB Replica Set...");

  const rsConfig = `
    rs.initiate({
      _id: "rs0",
      members: [
        { _id: 0, host: "localhost:27017" },
        { _id: 1, host: "localhost:27018" },
        { _id: 2, host: "localhost:27019" },
        { _id: 3, host: "localhost:27020" }
      ]
    });
  `;

  exec(`${mongoshPath} --port 27017 --eval "${rsConfig}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(`[mongosh ERROR] ${stderr}`);
    } else {
      console.log(`[mongosh] ${stdout}`);
      console.log("Replica Set Initialized!");
    }
  });
}, 10000); // Increased delay to 10 seconds

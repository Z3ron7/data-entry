const express = require("express");
const Database = require("../configs/Database");
const router = express.Router();

router.get("/", async (req, res) => {
  const db = new Database();
  const conn = db.connection;
  const query = "SELECT * FROM transaction";

  try {
    await conn.connect();

    conn.query(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    conn.end();
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = new Database();
  const conn = db.connection;
  const query = "SELECT * FROM transaction WHERE id = ?";

  try {
    await conn.connect();

    conn.query(query, [id], (error, rows) => {
      if (error) throw error;
      res.json(rows);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    conn.end();
  }
});

router.post("/add", async (req, res) => {
  const { policy, name, transac_date, due_date } = req.body;

  const db = new Database();
  const conn = db.connection;
  const query = "INSERT INTO transaction (policy, name, transac_date, due_date) VALUES (?, ?, ?, ?)";
  const values = [policy, name, transac_date, due_date];

  try {
    await conn.connect();

    // Check if the name, transac_date, or due_date is null
    if (!name || !transac_date || !due_date) {
      res.json({ success: false, message: "Please fill in the fields!" });
      return;
    }

    // Check if the policy already exists in the database
    const checkQuery = "SELECT * FROM transaction WHERE policy = ?";
    const checkValues = [policy];
    conn.query(checkQuery, checkValues, (error, result) => {
      if (error) throw error;

      if (result.length > 0) {
        // Policy already exists, send error response
        res.json({ success: false, message: "Policy number already exists!" });
      } else {
        // Policy does not exist, insert the record
        conn.query(query, values, (error, result) => {
          if (error) throw error;
          const { insertId } = result; // Get the ID of the newly inserted record
          res.json({ success: true, message: "Successfully added", id: insertId });

          // Close the connection after both queries have been executed
          conn.end();
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  
  router.post("/add/list", async (req, res) => {
    const { list, id } = req.body; // Receive the ID from the request body
  
    const db = new Database();
    const conn = db.connection;
    const query = "UPDATE transaction SET list = ? WHERE id = ?"; // Use an UPDATE query to add the list to the previous record
    const values = [
      list.join(", "), // Convert the list array to a comma-separated string
      id // Use the received ID to identify the previous record
    ];
  
    try {
      await conn.connect();
  
      conn.query(query, values, (error, result) => {
        if (error) throw error;
        res.json({ success: true, message: "Successfully added" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      conn.end();
    }
  });


  router.put('/update/:id', async (req, res) => {
    const db = new Database();
    const conn = db.connection;
  
    const { id } = req.params;
    const { policy, name, transac_date, due_date, list } = req.body;
  
    const query = "UPDATE transaction SET policy = ?, name = ?, transac_date = ?, due_date = ?, list = ? WHERE id = ?";
    const values = [policy, name, transac_date, due_date, list, id];
  
    try {
      await conn.connect();
  
      // Check if the policy already exists in the database
      const checkQuery = "SELECT * FROM transaction WHERE policy = ? AND id <> ?";
      const checkValues = [policy, id];
      conn.query(checkQuery, checkValues, (error, result) => {
        if (error) throw error;
  
        if (result.length > 0) {
          // Policy already exists, send error response
          res.json({ success: false, message: "Policy number already exists!" });
        } else {
          // Policy does not exist, proceed with the update
          conn.query(query, values, (error, result) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Error updating customer' });
            } else {
              console.log(result);
              res.json({ success: true, message: "Customer updated successfully" });
            }
            // Close the connection after executing the update query
            conn.end();
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

router.delete('/delete/:id', async (req, res) => {
  const db = new Database();
  const conn = db.connection;

  const { id } = req.params;
  const query = "DELETE FROM transaction WHERE id = ?";

  try {
    await conn.connect();

    conn.query(query, id, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    conn.end();
  }
});

// Search route
router.get("/search/:category", async (req, res) => {
  const { category } = req.params;
  const { name } = req.query;
  const db = new Database();
  const conn = db.connection;
  let query;
  let queryParams;

  switch (category) {
    case "policy":
      let policyValue = parseInt(name);
      if (isNaN(policyValue)) {
        policyValue = 0; // Assign a default value if the name parameter is not a valid number
      }
      query = "SELECT * FROM transaction WHERE policy = ?";
      queryParams = [policyValue];
      break;
    case "name":
      query = "SELECT * FROM transaction WHERE name LIKE ?";
      queryParams = [`%${name}%`];
      break;
    case "transac_date":
      query = "SELECT * FROM transaction WHERE transac_date = ?";
      queryParams = [new Date(name)]; // Assuming transac_date is a Date object
      break;
    case "due_date":
      query = "SELECT * FROM transaction WHERE due_date = ?";
      queryParams = [new Date(name)]; // Assuming due_date is a Date object
      break;
    default:
      query = "SELECT * FROM transaction WHERE policy = ? OR name LIKE ? OR transac_date = ? OR due_date = ? OR list LIKE ?";
      queryParams = [parseInt(name) || 0, `%${name}%`, new Date(name), new Date(name), `%${name}%`];
      // Use parseInt(name) or 0 as the policy value if name is not a valid number
  }

  try {
    await conn.connect();

    conn.query(query, queryParams, (error, rows) => {
      if (error) throw error;
      res.json(rows);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    conn.end();
  }
});



module.exports = router;
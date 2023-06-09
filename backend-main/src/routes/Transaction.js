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
  
      conn.query(query, values, (error, result) => {
        if (error) throw error;
        const { insertId } = result; // Get the ID of the newly inserted record
        res.json({ success: true, message: "Successfully added", id: insertId });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      conn.end();
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
  const { Name } = req.body;

  const query = "UPDATE customer_entry SET Name = ? WHERE id = ?";
  const values = [Name, id];

  try {
    await conn.connect();

    conn.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating customer' });
      } else {
        console.log(result);
        res.json({ message: "Customer updated successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    conn.end();
  }
});


router.delete('/delete/:id', async (req, res) => {
  const db = new Database();
  const conn = db.connection;

  const { id } = req.params;
  const query = "DELETE FROM customer_entry WHERE id = ?";

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
router.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  const db = new Database();
  const conn = db.connection;
  const query = "SELECT * FROM customer_entry WHERE Name LIKE ?";

  try {
    await conn.connect();

    conn.query(query, [`%${name}%`], (error, rows) => {
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

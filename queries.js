const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "rate_my_professor",
  password: "password",
  port: 5432,
});

// Users
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`);
      console.log(result);
      // console.log(response);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

// end User

// professors
const getProfessors = (request, response) => {
  pool.query("SELECT * FROM professors ORDER BY id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const getProfessorById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM professors WHERE id = $1",
    [id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

const createProfessor = (request, response) => {
  const { firstName, lastName, title, school, department } = request.body;

  pool.query(
    "INSERT INTO professors (first_name,last_name, title, school, department) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, title, school, department],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Professor added with ID: ${result.insertId}`);
    }
  );
};
const updateProfessor = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstName, lastName, title, school, department } = request.body;

  pool.query(
    "UPDATE professors SET first_name,last_name, title, school, department = $1, email = $2 WHERE id = $3",
    [firstName, lastName, title, school, department, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Professor modified with ID: ${id}`);
    }
  );
};

const deleteProfessor = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM professors WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Professer deleted with ID: ${id}`);
  });
};

// end professor

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};

// PostgreSQL commands

// CREATE TABLE users (
//   ID SERIAL PRIMARY KEY,
//   name VARCHAR(30), 
//   email VARCHAR(30));

// INSERT INTO users (name, email) VALUES ('James', 'james@gmail.com'), ('Katrina', 'katrina@gmail.com'), ('Rebecca', 'rebecca@gmail.com');

// CREATE TABLE professors (ID SERIAL PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), title VARCHAR(30), school VARCHAR(30), department VARCHAR(30));

// INSERT INTO professors (first_name, last_name, title, school, department) VALUES ('John', 'Candy', 'Director', 'Canada University', 'Theatre'), ('Lisa', 'Newcar', 'Administrator', 'University of Iowa', 'Biology');
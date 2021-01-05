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
  pool.query("SELECT * FROM users ORDER BY user_id ASC", (error, results) => {
    if (error) {
      throw error;
    }

    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const user_id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE user_id = $1", [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING user_id",
    [name, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);
      response.status(201).send(`User added with ID: ${result.rows[0].user_id}`);
      // console.log(response);
    }
  );
};

const updateUser = (request, response) => {
  const user_id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE user_id = $3",
    [name, email, user_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${user_id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const user_id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE user_id = $1", [user_id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${user_id}`);
  });
};

// end User

// professors
const getProfessors = (request, response) => {
  pool.query(
    "SELECT * FROM professors ORDER BY professor_id ASC",
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

const getProfessorById = (request, response) => {
  const professor_id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM professors WHERE professor_id = $1",
    [professor_id],
    (error, prof_result) => {
      pool.query("SELECT * FROM reviews WHERE professor_id = $1", [professor_id], (error, review_result) => {
        prof_result.rows[0]["reviews"] = review_result.rows
        const info = {
          professor: prof_result.rows,
        }
        if (error) {
          throw error;
        }
        response.status(200).json(info);
      })
      if (error) {
        throw error;
      }
    },
  );
};

const createProfessor = (request, response) => {
  const { first_name, last_name, title, school, department } = request.body;

  pool.query(
    "INSERT INTO professors (first_name, last_name, title, school, department) VALUES ($1, $2, $3, $4, $5) RETURNING professor_id",
    [first_name, last_name, title, school, department],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);
      response
        .status(201)
        .send(`Professor added with ID: ${result.rows[0].professor_id}`);
    }
  );
};

const updateProfessor = (request, response) => {
  const professor_id = parseInt(request.params.id);
  const { first_name, last_name, title, school, department } = request.body;

  pool.query(
    "UPDATE professors SET first_name = $1,last_name = $2, title = $3, school = $4, department = $5 WHERE professor_id = $6",
    [first_name, last_name, title, school, department, professor_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Professor modified with ID: ${professor_id}`);
    }
  );
};

const deleteProfessor = (request, response) => {
  const professor_id = parseInt(request.params.id);

  pool.query("DELETE FROM professors WHERE professor_id = $1", [professor_id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Professer deleted with ID: ${professor_id}`);
  });
};

// end professor

// reviews

const getReviews = (request, response) => {
  pool.query("SELECT * FROM reviews ORDER BY review_id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

const getReviewById = (request, response) => {
  const review_id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM reviews WHERE review_id = $1",
    [review_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    }
  );
};

const createReview = (request, response) => {
  const { professor_id, rating, text } = request.body;

  pool.query(
    "INSERT INTO reviews (professor_id, rating, text) VALUES ($1, $2, $3) RETURNING review_id",
    [professor_id, rating, text],
    (error, result) => {
      if (error) {
        throw error;
      }
      console.log(result);
      response.status(201).send(`Review added with ID: ${result.rows[0].review_id}`);
    }
  );
};

const updateReview = (request, response) => {
  const review_id = parseInt(request.params.id);
  const { professor_id, rating, text } = request.body;

  pool.query(
    "UPDATE reviews SET professor_id = $1, rating = $2, text = $3 WHERE review_id = $4",
    [professor_id, rating, text, review_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${review_id}`);
    }
  );
};

const deleteReview = (request, response) => {
  const review_id = parseInt(request.params.id);

  pool.query("DELETE FROM reviews WHERE review_id = $1", [review_id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${review_id}`);
  });
};

//end reviews

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
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};

// PostgreSQL commands

// CREATE TABLE users (
//   user_id SERIAL PRIMARY KEY,
//   name VARCHAR(30),
//   email VARCHAR(30));

// INSERT INTO users (name, email) VALUES ('James', 'james@gmail.com'), ('Katrina', 'katrina@gmail.com'), ('Rebecca', 'rebecca@gmail.com');

// CREATE TABLE professors (professor_id SERIAL PRIMARY KEY, first_name VARCHAR(30), last_name VARCHAR(30), title VARCHAR(30), school VARCHAR(30), department VARCHAR(30));

// INSERT INTO professors (first_name, last_name, title, school, department) VALUES ('John', 'Candy', 'Director', 'Canada University', 'Theatre'), ('Lisa', 'Newcar', 'Administrator', 'University of Iowa', 'Biology');

// CREATE TABLE reviews (professor_id INT NOT NULL, review_id SERIAL PRIMARY KEY, FOREIGN KEY (professor_id) REFERENCES professors (professor_id), rating INT, text VARCHAR(500));

// INSERT INTO reviews (professor_id, rating, text) VALUES ('1', '3', 'They were very informational but could be boring from time to time. Drink your coffee before hand!'), ('2', '3', 'Awesome teacher! Youll never be bored, make sure you do all the homework!');

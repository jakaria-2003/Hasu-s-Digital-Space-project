import pool from "./db.js";

async function ensureColumnExists(table, column, definition) {
  try {
    const [cols] = await pool.query(`DESCRIBE ${table}`);
    const exists = cols.some((c) => c.Field.toLowerCase() === column.toLowerCase());
    if (!exists) {
      await pool.query(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
      console.log(` Added column '${column}' to table '${table}'`);
    }
  } catch (err) {
    console.error(`Error ensuring column ${column} in ${table}:`, err.message);
  }
}

export async function initDatabase() {
  try {
    console.log("Checking and initializing database tables...");

    // 1. Projects Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        technologies VARCHAR(255),
        image VARCHAR(500),
        github_link VARCHAR(500),
        live_link VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Ensure all columns exist in case projects table was created previously with fewer columns
    await ensureColumnExists("projects", "technologies", "VARCHAR(255) NULL AFTER description");
    await ensureColumnExists("projects", "featured", "BOOLEAN DEFAULT FALSE AFTER live_link");
    await ensureColumnExists("projects", "updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");

    // 2. Books / Library Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        category VARCHAR(100),
        status ENUM('reading', 'completed', 'plan_to_read') DEFAULT 'completed',
        rating INT DEFAULT 5,
        notes TEXT,
        cover_image VARCHAR(500),
        read_date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 3. Certificates Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        issuer VARCHAR(255),
        issue_date VARCHAR(100),
        credential_url VARCHAR(500),
        image VARCHAR(500),
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 4. Contacts Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 5. Tours / Travel Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tours (
        id INT AUTO_INCREMENT PRIMARY KEY,
        place VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        tour_date VARCHAR(100),
        image VARCHAR(500),
        description TEXT,
        highlights TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 6. Skills Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(100) DEFAULT 'Technical',
        proficiency INT DEFAULT 80,
        icon VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Seed default projects if empty
    const [projectRows] = await pool.query("SELECT COUNT(*) AS count FROM projects");
    if (projectRows[0].count === 0) {
      await pool.query(`
        INSERT INTO projects (title, description, technologies, image, github_link, live_link, featured) VALUES
        ('Portfolio Website', 'Personal dynamic portfolio showcasing development projects, skills, and travels.', 'React | Express | MySQL', '/portfolio.png', 'https://github.com', 'https://hasu.dev', true),
        ('Student Management System', 'Full-stack academic portal for managing student records, courses, and gradebooks.', 'React | Node.js | MySQL', '/student.png', 'https://github.com', 'https://hasu-student.dev', true),
        ('Restaurant Management System', 'Comprehensive order tracking, kitchen workflow, and billing system.', 'React | Express | MySQL', '/restaurant.png', 'https://github.com', 'https://hasu-restaurant.dev', true)
      `);
      console.log(" Seeded initial projects");
    }

    // Seed default books if empty
    const [bookRows] = await pool.query("SELECT COUNT(*) AS count FROM books");
    if (bookRows[0].count === 0) {
      await pool.query(`
        INSERT INTO books (title, author, category, status, rating) VALUES
        ('Clean Code', 'Robert C. Martin', 'Software Engineering', 'completed', 5),
        ('Atomic Habits', 'James Clear', 'Self Improvement', 'completed', 5),
        ('React Explained', 'Zac Gordon', 'Frontend Web Development', 'completed', 4),
        ('JavaScript: The Good Parts', 'Douglas Crockford', 'Programming', 'completed', 4)
      `);
      console.log(" Seeded initial library books");
    }

    // Seed default certificates if empty
    const [certRows] = await pool.query("SELECT COUNT(*) AS count FROM certificates");
    if (certRows[0].count === 0) {
      await pool.query(`
        INSERT INTO certificates (title, issuer, issue_date, description) VALUES
        ('React Frontend Certification', 'Coursera / Meta', '2025', 'Advanced modern React development, hooks, state management and component architecture.'),
        ('PHP & MySQL Web Development', 'Udemy', '2024', 'Full-stack dynamic web app development with relational database architecture.'),
        ('Java Programming Masterclass', 'Oracle Academy', '2024', 'Object-Oriented Programming, Data Structures, and Core Java development.')
      `);
      console.log(" Seeded initial certificates");
    }

    // Seed default tours if empty
    const [tourRows] = await pool.query("SELECT COUNT(*) AS count FROM tours");
    if (tourRows[0].count === 0) {
      await pool.query(`
        INSERT INTO tours (place, location, tour_date, image, description) VALUES
        ('Cox\\'s Bazar', 'Chittagong Division, Bangladesh', 'January 2026', '/abu.jpeg', 'Enjoyed an unforgettable experience at the world\\'s longest natural sea beach.'),
        ('Sajek Valley', 'Rangamati, Bangladesh', 'March 2025', '/hhp.jpg', 'A memorable journey through the lush green hills and rolling cloudscapes.'),
        ('Sylhet', 'Sylhet Division, Bangladesh', 'May 2026', '/hop.jpg', 'Explored sprawling tea gardens, crystal clear rivers, and breathtaking natural beauty.')
      `);
      console.log(" Seeded initial tours");
    }

    // Seed default skills if empty
    const [skillRows] = await pool.query("SELECT COUNT(*) AS count FROM skills");
    if (skillRows[0].count === 0) {
      await pool.query(`
        INSERT INTO skills (name, category, proficiency) VALUES
        ('HTML5', 'Frontend', 95),
        ('CSS3 / Bootstrap', 'Frontend', 90),
        ('React.js', 'Frontend', 85),
        ('JavaScript (ES6+)', 'Languages', 85),
        ('Node.js & Express', 'Backend', 80),
        ('PHP', 'Backend', 75),
        ('MySQL', 'Database', 80)
      `);
      console.log(" Seeded initial skills");
    }

    console.log(" Database tables checked and ready!");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
}

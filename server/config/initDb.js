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
        pdf_url VARCHAR(500),
        read_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await ensureColumnExists("books", "pdf_url", "VARCHAR(500) NULL AFTER cover_image");
    await ensureColumnExists("books", "read_url", "VARCHAR(500) NULL AFTER pdf_url");

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

    await ensureColumnExists("certificates", "credential_url", "VARCHAR(500) NULL AFTER issue_date");
    await ensureColumnExists("certificates", "image", "VARCHAR(500) NULL AFTER credential_url");

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

    // Verified Certificates List from User's Authentic Certificates
    const certificatesToInsert = [
      {
        title: "The Bits and Bytes of Computer Networking",
        issuer: "Google (Coursera)",
        issue_date: "March 10, 2026",
        credential_url: "https://coursera.org/verify/ORZRFG1G6RPQ",
        image: "/certificates/google-networking.jpg",
        description: "Google Career Certificate in computer networking architecture, TCP/IP, UDP, DNS, routing, and cloud infrastructure.",
      },
      {
        title: "Mastering Design Patterns with Java",
        issuer: "CodeSignal",
        issue_date: "April 11, 2026",
        credential_url: "https://codesignal.com/learn/certificates/cmnhk7moo004bl804aqgvm1vo/course-paths/85",
        image: "/certificates/codesignal-java.png",
        description: "Advanced Java software engineering, OOP design patterns, computer science fundamentals, and system architecture.",
      },
      {
        title: "Leadership Qualities – Boss VS Leader",
        issuer: "GoEdu (GEAC Accredited)",
        issue_date: "June 09, 2026",
        credential_url: "https://goedu.ac",
        image: "/certificates/goedu-leadership.png",
        description: "Completed with distinction, certified in modern leadership principles, strategic decision making, and team management.",
      },
      {
        title: "Unified Modeling Language (UML)",
        issuer: "European Open University",
        issue_date: "April 18, 2026",
        credential_url: "https://europeanopenuniversity.com",
        image: "/certificates/european-uml.png",
        description: "Professional Certificate Program in software system modeling, class diagrams, sequence diagrams, and architecture design.",
      },
      {
        title: "12th Air Scout Unit Leader Basic Course",
        issuer: "Bangladesh Scouts, Air Region",
        issue_date: "January 19, 2025",
        credential_url: "https://scouts.gov.bd",
        image: "/certificates/bangladesh-air-scouts.png",
        description: "Represented Daffodil International University Air Rover Scout Group (Cert No: 0038/2025) in leadership & scout training in Cox's Bazar.",
      },
    ];

    for (const cert of certificatesToInsert) {
      const [existing] = await pool.query("SELECT id FROM certificates WHERE title LIKE ?", [
        `%${cert.title.slice(0, 20)}%`,
      ]);
      if (existing.length === 0) {
        await pool.query(
          `INSERT INTO certificates (title, issuer, issue_date, credential_url, image, description)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [cert.title, cert.issuer, cert.issue_date, cert.credential_url, cert.image, cert.description]
        );
        console.log(` Added Certificate: ${cert.title}`);
      } else {
        await pool.query(
          `UPDATE certificates SET 
            title = ?,
            issuer = ?,
            issue_date = ?,
            credential_url = ?,
            image = ?,
            description = ?
           WHERE id = ?`,
          [cert.title, cert.issuer, cert.issue_date, cert.credential_url, cert.image, cert.description, existing[0].id]
        );
      }
    }

    console.log(" Database tables checked and all certificates synced!");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
}

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

    // Ensure all requested Bengali classic books and programming books are present
    const booksToInsert = [
      {
        title: "দেবদাস (Devdas)",
        author: "শরৎচন্দ্র চট্টোপাধ্যায় (Sarat Chandra Chattopadhyay)",
        category: "Bengali Literature",
        status: "completed",
        rating: 5,
        notes: "একটি কালজয়ী অমর প্রেমের উপন্যাস। দেবদাস ও পার্বতীর গভীর ভালোবাসার এক অনুপম আখ্যান।",
        read_url: "https://en.wikisource.org/wiki/bn:%E0%A6%A6%E0%A7%87%E0%A6%AC%E0%A6%A6%E0%A6%BE%E0%A6%B8",
        pdf_url: "https://archive.org/details/in.ernet.dli.2015.452654",
      },
      {
        title: "শাহজাহান (Shahjahan)",
        author: "দ্বিজেন্দ্রলাল রায় (D. L. Roy)",
        category: "Bengali Drama & History",
        status: "completed",
        rating: 5,
        notes: "ঐতিহাসিক নাটক। সম্রাট শাহজাহানের জীবনের শেষ দিনগুলোর ট্র্যাজেডি ও মানবিক মূল্যবোধের চিত্রায়ন।",
        read_url: "https://bn.wikisource.org/wiki/%E0%A6%B6%E0%A6%BE%E0%A6%B9%E0%A6%9C%E0%A6%BE%E0%A6%B9%E0%A6%BE%E0%A6%A8",
        pdf_url: "https://archive.org/details/in.ernet.dli.2015.452654",
      },
      {
        title: "তুমি সন্ধ্যা অলকানন্দা (Tumi Sondhya Alakananda)",
        author: "সুনীল গঙ্গোপাধ্যায় (Sunil Gangopadhyay)",
        category: "Bengali Poetry & Fiction",
        status: "completed",
        rating: 5,
        notes: "প্রেম, রোমান্টিকতা ও গভীর অনুভূতির এক মনোমুগ্ধকর কাব্যিক উপন্যাস।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "পদ্মা নদীর মাঝি (Padma Nadir Majhi)",
        author: "মানিক বন্দ্যোপাধ্যায় (Manik Bandopadhyay)",
        category: "Bengali Classic Novel",
        status: "completed",
        rating: 5,
        notes: "পদ্মা নদীর তীরবর্তী জেলেদের জীবনসংগ্রাম, প্রেম ও বাস্তবতার অমর বাংলা উপন্যাস। কুবের ও কপিলা এর প্রধান চরিত্র।",
        read_url: "https://bn.wikisource.org/wiki/%E0%A6%AA%E0%A6%A6%E0%A7%8D%E0%A6%AE%E0%A6%BE%E0%A6%A8%E0%A6%A6%E0%A7%80%E0%A6%B0_%E0%A6%AE%E0%A6%BE%E0%A6%9D%E0%A6%BF",
        pdf_url: "https://archive.org/details/padmanadirmajhi",
      },
      {
        title: "তন্ময় (Tonmoy)",
        author: "হুমায়ূন আহমেদ (Humayun Ahmed)",
        category: "Bengali Literature",
        status: "completed",
        rating: 5,
        notes: "মনোমুগ্ধকর সমসাময়িক বাংলা উপন্যাস ও গল্প সংকলন।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Software Engineering",
        status: "completed",
        rating: 5,
        notes: "A handbook of agile software craftsmanship and best programming practices.",
        read_url: "https://archive.org/details/clean-code-9780136083238",
        pdf_url: "https://archive.org/details/clean-code-9780136083238",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Improvement",
        status: "completed",
        rating: 5,
        notes: "An easy and proven way to build good habits and break bad ones.",
        read_url: "https://archive.org/details/atomic-habits-pdfdrive",
        pdf_url: "https://archive.org/details/atomic-habits-pdfdrive",
      },
      {
        title: "React Explained",
        author: "Zac Gordon",
        category: "Frontend Web Development",
        status: "completed",
        rating: 4,
        notes: "Your step-by-step guide to learning React and building modern apps.",
        read_url: "https://react.dev/learn",
        pdf_url: "https://react.dev",
      },
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        category: "Programming",
        status: "completed",
        rating: 4,
        notes: "Uncovering the beauty and elegance of JavaScript as a powerful language.",
        read_url: "https://archive.org/details/javascript-the-good-parts",
        pdf_url: "https://archive.org/details/javascript-the-good-parts",
      },
    ];

    for (const book of booksToInsert) {
      const [existing] = await pool.query("SELECT id FROM books WHERE title = ?", [book.title]);
      if (existing.length === 0) {
        await pool.query(
          `INSERT INTO books (title, author, category, status, rating, notes, read_url, pdf_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            book.title,
            book.author,
            book.category,
            book.status,
            book.rating,
            book.notes,
            book.read_url,
            book.pdf_url,
          ]
        );
        console.log(` Added book: ${book.title}`);
      } else {
        await pool.query(
          `UPDATE books SET 
            author = COALESCE(?, author),
            category = COALESCE(?, category),
            notes = COALESCE(?, notes),
            read_url = COALESCE(?, read_url),
            pdf_url = COALESCE(?, pdf_url)
           WHERE id = ?`,
          [book.author, book.category, book.notes, book.read_url, book.pdf_url, existing[0].id]
        );
      }
    }

    console.log(" Database tables checked and all books ready!");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
}

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

    // Specific Books list requested by user
    const booksToInsert = [
      {
        title: "Sajahan Tonoy (শাহজাহান তন্ময়)",
        author: "শাহজাহান তন্ময় (Shahjahan Tanmoy)",
        category: "Bengali Literature",
        status: "completed",
        rating: 5,
        notes: "অনুপ্রেরণামূলক ও জনপ্রিয় বাংলা সাহিত্য রচনা।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "Ma (মা)",
        author: "আনিসুল হক (Anisul Hoque)",
        category: "Liberation War & Novel",
        status: "completed",
        rating: 5,
        notes: "মুক্তিযুদ্ধের পটভূমিতে রচিত শহীদ জননী সাফিয়া বেগম ও তার বীর সন্তান আজাদের অশ্রুসজল বাস্তব গল্প।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "Paradoxical Sajid (প্যারাডক্সিক্যাল সাজিদ)",
        author: "আরিফ আজাদ (Arif Azad)",
        category: "Islamic & Logic",
        status: "completed",
        rating: 5,
        notes: "যুক্তি, বিজ্ঞান ও ধর্মীয় দর্শনের চমৎকার সংমিশ্রণে রচিত সর্বাধিক বিক্রিত জনপ্রিয় বই।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "Fera (ফেরা)",
        author: "আরিফ আজাদ (Arif Azad)",
        category: "Self Growth & Spirituality",
        status: "completed",
        rating: 5,
        notes: "জীবনের ভুল পথ থেকে আত্মশুদ্ধি ও আলোর দিকে ফিরে আসার অনুপ্রেরণামূলক গল্পগাথা।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "Opekkha (অপেক্ষা)",
        author: "হুমায়ূন আহমেদ (Humayun Ahmed)",
        category: "Bengali Classic Novel",
        status: "completed",
        rating: 5,
        notes: "একটি পরিবারের নিখোঁজ বাবার ফিরে আসার আকুল প্রতীক্ষা ও আবেগময় জীবনকাহিনীর ক্লাসিক উপন্যাস।",
        read_url: "https://archive.org/details/books",
        pdf_url: "https://archive.org/details/books",
      },
      {
        title: "Devdas (দেবদাস)",
        author: "শরৎচন্দ্র চট্টোপাধ্যায় (Sarat Chandra)",
        category: "Bengali Classic",
        status: "completed",
        rating: 5,
        notes: "কালজয়ী অমর প্রেমের উপন্যাস। দেবদাস ও পার্বতীর ভালোবাসার ইতিহাস।",
        read_url: "https://en.wikisource.org/wiki/bn:%E0%A6%A6%E0%A7%87%E0%A6%AC%E0%A6%A6%E0%A6%BE%E0%A6%B8",
        pdf_url: "https://archive.org/details/in.ernet.dli.2015.452654",
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Software Engineering",
        status: "completed",
        rating: 5,
        notes: "A handbook of agile software craftsmanship and clean programming practices.",
        read_url: "https://archive.org/details/clean-code-9780136083238",
        pdf_url: "https://archive.org/details/clean-code-9780136083238",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Improvement",
        status: "completed",
        rating: 5,
        notes: "An easy & proven way to build good habits and break bad ones.",
        read_url: "https://archive.org/details/atomic-habits-pdfdrive",
        pdf_url: "https://archive.org/details/atomic-habits-pdfdrive",
      },
    ];

    for (const book of booksToInsert) {
      const [existing] = await pool.query(
        "SELECT id FROM books WHERE title LIKE ?",
        [`%${book.title.split("(")[0].trim()}%`]
      );
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
            title = ?,
            author = ?,
            category = ?,
            notes = ?,
            read_url = ?,
            pdf_url = ?
           WHERE id = ?`,
          [book.title, book.author, book.category, book.notes, book.read_url, book.pdf_url, existing[0].id]
        );
      }
    }

    console.log(" Database tables checked and all books synced!");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
}

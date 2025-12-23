import Database from "better-sqlite3";

export const db = new Database("db.sqlite");

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

const init = db.transaction(() => {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      username   TEXT    NOT NULL UNIQUE,
      password   TEXT    NOT NULL,
      img        TEXT,
      createdAt  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS channels (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL UNIQUE,
      createdAt  TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS channel_users (
      channelId  INTEGER NOT NULL,
      userId     INTEGER NOT NULL,
      createdAt  TEXT    NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (channelId, userId),
      FOREIGN KEY (channelId) REFERENCES channels(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS rooms (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      channelId  INTEGER NOT NULL,
      name       TEXT    NOT NULL,
      createdAt  TEXT    NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (channelId) REFERENCES channels(id) ON DELETE CASCADE,
      UNIQUE (channelId, name)
    );
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS chats (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      title           TEXT, -- opcjonalne: nazwa grupy/rozmowy
      createdByUserId INTEGER, -- tip: kto utworzył rozmowę
      createdAt       TEXT    NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (createdByUserId) REFERENCES users(id) ON DELETE SET NULL
    );
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS chat_users (
      chatId     INTEGER NOT NULL,
      userId     INTEGER NOT NULL,
      role       TEXT    NOT NULL DEFAULT 'member',
      createdAt  TEXT    NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (chatId, userId),
      FOREIGN KEY (chatId) REFERENCES chats(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `
  ).run();

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS messages (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      userId     INTEGER NOT NULL,
      message    TEXT    NOT NULL,
      roomId     INTEGER,
      chatId     INTEGER,
      replyToMessageId INTEGER,
      createdAt  TEXT    NOT NULL DEFAULT (datetime('now')),
      editedAt   TEXT,
      deletedAt  TEXT,

      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE,
      FOREIGN KEY (chatId) REFERENCES chats(id) ON DELETE CASCADE,
      FOREIGN KEY (replyToMessageId) REFERENCES messages(id) ON DELETE SET NULL,

      CHECK (
        (roomId IS NOT NULL AND chatId IS NULL) OR
        (roomId IS NULL AND chatId IS NOT NULL)
      )
    );
  `
  ).run();

  db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_messages_room_createdAt ON messages(roomId, createdAt);`
  ).run();
  db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_messages_chat_createdAt ON messages(chatId, createdAt);`
  ).run();
  db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_messages_user_createdAt ON messages(userId, createdAt);`
  ).run();
  db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_messages_replyToMessageId ON messages(replyToMessageId);`
  ).run();
  db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_chat_users_userId ON chat_users(userId);`
  ).run();
});

init();

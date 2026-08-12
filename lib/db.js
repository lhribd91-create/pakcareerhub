import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

// Collections that are allowed to be read/written through the generic API.
export const COLLECTIONS = [
  "jobs",
  "departments",
  "cities",
  "categories",
  "agencies",
  "results",
  "rollnoslips",
  "admissions",
  "blog",
  "mcqs",
  "pastpapers",
];

function readRaw() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeRaw(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function getDb() {
  return readRaw();
}

export function getAll(collection) {
  const db = readRaw();
  return db[collection] || [];
}

export function getById(collection, id) {
  const items = getAll(collection);
  return items.find((item) => item.id === id) || null;
}

export function create(collection, item) {
  const db = readRaw();
  if (!db[collection]) db[collection] = [];
  const id = item.id || `${collection.slice(0, 3)}-${Date.now()}`;
  const newItem = { ...item, id };
  db[collection].push(newItem);
  writeRaw(db);
  return newItem;
}

export function update(collection, id, updates) {
  const db = readRaw();
  if (!db[collection]) return null;
  const idx = db[collection].findIndex((item) => item.id === id);
  if (idx === -1) return null;
  db[collection][idx] = { ...db[collection][idx], ...updates, id };
  writeRaw(db);
  return db[collection][idx];
}

export function remove(collection, id) {
  const db = readRaw();
  if (!db[collection]) return false;
  const before = db[collection].length;
  db[collection] = db[collection].filter((item) => item.id !== id);
  writeRaw(db);
  return db[collection].length < before;
}

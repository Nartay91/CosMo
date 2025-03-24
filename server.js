import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 8000;

// Middleware: разрешаем CORS и парсим JSON-тело запроса
app.use(cors());
app.use(express.json());

// In-memory хранилище филиалов
let branches = [];

/**
 * GET /branches/management/branches?name={string}
 * Возвращает список филиалов, фильтруя по полю "title" если передан параметр name.
 */
app.get('/branches/management/branches', (req, res) => {
  const { name = '' } = req.query;
  let filteredBranches = branches;
  if (name) {
    const lowerName = name.toLowerCase();
    filteredBranches = branches.filter(branch =>
      branch.title.toLowerCase().includes(lowerName)
    );
  }
  res.json({
    total: filteredBranches.length,
    elements: filteredBranches
  });
});

/**
 * POST /branches/management/branches
 * Создаёт новый филиал.
 * Ожидается тело запроса: { title: string, address: string, manager: string }
 * Сохраняется поле manager_full_name (равное manager) и employees_ (по умолчанию "0").
 */
app.post('/branches/management/branches', (req, res) => {
  const { title, address, manager } = req.body;
  if (!title || !address || !manager) {
    return res.status(400).json({ message: "Missing required fields: title, address, and manager are required." });
  }

  const newBranch = {
    id: uuidv4(),
    title,
    address,
    manager_full_name: manager,
    employees_: "0"
  };

  branches.push(newBranch);
  res.status(201).json(newBranch);
});

/**
 * PUT /branches/management/branches/:id
 * Обновляет данные филиала по его ID.
 * Ожидается тело запроса: { title: string, address: string, manager: string }
 */
app.put('/branches/management/branches/:id', (req, res) => {
  const { id } = req.params;
  const { title, address, manager } = req.body;

  const index = branches.findIndex(branch => branch.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Branch not found" });
  }

  branches[index] = {
    ...branches[index],
    title,
    address,
    manager_full_name: manager
  };

  res.json(branches[index]);
});

/**
 * DELETE /branches/management/branches?branch_id={uuid}&branch_id={uuid}
 * Удаляет один или несколько филиалов по их ID.
 */
app.delete('/branches/management/branches', (req, res) => {
  let { branch_id } = req.query;
  if (!branch_id) {
    return res.status(400).json({ message: "branch_id query parameter is required" });
  }

  // branch_id может быть строкой, а может быть массивом
  if (!Array.isArray(branch_id)) {
    branch_id = [branch_id];
  }

  const initialCount = branches.length;
  branches = branches.filter(branch => !branch_id.includes(branch.id));
  const deletedCount = initialCount - branches.length;

  res.json({ success: true, deletedCount });
});

/**
 * Дополнительный эндпоинт для сброса данных (только для разработки)
 */
app.delete('/branches/management/branches/reset', (req, res) => {
  branches = [];
  res.json({ success: true, message: "All branches have been reset." });
});

app.listen(PORT, () => {
  console.log(`Fake server is running on port ${PORT}`);
});

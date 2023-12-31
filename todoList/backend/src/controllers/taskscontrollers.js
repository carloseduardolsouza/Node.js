//funçoes de controle da api
const { json } = require("express");
const { response } = require("../app");
const tasksModels = require("../models/tasksModels");

const getAll = async (req, res) => {
  const tasks = await tasksModels.getAll();
  return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
  const createdTask = await tasksModels.createTask(req.body);
  return res.status(201).json(createdTask);
};

const deleteTasks = async (req, res) => {
  const { id } = req.params;

  await tasksModels.deleteTasks(id);
  return res.status(204).json();
};

const updateTasks = async (req , res) => {
  const { id } = req.params;

  await tasksModels.updateTasks(id , req.body)
  return res.status(204).json()
}

module.exports = {
  getAll,
  createTask,
  deleteTasks,
  updateTasks
};

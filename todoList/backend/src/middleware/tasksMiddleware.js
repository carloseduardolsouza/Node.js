const express = require('express')

const validadeTitle = (req, res, next) => {
  const { body } = req;

  if (body.title === undefined) {
    return res.status(400).json({ message: "o campo title e obrigatorio" });
  }

  if (body.title === "") {
    return res
      .status(400)
      .json({ message: "o campo title nao pode ser vazio" });
  }

  next();
};

const validadeStatus = (req, res, next) => {
  const { body } = req;

  if (body.status === undefined) {
    return res.status(400).json({ message: "o campo status e obrigatorio" });
  }

  if (body.status === "") {
    return res
      .status(400)
      .json({ message: "o campo status nao pode ser vazio" });
  }

  next();
};

module.exports = {
  validadeTitle,
  validadeStatus
};

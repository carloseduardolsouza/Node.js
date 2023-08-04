const express = require("express")

const response = require("../app")
const allModels = require("../models/requestModels")


const getAll = async (req, res) => {
    const [all] = await allModels.getAll()
    return res.status(200).json(all)

}

const addRopas = async (req, res) => {
    const addRopa = await allModels.addRopas(req.body)
    return res.status(200).json(addRopa)
}

const upRoupas = async (req, res) => {
    const {id} = req.params

    await allModels.upRoupas(id, req.body)

    return res.status(204).json()
}

const deleteRoupa = async (req, res) => {
    const {id} = req.params

    await allModels.deleteRoupa(id)

    return res.status(204).json()
}

module.exports = {
    getAll,
    addRopas,
    upRoupas,
    deleteRoupa
}
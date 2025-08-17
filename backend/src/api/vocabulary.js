// Endpoints for pulling API

import express from "express";
const router = express.Router();

/**
 * Get all vocabulary
 */
router.get('/', (req, res) => {
    res.json({"msg": "All vocabulary"});
})

/**
 * Add new vocabulary
 */
router.post('/', (req, res) => {
    res.status(201).json({"msg": "New vocab added"});
})

/**
 * Update vocab entry
 */

router.put('/', (req, res) => {
    res.status(200).send("Vocab updated");
})

/**
 * Delete vocab entry
 */
router.delete('/', (req, res) => {
    res.status(200).send("Vocab deleted");
})

export default router;
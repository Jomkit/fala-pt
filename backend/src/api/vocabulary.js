// Endpoints for pulling API

import express from "express";
const router = express.Router();

/**
 * Get all vocabulary
 */
router.get('/', (req, res) => {
    res.send("All vocabulary");
})

export { router as default };
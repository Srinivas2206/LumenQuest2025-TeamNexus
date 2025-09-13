const express = require('express');
const router = express.Router();
const {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  getPlansByType
} = require('../controllers/plan.controller');

// GET /api/plans - Get all plans
router.get('/', getAllPlans);

// GET /api/plans/:id - Get plan by ID
router.get('/:id', getPlanById);

// POST /api/plans - Create new plan
router.post('/', createPlan);

// PUT /api/plans/:id - Update plan
router.put('/:id', updatePlan);

// DELETE /api/plans/:id - Delete plan
router.delete('/:id', deletePlan);

// GET /api/plans/type/:productType - Get plans by product type
router.get('/type/:productType', getPlansByType);

module.exports = router;
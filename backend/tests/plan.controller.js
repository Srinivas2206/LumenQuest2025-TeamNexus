const Plan = require('../models/Plan');


const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    res.status(200).json({
      success: true,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const createPlan = async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json({
      success: true,
      data: plan,
      message: 'Plan created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    res.status(200).json({
      success: true,
      data: plan,
      message: 'Plan updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getPlansByType = async (req, res) => {
  try {
    const { productType } = req.params;
    const plans = await Plan.find({ 
      productType: productType.toUpperCase(), 
      isActive: true 
    });
    res.status(200).json({
      success: true,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
  getPlansByType
};
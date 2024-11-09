import express from 'express';
import { getRevenueByCategory, getRevenueBySubCategory, getRevenueByMonth } from '../controllers/revenueController.js';
import adminAuth from '../middleware/adminAuth.js';

const revenueRouter = express.Router();

revenueRouter.get('/month/:year', adminAuth, getRevenueByMonth);
revenueRouter.get('/category', adminAuth, getRevenueByCategory);
revenueRouter.get('/subcategory', adminAuth, getRevenueBySubCategory);

export default revenueRouter;
import express from 'express';
import {
  createCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
  deleteCalendarEvent
} from '../controllers/calendar.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const calendarRouter = express.Router();

// Protect all calendar routes
calendarRouter.use(isAuth);

calendarRouter.post('/', createCalendarEvent);
calendarRouter.get('/', getCalendarEvents);
calendarRouter.patch('/:id', updateCalendarEvent);
calendarRouter.delete('/:id', deleteCalendarEvent);

export default calendarRouter;

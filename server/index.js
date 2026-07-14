import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  pickup: { type: String, required: true, trim: true },
  drop: { type: String, required: true, trim: true },
  journeyDate: { type: Date, required: true },
  passengers: { type: Number, default: 1 },
  carType: { type: String, default: 'Comfort' }
}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ message: 'Booking request received', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ridewise')
  .then(() => app.listen(port, () => console.log(`API running on ${port}`)))
  .catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1); });

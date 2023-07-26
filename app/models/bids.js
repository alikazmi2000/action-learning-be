const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');
const { Roles, Status, Category, JobTypes } = require('../enums');
const { address } = require('../middleware/db');
const Schema = mongoose.Schema;

const WorkerBidSchema = new mongoose.Schema({
  bidPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  workingHours: {
    type: Number,
    required: true,
    min: 0,
  },
  milestones: {
    type: [String],
    required: true,
    default: [''],
  },
  appointmentDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const VendorBidSchema = new mongoose.Schema({
  bidPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  equipments: {
    type: [],
    required: true,
    default: [''],
  },
  descriptionOfDelivery:{
    type:String,
    default:''
  },
  appointmentDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const BidsSchema = new mongoose.Schema(
  {
    bidType: {
      type: String,
      enum: ['worker_bid', 'vendor_bid'],
    },
    jobId: {
      type: Schema.ObjectId,
      ref: 'job',
    },
    bidder: {
      type: Schema.ObjectId,
      ref: 'user',
    },
    workerBid: WorkerBidSchema,
    vendorBid: VendorBidSchema,
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'in_review', 'approved', 'accepted'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Add indexes for frequently queried fields (e.g., jobId, status)
BidsSchema.index({ jobId: 1 });
BidsSchema.index({ status: 1 });

BidsSchema.plugin(mongoosePaginate);
BidsSchema.plugin(mongooseDelete, { overrideMethods: true });

module.exports = mongoose.model('Bids', BidsSchema);

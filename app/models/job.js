const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseDelete = require('mongoose-delete');
const { Roles, Status, Category, JobTypes } = require('../enums');
const { address } = require('../middleware/db');
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        description: { type: String, require: true },
        category: { type: String, require: true, enum: Object.values(Category) },
        assignedTo: {
            type: Schema.ObjectId,
            ref: "user",
        },
        scheduleTime: {
            type: Date,
        },
        jobRequester: {
            type: Schema.ObjectId,
            ref: "user",
            required: true
        },
        
        jobManager: {
            type: Schema.ObjectId,
            ref: "user",
        },
        jobVendor: {
            type: Schema.ObjectId,
            ref: "user",
        },
        type: { type: String, enum: Object.values(JobTypes), require: true },

        status: { type: String, enum: Object.values(Status) } // Status of the User active, inactive, blocked etc
    },
    {
        versionKey: false,
        timestamps: true
    }
);



JobSchema.plugin(mongoosePaginate);
JobSchema.plugin(mongooseDelete, { overrideMethods: true });
module.exports = mongoose.model('Job', JobSchema);
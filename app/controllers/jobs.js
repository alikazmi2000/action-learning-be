// controllers/jobController.js
const Job = require('../models/job');

exports.createJob = async (req, res) => {
  try {
    console.log(req.user._id)
    console.log(['manager', 'customer'].includes(req.user.role))
    if (req.user._id && ['manager', 'customer'].includes(req.user.role)) {
      let jobData = req.body;
      jobData = {
        ...jobData,
        jobRequester: req.user._id,
        status: 'new'
      }
      console.log(jobData)
      let job = new Job(jobData);

      await job.save();
      res.status(200).json({ message: 'Job created successfully', job });
    }
    else {
      res.status(500).json({ message: 'Failed to create job' });

    }
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Failed to create job' });
  }
};



exports.getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;


    const options = {
      skip: (page - 1) * limit,
      limit,
    };

    const aggregationPipeline = [
      {
        $lookup: {
          from: 'users',
          let: { jobRequesterId: '$jobRequester' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$jobRequesterId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
          as: 'jobRequester',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { jobManagerId: '$jobManager' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$jobManagerId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              }
              ,
            },
          ],
          as: 'jobManager',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { jobVendorId: '$jobVendor' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$jobVendorId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
          as: 'jobVendor',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { assignedToId: '$assignedTo' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$assignedToId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
          as: 'assignedTo',
        },
      },
      {
        $facet: {
          data: [
            { $skip: options.skip },
            { $limit: options.limit },
            {
              $addFields: {
                jobRequester: { $arrayElemAt: ['$jobRequester', 0] },
                jobManager: { $arrayElemAt: ['$jobManager', 0] },
                jobVendor: { $arrayElemAt: ['$jobVendor', 0] },
                assignedTo: { $arrayElemAt: ['$assignedTo', 0] },
              },
            },
          ],
          pageInfo: [
            { $count: 'totalDocs' },
            {
              $addFields: {
                totalPages: { $ceil: { $divide: ['$totalDocs', limit] } },
                currentPage: page,
              },
            },
          ],
        },
      },
      {
        $project: {
          data: 1,
          pageInfo: 1,
        },
      },
    ];

    const jobs = await Job.aggregate(aggregationPipeline);
    const pageInfo = jobs.length > 0 ? jobs && jobs[0] && jobs[0].pageInfo[0] : { totalDocs: 0, totalPages: 0, currentPage: 1 };
    console.log(pageInfo)
    res.status(200).json({
      message: 'Jobs fetched successfully',
      data: jobs.length > 0 ? jobs[0].data : [],
      pagination: {
        currentPage: pageInfo.currentPage,
        totalPages: pageInfo.totalPages,
        totalItems: pageInfo.totalDocs,
        hasNextPage: pageInfo.currentPage < pageInfo.totalPages,
        hasPrevPage: pageInfo.currentPage > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let query = {

    }
    if (req.user.role == 'manager') {
      query = {
        ...query,
        jobManager: req.user._id
      }
    } else if (req.user.role == 'customer') {
      query = {
        ...query,
        jobRequester: req.user._id
      }
    } else if (req.user.role == 'vendor') {
      query = {
        ...query,
        jobVendor: req.user._id
      }
    } else if (req.user.role == 'worker') {
      query = {
        ...query,
        assignedTo: req.user._id
      }
    }
    const options = {
      skip: (page - 1) * limit,
      limit,
    };

    const aggregationPipeline = [
      {
        $match: query
      }
      ,
      {
        $lookup: {
          from: 'users',
          let: { jobRequesterId: '$jobRequester' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$jobRequesterId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
          as: 'jobRequester',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { jobManagerId: '$jobManager' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$jobManagerId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              }
              ,
            },
          ],
          as: 'jobManager',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { jobVendorId: '$jobVendor' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$jobVendorId'] },
              },
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
          as: 'jobVendor',
        },
      },
      {
        $facet: {
          data: [
            { $skip: options.skip },
            { $limit: options.limit },
            {
              $addFields: {
                jobRequester: { $arrayElemAt: ['$jobRequester', 0] },
                jobManager: { $arrayElemAt: ['$jobManager', 0] },
                jobVendor: { $arrayElemAt: ['$jobVendor', 0] },
              },
            },
          ],
          pageInfo: [
            { $count: 'totalDocs' },
            {
              $addFields: {
                totalPages: { $ceil: { $divide: ['$totalDocs', limit] } },
                currentPage: page,
              },
            },
          ],
        },
      },
      {
        $project: {
          data: 1,
          pageInfo: 1,
        },
      },
    ];

    const jobs = await Job.aggregate(aggregationPipeline);
    const pageInfo = jobs.length > 0 ? jobs && jobs[0]  &&jobs[0].pageInfo[0] : { totalDocs: 0, totalPages: 0, currentPage: 1 };

    res.status(200).json({
      message: 'Jobs fetched successfully',
      data: jobs.length > 0 ? jobs[0].data : [],
      pagination: {
        currentPage: pageInfo && pageInfo.currentPage || 1,
        totalPages: pageInfo && pageInfo.totalPages || 1,
        totalItems: pageInfo && pageInfo.totalDocs || 0,
        hasNextPage: pageInfo && pageInfo.currentPage < pageInfo.totalPages,
        hasPrevPage: pageInfo && pageInfo.currentPage > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.body._id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job fetched successfully', data: job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job updated successfully', data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};
exports.startJob = async (req, res) => {
  try {
    if (req.user.role != 'manager') {
      res.status(500).json({ message: 'Not Authorised' });

    }
    const job = await Job.findOne({ _id: req.body._id });
    // const job = await Job.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findByIdAndUpdate(req.body._id, { status: 'in_review', jobManager: req.user._id }, { new: true });

    res.status(200).json({ message: 'Job updated successfully', data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};
exports.scheduleJob = async (req, res) => {
  try {
    if (req.user.role != 'manager') {
      res.status(500).json({ message: 'Not Authorised' });

    }
    const job = await Job.findOne({ _id: req.body._id });
    // const job = await Job.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findByIdAndUpdate(req.body._id, { status: 'scheduled', jobManager: req.user._id, scheduleTime: req.body.scheduleTime }, { new: true });

    res.status(200).json({ message: 'Job updated successfully', data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};

exports.submitSurvey = async (req, res) => {
  try {
    if (req.user.role != 'manager') {
      res.status(500).json({ message: 'Not Authorised' });

    }
    const job = await Job.findOne({ _id: req.body._id });
    // const job = await Job.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findByIdAndUpdate(req.body._id, {
      status: 'active', jobManager: req.user._id,
      publishToVendors: req.body.publishToVendors
      , publishToWorkers: req.body.publishToWorkers, surveyForm: req.body.surveyForm
    }, { new: true });

    res.status(200).json({ message: 'Job updated successfully', data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};


exports.cancelJob = async (req, res) => {
  try {
    if (req.user.role != 'manager') {
      res.status(500).json({ message: 'Not Authorised' });

    }
    const job = await Job.findOne({ _id: req.body._id });
    // const job = await Job.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    await Job.findByIdAndUpdate(req.body._id, {
      status: 'cancelled', jobManager: req.user._id,
      cancelReason: req.body.cancelReason
    }, { new: true });

    res.status(200).json({ message: 'Job updated successfully', data: job });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Failed to update job' });
  }
};



exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndRemove(req.body._id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully', data: job });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

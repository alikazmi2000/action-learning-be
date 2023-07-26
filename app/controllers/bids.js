const Bids = require('../models/bids');
const Jobs = require('../models/job');

exports.createBid = async (req, res) => {
    try {
        if (req.user._id && ['worker', 'vendor'].includes(req.user.role)) {
            const bidData = req.body;
            const bidType = req.user.role === 'worker' ? 'worker_bid' : 'vendor_bid';
            let jobData = {

                bidType,
                bidder: req.user._id,
                jobId: req.body.jobId,
                status: 'pending',
            };
            if (bidType === 'worker_bid') {
                jobData = {
                    ...jobData,
                    workerBid: bidData
                }
            } else {
                jobData = {
                    ...jobData,
                    vendorBid: bidData
                }
            }

            const bid = new Bids(jobData);
            await bid.save();

            res.status(201).json({ message: 'Bid created successfully', bid });
        } else {
            res.status(403).json({ message: 'Not authorized to create a bid' });
        }
    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ message: 'Failed to create bid' });
    }
};

exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bids.find({ jobId: req.body.jobId }).exec();
        res.status(200).json({ message: 'Bids fetched successfully', bids });
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ message: 'Failed to fetch bids' });
    }
};

exports.getBidById = async (req, res) => {
    try {
        const bid = await Bids.findById(req.body._id).exec();
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.status(200).json({ message: 'Bid fetched successfully', bid });
    } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ message: 'Failed to fetch bid' });
    }
};

exports.updateBidById = async (req, res) => {
    try {
        const bid = await Bids.findById(req.body._id).exec();
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        if (req.user._id.equals(bid.jobId)) {
            const updatedBid = await Bids.findByIdAndUpdate(req.body._id, req.body, {
                new: true,
            }).exec();

            res.status(200).json({ message: 'Bid updated successfully', bid: updatedBid });
        } else {
            res.status(403).json({ message: 'Not authorized to update this bid' });
        }
    } catch (error) {
        console.error('Error updating bid:', error);
        res.status(500).json({ message: 'Failed to update bid' });
    }
};

exports.deleteBidById = async (req, res) => {
    try {
        const bid = await Bids.findById(req.body._id).exec();
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        if (req.user._id.equals(bid.jobId)) {
            await Bids.findByIdAndDelete(req.body._id).exec();
            res.status(200).json({ message: 'Bid deleted successfully' });
        } else {
            res.status(403).json({ message: 'Not authorized to delete this bid' });
        }
    } catch (error) {
        console.error('Error deleting bid:', error);
        res.status(500).json({ message: 'Failed to delete bid' });
    }
};
exports.getUserBidById = async (req, res) => {
    try {
        const bid = await Bids.findOne({ jobId: req.body.jobId, bidder: req.user._id }).exec();
        if (!bid) {
            return res.status(200).json({ message: 'Bid not found', data: {} });
        }
        res.status(200).json({ message: 'Bid fetched successfully', data: bid });
    } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ message: 'Failed to fetch bid' });
    }
};



exports.getBidsByJobId = async (req, res) => {
    try {
        const jobId = req.query.jobId;
        console.log(jobId,'=====')
        const totalCountPipeline = [
            { $match: { jobId: jobId } },
            { $count: 'totalBids' }
        ];
        const totalCountResult = await Bids.aggregate(totalCountPipeline);

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const bidsPipeline = [
            { $match: { jobId: jobId } },
            { $skip: skip },
            { $limit: limit }
        ];

        const jobData = await Jobs.findOne({ _id: jobId }).exec();
        const bids = await Bids.aggregate(bidsPipeline);
        console.log(bids);

        if (!bids || bids.length === 0) {
            return res.status(200).json({
                msg: "Bid not found",
                data: { bids: [], jobData },
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalItems: 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                },
                status: 200,
            });
        }

        const totalPages = totalCountResult[0] && Math.ceil(totalCountResult[0].totalBids/limit) || 0;

        res.status(200).json({
            msg: "Bid fetched successfully",
            data: { bids, jobData },
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalCountResult &&totalCountResult[0] && totalCountResult[0].totalBids || 0,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ msg: 'Failed to fetch bid', status: 500 });
    }
};

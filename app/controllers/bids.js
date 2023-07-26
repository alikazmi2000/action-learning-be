const Bids = require('../models/bids');

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

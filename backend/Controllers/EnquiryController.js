const UserEnquiry=require("../Models/Enquiry.js")

// CREATE a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { userId, propertyId, enquiryMessage,status } = req.body;

    if (!userId || !propertyId || !enquiryMessage) {
      return res.status(400).json({ message: 'UserId, PropertyId, and EnquiryMessage are required.' });
    }

    const newEnquiry = new UserEnquiry({
      userId,
      propertyId,
      enquiryMessage,
      status
    });

    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry created successfully', enquiry: newEnquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating enquiry' });
  }
};

// READ all enquiries (for admin or user)
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await UserEnquiry.find().populate('userId', 'username email').populate('propertyId', 'name price location');

    res.status(200).json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enquiries' });
  }
};

// READ a specific enquiry by ID
const getEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await UserEnquiry.findById(id).populate('userId', 'username email').populate('propertyId', 'name price location');

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enquiry' });
  }
};

// UPDATE the status of an enquiry (for admin)
const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if status is valid
    const validStatuses = ['Pending', 'Resolved', 'Answered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const enquiry = await UserEnquiry.findByIdAndUpdate(id, { status, updatedAt: Date.now() }, { new: true });

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry status updated successfully', enquiry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating enquiry' });
  }
};

// DELETE an enquiry (for admin)
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await UserEnquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting enquiry' });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
};

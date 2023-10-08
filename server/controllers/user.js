import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await User.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });

    if (!contacts.length) {
      res.status(201).json([]);
    } else {
      res.status(201).json(contacts);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addNewContact = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    let resMessage = "";

    const userExist = await User.find({ phoneNumber: phoneNumber });

    if (userExist.length) {
      resMessage = "User already exists.";
    } else {
      const newContact = new User({
        firstName : firstName,
        lastName : lastName || "",
        phoneNumber : phoneNumber,
        email : email || "",
      });
  
      await newContact.save();

      resMessage = "Successfully, User contact added.";
    }

    res.status(201).json({ message: resMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, {_id: 0, __v:0, createdAt:0, updatedAt:0});
    let updatedUserContact;

    if (req.body && user) {
      updatedUserContact = Object.assign(user, req.body);

      await User.findByIdAndUpdate(
        id,
        updatedUserContact,
        {new: true}
      );

      res.status(200).json({ message: "User details updated successfully." });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong while updating the contact details." });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResult = await User.deleteOne({ _id: id });

    if (deletedResult.deletedCount === 1) {
      console.log("Successfully user contact deleted.");
      
      return res.status(202).json({ message: 'User successfully deleted.' });
    } else {
      const errorMsg = `No contact found. Deleted ${deletedResult.deletedCount} contact`;
      console.log(errorMsg);
      
      return res.status(400).json({ message: errorMsg });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

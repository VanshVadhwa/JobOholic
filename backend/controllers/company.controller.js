import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Validation
    if (!companyName || companyName.trim() === "") {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    // Check for existing company with the same name for the logged-in user
    let company = await Company.findOne({ name: companyName, userId: req.id });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company twice.",
        success: false,
      });
    }

    // Create company
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged-in user id
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let logo;
    if (req.file) {
      logo = `/uploads/${req.file.filename}`; // Save the file path
    }

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};


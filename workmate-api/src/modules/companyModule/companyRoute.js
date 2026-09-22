const { createCompany } = require("./companyController");
const express = require("express");

const router = express.Router();

router.post("/create-company", createCompany);

//update company data

module.exports = router;

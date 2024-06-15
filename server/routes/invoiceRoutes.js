const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

router.get("/", invoiceController.getAllInvoices);
router.post("/", invoiceController.addInvoice);
router.put("/:id", invoiceController.editInvoice);
router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;

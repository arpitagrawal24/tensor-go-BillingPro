const Invoice = require("../models/Invoice");

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.send(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.addInvoice = async (req, res) => {
  const {
    id,
    googleId,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;

  try {
    let newInvoice = new Invoice({
      id,
      googleId,
      createdAt,
      paymentDue,
      description,
      paymentTerms,
      clientName,
      clientEmail,
      status,
      senderAddress,
      clientAddress,
      items,
      total,
    });

    const invoice = await newInvoice.save();
    res.send(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.editInvoice = async (req, res) => {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = req.body;
  const invoiceFields = {};
  if (id) invoiceFields.id = id;
  if (createdAt) invoiceFields.createdAt = createdAt;
  if (paymentDue) invoiceFields.paymentDue = paymentDue;
  if (description) invoiceFields.description = description;
  if (paymentTerms) invoiceFields.paymentTerms = paymentTerms;
  if (clientName) invoiceFields.clientName = clientName;
  if (clientEmail) invoiceFields.clientEmail = clientEmail;
  if (status) invoiceFields.status = status;
  if (senderAddress) invoiceFields.senderAddress = senderAddress;
  if (clientAddress) invoiceFields.clientAddress = clientAddress;
  if (items) invoiceFields.items = items;
  if (total) invoiceFields.total = total;

  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });
    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { $set: invoiceFields },
      { new: true }
    );
    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ msg: "Invoice not found" });
    await Invoice.findByIdAndRemove(req.params.id);
    res.json({ msg: "Invoice removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const contact = require("../model/contact.js");

exports.create = (req, res) => {
    const contactInfo = new contact({
        name: req.body.name,
        mobile_number: req.body.mobile_number
    });

    contact.create(contactInfo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the contact."
            });
        else {
            res.status(200).send({
                message: "Successfully contact added"
            });
        }
    });
};

exports.findAll = (req, res) => {
    contact.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving contacts."
            });
        else res.send(data);
    });
};

exports.filterPhonebook = (req, res) => {
    contact.findByFilterItem(req.query.filterItem, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found contact with search item ${req.query.filterItem}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving contact with search " + req.query.filterItem
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    contact.updateById(
        req.query.contactId,
        new contact(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found contact with id ${req.params.contactId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating contact with id " + req.params.contactId
                    });
                }
            }
            else {
                res.status(200).send({
                    message: "Successfully contact edited"
                });
            }
        }
    );
};

exports.delete = (req, res) => {
    contact.remove(req.query.contactId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Contact with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Contact with id " + req.params.contactId
                });
            }
        }
        else {
            res.status(200).send({
                message: "Successfully contact deleted"
            });
        }
    });
};

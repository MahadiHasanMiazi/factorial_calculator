const sql = require("./db.js");
const contactInfo = function(contact) {
    this.name = contact.name;
    this.mobile_number = contact.mobile_number;
};



contactInfo.create = (newPhonebook, result) => {
    sql.query("INSERT INTO phonebook SET ?", newPhonebook, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newPhonebook });
    });
};

contactInfo.getAll = result => {
    console.log('get all contact');
    sql.query("SELECT * FROM phonebook", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        result(null, res);
    });
};


contactInfo.findByFilterItem = (filterItem, result) => {
    sql.query(`SELECT * FROM phonebook WHERE name LIKE '${filterItem}%' OR mobile_number LIKE '%${filterItem}%'`, (err, res) => {
        if (err) {""
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

contactInfo.updateById = (id, contact, result) => {
    sql.query(
        "UPDATE phonebook SET name = ?, mobile_number = ? WHERE id = ?",
        [contact.name, contact.mobile_number, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found contact with the id
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...contact });
        }
    );
};


contactInfo.remove = (id, result) => {
    sql.query("DELETE FROM phonebook WHERE id = ?", id, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found contact with the id
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = contactInfo;

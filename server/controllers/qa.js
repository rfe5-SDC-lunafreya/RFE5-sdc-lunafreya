const QAService = require("../models/qa");

class QAController {
  constructor() {}

  hello(req, res) {
    const data = QAService.exmaple();
    res.send(data);
  }
}

module.exports = new QAController();

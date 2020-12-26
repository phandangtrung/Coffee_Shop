const Test = require("../models/test");

const createtest = async (req, res, next) => {
  const createTest = {
    name: req.body.name,
  };
  try {
    const newTest = new Test(createTest);
    await newTest.save();
    res.status(200).json({
      message: "Create success",
      newTest,
    });
    console.log(newTest);
  } catch (error) {}
};

const updatetestById = async (req, res, next) => {
  const TestId = req.params.tid;
  const updatedTest = {
    name: req.body.name,
  };
  let tests;
  tests = await Test.findByIdAndUpdate(TestId, updatedTest);
  res.status(200).json({
    message: "update success",
    tests: updatedTest,
  });
};

module.exports = { createtest, updatetestById };

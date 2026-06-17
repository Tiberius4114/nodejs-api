const express = require("express");

const router = express.Router();

router.get("/courses", (_, res) => {
  return res.json({
    data: [
      {
        title: "course item from v1",
      },
    ],
  });
});

module.exports = router;

const { authenticateJWT } = require("../services/auth");
const router = require("express").Router();
const { Vote } = require("../models/vote");
const { Candidate } = require("../models/candidate");

router.get("/counts", authenticateJWT, async (req, res) => {
  try {
    if (!(req.user && req.user.role == "Admin"))
      return res.status(401).json({ message: "access denied" });
    const counts = await Vote.aggregate([
      {
        $group: {
          _id: "$candidateId",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(counts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post("/", authenticateJWT, async (req, res) => {
  try {
    //check if user is already voted
    let vote = await Vote.findOne({ userId: req.user._id, status: "Active" });
    if (vote) return res.status(400).json({ message: "user already voted" });
    const data = {
      userId: req.user._id,
      candidateId: req.body.candidateId,
    };
    vote = new Vote(data);
    res.json(await vote.save());
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;

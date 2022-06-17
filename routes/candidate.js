const { authenticateJWT } = require("../services/auth");
const { Candidate } = require("../models/candidate");
const { User } = require("../models/user");
const router = require("express").Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const candidates = await Candidate.find(
      { status: "Active" },
      {
        partyName: 1,
        area: 1,
        image: 1,
      },
      {
        sort: { _id: -1 },
      }
    ).populate({ path: "userId", select: "_id name" });

    res.json(candidates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.post("/", authenticateJWT, async (req, res) => {
  try {
    console.log(req.user);
    if (!(req.user && req.user.role == "Admin"))
      return res.status(401).json({ message: "access denied" });
    const { user, partyName, image, area } = req.body;
    const candidateUser = new User(user);
    await candidateUser.save();
    const candidate = new Candidate({
      userId: candidateUser._id,
      partyName,
      image,
      area,
    });
    res.json(await candidate.save());
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:candidateId", authenticateJWT, async (req, res) => {
  try {
    if (!(req.user && req.user.role == "Admin"))
      return res.status(401).json({ message: "access denied" });

    await Candidate.deleteOne({ _id: req.params.candidateId });

    res.json({ message: "candidate deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;

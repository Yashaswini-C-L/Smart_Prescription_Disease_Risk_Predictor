// @desc    Get dashboard summary metrics for patient
// @route   GET /api/dashboard/summary
// @access  Private
const getDashboardSummary = async (req, res) => {
  try {
    // Member 1 provides foundational dashboard stats.
    // As other members implement records and assessments, this cleanly aggregates data.
    const summaryData = {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      },
      stats: {
        totalPrescriptions: 0,
        totalLabReports: 0,
        activeMedicationsCount: 0,
        drugInteractionsDetected: 0
      },
      latestAssessment: {
        disease: "Type 2 Diabetes / Cardiovascular Risk",
        riskScore: 28,
        riskCategory: "Low",
        assessedDate: new Date()
      },
      recentRecords: [],
      healthRoadmapSummary: [
        { interval: "3 Months", task: "Routine Fasting Blood Sugar (FBS) review", status: "Upcoming" },
        { interval: "6 Months", task: "Lipid Profile panel & BP monitoring", status: "Scheduled" },
        { interval: "1 Year", task: "Comprehensive Annual Physical Examination", status: "Pending" }
      ]
    };

    res.status(200).json({
      success: true,
      data: summaryData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving dashboard summary',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardSummary
};

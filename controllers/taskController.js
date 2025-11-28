import { getPendingTasks, getPendingTasksForUser } from "../services/taskService.js";

/**
 * ✅ Controller for pending tasks where:
 * Task_Start_Date IS NOT NULL AND Actual_Date IS NULL
 */
export const fetchPendingTasks = async (req, res) => {
  try {
    const user = req.user; // from auth middleware (we will add below)

    let pendingTasks;

    if (user.role === "admin") {
      // Admin → full access
      pendingTasks = await getPendingTasks();
    } else {
      // User → only their own tasks
      pendingTasks = await getPendingTasksForUser(user.username);
    }

    res.status(200).json({ success: true, data: pendingTasks });
  } catch (error) {
    console.error("❌ Error fetching pending tasks:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

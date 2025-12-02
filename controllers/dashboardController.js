import pool from "../config/db.js";

/**
 * ✅ Get overall dashboard summary stats
 */
export const getDashboardStats = async (req, res) => {
  try {

    const summaryQuery = `
      SELECT 
        COUNT(*) AS total_tasks,
        COUNT(*) FILTER (WHERE "Actual_Date" IS NOT NULL) AS completed_tasks,
        COUNT(*) FILTER (WHERE "Actual_Date" IS NULL) AS pending_tasks,
        COUNT(*) FILTER (WHERE "Task_Start_Date" < NOW() AND "Actual_Date" IS NULL) AS overdue_tasks,
        COALESCE(SUM("Maintenance_Cost"), 0) AS total_maintenance_cost
      FROM maintenance_task_assign;
    `;

    const totalMachineQuery = `
      SELECT COUNT(DISTINCT TRIM(LOWER(serial_no))) AS total_machines
      FROM form_responses
      WHERE serial_no IS NOT NULL AND TRIM(serial_no) <> '';
    `;

    // Run both queries
    const [summaryRes, machinesRes] = await Promise.all([
      pool.query(summaryQuery),
      pool.query(totalMachineQuery)
    ]);

    const summary = summaryRes.rows[0];
    const totalMachines = machinesRes.rows[0].total_machines;

    // Final fix on numbers to ensure they are proper numbers
    res.json({
      success: true,
      data: {
        total_machines: Number(totalMachines),
        total_tasks: Number(summary.total_tasks),
          completed_tasks: Number(summary.completed_tasks),
          pending_tasks: Number(summary.pending_tasks),
          overdue_tasks: Number(summary.overdue_tasks),
        total_maintenance_cost: Number(summary.total_maintenance_cost)
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getMaintenanceCostByMachine = async (req, res) => {
  try {
    const query = `
      SELECT
        "Serial_No" AS name,
        SUM("Maintenance_Cost") AS maintenance_cost
      FROM maintenance_task_assign
      WHERE "Actual_Date" IS NOT NULL
      GROUP BY "Serial_No"
      ORDER BY maintenance_cost DESC;
    `;
    const { rows } = await pool.query(query);
    const formatted = rows.map(r => ({
      name: r.name || "Unknown",
      maintenanceCost: Number(r.maintenance_cost) || 0
    }));
    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching maintenance cost by machine:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * ✅ Get cost breakdown by department
 */
export const getDepartmentCostBreakdown = async (req, res) => {
  try {
    const query = `
      SELECT 
        "machine_department" AS name, 
        SUM(COALESCE("Maintenance_Cost", 0)) AS cost
      FROM maintenance_task_assign
      WHERE "Actual_Date" IS NOT NULL
      GROUP BY "machine_department"
      ORDER BY cost DESC;
    `;
    const { rows } = await pool.query(query);
    res.json({ success: true, data: rows.map(r => ({
      name: r.name || "Unknown",
      cost: Number(r.cost) || 0
    })) });
  } catch (error) {
    console.error("Error fetching department cost breakdown:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * ✅ Get maintenance frequency statistics
 */
export const getFrequencyStats = async (req, res) => {
  try {
    const query = `
      SELECT 
        LOWER("Frequency") AS name, 
        COUNT(*) AS repairs
      FROM maintenance_task_assign
      WHERE "Actual_Date" IS NOT NULL
      GROUP BY LOWER("Frequency");
    `;
    const { rows } = await pool.query(query);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching frequency stats:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
import pool from "../config/db.js";

// ⭐ GET ALL DEPARTMENTS
export const getDepartments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, department
      FROM public.master
      WHERE department IS NOT NULL 
      AND TRIM(department) <> ''
      GROUP BY id, department
      ORDER BY id ASC
    `);

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("❌ getDepartments error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ⭐ ADD NEW DEPARTMENT
export const addDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO public.master (department)
      VALUES ($1)
      RETURNING id, department
      `,
      [name]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ addDepartment error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ⭐ UPDATE DEPARTMENT
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE public.master
      SET department = $1
      WHERE id = $2
      RETURNING id, department
      `,
      [name, id]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ updateDepartment error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ⭐ DELETE DEPARTMENT
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`UPDATE public.master SET department='' WHERE id=$1`, [id]);
    res.json({ success: true, message: "Department deleted" });
  } catch (err) {
    console.error("❌ deleteDepartment error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

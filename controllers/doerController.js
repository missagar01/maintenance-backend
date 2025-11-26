// controllers/doerController.js
import pool from "../config/db.js";

//
// ⭐ GET ALL DOERS (only valid names)
//
export const getDoers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, doer_name, department1 
      FROM public.master
      WHERE doer_name IS NOT NULL 
      AND TRIM(doer_name) <> ''
      ORDER BY id ASC
    `);

    res.json({ success: true, data: result.rows });

  } catch (err) {
    console.error("❌ getDoers error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


//
// ⭐ ADD DOER
//
export const addDoer = async (req, res) => {
  const { name, department1 } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO public.master (doer_name, department1)
       VALUES ($1, $2)
       RETURNING id, doer_name, department1`,
      [name, department1]
    );

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("❌ addDoer error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


//
// ⭐ UPDATE DOER
//
export const updateDoer = async (req, res) => {
  const { id } = req.params;
  const { name, department1 } = req.body;

  try {
    const result = await pool.query(
      `UPDATE public.master
       SET doer_name = $1,
           department1 = $2
       WHERE id = $3
       RETURNING id, doer_name, department1`,
      [name, department1, id]
    );

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("❌ updateDoer error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};


//
// ⭐ DELETE DOER
//
export const deleteDoer = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM public.master WHERE id=$1`, [id]);

    res.json({ success: true, message: "Doer deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


import pool from "../config/db.js";

// ➤ Fetch all users
export const getAllUsersService = async () => {
  const result = await pool.query(`SELECT * FROM public.login ORDER BY id ASC`);
  return result.rows;
};

// ➤ Add new user
export const addUserService = async ({ username, password, role, pageAccess }) => {
  const query = `
    INSERT INTO public.login (username, password, role, page_access)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [username, password, role, pageAccess];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// ➤ Update user
export const updateUserService = async (id, { username, password, role, pageAccess }) => {
  const query = `
    UPDATE public.login
    SET username=$1, password=$2, role=$3, page_access=$4
    WHERE id=$5
    RETURNING *;
  `;

  const values = [username, password, role, pageAccess, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// ➤ Delete user
export const deleteUserService = async (id) => {
  await pool.query(`DELETE FROM public.login WHERE id=$1`, [id]);
  return true;
};

/** Calculate age based on DOB. */

function calculateAge(dob) {
  const diff_ms = Date.now() - new Date(dob).getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970)
}

export default calculateAge;
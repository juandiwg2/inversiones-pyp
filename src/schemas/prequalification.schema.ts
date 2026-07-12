/** Calcula la edad en años cumplidos a partir de una fecha de nacimiento yyyy-mm-dd. */
export function calculateAge(birthDateIso: string, referenceDate: Date = new Date()): number {
  const birth = new Date(`${birthDateIso}T00:00:00`)
  let age = referenceDate.getFullYear() - birth.getFullYear()
  const hasHadBirthdayThisYear =
    referenceDate.getMonth() > birth.getMonth() ||
    (referenceDate.getMonth() === birth.getMonth() && referenceDate.getDate() >= birth.getDate())
  if (!hasHadBirthdayThisYear) age -= 1
  return age
}

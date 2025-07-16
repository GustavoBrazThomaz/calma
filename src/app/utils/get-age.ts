export function getAgeFromBirthDate(birthDate: Date | string): number | null {
  const date: Date =
    typeof birthDate === "string" ? new Date(birthDate) : birthDate;

  if (isNaN(date.getTime())) {
    return null;
  }

  const today: Date = new Date();
  let age: number = today.getFullYear() - date.getFullYear();

  const monthDiff: number = today.getMonth() - date.getMonth();
  const dayDiff: number = today.getDate() - date.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

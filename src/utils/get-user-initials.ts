export const getUserInitials = (name: string) => {
  const names = name.split(' ')
  if (names.length === 1) {
    return name.substring(0, 1)
  }

  return names[0].substring(0, 1).concat(names[1].substring(0, 1)).toUpperCase()
}

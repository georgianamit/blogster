const getFormattedDate = (date: string) => {
  return new Date(Date.parse(date)).toLocaleDateString('en-US', {
    timeZoneName: 'long',
  })
}
export default getFormattedDate

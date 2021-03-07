export default {
	// get number of days in month
	countDaysInMonth(date) {
		const initialDate = new Date(date)
		const year = initialDate.getFullYear()
		const month = initialDate.getMonth() + 1
		return new Date(year, month, 0).getDate()
	},

	// get number of days between 2 date
	getNumberOfDays(startDate, endDate) {
		const date1 = new Date(startDate)
		const date2 = new Date(endDate)
		const diff = date2.getTime() - date1.getTime()
		return diff / (1000 * 3600 * 24)
	},

	// convert 1615032037000 to 06/03/2021
	convertEpochToLocaleDateString(date) {
		if (!date) {
			return null
		}
		return new Date(date).toLocaleDateString('id')
	},

	// convert 06/03/2021 to 1615032037000
	convertDateStringToEpoch(date) {
		if (!date) {
			return date
		}
		const temp = date.split('/')
		const dd = temp[0]
		const mm = temp[1]
		const yyyy = temp[2]
		return new Date(`${mm}/${dd} /${yyyy}`).getTime()
	}
}

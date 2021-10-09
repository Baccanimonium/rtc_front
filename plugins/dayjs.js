import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import weekOfYear from "dayjs/plugin/weekOfYear"

const weekday = require("dayjs/plugin/weekday")
const isoWeek = require("dayjs/plugin/isoWeek")

dayjs.extend(isoWeek)
dayjs.extend(weekOfYear)
dayjs.extend(weekday)

dayjs.extend(customParseFormat)

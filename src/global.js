import { format, getYear, formatDistanceToNow } from "date-fns"

export const SANITY_PROJECT_ID = "mm4gom7h"

export const QUERY = {
  ALL:
    "*[_type in ['event', 'participant', 'page']]{...,participants[]->{...}}",
  SINGLE:
    '*[_type == "event" && slug.current == $slug]{...,particiants[]->{...}}[0]',
}

export const COLORS = [
  "#0000ff",
  "#0055ff",
  "#00aaff",
  "#00ffff",
  "#00ff80",
  "#00ff00",
  "#80ff00",
  "#ffff00",
  "#ff8000",
  "#ff0000",
]

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const slugify = (str) =>
  str
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-")

export function debounce(fn, wait = 1) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.call(this, ...args), wait)
  }
}

// const mainFormat = "MMM dd yyyy – HH:mm"
const mainFormat = "dd/MM"
const timeFormat = "HH:mm"

export const formattedDate = (start, end) => {
  try {
    if (!start) {
      return false
    }
    const startDate = Date.parse(start)

    if (!startDate) {
      return false
    }

    return format(startDate, mainFormat)
  } catch (err) {
    console.dir(err)
  }
}

export const formattedTime = (start, end) => {
  try {
    if (!start) {
      return false
    }
    const startDate = Date.parse(start)

    if (!startDate) {
      return false
    }

    return format(startDate, timeFormat)
  } catch (err) {
    console.dir(err)
  }
}

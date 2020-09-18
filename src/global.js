export const STATE = {
  ERROR: 0,
  READY: 1,
  PROGRAM_WEEK: 2,
  PROGRAM_DAY: 3,
  PROGRAM_EVENT: 4,
  ARCHIVE: 5,
  ARCHIVE_EVENT: 6,
  ABOUT: 7,
  ABOUT_PAGE: 8,
}

export const SANITY_PROJECT_ID = "mm4gom7h"

export const QUERY = {
  ALL: "*[_type in ['event', 'participant', 'page']]",
  PROJECT: '*[_type == "project"]{...,authors[]->{...}}',
  AUTHOR: '*[_type == "author"]',
  META: '*[_id == "introduction"]{...,authors[]->{...}}[0]',
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

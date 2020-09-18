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

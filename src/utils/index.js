function popularitySort (a, b) {
  // sort by popularity, if available
  if (a.popularity && b.popularity) {
    return b.popularity - a.popularity
  }
  if (a.popularity && !b.popularity) {
    return -1
  }
  if (!a.popularity && b.popularity) {
    return 1
  }
  // if neither demo has popularity defined, sort by created date
  return createdSort(a, b)
}

// sort demos by the recently updated tag
function updatedSort (a, b) {
  // check if they are recently updated
  const aIsUpdated = Array.isArray(a.tags) && a.tags.includes('updated')
  const bIsUpdated = Array.isArray(b.tags) && b.tags.includes('updated')

  // if a is recently updated but b is not
  if (aIsUpdated && !bIsUpdated) {
    // a is first
    return -1
  }

  // if b is recently updated but a is not
  if (bIsUpdated && !aIsUpdated) {
    // b is first
    return 1
  }

  // if both are recently updated
  // or if neither are recently updated
  // sort by popularity
  return popularitySort(a, b)
}

// sort demos by ones that have "new" tag first
// then by demos with "updated" tag
// then by popularity
// then by created
function newSort (a, b) {
  // demos that are new go first
  const aIsNew = Array.isArray(a.tags) && a.tags.includes('new')
  const bIsNew = Array.isArray(b.tags) && b.tags.includes('new')
  // if a is new but b is not
  if (aIsNew && !bIsNew) {
    // a is first
    return -1
  }

  // if b is new but a is not
  if (bIsNew && !aIsNew) {
    // b is first
    return 1
  }

  // if both are new
  // or if neither are new
  // sort by recently updated
  return updatedSort(a, b)
}

function createdSort (a, b) {
  // if a has created date but b does not
  if (a.created && !b.created) {
    // a is first
    return -1
  }

  // if b has created date but a does not
  if (b.created && !a.created) {
    // b is first
    return 1
  }

  // no created date on either of them? unlikely...
  if (!a.created && !b.created) {
    return 0
  }

  // else they both had created dates set
  // sort by created date, with most recently created first
  return a.created - b.created
}

// sort demos by new tag and recently updated tag first
export function sortDemos (a, b) {
  return newSort(a, b)
}

// sort demos using provided array of favorites
function favoriteSort (favorites) {
  return function (a, b) {
    const aIsFavorite = favorites.includes(a.id)
    // console.log('demo', a.id, 'is favorite')
    const bIsFavorite = favorites.includes(b.id)
    // console.log('demo', b.id, 'is favorite')
    if (
      // if both are favorites
      (aIsFavorite && bIsFavorite) ||
      // or if neither are favorites
      (!aIsFavorite && !bIsFavorite)
    ) {
      // sort by popularity then created
      return popularitySort(a, b)
    }
    // either A or B is favorite, so sort by favorites first
    return aIsFavorite ? -1 : 1
  }
}

// return the file extension from a filename
function getFileExtension (file) {
  try {
    // get file extension
    return file.Key.split('.').pop()
  } catch (e) {
    return null
  }
}

// sleep / noop
export const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// return file icon matching type, if possible
export const getFileType = function (file) {
  switch (getFileExtension(file)) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif': return 'image'
    case 'wav':
    case 'mp3':
    case 'm4a': return 'audio'
    case 'mov':
    case 'mpg':
    case 'mp4':
    case 'avi': return 'video'
    case 'arf': return 'arf'
    case 'xls':
    case 'xlsx': return 'excel'
    case 'pdf': return 'pdf'
    case 'txt': return 'text'
    case 'ppt':
    case 'pptx': return 'powerpoint'
    case 'doc':
    case 'docx': return 'word'
    case 'zip':
    case '7zip':
    case 'rar': return 'zip'
    case 'csv': return 'spreadsheet'
    default: return 'unknown'
  }
}

// convert camelCase string to Title Case
export const camelToTitle = function (text) {
  try {
    const result = text.replace(/([A-Z])/g, ' $1')
    return result.charAt(0).toUpperCase() + result.slice(1)
  } catch (e) {
    // return original string if we failed to do character replacements
    return text
  }
}

// helper function to append query parameters to a URL for fetch
export const addUrlQueryParams = function (endpoint, params) {
  let url = endpoint
  if (typeof params === 'object') {
    // append URL query paramenters
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const value = params[key]
      if (i === 0) {
        url += '?'
      } else {
        url += '&'
      }
      url += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
  }
  return url
}

export const fetch = async function (url, options) {
  if (!url) {
    throw Error('url is a required parameter for fetch')
  }
  // set content type to JSON by default
  options.headers = options.headers || {}
  options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json'

  // add query parameters to URL
  try {
    console.log('url', url)
    const endpoint = addUrlQueryParams(url, options.query)
    console.log('endpoint', endpoint)
    const response = await window.fetch(endpoint, options)
    const text = await response.text()
    if (response.ok) {
      // success status code
      try {
        return JSON.parse(text)
      } catch (e) {
        return text
      }
    } else {
      // error status code
      let m = text
      try {
        m = JSON.parse(text).message
      } catch (e) {
        // continue
      }
      console.log('bad response', m)
      const error = Error(`${response.status} ${response.statusText} - ${m}`)
      error.status = response.status
      error.statusText = response.statusText
      error.text = text
      throw error
    }
  } catch (e) {
    // just rethrow any other errors, like connection timeouts
    throw e
  }
}

export function parseDeviceWebexInfo (device) {
  return getRecipeOutputs(device, 'device/webex-device-get-info', 'Get Webex Device Info')
}

export function getRecipeInputs (item, recipe, taskName) {
  try {
    return getStartTask(getLastCompletedJob(item, recipe), taskName).input
  } catch (e) {
    return null
  }
}

export function getRecipeOutputs (item, recipe, taskName) {
  try {
    return getStartTask(getLastCompletedJob(item, recipe), taskName).output
  } catch (e) {
    return null
  }
}

export function getLastCompletedInfoJob (device) {
  return getLastCompletedJob(device, 'device/webex-device-get-info')
}

export function getLastJob (device, recipe) {
  // return the last job of specified recipe
  try {
    return device.jobs.filter(v => {
      return v.recipe === recipe
    }).slice(-1)[0]
  } catch (e) {
    return null
  }
}

export function getLastCompletedJob (device, recipe) {
  // return the last successfully executed job of specified recipe
  try {
    return device.jobs.filter(v => {
      return v.recipe === recipe && 
        ['executed', 'active'].includes(v.status)
    }).slice(-1)[0]
  } catch (e) {
    return null
  }
}

export function getStartTask (job, taskName) {
  try {
    return job.startTasks.find(v => {
      return v.name === taskName
    })
  } catch (e) {
    throw e
  }
}

export function semverSort (a, b) {
  // console.log('comparing a', a.version, 'and b', b.version)
  try {
    // split a and b by .
    const aParts = a.split('.')
    const bParts = b.split('.')
    // compare year
    const aYear = Number.parseInt(aParts[0])
    const bYear = Number.parseInt(bParts[0])
    if (aYear !== bYear) {
      // console.log(`${aYear} !== ${bYear}`)
      return bYear - aYear
    }
    // compare month
    const aMonth = Number.parseInt(aParts[1])
    const bMonth = Number.parseInt(bParts[1])
    if (aMonth !== bMonth) {
      // console.log(`${aMonth} !== ${bMonth}`)
      return bMonth - aMonth
    }
    // separate day and revision number
    const aDayParts = aParts[2].split('-')
    const bDayParts = bParts[2].split('-')
    // console.log('aDayParts.length', aDayParts.length)
    // console.log('bDayParts.length', bDayParts.length)
    // compare day number
    const aDay = Number.parseInt(aDayParts[0])
    // console.log('aDay', aDay)
    const bDay = Number.parseInt(bDayParts[0])
    // console.log('bDay', bDay)
    if (aDay !== bDay) {
      // console.log(`${aDay} !== ${bDay}`)
      return bDay - aDay
    }
    // check for revision number
    if (aDayParts.length === 1) {
      // no revision for a
      if (bDayParts.length === 1) {
        // no revision for b either (sort by day)
        return bDay - aDay
      } else {
        // revision for b but not a (b is newer)
        return 1
      }
    } else {
      // revision for a
      if (bDayParts.length === 1) {
        // revision for a but not b (a is newer)
        return -1
      } else {
        // console.log(`checking revision`)
        // revision for a and b (sort by revision)
        const aRevision = Number.parseInt(aDayParts[1])
        const bRevision = Number.parseInt(bDayParts[1])
        // console.log(`aRevision ${aRevision}`)
        // console.log(`bRevision ${bRevision}`)
        return bRevision - aRevision
      }
    }
  } catch (e) {
    // failed somewhere - try to sort by string I guess
    console.log('error during UI version semver sort:', e)
    return a - b
  }
}

// find the session with this character or device as input
// needle is the character or device object
export function findAssignedSession (type, needle, sessions, demos) {
  return sessions.find(session => {
    // if this session has no inputs
    if (typeof session.inputs !== 'object') {
      // not a match
      return false
    }
    // find the matching demo for this session
    const demo = demos.find(d => d.id === session.demo)

    // not a match?
    if (!demo) {
      return false
    }

    // find the character or device type inputs for this demo
    const typedInputs = demo.inputs.filter(input => {
      return input.type === type
    })

    // if this demo has no typed inputs
    if (!typedInputs.length) {
      // not a match
      return false
    }
    
    // find the typed input that matches this needle
    return typedInputs.find(input => {
      // get the keys of the input map
      const keys = Object.keys(input.map)
      // if no input map keys
      if (!keys.length) {
        // not a match
        return false
      }
      // for each input key
      for (const k of keys) {
        // this value part of the map is the key of the recipe/session input
        const recipeKey = input.map[k]
        // if the needle property k doesn't match session input value
        if (needle[k] !== session.inputs[recipeKey]) {
          // not a match
          return false
        }
        // continue searching for matches
      }
      // matched all inputs fields - this needle is an input for this session
      return true
    })
  })
}

// move item up in an array
export function moveUp (items, index) {
  if (index !== 0) {
    const item = items[index]
    items.splice(index, 1)
    items.splice(index - 1, 0, item)
  }
  return items
}

// move item down in an array
export function moveDown (items, index) {
  if (index !== items.length - 1) {
    const item = items[index]
    items.splice(index, 1)
    items.splice(index + 1, 0, item)
  }
  return items
}

export function clone (items, index) {
  const output = items[index]
  // clone the output
  const copy = JSON.parse(JSON.stringify(output))
  // add copy to the outputs
  items.push(copy)
  return items
}

export function charCodeConsecutive (s) {
  // get character array from string

  const charCodes = Array.from(s).map((c, i) => {
    return s.charCodeAt(i)
  })

  // find highest number of consecutive character codes
  let count = 1
  let max = 1
  for (let i = 0; i < charCodes.length - 1; i++) {
    const charCode = charCodes[i]
    const nextCharCode = charCodes[i + 1]
    if (nextCharCode === charCode + 1) {
      count++
      // update max if count is new max
      if (count > max) {
        max = count
      }
    } else {
      count = 1
    } 
  }
  return max
}

export function qwertyConsecutive (s) {
  // get character array from string

  const chars = Array.from(s)
  // 2D array of US qwerty keyboard characters
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map(v => Array.from(v))
  // find highest number of consecutive qwerty character codes
  let count = 1
  let max = 1
  loop1:
  for (let i = 0; i < chars.length - 1; i++) {
    const char = chars[i]
    // for each keyboard key row
    loop2:
    for (const row of rows) {
      // find 
      const rowIndex = row.findIndex(v => v === char)
      if (rowIndex >= 0 && rowIndex < row.length - 1) {
        // found in row 1. check if next character matches next row character
        const nextChar = chars[i + 1]
        const nextRowChar = row[rowIndex + 1]
        if (nextChar === nextRowChar) {
          // match. increase count and continue to next loop iteration
          count++
          // update max if count is new max
          if (count > max) {
            max = count
          }
          // continue to next character
          continue loop1
        } else {
          // no match. reset count.
          count = 1
        }
      } else {
        // no match. reset count.
        count = 1
      }
    }
  }
  return max
}

export function consecutiveCharactersTest (s) {
  const values = [
    qwertyConsecutive(s.toLowerCase()),
    charCodeConsecutive(s),
    charCodeConsecutive(s.toLowerCase())
  ]
  return Math.max(...values)
}

const lowercaseRegex = new RegExp(/^(?=.*[a-z])/)
const uppercaseRegex = new RegExp(/^(?=.*[A-Z])/)
const digitsRegex = new RegExp(/^(?=.*[0-9])/)
const symbolsRegex = new RegExp(/^(?=.*[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~])/)

export function getPasswordErrorMessages (password) {
  const ret = []
  if (password.length < 8) {
    ret.push('Needs to be at least 8 characters long')
  }
  if (!lowercaseRegex.test(password)) {
    ret.push('Needs at least 1 lowercase letter')
  }
  if (!uppercaseRegex.test(password)) {
    ret.push('Needs at least 1 uppercase letter')
  }
  if (!digitsRegex.test(password)) {
    ret.push('Needs at least 1 number')
  }
  if (!symbolsRegex.test(password)) {
    ret.push('Needs at least 1 symbol')
  }
  if (consecutiveCharactersTest(password) > 3) {
    ret.push('No more than 3 consecutive characters in a sequence like 12345 or abcde or qwerty')
  }
  return ret
}

export function isValidPassword (password) {
  return lowercaseRegex.test(password) &&
    uppercaseRegex.test(password) &&
    symbolsRegex.test(password) &&
    digitsRegex.test(password) &&
    consecutiveCharactersTest(password) < 4 &&
    password.length >= 8
}

export function getSessionStatusText (session, type) {
  if (type === 'tool') {
    const strings = {
      starting: 'Starting...',
      joining: 'Starting...',
      joined: 'Active',
      clientsLeaving1Min: 'Ending...',
      clientsLeaving30Sec: 'Ending...',
      terminated: 'Ending...',
      ending: 'Ending...',
      leftRoom: 'Ending...'
    }
    try {
      return strings[getSessionStatus(session, type)] || 'Unknown'
    } catch (e) {
      return 'Unknown'
    }
  } else {
    return getSessionStatus(session, type) || 'Unknown'
  }
}

export function getSessionStatus (session, type) {
  try {
    // if session is a "tool" type of demo
    if (type === 'tool') {
      // if session was marked as ending
      if (session.status === 'ending') {
        return 'ending'
      }
      // return state of latest tool job events
      const events = [...session.toolJobs[0].events].sort((a, b) => b.time - a.time)
      return events[0].state
    } else if (type === 'demo') {
      // the idac status of this session
      return session.jobs.find(v => v.recipe === session.recipe).status
    }
  } catch (e) {
    return 'unknown'
  }
}
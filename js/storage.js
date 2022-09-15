export const Set = (key, value, time) => {
	const now = new Date()
	const item = {
		value: value,
		expire: now.getTime() + time,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export const Get = (key) => {
     const itemStr = localStorage.getItem(key)
     if (!itemStr) {
          return null
     }
     const item = JSON.parse(itemStr)
     const now = new Date()
     if (now.getTime() > item.expire) {
          localStorage.removeItem(key)
          return null
     }
     return item.value
}
const fs = require('fs')
const axios = require('axios')
const path = require('path')

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

const getDogPicture = async () => {
  try {
    const data = await readFilePromise(path.join(__dirname, 'dog.txt'))
    console.log(`Breed: ${data}`)
    const response1Promise = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const response2Promise = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const response3Promise = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    const all = await Promise.all([
      response1Promise,
      response2Promise,
      response3Promise
    ])
    const images = all.map(el => el.data.message)
    console.log(images)
    await writeFilePromise('dog-img.txt', images.join('\n'))
    console.log('Random dog image saved to file!')
    return '👍🏼'
  } catch (error) {
    console.log(error)
    throw error
  }
}

;(async () => {
  try {
    const res = await getDogPicture()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
})()

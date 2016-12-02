import { firebaseDb } from '../firebase'
import { bound } from '../utils'

export const updateStatus = (payload) => {
  return new Promise((resolve, reject) => {
    let {
      incident,
      bound,
      station
    } = payload

    let path = `bounds/${bound}/${station}`

    firebaseDb.ref(path).set(incident, function(error) {
      if (error) {
        reject(error)
      } else {
        resolve('OK')
      }
    })
  })
}

export const refresh = () => {
  return new Promise((resolve, reject) => {

    bound.south.forEach((station) => {
      let  {name } = station
      let path = `bounds/South/${name}`
      firebaseDb.ref(path).set('Normal conditions')
    })

    bound.north.forEach((station) => {
      let {name} = station
      let path = `bounds/North/${name}`
      firebaseDb.ref(path).set('Normal conditions')
    })

    resolve('OK')
  })
}

// @ts-ignore
import CryptoJS from 'crypto-js'
import Keys from './key'

const KEY = CryptoJS.enc.Utf8.parse(Keys.cryptoKey)
const IV = CryptoJS.enc.Utf8.parse(Keys.cryptoIv)

export default class VAES {
  static encrypt(word: any) {
    try {
      const srcs = CryptoJS.enc.Utf8.parse(word ?? '')
      const encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    } catch (e) {}
    return word
  }

  static decrypt(word: any) {
    try {
      const decrypt = CryptoJS.AES.decrypt(word ?? '', KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    } catch (error) {
    }
    return word
  }
}

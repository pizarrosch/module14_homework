const jsonString = `
  {
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`

const jsonObject = JSON.parse(jsonString);

console.log(jsonObject)

// В условии к данному заданию я обнаружил небольшую ошибку.
// Значение ключа "age" обёрнуто в кавычки, что парсит его
// в строку, хотя по заданию должно быть число.
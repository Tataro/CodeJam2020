process.stdin.resume()
process.stdin.setEncoding('utf-8')
var stdin_input = ''

process.stdin.on('data', function (input) {
  stdin_input += input // Reading input from STDIN
})

process.stdin.on('end', function () {
  main(stdin_input)
})

const isMatch = (series = [], sortNum) => {
  const sortSeries = [...series].sort((a, b) => a - b).join('')
  return sortSeries === sortNum
}

function main (data) {
  const input = data.split('\n')

  const ans = []
  const T = +input[0]
  let nextN = 1
  for (let i = 0; i < T; i++) {
    const N = +input[nextN]
    let k = 0,
      r = 0,
      c = 0
    let sortNum = [...Array(+N + 1).keys()]
    sortNum.shift()
    sortNum = sortNum.join('')
    const cols = []
    for (let j = 0; j < N; j++) {
      const row = input[nextN + 1 + j].split(' ')
      k += +row[j]
      if (!isMatch(row, sortNum)) {
        r++
      }
      row.forEach((d, ii) => {
        cols[ii] = [...(cols[ii] || []), d]
      })
    }
    cols.forEach(col => {
      if (!isMatch(col, sortNum)) {
        c++
      }
    })
    ans.push(`Case #${i + 1}: ${k} ${r} ${c}`)
    nextN += N + 1
  }
  ans.forEach(a => console.log(a))
}

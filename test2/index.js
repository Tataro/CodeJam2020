process.stdin.resume()
process.stdin.setEncoding('utf-8')
var stdin_input = ''

process.stdin.on('data', function (input) {
  stdin_input += input // Reading input from STDIN
})

process.stdin.on('end', function () {
  main(stdin_input)
})

function main (data) {
  const input = data.split('\n')
  const ans = []
  for (let i = 1; i <= +input[0]; i++) {
    const sample = input[i]
    let open = 0,
      res = ''
    for (let j = 0; j < sample.length; j++) {
      const char = +sample[j]
      if (open < char) {
        res += '('.repeat(char - open)
      } else if (open > char) {
        res += ')'.repeat(open - char)
      }
      open = char
      res += char
      if (j === sample.length - 1) {
        res += ')'.repeat(open)
      }
    }
    ans.push(`Case #${i}: ${res}`)
  }
  ans.forEach(a => console.log(a))
}

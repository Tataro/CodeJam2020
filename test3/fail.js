process.stdin.resume()
process.stdin.setEncoding('utf-8')
var stdin_input = ''

process.stdin.on('data', function (input) {
  stdin_input += input // Reading input from STDIN
})

process.stdin.on('end', function () {
  main(stdin_input)
})

const isBetween = (sample, start, end) => start < sample && sample < end

const canRegis = (acts = [[]], time) => {
  const [start, end] = time.split(' ')
  let canSign = true
  acts.forEach(act => {
    const [actS, actE] = act
    if (isBetween(+start, actS, actE) || isBetween(+end, actS, actE)) {
      canSign = false
    }
  })
  return canSign
}

function main (data) {
  const input = data.split('\n')
  let c = 1
  let N = 1
  for (let i = 1; i < input.length; i += N + 1) {
    let res = ''
    const C = [],
      J = []
    for (let j = i + 1; j <= +input[i] + i; j++) {
      const [start, end] = input[j].split(' ')
      if (!C.length) {
        C.push([+start, +end])
        res += 'C'
      } else if (!J.length) {
        J.push([+start, +end])
        res += 'J'
      } else if (canRegis(C, input[j])) {
        C.push([+start, +end])
        res += 'C'
      } else if (canRegis(J, input[j])) {
        J.push([+start, +end])
        res += 'J'
      } else {
        res = 'IMPOSSIBLE'
        break
      }
    }
    N = +input[i]
    console.log(`Case #${c++}: ${res}`)
  }
}

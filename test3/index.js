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
    const acts = []
    let arr = [...Array(1441).keys()]
    for (let j = i + 1; j <= +input[i] + i; j++) {
      const [start, end] = input[j].split(' ')
      acts.push([+start, +end])
    }
    N = +input[i]
    acts.sort((a, b) => a[0] - b[0])
    let res = ''
    for (let j = 0; j < acts.length; j++) {
      // console.log('acts', acts[j])
      const [start, end] = acts[j]
      let canC = true,
        canJ = true
      for (k = start; k <= end; k++) {
        // console.log('arr[k]', arr[k])
        if (
          (k === start || k === end) &&
          typeof arr[k] !== 'number' &&
          arr[k].length >= 3
        ) {
          let countC = 0
          let countJ = 0
          arr[k].split('').forEach(a => {
            if (a === 'C') {
              countC++
            } else if (a === 'J') {
              countJ++
            }
          })
          if (countC >= 2) {
            canC = false
          } else if (countJ >= 2) {
            canJ = false
          }
        }
        if (
          typeof arr[k] !== 'number' &&
          arr[k].includes('C') &&
          k !== start &&
          k !== end
        ) {
          // console.log('start', start)
          // console.log('k', k)
          // console.log('end', end)
          canC = false
        }
        if (
          typeof arr[k] !== 'number' &&
          arr[k].includes('J') &&
          k !== start &&
          k !== end
        ) {
          canJ = false
        }
      }
      if (canC) {
        for (k = start; k <= end; k++) {
          arr[k] = (arr[k] || '') + 'C'
        }
        res += 'C'
      } else if (canJ) {
        for (k = start; k <= end; k++) {
          arr[k] = (arr[k] || '') + 'J'
        }
        res += 'J'
      } else {
        res = 'IMPOSSIBLE'
        break
      }
      // console.log('res', res)
    }

    if (res !== 'IMPOSSIBLE') {
      const ress = []
      const use = []
      for (let j = i + 1; j <= +input[i] + i; j++) {
        const [start, end] = input[j].split(' ')
        acts.forEach((act, index) => {
          if (+start === act[0] && +end === act[1] && !use.includes(index)) {
            use.push(index)
            ress.push(res[index])
            return
          }
        })
      }
      res = ress.join('')
      // console.log('ress', ress)
    }
    // console.log('arr', arr.join(','))
    console.log(`Case #${c++}: ${res}`)
  }
}

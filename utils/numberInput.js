const decimalPoints = num => ((Math.floor(num) === num)
  ? 0
  : num.toString().split('.')[1].length || 0)

export default val => ((decimalPoints(Number(val)) > 2)
  ? val.slice(0, val.length - 1) : val)

//   if (checkbox.checked) activeElement.value = Math.round(inactiveElement.value / 2080 * 100) / 100
//   if (!checkbox.checked) activeElement.value = Math.round(inactiveElement.value * 2080 * 100) / 100

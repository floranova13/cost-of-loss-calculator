this.window.onload = () => {
  const checkbox = this.document.getElementById('salary-toggle')

  this.document.getElementById('form-submit-button').addEventListener('click', () => {
    // call a function that makes sure data is right and then does other stuff
  })
  checkbox.addEventListener('click', () => changeSalaryEntryType(checkbox))
}

const changeSalaryEntryType = checkbox => {
  const activeElement = this.document.getElementById(checkbox.checked ? 'hourly-salary' : 'annual-salary')
  const inactiveElement = this.document.getElementById(checkbox.checked ? 'annual-salary' : 'hourly-salary')
  const activeFormElement =
    this.document.getElementById(checkbox.checked ? 'annual-salary-group' : 'hourly-salary-group')
  const inactiveFormElement =
    this.document.getElementById(checkbox.checked ? 'hourly-salary-group' : 'annual-salary-group')

  activeElement.disabled = false
  inactiveElement.disabled = true
  activeFormElement.disabled = false
  inactiveFormElement.disabled = true

  // check rounding errors

  if (checkbox.checked) activeElement.value = Math.round(inactiveElement.value / 2080 * 100) / 100
  if (!checkbox.checked) activeElement.value = Math.round(inactiveElement.value * 2080 * 100) / 100
}

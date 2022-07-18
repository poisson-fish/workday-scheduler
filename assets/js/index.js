/* eslint-disable no-undef */
const timeBlocksTable = document.querySelector('#timeblocks-table')
const hourToCurrentTime = (hr) => dayjs(hr, 'hA')

function renderTable () {
  // I used day.js because smaller and faster
  const start = hourToCurrentTime('9AM')
  const times = Array.from(
    Array(8).keys())
    .map(timeDifference => start.add(timeDifference, 'hour'))

  times.forEach((time) => {
    const row = document.createElement('tr')
    row.className = 'row'
    timeBlocksTable.appendChild(row)

    const hour = document.createElement('td')
    const description = document.createElement('td')
    const button = document.createElement('td')

    const hourtd = row.appendChild(hour)
    hourtd.className = 'hour'
    hourtd.id = 'hourtd'
    hourtd.textContent = time.format('hA')

    const desctd = row.appendChild(description)

    setInterval((row, desctd) => {
      const timeslot = hourToCurrentTime(row.querySelector('#hourtd').textContent)
      const now = hourToCurrentTime('11AM')

      if (now.isAfter(timeslot, 'hour')) {
        desctd.className = 'description past'
      } else if (now.isSame(timeslot, 'hour')) {
        desctd.className = 'description present'
      } else if (now.isBefore(timeslot, 'hour')) {
        desctd.className = 'description future'
      }
    }, 500, row, desctd)

    desctd.className = 'description'

    const textArea = document.createElement('textarea')
    textArea.className = 'textarea'
    textArea.id = 'descta'
    // Try to load it from localStorage
    textArea.value = localStorage.getItem(hourtd.textContent)
    desctd.appendChild(textArea)

    const buttontd = row.appendChild(button)
    buttontd.className = 'button'

    const buttonb = document.createElement('button')
    buttonb.onclick = (e) => {
      const row = e.target.parentElement.parentElement
      const timeslot = row.querySelector('#hourtd').textContent
      const description = row.querySelector('#descta').value
      localStorage.setItem(timeslot, description)
    }
    buttonb.className = 'saveBtn'
    buttonb.textContent = '💾'
    buttontd.appendChild(buttonb)
  })
}
renderTable()

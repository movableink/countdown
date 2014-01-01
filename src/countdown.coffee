class window.Countdown
  constructor: (@type, @el, @options={}) ->
    FIVE_DAYS = 5 * 24 * 60 * 60 * 1000
    @to = options.to or new Date(Date.now() + FIVE_DAYS)
    @leadingZeros = options.leadingZeros or 0

  run: ->
    return if @interval # already running
    @update()
    @interval = setInterval(@update.bind(this), 1000)

  update: ->
    value = @[@type]() # TODO
    @el.innerHTML = @pad(value)

  stop: ->
    clearInterval @interval if @interval
    @interval = null

  seconds: ->
    @totalSeconds() % 60

  minutes: ->
    @totalMinutes() % 60

  hours: ->
    @totalHours() % 24

  days: ->
    Math.floor @totalHours() / 24

  now: ->
    new Date()

  totalSeconds: ->
    Math.floor Math.max(@to.getTime() - @now().getTime(), 0) / 1000

  totalMinutes: ->
    Math.floor @totalSeconds() / 60

  totalHours: ->
    Math.floor @totalMinutes() / 60

  # Pad a number with zeroes
  pad: (number) ->
    number += ""
    number = "0" + number while number.length < @leadingZeros
    number

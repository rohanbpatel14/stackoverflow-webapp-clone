import { getConsumer, getProducer } from '../loaders/kafka'

import { register, login } from '../services/authService'

getConsumer('auth', (consumer) => {
  var producer = getProducer()

  consumer.on('message', function (message) {
    var data = JSON.parse(message.value)
    const { payload, correlationId } = data
    const { action } = payload

    console.log('Consuming data from topic ...', action)

    if (action == 'REGISTER') {
      register(payload, (err, res) => {
        var payload = {}
        if (err) {
          console.log('AuthService failed:', err)
          payload = {
            status: 400,
            content: err,
            correlationId: correlationId
          }
        }

        if (res) {
          payload = {
            status: 200,
            content: res,
            correlationId: correlationId
          }
        }
        console.log(payload)
        //Send Response to acknowledge topic
        payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }

    if (action == 'LOGIN') {
      login(payload, (err, res) => {
        var payload = {}
        if (err) {
          console.log('AuthService failed:', err)
          payload = {
            status: 400,
            content: err,
            correlationId: correlationId
          }
        }

        if (res) {
          payload = {
            status: 200,
            content: res,
            correlationId: correlationId
          }
        }
        console.log(payload)
        //Send Response to acknowledge topic
        let payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }
  })
})
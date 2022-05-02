const kafkaConnection = require('../loaders/kafka')
const actions = require('../constants/actions.json')

const UserService = require('./../services/UserService')
const AuthService = require('./../services/AuthService')

kafkaConnection.getConsumer('users', (consumer) => {

    var producer = kafkaConnection.getProducer()

    consumer.on('message', (message) => {
        var data = JSON.parse(message.value)
        const { payload, correlationId } = data
        const { action } = payload

        console.log('Consuming data from topic ...', action)

        if (action == 'CREATE_USER') {
            UserService.createUser(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log('UserService failed:', err)
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

        if (action == actions.LOGIN) {
            AuthService.login(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log('UserService failed:', err)
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

        if (action == actions.GET_USER_DETAILS) {
            AuthService.getUserDetails(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log('UserService failed:', err)
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

        if (action == actions.UPDATE_USER) {

            UserService.updateUser(payload, (err, res) => {
                var payload = {}
                if (err) {
                    console.log('UserService failed:', err)
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
    })
})


import { getConsumer, getProducer } from '../loaders/kafka';
import { getuaqs, approve_question, mostviewed, mostusedtags, highrepusers, lowrepusers } from '../services/adminService';

getConsumer('admin', (consumer) => {
  var producer = getProducer()

  consumer.on('message', function (message) {
    var data = JSON.parse(message.value)
    const { payload, correlationId } = data
    const { action } = payload
    console.log('Consuming data from topic ...', action)

    if (action === 'GET_UA_POSTS') {
        getuaqs((err, res) => {
        var payload = {};
        if (err) {
          console.log('Get all Unapproved posts failed:', err)
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
        let payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }

    if (action === 'APPROVE_QUE'){
      approve_question(payload, (err, res) => {
        var payload = {};
        if (err) {
          console.log('Approve question failed:', err)
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
        let payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }

    if (action === 'MOST_VIEWED'){
      mostviewed((err, res) => {
        var payload = {};
        if (err) {
          console.log('Most viewed question request failed:', err)
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
        let payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }
    if (action === 'GET_MOST_USED_TAGS'){
      mostusedtags((err, res) => {
        var payload = {};
        if (err) {
          console.log('Most used tags request failed:', err)
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
        let payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }
    if (action === 'GET_HIGH_REP'){
      highrepusers((err, res) => {
        var payload = {};
        if (err) {
          console.log('Users with highest reputation request failed:', err)
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
        let payloads = [
          { topic: 'acknowledge', messages: JSON.stringify({ "acknowledgementpayload": true, payload }), partition: 0 }
        ]
        producer.send(payloads, (err, data) => {
          if (err) throw err
          console.log('ACK message sent:', data)
        })
      })
    }
    if (action === 'GET_LOW_REP'){
      lowrepusers((err, res) => {
        var payload = {};
        if (err) {
          console.log('Users with low reputation request failed:', err)
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
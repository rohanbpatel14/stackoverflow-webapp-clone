import { getProducer, getConsumer } from '../loaders/init-kafka'
import { v4 as uuid } from 'uuid';

class KafkaReqResp {

  requests = {}
  constructor() { }

  consumer = getConsumer('acknowledge')

  kafkaRequest(topic, payload, results) {
    const producer = getProducer()
    const correlationId = uuid()
    var entry = {
      results: results
    }

    this.requests[correlationId] = entry

    console.log('2 -> CorrelationID and requests ...')
    this.kafkaResponse(function () {
      producer.on('ready', function () {
        let payloads = [
          { topic: topic, messages: JSON.stringify({ payload, correlationId }), partition: 0 }
        ]
        console.log('3 -> Producer write to topic ...', payloads)
        producer.send(payloads, function (err, data) {
          console.log('ERR', err)
          console.log('DATA', data)
        })
      })
    })
  }

  kafkaResponse(next) {
    let requestsWaiting = this.requests
    console.log('Pending requests ...', requestsWaiting)
    this.consumer.on('message', function (message) {
      console.log('ACK message recieved:', message)

      var acknowledgementData = JSON.parse(message.value)
      var correlationId = acknowledgementData.payload.correlationId

      console.log('CorrelationID:', correlationId)
      console.log('Request:', requestsWaiting)
      if (correlationId in requestsWaiting) {

        var entry = requestsWaiting[correlationId]

        delete requestsWaiting[correlationId]

        if (acknowledgementData.payload.status === 200) {
          console.log('200', acknowledgementData.payload.content)
          return entry.results(null, acknowledgementData.payload.content)
        }

        if (acknowledgementData.payload.status === 400) {
          return entry.results(acknowledgementData.payload.content, null)
        }

        return entry.results('Server Error', null)
      }
    });
    this.requests = requestsWaiting
    return next()
  }
}

export default KafkaReqResp
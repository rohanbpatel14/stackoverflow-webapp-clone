import KafkaReqResp from './kafkaReqResp'
const kafka = new KafkaReqResp()

export function sendRequest(topic, payload, cb) {
    console.log('1 -> Sending request to Kafka consumer ...')
    kafka.kafkaRequest(topic, payload, (err, res) => {
        if (err) return cb(err, null)
        return cb(null, res)
    })
}
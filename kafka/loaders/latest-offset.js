import kafka from 'kafka-node'

const getlatestOffset = (topic, cb) => {
  var client = new kafka.KafkaClient('localhost:2181')
  var offset = new kafka.Offset(client)
  var latestOffset;
  offset.fetch([{
    topic: topic, partition: 0, time: -1
  }], function (err, data) {
    latestOffset = data[topic]['0'][0]
    return cb(latestOffset)
  })
}

export default getlatestOffset
import kafka from 'kafka-node'
import getlatestOffset from './latest-offset'

const getProducer = () => {
  const client = new kafka.KafkaClient('localhost:2181')
  return new kafka.Producer(client)
}

const getConsumer = (topic, results) => {
  getlatestOffset(topic, (returnValue) => {
    let lOffset = returnValue
    const client = new kafka.KafkaClient('localhost:2181')
    const Consumer = kafka.Consumer
    const options = {
      groupId: 'orders-group',
      fromOffset: 'latest'
    }

    const kafkaConsumer = new Consumer(client, [
      { topic: topic, offset: lOffset, partition: 0 },
    ], options,
      {
        autoCommit: false
      })

    return results(kafkaConsumer)
  })
}

export { getProducer, getConsumer }
import { kafka, KafkaClient, Producer } from 'kafka-node'
import latestoffset from './latest-offset'

getProducer = () => {
    const client = new KafkaClient('localhost:2181')
    return new Producer(client)
}

getConsumer = (topic, results) => {
    latestoffset.getlatestOffset(topic, (returnValue) => {
        lOffset = returnValue
        const client = new KafkaClient('localhost:2181')
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
import kafka from 'kafka-node'

const getProducer = () => {
    const client = new kafka.KafkaClient('localhost:2181')
    const HighLevelProducer = kafka.HighLevelProducer
    return new HighLevelProducer(client)
}

const getConsumer = (topic) => {
    const client = new kafka.KafkaClient('localhost:2181')
    const Consumer = kafka.Consumer
    const kafkaConsumer = new Consumer(client,
        [
            { topic: topic, partition: 0 },
        ]
    )
    return kafkaConsumer
}

export { getProducer, getConsumer }
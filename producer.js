import kafka from "kafka-node";
import { v4 } from "uuid";

const client = new kafka.KafkaClient({
  kafkaHost: "localhost:9092",
  autoConnect: true,
  connectRetryOptions: {
    retries: 10,
    factor: 0,
    minTimeout: 10000,
    maxTimeout: 10000,
    randomize: false,
  },
});

const producer = new kafka.HighLevelProducer(client);

const topic = "test";

const payload = {
  id: v4(),
  timestamp: Date.now(),
  userName: "David",
};

const messages = new Buffer.from(JSON.stringify(payload));

const record = [
  {
    topic,
    messages,
  },
];

producer.send(record, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

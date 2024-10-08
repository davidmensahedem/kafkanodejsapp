import kafka from "kafka-node";

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

const topic = "test";

const options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer",
};

const consumer = new kafka.Consumer(client, [{ topic }], options);

consumer.on("message", function (message) {
  // Read string into a buffer.
  var buf = new Buffer(message.value, "binary");
  var decodedMessage = JSON.parse(buf.toString());

  //Events is a Sequelize Model Object.
  console.log(decodedMessage);
});

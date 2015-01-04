module.exports = {
  destination: '/topic/electricity/metrics',
  user: process.env.ACTIVEMQ_USER,
  pass: process.env.ACTIVEMQ_PASSWORD,
  port: 61613,
  url: 'mongodb://mongo/electricity'
};

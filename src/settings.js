export default {
  endpoint: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5010/api',
  langs: ['es', 'en']
}
export default {
  endpoint:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5010/api',
  // first one is the default
  langs: ['es', 'en'],
};

export const trackers = {
  umami: {
    id: '',
    src: '',
    description: 'Analytics',
  },
};

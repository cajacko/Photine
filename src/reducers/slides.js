const defaultState = [
  'https://images.pexels.com/photos/207171/pexels-photo-207171.jpeg',
  'https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg',
  'https://images.pexels.com/photos/218983/pexels-photo-218983.jpeg',
];

export default (state = defaultState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

// @flow

class Photos {
  static get() {
    if (!process.env.REACT_APP_PHOTOS_URL) {
      return Promise.reject(
        new Error("REACT_APP_PHOTOS_URL env var is not set")
      );
    }

    return fetch(process.env.REACT_APP_PHOTOS_URL)
      .then(res => res.json())
      .then(({ photos }) => photos);
  }

  static fetchFromInstagram() {
    return Photos.fetchInstagramPhotosFromMultipleAccounts([
      "charlie_a_jackson",
      "vikibell"
    ]);
  }

  static fetchInstagramPhotosFromMultipleAccounts(accounts) {
    const promises = [];

    accounts.forEach(account => {
      promises.push(Photos.fetchInstagramPhotos(account));
    });

    return Promise.all(promises).then(responses => {
      const photos = [];

      responses.forEach(({ photos }) => {
        photos.concat(photos);
      });

      return photos.sort(() => 0.5 - Math.random());
    });
  }

  static fetchInstagramPhotos(username, cursor) {
    const url = cursor
      ? `https://www.instagram.com/${username}/?__a=1&max_id=${cursor}`
      : `https://www.instagram.com/${username}/?__a=1`;

    return fetch(url)
      .then(res => res.json())
      .then(json => ({
        photos: json.graphql.user.edge_owner_to_timeline_media.edges
          .filter(edge => !edge.node.is_video)
          .map(edge => edge.node.display_url),
        cursor:
          json.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      }));
  }
}

export default Photos;

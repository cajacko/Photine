// @flow

const storage = window.localStorage;

class Photos {
  static get() {
    if (!process.env.REACT_APP_PHOTOS_URL) {
      return Promise.reject(
        new Error("REACT_APP_PHOTOS_URL env var is not set")
      );
    }

    const lastCached = storage.getItem("lastCached");

    if (lastCached) {
      const timeSinceLastCached = new Date().getTime() - lastCached;

      if (timeSinceLastCached < 60 * 60 * 1000) {
        const photos = Photos.getCachedPhotos();

        if (photos) {
          return Promise.resolve(photos);
        }
      }
    }

    return fetch(process.env.REACT_APP_PHOTOS_URL)
      .then(res => res.json())
      .then(({ photos }) => {
        if (!photos || !photos.length) {
          const cachedPhotos = Photos.getCachedPhotos();

          if (cachedPhotos) return cachedPhotos;

          throw new Error("No photos returned or found in cache");
        }

        storage.setItem("lastCached", new Date().getTime());
        storage.setItem("photos", JSON.stringify(photos));

        return photos;
      })
      .catch(e => {
        const cachedPhotos = Photos.getCachedPhotos();

        if (cachedPhotos) return cachedPhotos;

        console.error(e);

        throw new Error(
          "Error fetching photos and no photos in cache. Check logs"
        );
      });
  }

  static getCachedPhotos() {
    const photos = storage.getItem("photos");

    if (photos) {
      return JSON.parse(photos);
    }

    return null;
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

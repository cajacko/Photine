// @flow

class Photos {
  static get() {
    return Promise.all([
      Photos.fetchInstagramPhotos("charlie_a_jackson"),
      Photos.fetchInstagramPhotos("vikibell")
    ])
      .then(response => [].concat(response[0].photos, response[1].photos))
      .then(photos => photos.sort(() => 0.5 - Math.random()));
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

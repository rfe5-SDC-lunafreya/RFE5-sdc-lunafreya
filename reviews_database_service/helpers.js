const organizePhotos = (reviews) => {
  const photos = [];
  const check = [];

  if (Array.isArray(reviews)) {
    reviews.forEach(review => {
      const renamePhotoProps = {
        id: review.photo_id,
        url: review.photo_url,
      };
      if (check.indexOf(review.photo_id) === -1 && review.photo_id) {
        photos.push(renamePhotoProps)
      }
      check.push(check.photo_id)
    })
    return photos;
  } else {
   // console.log('REVIEWS',reviews)
    const renamePhotoProps = {
      id: reviews.photo_id,
      url: reviews.photo_url,
    };
    if (check.indexOf(reviews.photo_url) === -1 && reviews.photo_url) {
      photos.push(renamePhotoProps)
    }
    check.push(check.photo_url)
  return photos;
  }

};
module.exports = {organizePhotos}
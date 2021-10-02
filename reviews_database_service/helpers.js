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

const handleSortAndCount = function(data, sort, count) {
  if (sort === 'helpful') {
  data.sort((a, b) => b.helpfulness - a.helpfulness)
  }

  if (sort === 'newest') {
    data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }

  if (count) {
    data = data.slice(0, count);
  }

  return data;
};

const organizeCharacteristics = function (dataArr) {
  let charactersticsAtName = {};
  for(var i = 0; i < dataArr.length; i++) {
    const review = dataArr[i];
    // console.log('REVIEW', review)
    //console.log('char NAME pre', charactersticsAtName[review.characteristics_name])
    if(!charactersticsAtName[review.characteristics_name]) {
      charactersticsAtName[review.characteristics_name] = {
        id: review.characteristics_id,
        value: [review.characteristics_value]
      };
    } else if (charactersticsAtName[review.characteristics_name]) {
      // console.log('char value', charactersticsAtName[review.characteristics_name].value)
      // console.log('value to be pushed,', review.characteristics_value)
      charactersticsAtName[review.characteristics_name].value.push(review.characteristics_value)
    }
  }
  for (var key in charactersticsAtName) {
    var values = charactersticsAtName[key].value
    //console.log('VALUES', values)
    const average = (values) => values.reduce((a, b) => a + b) / values.length;
   // console.log('AVG', average(values));
    charactersticsAtName[key].value = average(values)
  }

  //console.log('Wumbo', charactersticsAtName)
  return charactersticsAtName
}


module.exports = {
  organizePhotos,
  handleSortAndCount,
  organizeCharacteristics
}
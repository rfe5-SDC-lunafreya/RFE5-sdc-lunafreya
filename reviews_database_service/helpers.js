const organizeReviews = (reviews, count, page) => {
  const holder = [];
  const finalArr = [];
  const idTracking = {}
  for (var i = 0; i < reviews.length; i++) {

   if (reviews[i].reviews_id === idTracking.reviews_id) {

   var reviewID = reviews[i].reviews_id
   for (var j = 0; j < holder.length; j++) {
     if(holder[j].review_id === reviewID) {

       holder[j].photos.push(organizePhotos(reviews[i]))
     }
   }
  } else {
    idTracking.reviews_id = reviews[i].reviews_id
    var review = {
      product: reviews[i].product,
      page: page || 1,
      count: count || 5,
        review_id: reviews[i].reviews_id,
        rating: reviews[i].rating,
        summary: reviews[i].summary,
        recommend: reviews[i].recommend,
        response: reviews[i].response,
        body: reviews[i].body,
        date: reviews[i].date,
        reviewer_name: reviews[i].reviewer_name,
        helpfulness: reviews[i].helpfulness,
        reported: reviews[i].reported,
        photos: [organizePhotos(reviews[i])]
    }
    holder.push(review)
  }
}
console.log(reviews[0].product)
var reviewFinal = {
  product: reviews[0].product,
  page: page || 1,
  count: count || 5,
  results: []
}

for (var b = 0; b < holder.length; b++) {

  if (holder[b].photos[0] === null || holder[b].photos[0] === undefined) {
    holder[b].photos = []
  }
  var results = {
    review_id: holder[b].review_id,
    rating: holder[b].rating,
    summary: holder[b].summary,
    recommend: holder[b].recommend,
    response: holder[b].response,
    body: holder[b].body,
    date: holder[b].date,
    reviewer_name: holder[b].reviewer_name,
    helpfulness: holder[b].helpfulness,
    reported: holder[b].reported,
    photos: holder[b].photos
  }
  reviewFinal.results.push(results)
}
finalArr.push(reviewFinal)

  return finalArr;
}

const organizePhotos = (reviews) => {
  const photosLarge = [];
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
    return photosLarge;
  } else {

    const renamePhotoProps = {
      id: reviews.photo_id,
      url: reviews.photo_url,
    };
    if (check.indexOf(reviews.photo_url) === -1 && reviews.photo_url) {

      var photos = renamePhotoProps
    } else {
     return;
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

    if(!charactersticsAtName[review.characteristics_name]) {
      charactersticsAtName[review.characteristics_name] = {
        id: review.characteristics_id,
        value: [review.characteristics_value]
      };
    } else if (charactersticsAtName[review.characteristics_name]) {
      charactersticsAtName[review.characteristics_name].value.push(review.characteristics_value)
    }
  }
  for (var key in charactersticsAtName) {
    var values = charactersticsAtName[key].value
    const average = (values) => values.reduce((a, b) => a + b) / values.length;
    charactersticsAtName[key].value = average(values)
  }
  return charactersticsAtName
}

const organizeMeta = function(dataArr, characteristcsData, product_id) {

var finalCharacteristics = {};
var product_id = product_id.toString();
var ratings = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0
}
var recommended = {
  "false": 0,
  "true": 0
}
for(var i = 0; i < dataArr.length; i++) {
  var review = dataArr[i];
  if (ratings[review.rating] !== undefined) {
    ratings[review.rating]++
  }
 if(recommended[review.recommend] !== undefined) {
  recommended[review.recommend]++
 }
}
JSON.stringify(characteristcsData)
finalCharacteristics.product_id = product_id;
finalCharacteristics.ratings = ratings;
finalCharacteristics.recommended = recommended;
finalCharacteristics.characteristics = characteristcsData;

return finalCharacteristics;
}


module.exports = {
  organizePhotos,
  handleSortAndCount,
  organizeCharacteristics,
  organizeMeta,
  organizeReviews
}
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
console.log(dataArr, characteristcsData)
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
    // console.log(`test---> ${JSON.stringify(ratings)} --->`, ratings[review.rating])
    ratings[review.rating]++
  }
 if(recommended[review.recommend] !== undefined) {
  recommended[review.recommend]++
 }
}
JSON.stringify(characteristcsData)
// console.log('RATINGS--->  ', ratings)
// console.log('RECOMMEND---> ', recommended)
// console.log('CHAR DATA', characteristcsData)
finalCharacteristics.product_id = product_id;
finalCharacteristics.ratings = ratings;
finalCharacteristics.recommended = recommended;
finalCharacteristics.characteristics = characteristcsData;
console.log(finalCharacteristics)
return finalCharacteristics;

}


module.exports = {
  organizePhotos,
  handleSortAndCount,
  organizeCharacteristics,
  organizeMeta
}
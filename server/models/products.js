const db = require('../database/products/index.js');

module.exports = {
  getAll: function (param, callback) {
    const page = param.page || 1;
    const count = param.count || 5;
    const limit = Number(page * count);
    const queryString = `SELECT * FROM products LIMIT ${limit}`;
    db.query(queryString, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.rows);
      }
    });
  },

  getOne: function (param, callback) {
    const id = Number(param.product_id);
    const queryProduct = `SELECT * FROM products WHERE id=${id}`;
    db.query(queryProduct, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        const product = res.rows;
        const queryFeature = `SELECT feature, value FROM features WHERE product_id=${id}`;
        db.query(queryFeature, (err, res) => {
          if (err) {
            callback(err, null);
          } else {
            product[0].features = res.rows;
            console.log(product);
            callback(null, product);
          }
        });
      }
    });
  },

  // getStyles: function (param, callback) {
  //   const id = Number(param.product_id);
  //   const params = [id];
  //   const styles = {
  //     product_id: id,
  //     results: []
  //   }
  //   let check = 0;
  //   const queryString = `SELECT id AS style_id, name, original_price, sale_price, default_style AS "defautl?" FROM styles WHERE productId = $1`;
  //   db.query(queryString, params, (err, res) => {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       styles.results = res.rows;
  //       styles.results.forEach((style) => {
  //         const styleId = style.style_id
  //         const queryString = `SELECT thumbnail_url, url FROM photos WHERE styleId=${styleId}`;
  //         db.query(queryString, (err, res) => {
  //           if (err) {
  //             callback(err, null);
  //           } else {
  //             console.log(res.rows)
  //             style.photos = res.rows.slice();
  //             check ++;
  //             console.log(check)
  //           }
  //         })
  //       })
  //     }
  //   })
  //   if(check === 4) {
  //     callback(null, styles);
  //   }
  // },

  getStyles: function (param, callback) {
    const id = Number(param.product_id);
    const params = [id];
    const styles = {
      product_id: id,
      results: [],
    };
    const queryString = `SELECT id AS style_id, name, original_price, sale_price, default_style AS "defautl?" FROM styles WHERE productId = $1`;
    db.query(queryString, params)
      .then((data) => {
        //will return the intial styles query result + photos + skus
        return Promise.all(
          //map will return an array, each element represent an individual style
          //Promise all take an array as input
          data.rows.map((style) => {
            const styleId = style.style_id;
            const queryPhoto = `SELECT thumbnail_url, url FROM photos WHERE styleId=${styleId}`;
            //query photos for each style
            const photos = db
              .query(queryPhoto)
              .then((photos) => {
                return photos.rows;
              })
              .catch((error) => {
                console.log(`There is an error related to ${styleId}`);
              });
            //query skus for each style
            const querySkus = `SELECT id, quantity, size FROM skus WHERE styleId=${styleId}`;
            const skus = db.query(querySkus).then((skus) => {
              // console.log(skus.rows);
              //create an object to format the data, this object is the skus property in each style
              const skusResult = {};
              for (let sku of skus.rows) {
                const stock = {
                  size: sku.size,
                  quantity: sku.quantity,
                };
                skusResult[sku.id] = stock;
              }
              return skusResult;
            });
            // the return value for the map function, which is individual style
            return Promise.all([photos, skus])
              .then((result) => {
                style.photos = result[0];
                style.skus = result[1];
                return style;
              })
              .catch((error) => {
                console.log(error);
              });
          })
        );
      })
      .then((data) => {
        //this data represent the fully formatted style data, send it back to the controller
        callback(null, data);
      });
  },

  getRelated: function (param, callback) {
    const id = Number(param.product_id);
    const params = [id];
    const queryString =
      "SELECT ARRAY (SELECT related_product_id FROM related WHERE current_product_id = $1)";
    db.query(queryString, params, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(res.rows[0].array);
        callback(null, res.rows[0].array);
      }
    });
  },
};

// SELECT id, jsonb_object_agg(size, quantity)
// FROM skus
// WHERE styleId IN (73347, 73348)
// GROUP BY id
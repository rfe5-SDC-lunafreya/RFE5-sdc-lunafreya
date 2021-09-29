DROP SCHEMA IF EXISTS reviews CASCADE;

CREATE SCHEMA reviews;

/*denormalize products*/
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INTEGER
);

CREATE TABLE reviews(
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  rating INTEGER,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INTEGER
);
/*id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)*/

CREATE TABLE reviews_photos(
  id SERIAL PRIMARY KEY,
  review_id INTEGER,
  url TEXT
);
CREATE TABLE characteristics(
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name TEXT
);

  CREATE TABLE reviews_characteristics(
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

\copy products(id, name, slogan, description, category, default_price) from '/Users/michaelharfenist/Downloads/product.csv' delimiter ',' csv header

\copy reviews_characteristics(id, characteristic_id, review_id, value) from '/Users/michaelharfenist/Downloads/characteristic_reviews.csv' delimiter ',' csv header;

\copy characteristics(id, product_id, name) from '/Users/michaelharfenist/Downloads/characteristics.csv' delimiter ',' csv header

\copy reviews_photos(id, review_id, url) from '/Users/michaelharfenist/Downloads/reviews_photos.csv' delimiter ',' csv header

\copy reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) from '/Users/michaelharfenist/Downloads/reviews.csv' delimiter ',' csv header

ALTER TABLE reviews
  ADD CONSTRAINT fk_reviews FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE reviews_photos
  ADD CONSTRAINT fk_reviews_photos FOREIGN KEY (review_id) REFERENCES reviews(id);

ALTER TABLE characteristics
  ADD CONSTRAINT fk_characteristics FOREIGN KEY (product_id) REFERENCES products(id);

ALTER TABLE reviews_characteristics
  ADD CONSTRAINT fk_reviews_characteristics_char FOREIGN KEY (characteristic_id) REFERENCES characteristics(id);

ALTER TABLE reviews_characteristics
  ADD CONSTRAINT fk_reviews_characteristics_rev FOREIGN KEY (review_id) REFERENCES reviews(id);
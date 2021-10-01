DROP TABLE IF EXISTS cart CASCADE;

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_session int,
  product_id int,
  active bool
);

DROP TABLE IF EXISTS cart_skus;

CREATE TABLE cart_skus (
  id SERIAL PRIMARY KEY,
  sku_id int,
  count int,
  user_session int
)
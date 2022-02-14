drop database olcha_uz;
create database olcha_uz;

create extension pgcrypto;

drop table if exists categories cascade;
drop table categories;
create table categories(
    categorie_id smallint generated always as identity primary key,
    categorie_name character varying(50) not null
);

drop table if exists products cascade;
create table products(
    product_id smallint generated always as identity primary key,
    categorie_id smallint not null references categories(categorie_id),
    product_name character varying(100) not null,
    product_price int not null,
    shortDescription character varying(30) not null,
    longDescription text,
    count int not null,
    picture name
);

drop table if exists users cascade;
create table users(
    user_id smallint generated always as identity primary key,
    username character varying(50) not null unique,
    password character varying(150) not null,
    contact int not null,
    email character varying(125) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    user_role boolean default false
);

drop table if exists orders cascade;
create table orders(
    order_id smallint generated always as identity primary key,
    user_id smallint not null references users(user_id),
    product_id smallint not null references products(product_id),
    total_price int not null,
    is_paid boolean  default false
);

drop table if exists statistics cascade;
create table statistics(
    order_id smallint not null references orders(order_id),
    total_money boolean default false,
    the_most_sold_product character varying(50),
    the_least_sold_product character varying(50) 
);




insert into categories (categorie_name) values ('phone'), ('car'), ('water'), ('furniture'), ('camputer');

insert into products (categorie_id, product_name, product_price, shortDescription, longDescription, count, picture) values
(2, 'BMW', 100000, 'Bu mashina', 'uning 4ta baloni bor', 1, 'bmw.jpg'),
(1, 'Redmi', 2000, 'Telefon', 'U sensirli telefon', 2, 'telfon.jpg'),
(3, 'cola', 500, 'cola', 'bu ichmlik ichadigon', 3, 'cola.jpg'),
(4, 'Oshhona', 15000, 'Mebel', 'uning ewiklari bor', 1, 'mebel.jpg'),
(5, 'macbook', 6000, 'bu juda yaxwi', 'U notebook uni iwlatiw kere', 1, 'camputer.jpg'),
(1, 'Iphone', 10000, 'Bu telefondur', 'bu eng qimat telefonardandi', 2, 'iphone.jpg'),
(3, 'hydrolife', 400, 'ichimlik suvi', 'juda taciy bolgan birqancha moddalrga ega', 2, 'hydrolife.jpg');

insert into users(username, password, contact, email, user_role) values
('Ibrohim', crypt('Asd123@#',  gen_salt('bf')), 900043433, 'ibrohimbek@gmail.com', true),
('Bobur', crypt('Asd123@#',  gen_salt('bf')), 946222274, 'boburbek@gmail.com', false),
('Anvarjon', crypt('Anvar1@#',  gen_salt('bf')), 900010111, 'Anvar@gmail.com',false ),
('Dilshod', crypt('Dilshod1#',  gen_salt('bf')), 917894561, 'Dilshod@gmail.com',false),
('Umarbek', crypt('Umar23@?',  gen_salt('bf')), 994899575, 'Umarbek@gmail.com', false),
('Giyosboytoyev', crypt('Giyos1@#',  gen_salt('bf')), 931234567, 'giyos@gmail.com',false);


insert into orders ( user_id, product_id, total_price, is_paid) values 
(1, 2, 100000, true),
(4, 3, 500),
(6, 6, 10000),
(5, 5, 1200),
(3, 4, 1500),
(2, 1, 100000);


insert into statistics( order_id, total_money, the_most_sold_product, the_least_sold_product) values
(1, true, 'redmi', 'hydrolife');



-------------------- Query ----------------------

select user_id, username, contact, email from users;


select * from orders;   
    

select
    json_agg(u.user_id) as userId,
	json_agg(u.username),
	p.*,
    json_agg(o.total_price) as price 
from products as p
inner join orders as o on o.order_id = p.product_id
inner join users u on u.user_id = o.user_id
group by p.product_id;


select
    product_id,
    categorie_id,
    product_name,
    product_price,
    shortDescription,
    longDescription,
    count,
    picture
from products;


select 
    *
from statistics;
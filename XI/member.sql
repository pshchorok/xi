create table member(
id varchar(15)  not null,
pw varchar(15) not null,
phone_part1 varchar(3) not null,
phone_part2 varchar(4) not null,
phone_part3 varchar(4) not null,
email_id varchar(80),
email_domain varchar(30),
primary key(id)
)engine=innoDB charset=utf8;
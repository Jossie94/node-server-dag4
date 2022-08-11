-- create database psl;
-- use psl;

drop table if exists persons;

create table persons (
	persid int auto_increment primary key,
    fullname varchar(56) not null,
    email varchar(48) not null,
    note varchar(100),
    student boolean default false,
    lastupdate timestamp default now() on update now()
);

insert into persons (
		fullname,
		email,
		note
    )
    values 
    (
		'Ella Stick',
        'ella@mail.dk',
        'Strækker sig langt...'
	),
    (
		'Steen Aldermann',
        'steen@mail.dk',
        'Kan godt løfte store sten'
	);
    
-- drop user if exists 'dingdong'@'localhost';
create user 'dingdong'@'localhost' identified by 'dingdong';

grant select, insert, update, delete on psl.persons to 'dingdong'@'localhost';
    
create table phonebook
(
    id            smallint unsigned auto_increment
        primary key,
    name          varchar(255) not null,
    mobile_number varchar(255) not null
);

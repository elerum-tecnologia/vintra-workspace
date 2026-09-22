-- init.sql automatically generated
create database lportal character set utf8 collate utf8_general_ci;
create user 'lportal'@'%' identified by 'lportal';
grant all privileges on lportal.* to 'lportal'@'%';
flush privileges;

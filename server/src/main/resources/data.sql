delete from Users;

INSERT INTO users(user_id,first_name,last_name, created, email, password, phone, role, updated, user_name)
VALUES (1,'admin','',null,'admin@gmail.com','$2a$10$gv7yNpoVS.BAcF9juE4fKuCo4w9rOv0sF7LQTIT0MwS9qXh7tAxCe','03457610783','ADMIN',null,'admin');

INSERT INTO users(user_id,first_name,last_name, created, email, password, phone, role, updated, user_name)
VALUES (2,'instructor','A',null,'instructorA@gmail.com','$2a$10$gv7yNpoVS.BAcF9juE4fKuCo4w9rOv0sF7LQTIT0MwS9qXh7tAxCe','03457610783','INSTRUCTOR',null,'instructorA');

INSERT INTO users(user_id,first_name,last_name, created, email, password, phone, role, updated, user_name)
VALUES (3,'instructor','B',null,'instructorB@gmail.com','$2a$10$gv7yNpoVS.BAcF9juE4fKuCo4w9rOv0sF7LQTIT0MwS9qXh7tAxCe','03457610783','INSTRUCTOR',null,'instructorB');

INSERT INTO users(user_id,first_name,last_name, created, email, password, phone, role, updated, user_name)
VALUES (4,'user','A',null,'userA@gmail.com','$2a$10$gv7yNpoVS.BAcF9juE4fKuCo4w9rOv0sF7LQTIT0MwS9qXh7tAxCe','03457610783','PUBLIC',null,'userA');

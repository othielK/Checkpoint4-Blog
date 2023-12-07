CREATE TABLE user (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `hashedPassword` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


CREATE TABLE posts (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT(1000) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `date` datetime NOT NULL,
  `userid` INT NOT NULL,
  PRIMARY KEY (`id`),

  CONSTRAINT `fk_user_posts`
    FOREIGN KEY (`userid`)
    REFERENCES user (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  )ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('SALA', 'sala', 'sala@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$HR/lNvZ6zWRH4ObyGrlMtw$7wAqMGtpdJaSFYCmTPnV+gTaX7dwy0KC4cXhVyC5/Ks');
INSERT INTO user (`firstname`, `lastname`, `email`, `hashedPassword`) VALUES ('Othiel', 'othiel', 'othiel@gmail.com', '$argon2id$v=19$m=65536,t=5,p=1$HR/lNvZ6zWRH4ObyGrlMtw$7wAqMGtpdJaSFYCmTPnV+gTaX7dwy0KC4cXhVyC5/Ks');


INSERT INTO posts (`title`, `description`, `img`, `date`,`userid`) VALUES ('The Power of React Hooks in Modern Web Development', 'Exploring how React Hooks simplify code and open up new possibilities for structuring React applications. Learn about useState, useEffect, and more!', 'post.9c76eeec-d9b1-4c24-818a-eb04c0a3aa91.jpg', '2023-12-04 15:30:00', '1');

INSERT INTO posts (`title`, `description`, `img`, `date`,`userid`) VALUES ('Mastering Express.js: Building Robust Web Applications', 'Explore the ins and outs of Express.js, the popular Node.js framework for building scalable and performant web applications. Learn about routing, middleware, and best practices for creating robust APIs.', 'post.04a03d96-eedf-435a-966f-a944dac579af.png', '2023-12-05 10:45:00','2');

INSERT INTO posts (`title`, `description`, `img`, `date`,`userid`) VALUES ('Why React is winning over Angular?', 'React is a JavaScript library for building User Interfaces.

It’s a component-based library and makes it super easy for developers to create User Interfaces.

It was managed and created by Facebook and a group of open source developers and was introduced in May 2013. Angular is a JavaScript framework for web and mobile development.

It is a typescript-based language, managed by Google’s Developer community and was launched in 2016.

It is one of the most important factors that work in favour of Angular that it is built and updated by some of the most credible persons on earth.', 'post.68265d93-14f9-4258-8b6e-93b21217d04a.webp', '2023-12-05 10:45:00','2');

INSERT INTO posts (`title`, `description`, `img`, `date`, `userid`)
VALUES (
   'Implementing Skeleton Loading in React',
   'We cannot simply replace every dynamically loaded element on the page with skeleton loading. In some cases, we cannot predict how the final loaded state of the page is going to look like. For example, if we try and assume a final state of the page ',
   'post.5b951930-fdb3-4580-900b-64fd17b14cd1.jpg',
   '2023-12-05 10:45:00',
   '2'
);

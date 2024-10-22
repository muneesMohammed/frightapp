git init
git add .
git commit -m "message"
git remote add origin https://github.com/muneesMohammed/frightapp.git
git push -u orgin master





ALTER TABLE users
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


ALTER TABLE users
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    -- category_name VARCHAR(255) NOT NULL,
    category_type VARCHAR(50) NOT NULL CHECK (category_type IN ('personal', 'business')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
RENAME COLUMN id TO user_id;

ALTER TABLE expenses RENAME TO old_expenses;  

CREATE TABLE expenses (        
    expense_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    amount DECIMAL NOT NULL,
    date DATE NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(category_id),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO categories (category_type)
VALUES 
    ('personal'),
    ('business')

INSERT INTO expenses (user_id, amount, date, category_id, description, created_at)
VALUES(
    (1, 1500.00, '2025-04-01', 1, 'Weekly groceries', NOW()),
    (1, 450.00, '2025-04-02', 2, 'Bus ride to work', NOW()),
    (1, 2000.00, '2025-04-03', 1, 'Cinema tickets', NOW()), 
    (1, 750.00, '2025-04-04', 1, 'Lunch with friends', NOW()),
    (1, 500.00, '2025-04-05', 2, 'Ride from the airport', NOW()),
    (1, 3000.00, '2025-04-06', 1, 'Concert ticket', NOW()), 
    (1, 1200.00, '2025-04-07', 1, 'Weekly groceries', NOW()),
    (1, 250.00, '2025-04-08', 2, 'Uber to the office', NOW()),
    (1, 500.00, '2025-04-09', 1, 'Movie outing', NOW()), 
    (1, 5000.00, '2025-04-10', 1, 'Dinner at a restaurant', NOW()),
    (1, 1200.00, '2025-04-11', 1, 'Overnight stay', NOW()), 
    (1, 3500.00, '2025-04-12', 2, 'Flight to New York', NOW()),
    (1, 2500.00, '2025-04-13', 1, 'Rock concert', NOW()), 
    (1, 300.00, '2025-04-14', 2, 'Morning commute', NOW()),
    (1, 800.00, '2025-04-15', 1, 'Food delivery', NOW()),
    (1, 2000.00, '2025-04-16', 1, 'Dinner with colleagues', NOW()),
    (1, 1700.00, '2025-04-17', 1, 'Monthly groceries', NOW()),
    (1, 400.00, '2025-04-18', 1, 'Spotify subscription', NOW()), 
    (1, 150.00, '2025-04-19', 1, 'Netflix streaming', NOW()), 
    (1, 250.00, '2025-04-20', 2, 'Return home', NOW()),
    (1, 150.00, '2025-04-21', 1, 'Quick snack on the go', NOW()),
    (1, 500.00, '2025-04-22', 1, 'Monthly yoga subscription', NOW()), 
    (1, 100.00, '2025-04-23', 1, 'Morning coffee', NOW()),
    (1, 600.00, '2025-04-24', 2, 'Airport to hotel', NOW()),
    (1, 1000.00, '2025-04-25', 1, 'Gym subscription', NOW()), 
    (1, 1500.00, '2025-04-26', 1, 'Family dinner', NOW()),
    (1, 350.00, '2025-04-27', 2, 'Business meeting', NOW()),
    (1, 4000.00, '2025-04-28', 2, 'Weekend getaway', NOW()), -- Transport
    (1, 600.00, '2025-04-29', 1, 'Birthday gift', NOW()), -- Food
    (1, 300.00, '2025-04-30', 1, 'Monthly haircut', NOW()), -- Food
    (1, 1000.00, '2025-05-01', 1, 'Lunch at the office', NOW()),
    (1, 1400.00, '2025-05-02', 1, 'Groceries for the week', NOW()),
    (1, 500.00, '2025-05-03', 2, 'Monthly transport pass', NOW()),
    (1, 1500.00, '2025-05-04', 2, 'Travel insurance', NOW()), 
    (1, 1200.00, '2025-05-05', 1, 'Skill development course', NOW()), 
    (1, 1000.00, '2025-05-06', 1, 'New shoes', NOW()), -- Food
    (1, 5000.00, '2025-05-07', 1, 'New furniture', NOW()), -- Food
    (1, 800.00, '2025-05-08', 1, 'Monthly electricity bill', NOW()), 
    (1, 150.00, '2025-05-09', 1, 'Amazon Prime subscription', NOW()), -- Food
    (1, 400.00, '2025-05-10', 2, 'Event transportation', NOW()),
    (1, 1800.00, '2025-05-11', 1, 'Monthly grocery shopping', NOW()),
    (1, 500.00, '2025-05-12', 1, 'Business meeting lunch', NOW()),
    (1, 200.00, '2025-05-13', 1, 'Purchased new book', NOW()), -- Food
    (1, 300.00, '2025-05-14', 1, 'Movie and popcorn', NOW()), -- Food
    (1, 350.00, '2025-05-15', 2, 'Taxi to dinner', NOW()),
    (1, 8000.00, '2025-05-16', 2, 'Vacation to Hawaii', NOW()), -- Transport
    (1, 450.00, '2025-05-17', 1, 'Monthly water bill', NOW()), -- Food
    (1, 650.00, '2025-05-18', 1, 'Phone bill', NOW()), -- Food
    (1, 1000.00, '2025-05-19', 1, 'Visit to the doctor', NOW()), -- Food
    (1, 1500.00, '2025-05-20', 1, 'Concert for weekend', NOW()), -- Food
    (1, 300.00, '2025-05-21', 1, 'Monthly internet bill', NOW()), -- Food
    (1, 500.00, '2025-05-22', 1, 'Dinner with family at home', NOW()),
    (1, 2000.00, '2025-05-23', 1, 'Anniversary gift', NOW()), -- Food
    (1, 1500.00, '2025-05-24', 2, 'Rental for weekend trip', NOW()),
    (1, 2500.00, '2025-05-25', 2, 'Weekend trip to mountains', NOW()), -- Transport
    (1, 1200.00, '2025-05-26', 1, 'Shopping online', NOW()), -- Food
    (1, 800.00, '2025-05-27', 1, 'Lunch with clients', NOW()),
    (1, 4000.00, '2025-05-28', 2, 'Flight to Paris', NOW()),
    (1, 500.00, '2025-05-29', 1, 'Books for the course', NOW()), -- Food
    (1, 1500.00, '2025-05-30', 1, 'Mother''s day gift', NOW()), -- Food
    (1, 600.00, '2025-05-31', 1, 'Casual lunch with friends', NOW()),
    (1, 2500.00, '2025-06-01', 2, 'Weekend trip to the beach', NOW()), -- Transport
    (1, 400.00, '2025-06-02', 1, 'Tickets for museum visit', NOW()), -- Food
    (1, 450.00, '2025-06-03', 1, 'Gym fitness class', NOW()), -- Food
    (1, 750.00, '2025-06-04', 1, 'Cooking class for beginners', NOW()), -- Food
    (1, 2000.00, '2025-06-05', 1, 'Tickets for rock concert', NOW()), -- Food
    (1, 1500.00, '2025-06-06', 1, 'Backyard barbecue', NOW()),
    (1, 1000.00, '2025-06-07', 1, 'New sports gear', NOW()), -- Food
    (1, 500.00, '2025-06-08', 1, 'Family zoo trip', NOW()), -- Food
    (1, 800.00, '2025-06-09', 1, 'Lunch by the beach', NOW()),
    (1, 3500.00, '2025-06-10', 2, 'Road trip across the city', NOW()), -- Transport
    (1, 1500.00, '2025-06-11', 1, 'Spa day', NOW()), -- Food
    (1, 1200.00, '2025-06-12', 1, 'Cycling gear', NOW()), -- Food
    (1, 800.00, '2025-06-13', 1, 'Hair care products', NOW()), -- Food
    (1, 1500.00, '2025-06-14', 1, 'House cleaning service', NOW()), -- Food
    (1, 800.00, '2025-06-15', 1, 'Gift for sister''s birthday', NOW()), -- Food
    (1, 1200.00, '2025-06-16', 1, 'Dinner at a restaurant with friends', NOW()),
    (1, 10000.00, '2025-06-17', 2, 'Flight to Dubai for vacation', NOW()),
    (1, 400.00, '2025-06-18', 2, 'Bicycle rental for sightseeing', NOW()),
    (1, 1000.00, '2025-06-19', 1, 'Tickets for new blockbuster', NOW()), -- Food
    (1, 1200.00, '2025-06-20', 1, 'Sunglasses for summer', NOW()), -- Food
    (1, 5000.00, '2025-06-21', 1, 'Shopping spree', NOW()), -- Food
    (1, 250.00, '2025-06-22', 1, 'Ice cream treat with friends', NOW()),
    (1, 600.00, '2025-06-23', 2, 'Taxi to the airport', NOW()),
    (1, 2500.00, '2025-06-24', 1, 'Jazz concert tickets', NOW()), -- Food
    (1, 4000.00, '2025-06-25', 1, 'Gift for friend''s wedding', NOW()), -- Food
    (1, 1500.00, '2025-06-26', 2, 'Weekend camping trip', NOW()), -- Transport
    (1, 150.00, '2025-06-27', 1, 'Coffee with colleague', NOW()),
    (1, 2500.00, '2025-06-28', 1, 'Fees for professional conference', NOW()), -- Food
    (1, 2000.00, '2025-06-29', 1, 'Sushi dinner', NOW()),
    (1, 3000.00, '2025-06-30', 1, 'Dental check-up', NOW()), -- Food
    (1, 500.00, '2025-07-01', 1, 'YouTube premium subscription', NOW()), -- Food
    (1, 2000.00, '2025-07-02', 1, 'Gift for a friend''s birthday', NOW()), -- Food
    (1, 300.00, '2025-07-03', 1, 'Netflix subscription', NOW()), -- Food
    (1, 8000.00, '2025-07-04', 2, 'Flight to London', NOW()),
    (1, 500.00, '2025-07-05', 2, 'Daily office commute', NOW()),
    (1, 1000.00, '2025-07-06', 1, 'Hair coloring at salon', NOW()), -- Food
    (1, 3000.00, '2025-07-07', 1, 'Clothing shopping', NOW()), -- Food
    (1, 2000.00, '2025-07-08', 2, 'Car service and maintenance', NOW()),
    (1, 1500.00, '2025-07-09', 1, 'Family picnic in the park', NOW());
);

DROP TABLE old_expenses; 

ALTER TABLE incomes
ADD COLUMN category_id INTEGER;

ALTER TABLE incomes
ADD CONSTRAINT fk_income_category
FOREIGN KEY (category_id)
REFERENCES categories(category_id);

ALTER TABLE users
ADD COLUMN category_id INTEGER;

CREATE TABLE businessexpenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE businessincome (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    user_id INT NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

ALTER TABLE expenses
DROP COLUMN category_id;

ALTER TABLE incomes
DROP COLUMN category_id;

ALTER TABLE incomes
DROP COLUMN updated_at;

ALTER TABLE users
DROP COLUMN category_id;

ALTER TABLE users
DROP COLUMN updated_at;

DROP TABLE categories; 

ALTER TABLE incomes
ADD COLUMN user_id INTEGER;

ALTER TABLE incomes
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id)
REFERENCES users(user_id);
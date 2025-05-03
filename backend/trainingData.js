import {pool} from './db.js'

export const trainingData = [
    { title: 'Textbooks', amount: 45.00, type: 'expense', date: '2024-01-05', category: 'education', description: 'College textbooks' },
    { title: 'Grocery Shopping', amount: 75.20, type: 'expense', date: '2024-01-05', category: 'groceries', description: 'Weekly groceries' },
    { title: 'Doctor Visit', amount: 100.00, type: 'expense', date: '2024-01-03', category: 'health', description: 'Routine checkup' },
    { title: 'Netflix', amount: 15.99, type: 'expense', date: '2024-01-01', category: 'subscriptions', description: 'Monthly subscription' },
    { title: 'New Jeans', amount: 60.00, type: 'expense', date: '2024-01-06', category: 'clothing', description: 'New pair of jeans' },
    { title: 'Bus Ticket', amount: 5.00, type: 'expense', date: '2024-01-04', category: 'travelling', description: 'Daily commute' },
    { title: 'Miscellaneous', amount: 20.00, type: 'expense', date: '2024-01-07', category: 'other', description: 'Misc. expense' },
    { title: 'Online Course', amount: 50.00, type: 'expense', date: '2024-01-10', category: 'education', description: 'Online course fee' },
    { title: 'Supermarket', amount: 80.00, type: 'expense', date: '2024-01-09', category: 'groceries', description: 'Weekly groceries' },
    { title: 'Pharmacy', amount: 25.00, type: 'expense', date: '2024-01-02', category: 'health', description: 'Prescription refill' },
    { title: 'Spotify', amount: 9.99, type: 'expense', date: '2024-01-12', category: 'subscriptions', description: 'Monthly subscription' },
    { title: 'New Shoes', amount: 80.00, type: 'expense', date: '2024-02-01', category: 'clothing', description: 'New pair of shoes' },
    { title: 'Train Fare', amount: 12.00, type: 'expense', date: '2024-01-15', category: 'travelling', description: 'Train to work' },
    { title: 'Books', amount: 30, type: 'expense', date: '2024-01-18', category: 'education', description: 'Books for study' },
    { title: 'Grocery Bill', amount: 90, type: 'expense', date: '2024-01-22', category: 'groceries', description: 'Weekly groceries' },
    { title: 'Dental Checkup', amount: 75, type: 'expense', date: '2024-01-20', category: 'health', description: 'Dental checkup' },
    { title: 'Amazon Prime', amount: 12.99, type: 'expense', date: '2024-01-17', category: 'subscriptions', description: 'Monthly subscription' },
    { title: 'Jacket Purchase', amount: 100, type: 'expense', date: '2024-01-25', category: 'clothing', description: 'Winter jacket' },
    { title: 'Flight Ticket', amount: 200, type: 'expense', date: '2024-01-23', category: 'travelling', description: 'Flight ticket' },
    { title: 'Stationery', amount: 10, type: 'expense', date: '2024-01-14', category: 'other', description: 'Office supplies' },
    { title: 'Tuition Fees', amount: 200.00, type: 'expense', date: '2024-02-05', category: 'education', description: 'College tuition' },
    { title: 'Food Shopping', amount: 100.00, type: 'expense', date: '2024-02-01', category: 'groceries', description: 'Big grocery haul' },
    { title: 'Medicine', amount: 40.00, type: 'expense', date: '2024-02-10', category: 'health', description: 'Prescription medicine' },
    { title: 'Hulu', amount: 8.99, type: 'expense', date: '2024-02-16', category: 'subscriptions', description: 'Monthly subscription' },
    { title: 'Winter Coat', amount: 120, type: 'expense', date: '2024-02-20', category: 'clothing', description: 'New winter coat' },
    { title: 'Taxi Fare', amount: 30, type: 'expense', date: '2024-02-18', category: 'travelling', description: 'Taxi ride' },
    { title: 'Gifts', amount: 50, type: 'expense', date: '2024-02-12', category: 'other', description: 'Birthday gifts' },
    { title: 'Workshop', amount: 60, type: 'expense', date: '2024-02-22', category: 'education', description: 'Workshop fee' },
    { title: 'Organic Food', amount: 110, type: 'expense', date: '2024-02-25', category: 'groceries', description: 'Organic groceries' },
    { title: 'Eye Exam', amount: 60, type: 'expense', date: '2024-02-03', category: 'health', description: 'Eye examination' },
    { title: 'Course Materials', amount: 70.00, type: 'expense', date: '2024-03-05', category: 'education', description: 'Course materials' },
    { title: 'Weekly Groceries', amount: 85.00, type: 'expense', date: '2024-03-01', category: 'groceries', description: 'Weekly groceries' },
    { title: 'Health Insurance', amount: 150.00, type: 'expense', date: '2024-03-10', category: 'health', description: 'Health insurance premium' },
    { title: 'Netflix Subscription', amount: 15.99, type: 'expense', date: '2024-03-17', category: 'subscriptions', description: 'Monthly Netflix' },
    { title: 'Summer Dress', amount: 45.00, type: 'expense', date: '2024-03-22', category: 'clothing', description: 'Summer dress' },
    { title: 'Train Tickets', amount: 25.00, type: 'expense', date: '2024-03-20', category: 'travelling', description: 'Train tickets' },
    { title: 'Office Supplies', amount: 15.00, type: 'expense', date: '2024-03-12', category: 'other', description: 'Office supplies' },
    { title: 'Seminar Fee', amount: 100.00, type: 'expense', date: '2024-03-28', category: 'education', description: 'Seminar fee' },
    { title: 'Gourmet Food', amount: 120, type: 'expense', date: '2024-03-25', category: 'groceries', description: 'Gourmet food' },
    { title: 'Prescription', amount: 55, type: 'expense', date: '2024-03-02', category: 'health', description: 'Prescription drugs' },
    { title: 'Books', amount: 25.00, type: 'expense', date: '2024-04-07', category: 'education', description: 'Books for study' },
    { title: 'Organic Groceries', amount: 110.00, type: 'expense', date: '2024-04-01', category: 'groceries', description: 'Organic groceries' },
    { title: 'Doctor Visit', amount: 90.00, type: 'expense', date: '2024-04-12', category: 'health', description: 'Regular checkup' },
    { title: 'YouTube Premium', amount: 11.99, type: 'expense', date: '2024-04-14', category: 'subscriptions', description: 'YouTube subscription' },
    { title: 'Summer Collection', amount: 95.00, type: 'expense', date: '2024-04-18', category: 'clothing', description: 'New summer clothes' },
    { title: 'Bus Pass', amount: 30.00, type: 'expense', date: '2024-04-20', category: 'travelling', description: 'Monthly bus pass' },
    { title: 'Home Decor', amount: 40.00, type: 'expense', date: '2024-04-09', category: 'other', description: 'Home decoration' },
    { title: 'Online Course', amount: 80.00, type: 'expense', date: '2024-04-22', category: 'education', description: 'Online course fee' },
    { title: 'Specialty Foods', amount: 130.00, type: 'expense', date: '2024-04-25', category: 'groceries', description: 'Specialty food items' },
    { title: 'Therapy Session', amount: 80.00, type: 'expense', date: '2024-04-03', category: 'health', description: 'Therapy session' },
    { title: 'Language Course', amount: 120, type: 'expense', date: '2024-05-08', category: 'education', description: 'Language course' },
    { title: 'Fresh Food', amount: 78.50, type: 'expense', date: '2024-05-01', category: 'groceries', description: 'Fresh food' },
    { title: 'Medical Exam', amount: 110, type: 'expense', date: '2024-05-15', category: 'health', description: 'Medical exam' },
    { title: 'Magazine Subscription', amount: 20, type: 'expense', date: '2024-05-19', category: 'subscriptions', description: 'Magazine subscription' },
    { title: 'Spring Collection', amount: 115, type: 'expense', date: '2024-05-22', category: 'clothing', description: 'Spring clothes' },
    { title: 'Train Travel', amount: 40, type: 'expense', date: '2024-05-20', category: 'travelling', description: 'Train travel' },
    { title: 'Home Repair', amount: 65, type: 'expense', date: '2024-05-12', category: 'other', description: 'Home repair' },
    { title: 'Certification', amount: 150, type: 'expense', date: '2024-05-26', category: 'education', description: 'Certification fee' },
    { title: 'Organic Produce', amount: 140, type: 'expense', date: '2024-05-28', category: 'groceries', description: 'Organic produce' },
    { title: 'Specialist Visit', amount: 120, type: 'expense', date: '2024-05-04', category: 'health', description: 'Specialist doctor' },
    { title: 'Tutoring', amount: 30.00, type: 'expense', date: '2024-06-03', category: 'education', description: 'Tutoring session' },
    { title: 'Regular Groceries', amount: 70.00, type: 'expense', date: '2024-06-01', category: 'groceries', description: 'Regular groceries' },
    { title: 'Checkup', amount: 80.00, type: 'expense', date: '2024-06-05', category: 'health', description: 'Annual checkup' },
    { title: 'Streaming Service', amount: 10.00, type: 'expense', date: '2024-06-08', category: 'subscriptions', description: 'Streaming service' },
    { title: 'Summer Wear', amount: 55.00, type: 'expense', date: '2024-06-10', category: 'clothing', description: 'Summer wear' },
    { title: 'Local Travel', amount: 15.00, type: 'expense', date: '2024-06-07', category: 'travelling', description: 'Local travel' },
    { title: 'Pet Supplies', amount: 25.00, type: 'expense', date: '2024-06-04', category: 'other', description: 'Pet supplies' },
    { title: 'Training Course', amount: 90.00, type: 'expense', date: '2024-06-12', category: 'education', description: 'Training course' },
    { title: 'Health Foods', amount: 95.00, type: 'expense', date: '2024-06-11', category: 'groceries', description: 'Health foods' },
    { title: 'Therapy', amount: 70.00, type: 'expense', date: '2024-06-02', category: 'health', description: 'Therapy' },
    { title: 'Language Lessons', amount: 110, type: 'expense', date: '2024-07-02', category: 'education', description: 'Language lessons' },
    { title: 'Basic Groceries', amount: 65.50, type: 'expense', date: '2024-07-01', category: 'groceries', description: 'Basic groceries' },
    { title: 'Specialist Visit', amount: 130, type: 'expense', date: '2024-07-08', category: 'health', description: 'Specialist visit' },
    { title: 'Music Subscription', amount: 12, type: 'expense', date: '2024-07-12', category: 'subscriptions', description: 'Music subscription' },
    { title: 'New Outfit', amount: 100, type: 'expense', date: '2024-07-15', category: 'clothing', description: 'New outfit' },
    { title: 'Weekend Trip', amount: 150, type: 'expense', date: '2024-07-10', category: 'travelling', description: 'Weekend trip' },
    { title: 'Gifts', amount: 45, type: 'expense', date: '2024-07-05', category: 'other', description: 'Birthday gifts' },
    { title: 'Certification Exam', amount: 180, type: 'expense', date: '2024-07-18', category: 'education', description: 'Exam fee' },
    { title: 'Gourmet Groceries', amount: 125, type: 'expense', date: '2024-07-22', category: 'groceries', description: 'Gourmet' },
    { title: 'Dental Cleaning', amount: 75, type: 'expense', date: '2024-07-03', category: 'health', description: 'Dental cleaning' },
    { title: 'Education Supplies', amount: 20.00, type: 'expense', date: '2024-08-01', category: 'education', description: 'Supplies' },
    { title: 'Regular Food', amount: 70.00, type: 'expense', date: '2024-08-01', category: 'groceries', description: 'Food' },
    { title: 'Medical Checkup', amount: 90.00, type: 'expense', date: '2024-08-05', category: 'health', description: 'Checkup' },
    { title: 'Streaming', amount: 18.00, type: 'expense', date: '2024-08-10', category: 'subscriptions', description: 'Streaming' },
    { title: 'New Clothes', amount: 80.00, type: 'expense', date: '2024-08-15', category: 'clothing', description: 'Clothes' },
    { title: 'Travel', amount: 100.00, type: 'expense', date: '2024-08-08', category: 'travelling', description: 'Travel' },
    { title: 'Household Items', amount: 30.00, type: 'expense', date: '2024-08-03', category: 'other', description: 'Household' },
    { title: 'Course Fee', amount: 120.00, type: 'expense', date: '2024-08-12', category: 'education', description: 'Course' },
    { title: 'Organic Food Bill', amount: 115.00, type: 'expense', date: '2024-08-18', category: 'groceries', description: 'Organic' },
    { title: 'Eye Exam', amount: 55.00, type: 'expense', date: '2024-08-02', category: 'health', description: 'Eye' },
    { title: 'Tuition', amount: 250, type: 'expense', date: '2024-09-04', category: 'education', description: 'Tuition' },
    { title: 'Grocery Run', amount: 88, type: 'expense', date: '2024-09-01', category: 'groceries', description: 'Grocery' },
    { title: 'Dental', amount: 120, type: 'expense', date: '2024-09-07', category: 'health', description: 'Dental' },
    { title: 'Subscription Box', amount: 30, type: 'expense', date: '2024-09-11', category: 'subscriptions', description: 'Subscription' },
    { title: 'New Wardrobe', amount: 150, type: 'expense', date: '2024-09-14', category: 'clothing', description: 'Clothes' },
    { title: 'Trip', amount: 200, type: 'expense', date: '2024-09-09', category: 'travelling', description: 'Travel' },
    { title: 'Misc', amount: 20, type: 'expense', date: '2024-09-02', category: 'other', description: 'Misc' },
    { title: 'Seminar', amount: 100, type: 'expense', date: '2024-09-17', category: 'education', description: 'Seminar' },
    { title: 'Specialty Food', amount: 140, type: 'expense', date: '2024-09-21', category: 'groceries', description: 'Specialty' },
    { title: 'Therapy Session', amount: 90, type: 'expense', date: '2024-09-05', category: 'health', description: 'Therapy' },
    { title: 'University Fees', amount: 300, type: 'expense', date: '2024-10-03', category: 'education', description: 'Fees' },
    { title: 'Food Shopping Spree', amount: 105, type: 'expense', date: '2024-10-01', category: 'groceries', description: 'Food' },
    { title: 'Medical Checkup', amount: 115, type: 'expense', date: '2024-10-06', category: 'health', description: 'Checkup' },
    { title: 'Online Services', amount: 25, type: 'expense', date: '2024-10-10', category: 'subscriptions', description: 'Services' },
    { title: 'Fall Collection', amount: 120, type: 'expense', date: '2024-10-14', category: 'clothing', description: 'Clothes' },
    { title: 'Business Trip', amount: 250, type: 'expense', date: '2024-10-08', category: 'travelling', description: 'Travel' },
    { title: 'Gifts Purchase', amount: 50, type: 'expense', date: '2024-10-02', category: 'other', description: 'Gifts' },
    { title: 'Training', amount: 130, type: 'expense', date: '2024-10-16', category: 'education', description: 'Training' },
    { title: 'Health Food Haul', amount: 155, type: 'expense', date: '2024-10-20', category: 'groceries', description: 'Health' },
    { title: 'Specialist Appointment', amount: 130, type: 'expense', date: '2024-10-04', category: 'health', description: 'Specialist' },
];
  
//console.log(JSON.stringify(trainingData, null, 2));
  
async function insertSampleExpenses() {
    try {
      const query = `
        INSERT INTO expenses (title, amount, type, date, category, description, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      for (const expense of trainingData) {
        const values = [
          expense.title,
          expense.amount,
          expense.type,
          expense.date,
          expense.category,
          expense.description,
          1, //valid user ID from users table.
        ];
  
        await pool.query(query, values);
        console.log(`Inserted expense: ${expense.title}`);
      }
  
      console.log('All sample expenses inserted successfully!');
    } catch (error) {
      console.error('Error inserting sample expenses:', error);
    } finally {
      await pool.end();
    }
  }
  
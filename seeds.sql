INSERT INTO departments(department_name)
VALUES 
  ('Executive'),
  ('Sales'),
  ('Engineering'),
  ('Legal'),
  ('Finance');


INSERT INTO roles(title, salary, department_id)
VALUES 
  ('Director of Engineering', '250000', 1),
  ('Sale Manager', '70000', 2),
  ('Account Manager', '60000', 3),
  ('Lawyer', '150000', 4),
  ('Software Engineer', '180000', 5);
  -- ('Legal Team Lead', '120000', 6),
  -- ('Electrical Engineer', '115000', 7),
  -- ('Paralegal', '55000', 8),
  -- ('Aerospace Engineer', '135000', 9),
  -- ('Sales Consultant', '90000', 10),
  -- ('Sales Liason', '100000', 11),
  -- ('Legal Assistant', '50000', 12);
  
 

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES

('Joe', 'Mendall', 1, NULL),
  ('Mike', 'Lowry', 2, NULL),
  ('Martin', 'Lawrence', 3, 1),
  ('Tim', 'Alvarez', 5, 2),
  ('George', 'Castanza', 5, 3),
  ('Josh', 'Whitfield', 4, 1);
  -- ('Bob', 'Barker', 6, 5),
  -- ('Sarah', 'Connor', 7, 6),
  -- ('Megan', 'Fox', 7, 6),
  -- ('Gabe', 'Fisher', 8, 6),
  -- ('Sean', 'Carter', 9, 1),
  -- ('Sam', 'Bullar', 10, 9);
  
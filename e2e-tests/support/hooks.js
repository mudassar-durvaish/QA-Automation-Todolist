const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to your live MongoDB Atlas database
const MONGO_URI = 'mongodb+srv://mudassardurvaish_db_user:W1ero6FRkQt7oyoS@qaautomationtodolist.a81pgrs.mongodb.net/todolist_qa?retryWrites=true&w=majority&appName=QAAutomationTodolist';

BeforeAll(async function () {
  await mongoose.connect(MONGO_URI);
});

AfterAll(async function () {
  await mongoose.disconnect();
});

Before(async function () {
  // Launch Playwright Context
  this.browser = await chromium.launch({ headless: false }); // Set to true for CI environments
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // ----- DATABASE SETUP & TEARDOWN -----
  // 1. Wipe existing test user and their tasks to ensure a deterministic clean slate
  const existingUser = await mongoose.connection.db.collection('users').findOne({ email: 'test_qa@example.com' });
  if (existingUser) {
    await mongoose.connection.db.collection('tasks').deleteMany({ user: existingUser._id });
    await mongoose.connection.db.collection('users').deleteOne({ _id: existingUser._id });
  }
  
  // 2. Programmatically seed a Test User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Systems123!', salt);
  
  await mongoose.connection.db.collection('users').insertOne({
    firstName: 'QA',
    lastName: 'Tester',
    email: 'test_qa@example.com',
    password: hashedPassword,
    accountType: 'personal',
    createdAt: new Date(),
    updatedAt: new Date()
  });
});

After(async function () {
  // ----- DATABASE TEARDOWN POST-TEST -----
  const testUser = await mongoose.connection.db.collection('users').findOne({ email: 'test_qa@example.com' });
  if (testUser) {
    await mongoose.connection.db.collection('tasks').deleteMany({ user: testUser._id });
    await mongoose.connection.db.collection('users').deleteOne({ _id: testUser._id });
  }

  // Close Playwright resources
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});

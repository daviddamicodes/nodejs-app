const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuhor(courseId) {
  const course = Course.findById(courseId)
  course.author.name = "David Dharme"
  course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save()
}

addAuthor('61a0cae61c98c04fe037984f', new Author({ name: 'Amy' }))

// createCourse('Node Course', [
//   Author({ name: 'Mosh' }),
//   Author({ name: 'Jack' })
// ]);

// updateAuhor('61a0c358603ad55aa88d3ebf');

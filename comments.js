// Create web server

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var connection = mysql.createConnection(dbconfig);

// Create a new comment
router.post('/', function(req, res, next) {
    var body = req.body;
    var query = connection.query('insert into comments set ?', body, function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

// Get all comments
router.get('/', function(req, res, next) {
    var query = connection.query('select * from comments', function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

// Get a comment by id
router.get('/:id', function(req, res, next) {
    var query = connection.query('select * from comments where id = ?', req.params.id, function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

// Update a comment by id
router.put('/:id', function(req, res, next) {
    var query = connection.query('update comments set ? where id = ?', [req.body, req.params.id], function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

// Delete a comment by id
router.delete('/:id', function(req, res, next) {
    var query = connection.query('delete from comments where id = ?', req.params.id, function(err, rows) {
        if(err) throw err;
        res.json(rows);
    });
});

module.exports = router;

=======
Suggestion 2

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');
// Create express app
const app = express();

// Use body-parser
app.use(bodyParser.json());
// Use cors
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create endpoint to get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  // Return comments array
  res.send(commentsByPostId[req.params.id] || []);
});

// Create endpoint to create a comment for a post
app.post('/posts/:id/comments', async (req, res) => {
  // Create comment id
  const commentId = randomBytes(4).toString('hex');
  // Get post id from url
  const { id: postId } = req.params;
  // Get comment data from request body
  const { content } = req.body;

  // Get comments for post
  const comments = commentsByPostId[postId] || [];

  // Add new comment to comments array
  comments.push({ id: commentId, content, status: 'pending' });

  // Update comments array
  commentsByPostId[postId] = comments;

  // Emit event to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId,
      status: 'pending',
    },
  });

  // Return comments array
  res.status(201).send(comments);
});

// Create endpoint to receive event from event bus
app.post('/events', async (req, res) => {
  // Get event type and data from request body
  const { type, data } = req.body;

  // Check if event type is CommentModerated
  if (type === 'CommentModerated') {
    // Get post id and comment id from data
    const { postId, id, status, content } = data;

    // Get comments array for post
    const comments = commentsByPostId[postId];

    // Get comment from comments array
    const comment = comments.find((comment) => comment.id === id);

    // Update comment status
    comment.status = status;

    // Emit event to event bus

=======
Suggestion 3


// Import modules
const express = require('express');
const router = express.Router();

// Import controller
const commentController = require('../controllers/commentController');

// Import middleware
const auth = require('../middleware/auth');

// Routes
router.post('/', auth, commentController.addComment);
router.get('/', auth, commentController.getComments);
router.get('/:id', auth, commentController.getComment);
router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;

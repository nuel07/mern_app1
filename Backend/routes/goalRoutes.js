const express = require('express');
const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/goalcontroller');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**router.get('/', getGoals);
/router.post('/', setGoals); these two can be combined into one line
for code readability as below**/
router.route('/').get(protect, getGoals).post(protect, setGoals);

/** router.put('/:id', updateGoals);
router.delete('/:id', deleteGoals); same story, clean code **/
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);
module.exports = router;
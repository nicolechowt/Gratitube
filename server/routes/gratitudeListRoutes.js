'use strict';
const express = require('express');
const router = express.Router();

const gratitudeList = require('../controllers/gratitudeListController');

router.get('/',gratitudeList.index);

//gratitude Routes
router.get('/gratitudeItems',gratitudeList.list_all_items);
router.post('/gratitudeItems',gratitudeList.create_an_item);

router.get('/gratitudeItems/:itemId',gratitudeList.read_an_item);
router.put('/gratitudeItems/:itemId',gratitudeList.update_an_item);
router.delete('/gratitudeItems/:itemId',gratitudeList.delete_an_item);

module.exports = router;

// 'use strict';
// module.exports = function(app) {
//   const gratitudeList = require('../controllers/gratitudeListController');

//   // todoList Routes
//   app.route('/gratitudeItems')
//     .get(gratitudeList.list_all_items)
//     .post(gratitudeList.create_an_item);


//   app.route('/gratitudeItems/:itemId')
//     .get(gratitudeList.read_an_item)
//     .put(gratitudeList.update_an_item)
//     .delete(gratitudeList.delete_an_item);
// };

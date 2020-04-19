const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const {
  responseHandler,
  errorCatcher
} = require('../../app-services/error-handler');

router
  .route('/')
  .get(errorCatcher(async (req, res) => await usersService.getAll(res)))

  .post(
    errorCatcher(async (req, res) => await usersService.addUser(req.body, res))
  );

router
  .route('/:id')
  .get(
    errorCatcher(
      async (req, res) => await usersService.getUser(req.params.id, res)
    )
  )

  .put(
    errorCatcher(async (req, res) => {
      const newUser = await usersService.updateUser({
        ...req.body,
        id: `${req.params.id}`
      });
      if (newUser) {
        res.json(User.toResponse(newUser));
      } else {
        const response = responseHandler(400, 'Bad request', res);
        response();
      }
    })
  )

  .delete(
    errorCatcher(async (req, res) => {
      const isDeleted = await usersService.deleteUser(req.params.id);
      if (isDeleted) {
        res.status(204).end();
      } else {
        const response = responseHandler(404, 'User not found', res);
        response();
      }
    })
  );

module.exports = router;

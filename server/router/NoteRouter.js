const NoteController = require('../controller/NoteController');
const authMiddleware = require('../middlewares/auth-middleware')
const Router = require('express').Router;
const router = new Router()

/**
 * @swagger
 * /note/create:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user creating the note.
 *               name:
 *                 type: string
 *                 description: The name of the note.
 *               description:
 *                 type: string
 *                 description: The description of the note.
 *               tags:
 *                 type: array
 *                 description: The tags associated with the note.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The ID of the tag.
 *                     number:
 *                       type: string
 *                       description: The name of the tag.
 *                   required:
 *                     - name
 *                     - number
 *             required:
 *               - user_id
 *               - name
 *               - description
 *               - tags
 *     responses:
 *       200:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the note.
 *                 name:
 *                   type: string
 *                   description: The name of the note.
 *                 description:
 *                   type: string
 *                   description: The description of the note.
 *                 tags:
 *                   type: array
 *                   description: The tags associated with the note.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the tag.
 *                       number:
 *                         type: integer
 *                         description: The number associated with the tag.
 *       401:
 *         description: Unauthorized
 */
router.use('/create', authMiddleware, NoteController.createNote)
/**
 * @swagger
 * /note/delete:
 *   post:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note_id:
 *                 type: string
 *                 description: The ID of the note to delete.
 *               user_id:
 *                 type: string
 *                 description: The ID of the user who is deleting the note.
 *             required:
 *               - note_id
 *               - user_id
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the note.
 *                 name:
 *                   type: string
 *                   description: The name of the note.
 *                 description:
 *                   type: string
 *                   description: The description of the note.
 *                 tags:
 *                   type: array
 *                   description: The tags associated with the note.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the tag.
 *                       number:
 *                         type: integer
 *                         description: The number associated with the tag.
 *       401:
 *         description: Unauthorized
 */
router.use('/delete', authMiddleware, NoteController.deleteNote)
/**
 * @swagger
 * /note/edit:
 *   post:
 *     summary: Edit an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note_id:
 *                 type: string
 *                 description: The ID of the note to edit.
 *               user_id:
 *                 type: string
 *                 description: The ID of the user who is editing the note.
 *               name:
 *                 type: string
 *                 description: The new name of the note.
 *               description:
 *                 type: string
 *                 description: The new description of the note.
 *               tags:
 *                 type: array
 *                 description: The new tags associated with the note.
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The ID of the tag.
 *                     number:
 *                       type: string
 *                       description: The name of the tag.
 *                   required:
 *                     - name
 *                     - number
 *             required:
 *               - note_id
 *               - user_id
 *               - name
 *               - description
 *               - tags
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the note.
 *                 name:
 *                   type: string
 *                   description: The name of the note.
 *                 description:
 *                   type: string
 *                   description: The description of the note.
 *                 tags:
 *                   type: array
 *                   description: The tags associated with the note.
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the tag.
 *                       number:
 *                         type: integer
 *                         description: The number associated with the tag.
 *       401:
 *         description: Unauthorized
 */
router.use('/edit', authMiddleware, NoteController.editNote)
/**
 * @swagger
 * /note/all:
 *   post:
 *     summary: Fetch all notes for a user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user whose notes are to be fetched.
 *               sort:
 *                 type: string
 *                 description: Sort type (e.g., 'asc' for ascending, 'desc' for descending).
 *             required:
 *               - user_id
 *               - sort
 *     responses:
 *       200:
 *         description: Notes fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: The ID of the note.
 *                   name:
 *                     type: string
 *                     description: The name of the note.
 *                   description:
 *                     type: string
 *                     description: The description of the note.
 *                   tags:
 *                     type: array
 *                     description: The tags associated with the note.
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the tag.
 *                         number:
 *                           type: number
 *                           description: The number associated with the tag.
 *       401:
 *         description: Unauthorized
 */
router.use('/all', authMiddleware, NoteController.fetchUserNotes)
/**
 * @swagger
 * /note/one:
 *   post:
 *     summary: Fetch a single note for a user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user whose note is to be fetched.
 *               note_id:
 *                 type: string
 *                 description: The ID of the note to be fetched.
 *             required:
 *               - user_id
 *               - note_id
 *     responses:
 *       200:
 *         description: Note fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: The ID of the note.
 *                 name:
 *                   type: string
 *                   description: The name of the note.
 *                 description:
 *                   type: string
 *                   description: The description of the note.
 *                 tags:
 *                   type: array
 *                   description: The tags associated with the note.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the tag.
 *                       name:
 *                         type: string
 *                         description: The name of the tag.
 *       401:
 *         description: Unauthorized
 */
router.use('/one', authMiddleware, NoteController.fetchUserNote)

module.exports = router
import express from "express"

import {getAllParticipant, createParticipant,
    updateParticipant,
    delParticipant,
    getSingleParticipant, 

} from "../services/participantService.js"


const router = express.Router()



router.get('/', getAllParticipant)
router.get('/:id', getSingleParticipant)
router.post('/', createParticipant)
router.put('/:id', updateParticipant)
router.delete('/:id', delParticipant)

export default router;
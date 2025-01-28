const express = require('express')
const router = express.Router()
const VolleyballPlayer = require('../models/volleyballPlayer')




//getting all
router.get('/', async (req, res) => {
    try {
        const volleyballPlayer = await VolleyballPlayer.find()
        res.json(volleyballPlayer)

    } catch (err)  {
        res.status(500).json({message: err.message})
    }
});

//getting One
router.get('/:id', getVolleyballPlayer, (req, res) => {
    res.json(res.volleyballPlayer)
});

//creating One
router.post('/', async (req, res) => {
    const volleyballPlayer = new VolleyballPlayer({
        name: req.body.name
        
    })
    try {
        const newVolleyballPlayer = await volleyballPlayer.save()
        res.status(201).json(newVolleyballPlayer)
        res.json({message: 'joueur créé'})

    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

//updating One
router.patch('/:id', getVolleyballPlayer, async (req, res) => {
    if (req.body.name != null) {
        res.volleyballPlayer.name = req.body.name;
    }

    if (req.body.pointsWon != null) {
        res.volleyballPlayer.pointsWon = req.body.pointsWon;
    }

    if (req.body.pointsLost != null) {
        res.volleyballPlayer.pointsLost = req.body.pointsLost;
    }

    if (req.body.pointsWonServe != null) {
        res.volleyballPlayer.pointsWonServe = req.body.pointsWonServe;
    }

    if (req.body.pointsLostServe != null) {
        res.volleyballPlayer.pointsLostServe = req.body.pointsLostServe;
    }

    try {
        const updatedVolleyballPlayer = await res.volleyballPlayer.save();
        res.json(updatedVolleyballPlayer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//deleteing One
router.delete('/:id', getVolleyballPlayer, async (req, res) => {
   try {
    await res.volleyballPlayer.deleteOne()
    res.json({message: 'joueur supprimé'})

   }catch (err) {
   res.status(500).json({message: err.message})
}

});

async function getVolleyballPlayer(req, res, next) {
let volleyballPlayer
try{
volleyballPlayer = await VolleyballPlayer.findById(req.params.id)
if(volleyballPlayer==null){
    return res.status(404).json({message: 'Aucun joueur trouvé'})
}

}catch (err) {
    return res.status(500).json({message: err.message})
}

 res.volleyballPlayer = volleyballPlayer
 next()

}

module.exports = router
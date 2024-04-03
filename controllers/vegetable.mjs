import express from 'express';
const router = express.Router();
import Vegetable from '../models/vegetables.mjs';
import db from '../db/conn.mjs';


// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element



router.get("/seed", async (req, res) => {
    console.log('in seed');
    try {
        await Vegetable.create([
            {
                name: 'carrot',
                color: "orange",
                readyToEat: true
            }, 
            {
                name: 'broccoli',
                color: 'green',
                readyToEat: false
            }, 
            {
                name: 'tomatoes',
                color: 'red',
                readyToEat: true
            }
        ])
        res.status(200).redirect('/vegetables');
    } catch (err) {
        res.status(400).send(err);
    }
});

// I - Index    GET         READ - display a list of elements
router.get('/', async (req, res) => {
    try {
        const foundVegetables = await Vegetable.find({});
        res.status(200).render('vegetables/Index', {vegetables: foundVegetables})
        // res.status(200).send(foundVegetables);
    } catch (err) {
        res.status(400).send(err);
    }
});

// N - New - allows a user to input a new fruit
router.get('/new', (req, res) => {
    res.render('vegetables/New');

})
//ID - DELETE METHOD
router.delete('/:id', async(req, res) => {
    try{ 
        const deleteVegetable = await Vegetable.findByIdAndDelete(req.params.id);
        // console.log(deleteVegetable)
        res.status(200).redirect('vegetables');
    } catch(err) {
        res.status(400).send(err);
    }
})
// U - UPDATE METHOD
router.put('/:id', async (req, res) => {
    if(req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    
    }else{
        req.body.readyToEat = false;
  }
  try{
    const updateVegetable = await Vegetable.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},     
 );
 console.log(updateVegetable);
 res.redirect(`/vegetables/ ${req.params.id}`);

  } catch( err) {
    res.status(400).send(err);
  }
})

// C - CREATE post method
// I am starting with my post route so that I can see the things in my database
router.post('/', async(req, res) => {
       // // this will be useful when have a user input form
       if (req.body.readyToEat === 'on') { // if checked, req.body.readyToEat is set to 'on' - or the checkbox is checked
        req.body.readyToEat = true;
    } else {                            // if not checked, then it was undefined
        req.body.readyToEat = false;
    }
    console.log(req.body)
    try {
        const createdVegetable = await Vegetable.create(req.body);
        res.status(200).redirect('/vegetables');
    } catch (err) {
        res.status(400).send(err);
    }
})

// E - EDIT - update an existing entry in the database
router.get("/:id/edit", async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findById(req.params.id);
        res.status(200).render('vegetables/Edit', {vegetable: foundVegetable});
    } catch (err) {
        res.status(400).send(err);
    }
})



// S - SHOW - show route displays details of an individual fruit
router.get('/:id', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findById(req.params.id);
        res.render('vegetables/Show', {vegetable: foundVegetable});
    } catch (err) {
        res.status(400).send(err);
    }
})


export default router;
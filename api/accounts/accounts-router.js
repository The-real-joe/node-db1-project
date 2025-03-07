const router = require('express').Router()
const md = require('./accounts-middleware');
const Account = require('./accounts-model');


router.get('/', async (req, res, next) => {
 try{
  const data = await Account.getAll();
  res.json(data); 
 }catch(err){
  next(err)
 }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post(
  '/', 
md.checkAccountPayload,
md.checkAccountNameUnique, 
async (req, res, next) => {
  try{
    const newAccount = await Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget
    });
    res.status(201).json(newAccount);
  }catch(err){
    next(err)
  }
})

router.put(
'/:id', 
md.checkAccountId, md.checkAccountPayload,
async (req, res, next) => {
  try{
    const updatedAccount = await Account.updateById(req.params.id, req.body);//REMEBER req.body is its own thing and req.params is its own thing!!
    res.status(200).json(updatedAccount)
  }catch(err){
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, 
async (req, res, next) => {
  try{
    await Account.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
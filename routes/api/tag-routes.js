const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log('=======================');
  Tag.findAll({
     include: {
       through: ProductTag,
       model: Product
     }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  console.log('=======================');
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      through: ProductTag,
      model: Product
    }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', ({body}, res) => {
  // create a new tag
  Tag.create(body)
  .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {id: req.params.id}
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((dbTagData) => {
    if (!dbTagData) {  
    res.status(404).json({ message: "No product found!"})
    return;
    }
    res.json(dbTagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

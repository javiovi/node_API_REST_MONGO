const express = require('express')
const router = express.Router()
const Book = require ('../models/book.models')


//MIDDLEWARE

const getBook = async(req,res,next) => {
    let book;
    const{ id } = req.params 
    
    if(!id.match(

    )) {
        return res.status(404).json (
            { message: 'El iD del libro no es valido'}
        )
    }

    try {
        book = await Book.findById(id);
        if(!book){
            return res.status(404).json(
                {
                    message: 'El libro fue encontrado'
                }
            )
        }
    }
    catch (error) {
        return res.status(500).json (
            {
                message: error.message
            }
        )
    }
     res.book = book;
     next()
}







//Obtener todos los libros

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        console.log('GET ALL', books)
        if(books.length === 0) {
            res.status(204).json([])
        }
        res.json(books)
    }
    catch (error) {
        res.status(500).json({ message: error.message})
    }
})


//crear un nuevo libro (recurso) [POST]

router.post('/', async (req, res) => {
    const {title, author, genre,  publication_date
    } = req?.body

     if( !title || !author || !genre || !publication_date){
        return res.status(400).json({
            message : "Los campos son obligatorios"
        })     }

const book = new Book (
    {
        title,
        author,
        genre,
        publication_date
    }
)
try {
    const newBook = await book.save()
    console.log(newBook)
    res.status(201),json(newBook)

} catch (error ) {
    res.status(400).json({
        message: error.message
    })
}

})

router.get('/:id', getBook, async(req, res) => {
    res.json(res.book);
})

router.put('/:id', getBook, async (req, res) => {
    try{
        const book = res.book
        book.title = req.body.title|| book.title;
        book.author = req.body.title|| book.author;
        book.genre = req.body.title|| book.genre;
        book.publication_date = req.body.publication_date|| book.publication_date ;
         

        const ubdateBook = await book.save()
        res.json(updateBook)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })



    }

})


router.delete('/:id', getBook, async (req, res) => {
    try {
        
        const book = res.book
        await book.deleteOne();
        res.json({
            message: 'El libro ${book.title} fue eliminado correctamente'
        })



    } catch (error) {

        res.status(500).json({
            message : 'error.message'
        })
    }
})

module.exports = router
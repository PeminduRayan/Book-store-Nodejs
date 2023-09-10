import express from "express";
import { Book } from "../models/bookModels.js";
const router = express.Router();


//POST METHOD FOR BOOKS
router.post('/', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ){
            return res.status(400).json({
                messeage : 'Send all required fields : title,author, publishYear',
            });
        }

        const newBook = {
            title : req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear,

        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({messeage: error.messeage})
    }
  })
 
//GET ALL BOOKS
router.get( '/',async (request,response)=>{
    try {
        const books = await Book.find({});
        return response.status(201).json({
            count : books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error); 
        response.status(500).send({
            messeage : error.messeage
        })
    }
});

//GET A BOOK BY ID
router.get( '/:id',async (request,response)=>{
    try {
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(201).json(book);
        
    } catch (error) {
        console.log(error); 
        response.status(500).send({
            messeage : error.messeage
        })
    }
});

//UPDATE A BOOK
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).json({
                messeage : 'Send all required fields : title,author, publishYear',
            });
        }

        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        
        if(!result){
            response.status(404).json({
                messeage : 'Book not found'
            });
        }
        return response.status(200).json({
            message : 'Book updated Successfully'
        });

    } catch (error) {
        response.status(500).json({
            messeage : error.messeage
        })
    }   
  
});


//DELETE A BOOK
router.delete('/:id', async (request,response)=>{
        try {
            const {id} = request.params;
            const result = await Book.findByIdAndDelete(id);
            if(!result){
                response.status(404).json({
                    messeage : 'Book not found'
                });
            }
            return response.status(200).json({
                message : 'Book deleted Successfully'
            });
        } catch (error) {
            response.status(500).json({
                messeage : error.messeage
            });
        }
    })
//

export default router;
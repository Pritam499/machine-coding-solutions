const pool = require('../db/pool.js')

exports.getAllProducts = async (req, res) =>{
    try{

        const result = await pool.query('SELECT * FROM public.product ORDER BY id ASC');
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:err.message});
        }
}

exports.getProductById = async (req,res) => {
    try{
        const {id} = req.params;
        const  result = await pool.query('SELECT * FROM public.product WHERE id = $1', [id]);

        if(result.rows.length === 0){
            return res.status(404).json({error: 'Product not found!'})
        }

        res.json(result.rows[0])
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}


exports.addProducts = async (req, res) => {
    try{
        const {name, price, description} = req.body;

        console.log(name, price, description)

        const result = await pool.query('INSERT INTO public.product (name, price, description) VALUES ($1, $2, $3) RETURNING *',[name, price, description]);

        console.log('add product result', result)

        res.status(201).json(result.rows[0]);
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.updateProduct = async (req, res) =>{
    try{

        const {id} = req.params;
        const {name, price, description} = req.body;

        const result = await pool.query('UPDATE public.product SET name = $1, price = $2, description = $3 where id = $4 RETURNING *', [name, price, description, id])

        if(result.rows.length === 0){
            return res.status(404).json({error: "Product not found!"})
        }

        res.json(result.rows[0])

    }catch(err){
        res.status(500).json({error: err.message})

    }
}

exports.deleteProduct = async (req, res) =>{
    try{

        const {id} = req.params;
        const result = await pool.query("DELETE FROM public.product where id = $1 RETURNING *", [id]);

        if(result.rows.length === 0){
            return res.status(404).json({error: 'Product not found!'})
        }
        res.json({message: 'Product Deleted'})

    }catch(err){
        res.status(500).json({error: err.message})
    }
}
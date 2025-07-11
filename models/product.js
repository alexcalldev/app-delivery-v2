const db = require('../config/config');

const Product = {};

Product.findByCategory = (id_category, result) => {
    const sql = `
    SELECT 
        CONVERT(P.id_category, char) AS id,
        P.name,
        P.description,
        P.price,
        P.image1,
        P.image2,
        P.image3,
        CONVERT(P.id_category, char) AS id_category
    FROM
        products as P
    WHERE
        P.id_category = ?
    `;
    db.query(
        sql, 
        [id_category],
        (err, res) => {
            if(err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id del nuevo producto:', res);
                result(null, res);
            }
        }
    );
}
Product.create = (product, result) => {
    const sql = `
    INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at
        )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if(err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id del nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }
    
    )
}

Product.update = (product, result) => {
    const sql = `
    UPDATE 
        products
    SET 
        name = ?,
        description = ?,
        price = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        id_category = ?,
        updated_at = ?
    WHERE
        id = ?
    `
    ;
    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.id
        ],
        (err, res) => {
            if(err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }
    
    )
}


module.exports = Product;
const hash = "thisishash";
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(username === "admin" && password === "admin"){
            const token = jwt.sign({username: "admin"}, hash, {
                expiresIn: 86400 * 356, // 1 year
              });
            res.status(200).send({
                success: true,
                message: 'login berhasil',
                code: 200,
                token,
            }); 
        }
        else{
            res.status(403).send({
                success: false,
                message: 'Username atau Password salah',
                code: 403,
            });
            return;
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'login gagal',
            code: 500,
            error,
        });
        console.log(error);
    }
}

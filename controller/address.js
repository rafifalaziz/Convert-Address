const axios = require("axios");

exports.getAddress = async(req, res) => {
    try {
        let kelurahan = null;
        let kecamatan = null;
        let kota = null;
        let provinsi = null;
        axios.get('https://kasirpintar.co.id/allAddress.txt')
        .then(function (response){
            console.log(response.data.address_kecamatan[0].id);
            for (let index = 0; index < response.data.address_kelurahan.length; index++) {
                if(response.data.address_kelurahan[index].id === req.params.id){
                    kelurahan = response.data.address_kelurahan[index];
                    break;
                }
                
            }
            for (let index = 0; index < response.data.address_kecamatan.length; index++) {
                if(response.data.address_kecamatan[index].id === (kelurahan!=null? kelurahan.kecamatan_id : req.params.id)){
                    kecamatan = response.data.address_kecamatan[index];
                    break;
                }
                
            }
            for (let index = 0; index < response.data.address_kota.length; index++) {
                if(response.data.address_kota[index].id === (kecamatan!=null? kecamatan.kota_id : req.params.id)){
                    kota = response.data.address_kota[index];
                    break;
                }
                
            }
            for (let index = 0; index < response.data.address_provinsi.length; index++) {
                if(response.data.address_provinsi[index].id === (kota!=null? kota.provinsi_id : req.params.id)){
                    provinsi = response.data.address_provinsi[index];
                    break;
                }
                
            }
            if(kelurahan==null&&kecamatan==null&&kota==null&&provinsi==null){
                return res.status(403).send({
                    success: false,
                    message: 'Tidak ditemukan',
                    code: 403,
                });
            }
            return res.status(200).send({
                status: "sukses",
                data: [
                    {
                    kelurahan : kelurahan!=null? kelurahan.nama:null,
                    kecamatan : kecamatan!=null? kecamatan.nama:null,
                    kota : kota!=null? kota.nama:null,
                    provinsi : provinsi!=null? provinsi.nama:null,
                    }
                ],
            });
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'gagal mendapatkan alamat',
            code: 500,
            error,
        });       
    }
}

exports.kota = async(req, res) => {
    try {
        let kecamatan = [];
        let kota = null;
        axios.get('https://kasirpintar.co.id/allAddress.txt')
        .then(function (response){
            for (let index = 0; index < response.data.address_kecamatan.length; index++) {
                if(response.data.address_kecamatan[index].kota_id === req.params.id){
                    kecamatan.push(response.data.address_kecamatan[index].nama);
                }
            }
            for (let index = 0; index < response.data.address_kota.length; index++) {
                if(response.data.address_kota[index].id === req.params.id){
                    kota = response.data.address_kota[index].nama;
                }
            }
            if(kota==null){
                return res.status(403).send({
                    success: false,
                    message: 'Tidak ditemukan',
                    code: 403,
                });
            }
            return res.status(200).send({
                status: "sukses",
                data: [
                    {
                    kecamatan : kecamatan,
                    kota: kota,
                    }
                ],
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'gagal mendapatkan kota',
            code: 500,
            error,
        });  
    }
}
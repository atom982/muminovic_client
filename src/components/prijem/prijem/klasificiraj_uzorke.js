module.exports = {
    klasificiraj: function (element,jmbg,ime,prezime,spol,lokacija, datum,doktor,vrijeme,sekcija,trudnica,menstc,anticoag,menopauza,user,token,jmbgObj,site,siteSifra,prioritet,komentar) {
    var final = []      
    
        var ogtt60 = {
            labassay: "5bf3d8b56a1e5e00de84a576",
            ime_testa: "OGTT-60",
            cijena:' 0',
            analit: "OGTT - 60 min",
            sekcija: "BIOHEMIJA",
            manual: false,
            calculated: false,
            calculatedTests: []
        }
        var ogtt120 = {
            labassay: "5bf3d9266a1e5e00de84a579",
            ime_testa: "OGTT-120",
            cijena: '0',
            analit: "OGTT - 120 min",
            sekcija: "BIOHEMIJA",
            manual: false,
            calculated: false,
            calculatedTests: []
        }
        var prolaktin2 = {
            labassay: "5c07803047937e0d2e2fe38b",
            ime_testa: "Prolaktin P2",
            cijena: '0',
            analit: "Prolaktin 2",
            sekcija: "IMUNOHEMIJA",
            manual: false,
            calculated: false,
            calculatedTests: []
        } 
        var prolaktin3 = {
            labassay: "5c07804c47937e0d2e2fe38e",
            ime_testa: "Prolaktin P3",
            cijena: '0',
            analit: "Prolaktin 3",
            sekcija: "IMUNOHEMIJA",
            manual: false,
            calculated: false,
            calculatedTests: []
        }
        json = {}
        json.type = element.tip
        json.pid = element.pid
        json.jmbg = jmbg
        json.ime= ime
        json.prezime= prezime
        json.spol=spol
        json.lokacija=lokacija
        json.datum=datum
        json.doktor= doktor
        json.vrijeme= vrijeme
        json.sekcija= sekcija
        json.trudnica= trudnica
        json.menstc= menstc
        json.anticoag= anticoag
        json.menopauza= menopauza
        json.user= user
        json.token= token
        json.jmbgObj= jmbgObj
        json.site= site
        json.siteSifra= siteSifra
        json.prioritet= prioritet
        json.komentar= komentar
        json.specialTest = []
        
        temp = {}
        temp.type = element.tip
        temp.pid = element.pid
        temp.jmbg = jmbg
        temp.ime= ime
        temp.prezime= prezime
        temp.spol=spol
        temp.lokacija=lokacija
        temp.datum=datum
        temp.doktor= doktor
        temp.vrijeme= vrijeme
        temp.sekcija= sekcija
        temp.trudnica= trudnica
        temp.menstc= menstc
        temp.anticoag= anticoag
        temp.menopauza= menopauza
        temp.user= user
        temp.token= token
        temp.jmbgObj= jmbgObj
        temp.site= site
        temp.siteSifra= siteSifra
        temp.prioritet= prioritet
        temp.komentar= komentar
        temp.specialTest = []
        // console.log('Prolaktin P1:'+element)
            if(element.tip ==="Serum"){
                i = 0
                element.niz.forEach(test => {
                    i++
                    if(test.ime_testa === "OGTT-0"){

                        json.testovi = [ogtt60]
                        final.push({json:json,test:'OGTT-60'}) 
                        temp.testovi = [ogtt120]   
                        final.push({json:temp,test:'OGTT-120'}) 

                    }
                    // console.log('Prolaktin P1:'+test.ime_testa)
                    if(test.ime_testa === "Prolaktin P1"){

                        json.testovi = [prolaktin2]
                        final.push({json:json,test:'Prolaktin P2'}) 
                        temp.testovi = [prolaktin3]   
                        final.push({json:temp,test:'Prolaktin P3'}) 

                    } 
                });
            }
            if(element.tip ==="Krv"){

            }
            if(element.tip ==="Plazma"){
                
            }
            if(element.tip ==="Urin"){
                
            }
            if(element.tip ==="Feces"){
                
            }
            if(element.tip ==="Likvor"){
                
            }
            if(element.tip ==="Ascites"){
                
            }
            if(element.tip ==="Dren"){
                
            }
            if(element.tip ==="Znoj"){
                
            }
            if(element.tip ==="arterijska krv"){
                
            }
            if(element.tip ==="venska krv"){
                
            }
            if(element.tip ==="kapilarna krv"){
                
            }
            if(element.tip ==="izljev pleuralni"){
                
            }
            if(element.tip ==="punktat"){
                
            }
            if(element.tip ==="urin 24"){
                
            }
        

        return final 
    },


}



<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="Opšte postavke - Email">
          <div class="row">            
            <div class="col-md-5">
              <fieldset>
                <div  class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="from" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite ime pošiljaoca'}}</label><i class="bar"></i>
                  </div>
                </div> 
                <div  class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="subject" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite naslov poruke'}}</label><i class="bar"></i>
                  </div>
                </div> 
                <div  class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="h1" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite tekst'}}</label><i class="bar"></i>
                  </div>
                </div> 
                <div  class="form-group with-icon-left">
                  <div class="input-group">
                    <input id="input-icon-left" title=" " v-model="text" name="input-icon-left" required/>
                    <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                    <label class="control-label" for="input-icon-left">{{'Unesite tekst'}}</label><i class="bar"></i>
                  </div>
                </div>
                <button  class="btn btn-secondary" @click.prevent="sacuvajPostavke"><span class="fa fa-save"></span>{{ ' SAČUVAJ'}}</button>
              </fieldset> 
              
              <hr v-if="false">
                <a v-if="false" @click="naprednePostavke" href="#">{{"Napredne postavke"}}</a>
                <a v-if="false" @click="standardnePostavke" href="#">{{"Standardne postavke"}}</a>                       
            </div> 

            <div class="col-md-7">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                <td bgcolor="#FFFFFF" align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px;" class="wrapper">
                <tr>
                <td align="center" valign="top" style="padding: 15px 0;" class="logo">
                  <a href="webadress+'" target="_blank">
                    <img alt="Logo" src="https://www.alignprocess.com/images/lablogo3.jpg" width="478.5" height="52" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">
                  </a>
                </td>
                </tr>
              </table>
                </td>
                </tr>                
                <tr>
                <td bgcolor="#ffffff" align="center" style="padding: 25px 15px 70px 15px;" class="section-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="500" class="responsive-table">
                <tr>   
                <td>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td>               
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td align="center" style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;" class="padding-copy">{{h1}}</td>
                </tr>
                <tr>
                <td align="center" style="padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;" class="padding-copy">{{text}}</td>
                </tr>
              </table>
                </td>
                </tr>
                <tr>
                <td align="center">                
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td align="center" style="padding-top: 25px;" class="padding">
              <table border="0" cellspacing="0" cellpadding="0" class="mobile-button-container">
                <tr> 
                <td align="center">
                  <a href='https://www.facebook.com/%C4%8Carovac-Lab-164831264179719/' target="_blank">
                    <img alt="Logo" src="https://www.alignprocess.com/images/facebook-logo2.png" style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 16px;" border="0">
                  </a>
                </td>
                </tr>
              </table> 
                </td>
                </tr>
              </table> 
                </td>
                </tr>
              </table> 
                </td>
                </tr>
              </table> 
                </td>
                </tr>
                <tr> 
                <td bgcolor="#ffffff" align="center" style="padding: 20px 0px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 500px;" class="responsive-table">
                <tr> 
                <td align="center" style="font-size: 12px; line-height: 18px; font-family: Helvetica, Arial, sans-serif; color:#666666;">
                Privatni medicinsko-biohemijski laboratorij “ČAROVAC LAB”
                <br> 
                Rješenje Ministarstva zdravstva Kantona Sarajevo broj: 10-37-7339/18
                <br> 
                Ul: Branislava Nušica 164, Dobrinja, Sarajevo 
                <br> 
                e-mail: carovac.lab@gmail.com, tel: +387 33 871 276, FB: Čarovac Lab
                <br> 
              <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center" style="max-width: 480px;" class="responsive-table">
                <hr style="border-top: 5px solid #F58A20;">
              </table>
                </td>
                </tr>
              </table> 
                </td>
                </tr>
              </table> 
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
</template>

<script>
import {http} from '../../../../config/config.js'
import index from 'axios';
  export default {
    data () {
      return {
        subject:'',
        text:'Poštovani,  u prilogu Vam dostavljamo rezultate laboratorijskih pretraga.',
        h1: 'Hvala Vam na posjeti!',
        from: 'ČAROVAC LAB',
        subject: 'Rezultati laboratorijskih pretraga'
      }
    },
    name: 'email',

    mounted(){

    },

    watch:{
      
    },

    methods: {      
      notice(type, text, desc) {
        this.$notice[type]({
          title: text,
          description: desc,
           closable: false,
           styles: { width: "500px", marginLeft: "-195px" },
           duration: 2.0,
        })
      },    
      sacuvajPostavke(){        
        
      },
      naprednePostavke(){
               
      },
      standardnePostavke(){
                
      }
    }
  }
</script>

<style lang="scss">

</style>
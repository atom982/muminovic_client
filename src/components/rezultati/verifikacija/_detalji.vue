<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <!-- Rezultat za uzorak: U001C81114 -->
        <vuestic-widget v-if="glavniScreen" :headerText="hid">
          <div class="row">
            <div class="col-md-3">
              <p style="padding-left: 10px;">Pacijent:<strong> {{ imeIprezime }}</strong></p>
              <hr>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-3"></div>
            <div class="col-md-3">
              <div class="form-group form-group-w-btn" style="float:right;padding-right: 10px;">
                <div class="btn btn-primary btn-with-icon btn-micro rounded-icon" title="Osvježi stranicu" @click='refreshRezultata(ide)'>
                  <div class="btn-with-icon-content">
                    <i class="fa fa-refresh"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <!-- PRVA TABELA -->
            <table class="table table-striped first-td-padding ">
              <thead>
                <tr>
                  <td v-if="uslovPrint">izbor</td>
                  <td>TEST</td>
                  <td>REFSET</td>
                  <td>REZULTAT</td>
                  <td>JEDINICA</td>
                  <td>referentni interval</td>
                  <td>VIŠE REZULTATA</td>
                  <td>ODOBREN</td>
                  <td>AKCIJA</td>
                  <td align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr v-if="$route.params.sekcija === test.sekcija || $route.params.sekcija ==='SVE'" v-for="test in rezultati" v-bind:class="{
                  'table-danger': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red' && !test.multidata, 
                  'table-success': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Green' && !test.multidata, 
                  'table-warning': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Yellow' && !test.multidata, 
                  'table-info': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Blue' && !test.multidata
                }">
  
                  <td v-if="uslovPrint">
                    <div class="form-check abc-checkbox abc-checkbox-primary">
                      <input class="form-check-input" type="checkbox" v-model="test.ispis" @click.prevent="disableIspisDialog($event, test.id, ide, test.ispis)">
                      <label class="form-check-label" @click.prevent="disableIspisDialog($event, test.id, ide, test.ispis)"></label>
                    </div>
                  </td>
  
                  <!-- TEST: Bez analita -->
                  <td v-if="rezultat && !test.multidata" :title="test.analit">{{test.ime}}</td>
                  <!-- TEST: Sa analitima -->
                  <td v-if="test.multidata" :title="test.analit">{{test.ime}}</td>
                  <!-- REFSET: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{test.refSet}}</td>
                  <!-- REFSET: Sa analitima -->
                  <td v-if="test.multidata">{{test.refSet}}</td>
  
                  <!-- REZULTAT: Bez analita -->
                  <td v-if="rezultat && !test.multidata">

                    <div v-show="test.edit == false">
                      <label @dblclick="test.edit = true">
                            <strong>{{ test.rezultat }}</strong> 
                          </label>
                    </div>
  
                    <select v-if="test.select_options != undefined" style="width:105px" v-show="test.edit == true" v-model="test.rezultat" v-on:change="test.edit=false; $emit('update', test.id, 'blur', test.rezultat, ide, test.odobren, test.ime, test.dRef, test.gRef)">
                          <option v-for="option in test.select_options">
                            {{ option }}
                          </option>
                        </select>
  
                    <input v-if="test.select_options === undefined" v-show="test.edit == true" v-model="test.rezultat" style="width:100px" v-on:blur="test.edit=false; $emit('update', test.id, 'blur', test.rezultat, ide, test.odobren, test.ime, test.dRef, test.gRef)">
                  
                  </td>
                  <!-- REZULTAT: Sa analitima -->
                  <td v-if="test.multidata && !test.realizovan">
                    <button :id="test.laIDE" title='Rezultati nisu kompletirani' class="btn btn-danger btn-micro" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, ide, test.odobren)"><span :id="test.laIDE" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, ide, test.odobren)" class="glyphicon glyphicon-search"></span> Analiti</button>
                  </td>
                  <td v-if="test.multidata && test.realizovan">
                    <button :id="test.laIDE" title='Pregled rezultata za analite' class="btn btn-primary btn-micro" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, ide, test.odobren)"><span :id="test.laIDE" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, ide, test.odobren)" class="glyphicon glyphicon-search"></span> Analiti</button>
                  </td>
  
                  <!-- JEDINICA: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{test.unit}}</td>
                  <!-- JEDINICA: Sa analitima -->
                  <td v-if="rezultat && test.multidata">{{''}}</td>
  
                  <!-- referentni interval: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[4]}}</td>
                  <!-- referentni interval: Sa analitima -->
                  <td v-if="rezultat && test.multidata">{{''}}</td>
  
                  <!-- više rezultata: Bez analita -->
                  <td v-if="rezultat && !test.multidata">
                    <button v-if="!test.vise && !test.calculated && !test.manual" title='Test ima samo jedan rezultat' @click.prevent="closeResults" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                    <button v-if="test.vise && !test.calculated && !test.manual" @click.prevent="viseRezultata($event, test.IDE, test.odobren, test.dRef, test.gRef, test.refSet, test.analit)" title='Pregled svih rezultata testa' :id='test.test' class='btn btn-primary btn-micro'><span :id='test.test' class='glyphicon glyphicon-ok-circle'></span> Da</button>
                    <button v-if="!test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea') && test.calculated && test.odobren === 'NE'" @click.prevent="showBasicDialogKalkulisani($event, ide, test.IDE, test.ime, test.id)" title='Izračunaj novi rezultat kalkuliranog testa'
                      :id='test.test' class='btn btn-primary btn-micro'><span :id='test.test' class='fa fa-calculator' ></span> ca</button>
                    <button v-if="!test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea') && test.calculated && test.odobren === 'DA'" title='Za odobreni kalkulirani test, nije moguće izračunati novi rezultat' @click.prevent="closeResults" :id='test.test' class='btn btn-warning btn-micro'><span :id='test.test' class='fa fa-calculator' ></span> ca</button>
                    <button v-if="!test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea') && test.manual" title='Ručni test može imati samo jedan rezultat' @click.prevent="closeResults" :id='test.test' class='btn btn-warning btn-micro focus'><span :id='test.test' class='fa fa-pencil-square-o' ></span> ma</button>
                    <button v-if="(test.ime.includes('ROMA') || test.ime.includes('Kl-Krea')) && test.calculated && test.odobren === 'NE'" @click.prevent="showBasicDialogKalkulisani($event, ide, test.IDE, test.ime, test.id)" title='Izračunaj novi rezultat kalkuliranog testa'
                      :id='test.test' class='btn btn-primary btn-micro'><span :id='test.test' class='fa fa-calculator' ></span> ca</button>
                    <button v-if="(test.ime.includes('ROMA') || test.ime.includes('Kl-Krea')) && test.calculated && test.odobren === 'DA'" title='Za odobreni kalkulirani test, nije moguće izračunati novi rezultat' @click.prevent="closeResults" :id='test.test' class='btn btn-warning btn-micro'><span :id='test.test' class='fa fa-calculator' ></span> ca</button>
                  </td>

                  <!-- više rezultata: Sa analitima -->
                  <td v-if="rezultat && test.multidata && test.manual">
                    <button title='Ručni test može imati samo jedan rezultat' class='btn btn-warning btn-micro focus'><span class='fa fa-pencil-square-o'></span> ma</button>
                  </td>
                  <td v-if="test.multidata && !test.manual">
                    <button v-if="test.visemulti" @click.prevent="viseRezultataMulti(test, test.ime, test.analit, test.odobren)" title='Pregled svih rezultata testa' :id='test.test' class='btn btn-primary btn-micro'><span  :id='test.test' class='glyphicon glyphicon-ok-circle'></span> Da</button>
                    <button v-if="!test.visemulti && test.realizovan" title='Test ima samo jedan rezultat' @click.prevent="closeResultsMulti" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                    <button v-if="!test.visemulti && !test.realizovan" title='Rezultati nisu kompletirani' @click.prevent="closeResultsMulti" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                  </td>
  
                  <!-- status: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{test.odobren}}</td>
                  <!-- status: Sa analitima -->
                  <td v-if="test.multidata">{{test.odobren}}</td>
  
                  <!-- AKCIJA: Bez analita -->
                  <td v-if="rezultat && !test.multidata">
                    <button v-if="test.odobren === 'NE'" @click.prevent="odobriRezultat($event, test.rezultat, ide, test.dRef, test.gRef, test.ime)" title='Odobravanje rezultata' :id='test.id' class='btn btn-primary btn-micro'><span :id='test.id' class='glyphicon glyphicon-ok'></span> ODOBRI</button>
                    <button v-if="test.odobren === 'DA'" @click.prevent="showBasicDialogUkloni($event, test.rezultat, ide, test.dRef, test.gRef)" title='Ukloni odobrenje' :id='test.id' class='btn btn-danger btn-micro'><span :id='test.id' class='fa fa-close'></span> UKLONI</button>
                  </td>

                  <!-- AKCIJA: Sa analitima -->
                  <td v-if="rezultat && test.multidata && test.realizovan">
                    <button v-if="test.odobren === 'NE'" @click.prevent="odobriRezultat($event, test.rezultat, ide, test.dRef, test.gRef, test.ime)" title='Odobravanje rezultata' :id='test.id' class='btn btn-primary btn-micro'><span :id='test.id' class='glyphicon glyphicon-ok'></span> ODOBRI</button>
                    <button v-if="test.odobren === 'DA'" @click.prevent="showBasicDialogUkloni($event, test.rezultat, ide, test.dRef, test.gRef)" title='Ukloni odobrenje' :id='test.id' class='btn btn-danger btn-micro'><span :id='test.id' class='fa fa-close'></span> UKLONI</button>
                  </td>
                  <td v-if="rezultat && test.multidata && !test.realizovan">
                    <button v-if="test.odobren === 'NE'" title='Rezultati nisu kompletirani' class="btn btn-pale btn-micro"><span :id='test.id' class="glyphicon glyphicon-ban-circle"></span> ODOBRI</button>
                    <button v-if="test.odobren === 'DA'" @click.prevent="showBasicDialogUkloni($event, test.rezultat, ide, test.dRef, test.gRef)" title='Ukloni odobrenje' :id='test.id' class='btn btn-danger btn-micro'><span :id='test.id' class='fa fa-close'></span> UKLONI</button>
                  </td>

                  <!-- <td align="middle"></td> -->
                  <td align="middle">
                    <i v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : testIsDanger(test.rezultat, test.dRef, test.gRef)}"></i>
                    <i v-bind:class="{'fa fa-check success-icon icon-right input-icon' : testIsSuccess(test.rezultat, test.dRef, test.gRef)}"></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- END OF PRVA TABELA -->
  
            <div v-if="(!uslovOdobriSve) || nedostaju.length > 0">
              <div v-if="nedostaju.length > 1" class="col-md-12"><span style="color: #E34A4A;"><strong>Čeka se na rezultate testova: </strong></span> <button v-for="test in nedostaju" :title="test.analit" class="btn btn-danger hover btn-micro">{{test.naziv}}</button></div>
              <div v-if="nedostaju.length > 0 && nedostaju.length < 2" class="col-md-12"><span style="color: #E34A4A;"><strong>Čeka se na rezultat testa: </strong></span> <button v-for="test in nedostaju" :title="test.analit" class="btn btn-danger hover btn-micro">{{test.naziv}}</button></div>
              <div v-if="(nedostaju.length < 1) && !rucniIma" class="col-md-12"><span style="color: #4AE387;"><strong>Svi testovi su realizovani!</strong></span></div>
            </div>
            <div v-if="rucniIma  && (rucni.length > 0)">
              <div class="col-md-12"><span style="color: #E34A4A;"><strong>Čeka se na ručni rezultat testa: </strong></span> <button v-for="rcn in rucni" :title="rcn.analit" class="btn btn-danger hover btn-micro">{{rcn.ime}}</button></div>
            </div>
            <div v-if="(uslovOdobriSve && nedostaju.length < 1) && !rucniIma" class="col-md-12"><span style="color: #4AE387;"><strong>Svi testovi su verificirani!</strong></span></div>
            <div v-if="retestFlag && (!uslovOdobriSve && nedostaju.length < 1) && (retestirati.length > 1)">
              <div class="col-md-12"><span style="color: #4ab2e3;"><strong>Čeka se na ponovljene rezultate testova: </strong></span> <button v-for="rtst in retestirati" :title="rtst.analit" class="btn btn-info hover btn-micro">{{rtst.ime}}</button></div>
            </div>
            <div v-if="retestFlag && (!uslovOdobriSve && nedostaju.length < 1) && (retestirati.length < 2)">
              <div class="col-md-12"><span style="color: #4ab2e3;"><strong>Čeka se na ponovljeni rezultat testa: </strong></span> <button v-for="rtst in retestirati" :title="rtst.analit" class="btn btn-info hover btn-micro">{{rtst.ime}}</button></div>
            </div>
          </div>
  
          <div v-if="sekcije.length > 1">
            <hr style="border-color:#4ab2e3">
            <div class="row container">
              <div v-for="sekcija in sekcije" class="square">
                <button v-if="$route.params.sekcija === sekcija" class="btn btn-primary-info btn-micro"><span class="fa fa-flask"></span>{{ ' ' + sekcija}}</button> &nbsp
                <button v-if="$route.params.sekcija != sekcija" :id="sekcija" class="btn btn-secondary-info btn-micro" @click.prevent="goToSekcija($event)"><span :id="sekcija" @click.prevent="goToSekcija($event)" class="fa fa-flask"></span>{{ ' ' + sekcija}}</button>              &nbsp
              </div>
            </div>
          </div>
          <hr>
  
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
              </div>
              <div v-if="((prikaziBezuslovno ? false : true) || uslovOdobriSve) && sekcije.length < 2" class="btn-container">
                <button :disabled="uslovOdobriSve" class="btn btn-info wizard-next pull-right" @click="showBasicDialog($event, ide)"><span class="glyphicon glyphicon-ok"></span>{{ ' ODOBRI SVE'}}</button>
              </div>
  
              <div v-if="((prikaziBezuslovno ? false : true) || uslovOdobriSveSekcija) && sekcije.length > 1" class="btn-container">
                <button :disabled="uslovOdobriSveSekcija" class="btn btn-info wizard-next pull-right" @click="showBasicDialogSekcija($event, ide)"><span class="glyphicon glyphicon-ok"></span>{{ ' ODOBRI SVE'}}</button>
              </div>
  
              <div v-if="(prikaziBezuslovno && !uslovOdobriSve) && sekcije.length < 2" class="btn-container">
                <button :disabled="uslovOdobriSve" class="btn btn-danger wizard-next pull-right" @click="showBasicBezuslovno($event, ide)"><span class="glyphicon glyphicon-ok"></span>{{ ' ODOBRI SVE'}}</button>
              </div>
  
              <div v-if="(prikaziBezuslovno && !uslovOdobriSveSekcija) && sekcije.length > 1" class="btn-container">
                <button :disabled="uslovOdobriSveSekcija" class="btn btn-danger wizard-next pull-right" @click="showBasicBezuslovnoSekcija($event, ide)"><span class="glyphicon glyphicon-ok"></span>{{ ' ODOBRI SVE'}}</button>
              </div>
            </div>
            <i title="Bezuslovno odobravanje" @click="prikaziBezuslovno = !prikaziBezuslovno" class="wizard-next pull-right fa fa-exclamation-triangle icon-right input-icon error-icon"></i>
            <i title="Konfiguracija nalaza" v-if="uslovOdobriSve && sekcije.length > 1" @click="uslovPrint = !uslovPrint" class="wizard-next pull-right fa fa-print icon-right input-icon info-icon"></i>
            <i title="Konfiguracija nalaza" v-if="uslovOdobriSveSekcija && sekcije.length < 2" @click="uslovPrint = !uslovPrint" class="wizard-next pull-right fa fa-print icon-right input-icon orange-icon"></i>
          </div>
        </vuestic-widget>
        <!-- End of Rezultat za uzorak: U001C81114 -->

        <!-- Prikaz više rezultata za test: CRP -->
        <vuestic-widget v-if="vise" :headerText="tid">
          <div class="table-responsive">
            <!-- DRUGA TABELA -->
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>ANALIZATOR</td>
                  <td>VRIJEME</td>
                  <td>REZULTAT</td>
                  <td>JEDINICA</td>
                  <td>referentni interval</td>
                  <td>IZBOR REZULTATA</td>
                  <td align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="test in vrezultati" v-bind:class="{'table-danger': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Red', 'table-success': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Green', 'table-warning': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Yellow', 'table-info': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Blue'}">
                  <td>{{ test.aparat }}</td>
                  <td>{{ test.vrijeme }}</td>
                  <td>
                    <strong>{{ test.rezultat }}</strong>
                  </td>
                  <td>{{ test.jedinica }}</td>
                  <!-- <td>{{ test.odobren }}</td> -->
                  <td>{{testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[4]}}</td>
                  <td>
                    <button v-if="jelIzabran(test._id)" title='Rezultat je izabran' :id='test._id' :name='test.IDE' v-bind:class="{'btn btn-pale btn-micro': jelIzabran(test._id)}"><span :id='test._id' :name ='test.IDE' class='vuestic-icon vuestic-icon-maps'></span> IZABRAN</button>
                    <button v-if="!jelIzabran(test._id)" @click.prevent="showBasicDialogIzaberi($event, ide)" title='Izaberi rezultat' :id='test._id' :name='test.IDE' v-bind:class="{'btn btn-primary btn-micro': !jelIzabran(test._id)}"><span :id='test._id' :name ='test.IDE' class='fa fa-hand-pointer-o'></span> IZABERI</button>
                  </td>
                  <td align="middle">
                    <i v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : testIsDanger(test.rezultat, test.dRef, test.gRef)}"></i>
                    <i v-bind:class="{'fa fa-check success-icon icon-right input-icon' : testIsSuccess(test.rezultat, test.dRef, test.gRef)}"></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- END OF DRUGA TABELA -->
          </div>
        </vuestic-widget>
        <!-- End of Prikaz više rezultata za test: CRP -->
        <!-- Prikaz više rezultata za test: KKS3 -->
        <vuestic-widget v-if="viseAnaliti" :headerText="analitid">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>vrijeme</td>
                  <td>rezultati</td>
                  <td align="middle">izbor rezultata</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="test,index in analitiIzbor">
                  <td>{{test.vrijeme}}</td>
                  <td v-if="test.izbor === 'DA'"><button title='Pregled rezultata za analite' @click.prevent="rezultatiAnalitaMulti(test.rezultat, test.vrijeme, test.izbor)" class="btn btn-primary btn-micro"><span class="vuestic-icon vuestic-icon-files"></span> VIŠE</button> </td>
                  <td v-if="test.izbor === 'NE'"><button title='Pregled rezultata za analite' @click.prevent="rezultatiAnalitaMulti(test.rezultat, test.vrijeme, test.izbor)" class="btn btn-danger btn-micro"><span class="vuestic-icon vuestic-icon-files"></span> VIŠE</button> </td>
                  <td align="middle">
                    <button v-if="test.izbor === 'DA'" :id="index" title='Rezultat je izabran' class="btn btn-pale btn-micro"><span :id="index" class="vuestic-icon vuestic-icon-maps"></span> IZABRAN</button>
                    <button v-if="test.izbor === 'NE'" :id="index" title='Izaberi rezultat' class="btn btn-primary btn-micro" @click.prevent="izaberiRezultatMultiDialog($event,test.test)"><span :id="index" class="fa fa-hand-pointer-o"></span> IZABERI</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </vuestic-widget>
        <!-- End of Prikaz više rezultata za test: KKS3 -->

        <vuestic-modal-m :show.sync="show" ref="mediumModal" :okText="potvrdi" :cancelText="odustani">
          <div slot="title"><strong style="color:#4ae387" v-if="rezIzbor ==='DA'">{{this.rezName}}</strong> <strong style="color:#e34a4a" v-if="rezIzbor ==='NE'">{{this.rezName}}</strong> <br> {{this.rezTime}}</div>
          <div style="text-align:center;" class="testoviDiv">
            <div style="text-align:center;" v-for="test in rezAn" class='btn btn-info btn-micro'>
              {{test}}
            </div>
          </div>
        </vuestic-modal-m>

        <!-- card_view = true -->
        <vuestic-widget v-if="prikaziAnalit && card_view" :headerText="multiHeader">
          <div class="row dashboard-info-widgets">
            <div v-for="test in analiti" class="col-md-6 col-xl-2">
  
              <!-- Ako nije Panel i ako nije TINH   -->
              <vuestic-widget v-if="!test.nazivTesta.includes('Panel') && !test.nazivTesta.includes('TINH')" v-bind:class="{
                'info-widget brand-danger': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Red', 
                'info-widget': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Green', 
                'info-widget brand-warning': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Yellow', 
                'info-widget brand-pale': testIsInfo(test.rezultat, test.refd, test.refg)
              }">
  
                <div v-if="test.flag != 'F' && test.flag != ''" style="text-align:right; color:#e34a4a">{{test.flag}}</div>
                <div v-if="test.flag === 'F' || test.flag === ''" style="text-align:right; color:#e34a4a">&nbsp</div>
                <div style="color:black" class="info-widget-inner">
                  <div class="stats">
                    <div class="stats-title">{{test.naziv}}</div>
                    <!-- style="font-size:24px"  -->
  
                    <!-- IZMJENA REZULTATA -->
                    <div v-if="rezultat" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                      <div v-show="test.edit == false">
                        <label @dblclick="test.edit = true">
                          <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                          <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                        </label>
                      </div>
  
                      <select v-if="test.select_options != undefined" style="width:100px" v-show="test.edit == true" v-model="test.rezultat" v-on:change="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                        <option v-for="option in test.select_options">
                          {{ option }}
                        </option>
                      </select>
  
                      <input v-if="test.select_options === undefined" style="width:100px" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                      
                    </div>
                    <!-- END OF IZMJENA REZULTATA -->
  
                    <div v-if="test.nazivTesta != 'TINH' && testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[4] != 'n/a'" :title="test.grupa" class="stats-title">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[4]}}</div>
                    <div v-if="test.nazivTesta != 'TINH' && testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[4] === 'n/a'" :title="test.grupa" class="stats-title">&nbsp</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica === 'n/a'" class="stats-title">&nbsp</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica != 'n/a'" class="stats-title">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[3]}}</div>
  
                    <td style="color:#4ae387" v-if="(test.nazivTesta === 'TINH') && tinh1(test.rezultat, test.refd, test.refg)">{{'Dozvoljeno'}}</td>
                    <td style="color:#f7cc36" v-if="(test.nazivTesta === 'TINH') && tinh2(test.rezultat, test.refd, test.refg)">{{'Nije preporučljivo'}}</td>
                    <td style="color:#e34a4a" v-if="(test.nazivTesta === 'TINH') && tinh3(test.rezultat, test.refd, test.refg)">{{'Nije dozvoljeno'}}</td>
                    <div v-if="(test.nazivTesta === 'TINH') && !tinh1(test.rezultat, test.refd, test.refg) && !tinh2(test.rezultat, test.refd, test.refg) && !tinh3(test.rezultat, test.refd, test.refg)" class="stats-title">&nbsp</div>
                  </div>
                </div>
              </vuestic-widget>
  
              <!-- Ako nije Panel i ako je TINH   -->
              <vuestic-widget v-if="!test.nazivTesta.includes('Panel') && test.nazivTesta.includes('TINH')" v-bind:class="{'info-widget brand-danger': testIsDanger(test.rezultat, test.refd, test.refg), 'info-widget': testIsSuccess(test.rezultat, test.refd, test.refg), 'info-widget brand-warning': testIsWarning(test.rezultat, test.refd, test.refg), 'info-widget brand-pale': testIsInfo(test.rezultat, test.refd, test.refg), 'info-widget brand-pale': isNaNa(test.rezultat, test.refd, test.refg)}">
                <div v-if="test.flag != 'F' && test.flag != ''" style="text-align:right; color:#e34a4a">{{test.flag}}</div>
                <div v-if="test.flag === 'F' || test.flag === ''" style="text-align:right; color:#e34a4a">&nbsp</div>
                <div style="color:black" class="info-widget-inner">
                  <div class="stats">
                    <div class="stats-title">{{test.naziv}}</div>
                    <!-- style="font-size:24px"  -->
  
                    <!-- IZMJENA REZULTATA -->
                    <div v-if="rezultat" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                      <div v-show="test.edit == false">
                        <label @dblclick="test.edit = true">
                                  <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                                  <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                                </label>
                      </div>
                      <input style="width:100px" type="number" min="1" max="3" step="1" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                      
                    </div>
                    <!-- END OF IZMJENA REZULTATA -->
  
                    <div v-if="test.nazivTesta != 'TINH' && test.refg != '0'" :title="test.grupa" class="stats-title">{{Math.abs(test.refd)}} - {{Math.abs(test.refg)}}</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.refg === '0'" :title="test.grupa" class="stats-title">&nbsp</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica === 'n/a'" class="stats-title">&nbsp</div>
                    <!-- v-if="test.jedinica === 'n/a'" -->
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica != 'n/a'" class="stats-title">{{test.jedinica}}</div>
                    <!-- v-if="test.jedinica != 'n/a'" -->
                    <td style="color:#4ae387" v-if="(test.nazivTesta === 'TINH') && tinh1(test.rezultat, test.refd, test.refg)">{{'Dozvoljeno'}}</td>
                    <td style="color:#f7cc36" v-if="(test.nazivTesta === 'TINH') && tinh2(test.rezultat, test.refd, test.refg)">{{'Nije preporučljivo'}}</td>
                    <td style="color:#e34a4a" v-if="(test.nazivTesta === 'TINH') && tinh3(test.rezultat, test.refd, test.refg)">{{'Nije dozvoljeno'}}</td>
                    <div v-if="(test.nazivTesta === 'TINH') && !tinh1(test.rezultat, test.refd, test.refg) && !tinh2(test.rezultat, test.refd, test.refg) && !tinh3(test.rezultat, test.refd, test.refg)" class="stats-title">&nbsp</div>
                  </div>
                </div>
              </vuestic-widget>
  
              <!-- Ako je Panel   -->
              <vuestic-widget v-if="test.nazivTesta.includes('Panel')" v-bind:class="{'info-widget brand-danger': kClass6(test.rezultat, test.refd, test.refg) || kClass5(test.rezultat, test.refd, test.refg), 'info-widget': kClass0(test.rezultat, test.refd, test.refg) || kClass1(test.rezultat, test.refd, test.refg), 'info-widget brand-warning': kClass2(test.rezultat, test.refd, test.refg) || kClass3(test.rezultat, test.refd, test.refg) || kClass4(test.rezultat, test.refd, test.refg)}">
                <div style="text-align:right; color:#e34a4a">{{test.kod}}</div>
                <div style="color:black" class="info-widget-inner">
                  <div class="stats">
                    <div v-if="test.opis.length < 26" class="stats-title">{{test.opis}}</div>
                    <div v-if="test.opis.length > 25" style="font-size:10px" class="stats-title">{{test.opis}}</div>
  
                    <!-- IZMJENA REZULTATA -->
                    <div v-if="rezultat && test.manual" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                      <div v-show="test.edit == false">
                        <label @dblclick="test.edit = true">
                                  <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                                  <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                                </label>
                      </div>
                      
                      <input style="width:100px" type="number" oninput="this.value = Math.abs(this.value)" min="0" step="any" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                      
                    </div>
  
                    <!-- END OF IZMJENA REZULTATA -->
  
                    <td style="color:#4ae387" v-if="kClass0(test.rezultat, test.refd, test.refg)">{{'0'}}</td>
                    <td style="color:#4ae387" v-if="kClass1(test.rezultat, test.refd, test.refg)">{{'1'}}</td>
                    <td style="color:#f7cc36" v-if="kClass2(test.rezultat, test.refd, test.refg)">{{'2'}}</td>
                    <td style="color:#f7cc36" v-if="kClass3(test.rezultat, test.refd, test.refg)">{{'3'}}</td>
                    <td style="color:#f7cc36" v-if="kClass4(test.rezultat, test.refd, test.refg)">{{'4'}}</td>
                    <td style="color:#e34a4a" v-if="kClass5(test.rezultat, test.refd, test.refg)">{{'5'}}</td>
                    <td style="color:#e34a4a" v-if="kClass6(test.rezultat, test.refd, test.refg)">{{'6'}}</td>
                    <td v-if="!kClass6(test.rezultat, test.refd, test.refg) && !kClass5(test.rezultat, test.refd, test.refg)  && !kClass4(test.rezultat, test.refd, test.refg)  && !kClass3(test.rezultat, test.refd, test.refg) && !kClass2(test.rezultat, test.refd, test.refg) && !kClass1(test.rezultat, test.refd, test.refg) && !kClass0(test.rezultat, test.refd, test.refg)">&nbsp</td>
                    <td style="font-size:9px; color:#4ae387" v-if="kClass0(test.rezultat, test.refd, test.refg)">{{'Nisu detektovana specifična antitijela'}}</td>
                    <td style="font-size:9px; color:#4ae387" v-if="kClass1(test.rezultat, test.refd, test.refg)">{{'Vrlo slaba koncentracija antitijela'}}</td>
                    <td style="font-size:9px; color:#f7cc36" v-if="kClass2(test.rezultat, test.refd, test.refg)">{{'Slaba koncentracija antitijela'}}</td>
                    <td style="font-size:9px; color:#f7cc36" v-if="kClass3(test.rezultat, test.refd, test.refg)">{{'Jasna koncentracija antitijela'}}</td>
                    <td style="font-size:9px; color:#f7cc36" v-if="kClass4(test.rezultat, test.refd, test.refg)">{{'Snažna koncentracija antitijela'}}</td>
                    <td style="font-size:9px; color:#e34a4a" v-if="kClass5(test.rezultat, test.refd, test.refg)">{{'Vrlo jaka koncentracija antitijela'}}</td>
                    <td style="font-size:9px; color:#e34a4a" v-if="kClass6(test.rezultat, test.refd, test.refg)">{{'Izrazito visoka koncentracija antitijela'}}</td>
                    <td style="font-size:9px;" v-if="!kClass6(test.rezultat, test.refd, test.refg) && !kClass5(test.rezultat, test.refd, test.refg)  && !kClass4(test.rezultat, test.refd, test.refg)  && !kClass3(test.rezultat, test.refd, test.refg) && !kClass2(test.rezultat, test.refd, test.refg) && !kClass1(test.rezultat, test.refd, test.refg) && !kClass0(test.rezultat, test.refd, test.refg)">&nbsp</td>
  
                  </div>
                </div>
              </vuestic-widget>
            </div>
          </div>
  
          <hr>
  
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled2"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
              <button :disabled="analiti[0].rezultat.trim() === '' || analiti[1].rezultat.trim() === ''" v-if="multiHeader.includes('Krvna grupa i Rh faktor')" class="btn btn-danger wizard-back pull-right" @click.prevent="aboReport()"><span class="glyphicon glyphicon-tint"></span>{{ ' Izvještaj'}}</button>
            </div>
          </div>
  
        </vuestic-widget>
  
        <!-- card_view = false -->
        <vuestic-widget v-if="prikaziAnalit && !card_view" :headerText="multiHeader">
          <div class="row">
            <div class="col-md-12">
              <!-- Ako nije Panel i ako nije TINH   -->
              <div v-if="!multiHeader.includes('Panel') && !multiHeader.includes('TINH')" class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td></td>
                      <td>ANALIT</td>
                      <td>rezultat</td>
                      <td>jedinica</td>
                      <td>referentni interval</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="test in analiti" v-bind:class="{
                      'table-danger': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Red', 
                      'table-success': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Green', 
                      'table-warning': testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[5] === 'Yellow' 
                    }">
  
                      <td v-if="test.flag != 'F' && test.flag != ''">{{test.flag}}</td>
                      <td v-if="test.flag === 'F' || test.flag === ''">&nbsp</td>
                      <td :title="test.opis">{{test.naziv}}</td>
  
                      <!-- Rezultat EDIT -->
                      <td v-if="rezultat" :id="test.analit">
                        <div v-show="test.edit == false">
                          <label @dblclick="test.edit = true">
                            <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                            <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                          </label>
                        </div>
                        <select v-if="test.select_options != undefined" v-show="test.edit == true" style="width:100px" v-model="test.rezultat" v-on:change="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                          <option v-for="option in test.select_options">
                            {{ option }}
                          </option>
                        </select>
  
                        <input v-if="test.select_options === undefined" style="width:100px" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                      </td>
                      <!-- End of Rezultat EDIT -->
  
                      <td v-if="test.jedinica === 'n/a'" class="stats-title">&nbsp</td>
                      <td v-if="test.jedinica != 'n/a'" class="stats-title">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[3]}}</td>
                      <td v-if="testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[4] != 'n/a'" :title="test.grupa">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[4]}}</td>
                      <td v-if="testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site )[4] === 'n/a'" :title="test.grupa">&nbsp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Ako nije Panel i ako je TINH   -->
              <div v-if="!multiHeader.includes('Panel') && multiHeader.includes('TINH')" class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>ANALIT</td>
                      <td>rezultat</td>
                      <td>objašnjenje</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="test in analiti" v-bind:class="{'table-danger': testIsDanger(test.rezultat, test.refd, test.refg), 'table-success': testIsSuccess(test.rezultat, test.refd, test.refg), 'table-warning': testIsWarning(test.rezultat, test.refd, test.refg)}">
                      <td>{{test.opis}}</td>
                      <!-- Rezultat EDIT -->
                      <td v-if="test.rezultat != '' && !test.manual" :id="test.analit">{{test.rezultat}}</td>
                      <td style="color:#e34a4a" v-if="test.rezultat === '' && !test.manual" :id="test.analit">{{"Čekam..."}}</td>
                      <td v-if="rezultat && test.manual" :id="test.analit">
                        <div v-show="test.edit == false">
                          <label @dblclick="test.edit = true">
                            <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                            <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                          </label>
                        </div>
                        <input style="width:100px" type="number" min="1" max="3" step="1" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                      </td>
                      <!-- End of Rezultat EDIT -->
  
                      <td v-if="(test.nazivTesta === 'TINH') &&tinh1(test.rezultat, test.refd, test.refg)">{{'Dozvoljeno'}}</td>
                      <td v-if="(test.nazivTesta === 'TINH') &&tinh2(test.rezultat, test.refd, test.refg)">{{'Nije preporučljivo'}}</td>
                      <td v-if="(test.nazivTesta === 'TINH') &&tinh3(test.rezultat, test.refd, test.refg)">{{'Nije dozvoljeno'}}</td>
                      <td v-if="(test.nazivTesta === 'TINH') && !tinh1(test.rezultat, test.refd, test.refg) && !tinh2(test.rezultat, test.refd, test.refg) && !tinh3(test.rezultat, test.refd, test.refg)" class="stats-title">&nbsp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Ako je Panel   -->
              <div v-if="multiHeader.includes('Panel')" class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td>kod</td>
                      <td>ANALIT</td>
                      <td>rezultat</td>
                      <td>klasa</td>
                      <td>objašnjenje</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="test in analiti" v-bind:class="{'table-danger': kClass6(test.rezultat, test.refd, test.refg) || kClass5(test.rezultat, test.refd, test.refg), 'table-success': kClass0(test.rezultat, test.refd, test.refg) || kClass1(test.rezultat, test.refd, test.refg), 'table-warning': kClass2(test.rezultat, test.refd, test.refg) || kClass3(test.rezultat, test.refd, test.refg) || kClass4(test.rezultat, test.refd, test.refg)}">
                      <td>{{test.kod}}</td>
                      <td>{{test.opis}}</td>
                      <!-- Rezultat EDIT -->
                      <td v-if="test.rezultat != '' && !test.manual" :id="test.analit">{{test.rezultat}}</td>
                      <td style="color:#e34a4a" v-if="test.rezultat === '' && !test.manual" :id="test.analit">{{"Čekam..."}}</td>
                      <td v-if="rezultat && test.manual" :id="test.analit">
                        <div v-show="test.edit == false">
                          <label @dblclick="test.edit = true">
                            <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                            <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                          </label>
                        </div>
                        <input style="width:100px" type="number" oninput="this.value = Math.abs(this.value)" min="0" step="any" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                      </td>
                      <!-- End of Rezultat EDIT -->
  
                      <td v-if="kClass0(test.rezultat, test.refd, test.refg)">{{'0'}}</td>
                      <td v-if="kClass1(test.rezultat, test.refd, test.refg)">{{'1'}}</td>
                      <td v-if="kClass2(test.rezultat, test.refd, test.refg)">{{'2'}}</td>
                      <td v-if="kClass3(test.rezultat, test.refd, test.refg)">{{'3'}}</td>
                      <td v-if="kClass4(test.rezultat, test.refd, test.refg)">{{'4'}}</td>
                      <td v-if="kClass5(test.rezultat, test.refd, test.refg)">{{'5'}}</td>
                      <td v-if="kClass6(test.rezultat, test.refd, test.refg)">{{'6'}}</td>
                      <td v-if="!kClass6(test.rezultat, test.refd, test.refg) && !kClass5(test.rezultat, test.refd, test.refg)  && !kClass4(test.rezultat, test.refd, test.refg)  && !kClass3(test.rezultat, test.refd, test.refg) && !kClass2(test.rezultat, test.refd, test.refg) && !kClass1(test.rezultat, test.refd, test.refg) && !kClass0(test.rezultat, test.refd, test.refg)">&nbsp</td>
                      <td v-if="kClass0(test.rezultat, test.refd, test.refg)">{{'Nisu detektovana specifična antitijela'}}</td>
                      <td v-if="kClass1(test.rezultat, test.refd, test.refg)">{{'Vrlo slaba koncentracija antitijela'}}</td>
                      <td v-if="kClass2(test.rezultat, test.refd, test.refg)">{{'Slaba koncentracija antitijela'}}</td>
                      <td v-if="kClass3(test.rezultat, test.refd, test.refg)">{{'Jasna koncentracija antitijela'}}</td>
                      <td v-if="kClass4(test.rezultat, test.refd, test.refg)">{{'Snažna koncentracija antitijela'}}</td>
                      <td v-if="kClass5(test.rezultat, test.refd, test.refg)">{{'Vrlo jaka koncentracija antitijela'}}</td>
                      <td v-if="kClass6(test.rezultat, test.refd, test.refg)">{{'Izrazito visoka koncentracija antitijela'}}</td>
                      <td v-if="!kClass6(test.rezultat, test.refd, test.refg) && !kClass5(test.rezultat, test.refd, test.refg)  && !kClass4(test.rezultat, test.refd, test.refg)  && !kClass3(test.rezultat, test.refd, test.refg) && !kClass2(test.rezultat, test.refd, test.refg) && !kClass1(test.rezultat, test.refd, test.refg) && !kClass0(test.rezultat, test.refd, test.refg)">&nbsp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <button class="btn btn-secondary" @click.prevent="vratiPregled2"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
              <button :disabled="analiti[0].rezultat.trim() === '' || analiti[1].rezultat.trim() === ''" v-if="multiHeader.includes('Krvna grupa i Rh faktor')" class="btn btn-danger wizard-back pull-right" @click.prevent="aboReport()"><span class="glyphicon glyphicon-tint"></span>{{ ' Izvještaj'}}</button>
            </div>
          </div>
        </vuestic-widget>
  
      </div>
    </div>
  
    <div v-show="report_pdf" class="row">
      <div class="col-md-12">
        <div class="btn-container">
          <button class="btn btn-secondary btn-sm" @click.prevent="NazadKG"><span class="fa fa-step-backward"></span>{{ ' NAZAD'}}</button>
          <span class="blockquote">{{ 'Krvna grupa i Rh faktor' }}</span>
          <button disabled class="btn btn-secondary btn-sm pull-right" @click.prevent="sendMail(email)"><span class="glyphicon glyphicon-send"></span>{{ ' pošalji'}}</button>
          <div class="form-group with-icon-left pull-right">
            <div class="input-group">
              <input disabled size="40" id="input-icon-left" name="input-icon-left" v-model="email" title=" " required/>
              <i class="fa fa-envelope-o icon-left input-icon"></i>
              <label class="control-label" for="input-icon-left">{{'Email adresa'}}</label><i class="bar"></i>
            </div>
          </div>
        </div>
        <hr>
        <div class="d-flex flex-column align-items-center justify-content-between down-container">
          <embed src="" id="pdf" style="width: 100%;height: 800px; visibility:hidden" type='application/pdf'>
        </div>
      </div>
    </div>
  
  </div>
  <!-- END OF TEMPLATE -->
</template>

<script>
  import Vue from 'vue'
  import BadgeColumn from './BadgeColumn.vue'
  
  import c_izbornik from '../../../data/c_izbornik'
  import m_izbornik from '../../../data/m_izbornik'
  import p_izbornik from '../../../data/p_izbornik'
  
  import axios from 'axios'
  import router from '../../../router'
  import {http} from '../../../../config/config.js'
  import {server} from '../../../../config/config.js'
  import {ispisAnalitNe} from '../../funkcije/shared/references.js'
  import {ispisAnalitDa} from '../../funkcije/shared/references.js'
  import pdfMake from "pdfmake/build/pdfmake";
  import pdfFonts from "pdfmake/build/vfs_fonts";
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  
  Vue.component('badge-column', BadgeColumn)
  
  export default {
    name: 'Table',
    props: ['id'],
    data() {
      return {
        show: true,
        potvrdi: "POTVRDI",
        odustani: "ZATVORI",
        rezAn: [],
        rezTime: '',
        rezName: '',
        rezIzbor: '',
        tempEvent: '',
        tempNaziv: '',
        tempAnalit: '',
        tempRezultat: '',
        tempIDE: '',
        sviRealizovaniR: true,
        sviRealizovaniK: true,
        uzorakId: '',
        testovi: [],
        anatestovi: [],
        imeIprezime: '',
        spol: '',
        jmbg: '',
        jmbgObj: {},
        jmbgDan: '',
        jmbgMjesec: '',
        jmbgGodina: '',
        email: '',
        oldMail: '',
        idP: '',
        mailChanged: false,
        rezultat: false,
        prikaziAnalit: false,
        glavniScreen: true,
        rezultati: [],
        rezultatiSekcija: [],
        retestirati: [],
        refSet: 'DEFAULT',
        refSetovi: [],
        nedostaju: [],
        multiHeader: '',
        viseMulti: false,
        vise: false,
        vrezultati: [],
        tid: '',
        hid: '',
        uslovOdobriSve: true,
        uslovOdobriSveSekcija: true,
        ide: '',
        idvise: '',
        odabran: false,
        tempTestIDE: '',
        tempTestOdobren: 'NE',
  
        viseAnaliti: false,
        analitid: '',
        retestFlag: false,
        aktivniRez: '',
        rucni: [],
        rucniIma: false,
        prikaziBezuslovno: false,
        o: false,
        d: '',
        g: '',
        r: '',
        analitiprikaz: [],
        analiti: [],
        uslovPrint: false,
        uslovRoma: true,
        uslovKl: true,
        romaRezultat: '',
        klRezultat: '',
        izborTest: '',
        privremenoTest: '',
        privremenoIme: '',
        privremenoAnalit: '',
        sekcije: [],
        card_view: false,        
        select_options: [],
        report_pdf: false,
        timestamp: '',
  
        toastText: '',
        toastIcon: '',
        toastPosition: '',
        toastDuration: 2500,
        isToastFullWidth: false,
        className: '',
      }
    },
  
    beforeCreate() {
      http.post('users/' + this.$store.state.userId, {
          email: this.$store.state.userId,
          site: this.$store.state.site,
          token: this.$store.state.token
        })
        .then(res => {
          if (res.data.user != undefined) {
            this.card_view = res.data.user.postavke.card_view
          }
        })
    },
  
    watch: {
      email: function() {
        if (this.email.trim() != this.oldMail.trim()) {
          this.mailChanged = true
        }
      }
    },
  
    created() {  
      var topcije = null
      // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
      // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
      // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
  
      switch (this.$store.state.site) {
        case '5b6caf696a0f4166f4da989b':
          topcije = c_izbornik.rez
          break;
        case '5bc71402bf21a379083d6e07':
          topcije = m_izbornik.rez
          break;
        case '5bd40c16020d6d21bbaf610c':
          topcije = p_izbornik.rez
          break;
        default:
          topcije = {}
          break;
      }
  
      this.sviRealizovaniR = true
      this.sviRealizovaniK = true
  
      this.ide = this.$route.params.id // 0001-SE180410
      this.hid = 'Verifikacija rezultata za uzorak: ' + this.$route.params.id
  
      http.get('rezultati/show/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
        })
        .then(res => {
          if (res.data.nodata != undefined) {
            this.sekcije = []
            this.imeIprezime = res.data.ime + ' ' + res.data.prezime
            this.spol = res.data.spol
            this.jmbg = res.data.jmbg
            this.email = res.data.email
            this.oldMail = res.data.email
  
            if (!this.validateEmail(res.data.email.trim())) {
              this.email = ''
              this.oldMail = ''
            }
            this.idP = res.data.id
  
            res.data.nodata.forEach(test => {
              if (!this.sekcije.filter(sekc => sekc === test.sekcija).length > 0) {
                this.sekcije.push(test.sekcija)
              }
              if (this.$route.params.sekcija === test.sekcija) {
                this.nedostaju.push(test)
              }
            })
  
            var test = {}
            var rtst = {}
            var rcntest = {}
            this.retestirati = []
            this.rucni = []
  
            if (res.data.data.length) {
              this.testovi = res.data.data
              // console.log(this.testovi)
              this.rezultat = true
              this.analitiprikaz = res.data.multidata
  
              res.data.data.forEach(element => {
                // console.log(element.testovi.retest)
  
                if (element.testovi.retest == true) {
                  rtst = {}
                  rtst.ime = element.testovi.labassay.naziv
                  rtst.analit = element.testovi.labassay.analit
                  if (this.$route.params.sekcija === element.testovi.labassay.sekcija) {
                    this.retestFlag = true
                    this.retestirati.push(rtst)
                  }  
                }
  
                test = {}
                rcntest = {}
                // this.rucniIma = false
                test.ime = element.testovi.labassay.naziv // Kratki naziv testa
                test.test = element.testovi.labassay.sifra // 2-01-01-00-0160
                test.analit = element.testovi.labassay.analit // Opis analita
                test.edit = false
                test.IDE = element.testovi._id // 5acbb58e0b083107dc8f5573
                test.laIDE = element.testovi.labassay._id
                test.calculated = element.testovi.labassay.calculated
                test.realizovan = true
                test.select_options = (eval("topcije." + element.testovi.labassay.naziv.replace('%', '_').replace('/', '_').replace(' ', '_').replace('-', '_')))  
  
                var i = 0

                element.testovi.rezultat.forEach(rezultat => {
                  i++
  
                  if (!this.sekcije.filter(test => test === rezultat.anaassay.sekcija).length > 0) {
                    this.sekcije.push(rezultat.anaassay.sekcija)
                  }
  
                  test.sekcija = rezultat.anaassay.sekcija
  
                  if (element.testovi.rezultat.length > 1) { // Dali test ima više rezultata
                    test.vise = true
                  } else {
                    test.vise = false
                  }
  
                  if (element.testovi.rezultat.length === i) {
  
                    test.rezultat = rezultat.rezultat_f
                    if (rezultat.rezultat_i != "off" || rezultat.rezultat_i === undefined) {
                      test.ispis = true
                    } else {
                      test.ispis = false
                    }  
  
                    test.jedinica = rezultat.jedinice_f
                    test.unit = rezultat.jedinice_f
                    test.id = rezultat._id
  
                    if (rezultat.odobren) {
                      test.odobren = "DA"
                    } else {
                      test.odobren = "NE"
                    }
                    if (rezultat.sn === 'MANUAL') {
                      test.manual = true
                      // console.log(rezultat)
                    } else {
                      test.manual = false
                    }
  
                    if ((rezultat.dilucija != 'MULTI') && (rezultat.sn === 'MANUAL') && ((rezultat.rezultat_f === "") || (rezultat.rezultat_f === "Unesi"))) {
  
                      rcntest.ime = element.testovi.labassay.naziv
                      rcntest.analit = element.testovi.labassay.analit
                      if (this.$route.params.sekcija === element.testovi.labassay.sekcija) {
                        this.rucniIma = true
                        this.rucni.push(rcntest) // Provjera ukoliko ima MANUAL test na čiji se rezultat čeka... 
                      }
                    }
  
                    if ((rezultat.dilucija === 'MULTI') && (rezultat.sn === 'MANUAL')) {
                      this.rucniIma = true
  
                      res.data.multidata.forEach(multi => {
                        if (multi.labassay._id === element.testovi.labassay._id) {
                          // console.log(element.testovi.labassay.naziv)
                          multi.rezultat.forEach(rezu => {
                            rezu.rezultat.forEach(ana => {
                              if (ana.rezultat_f === "") {
                                test.realizovan = false
  
                                rcntest.ime = element.testovi.labassay.naziv
                                rcntest.analit = element.testovi.labassay.analit
                                if (this.rucni.indexOf(rcntest) === -1) {
                                  if (this.$route.params.sekcija === element.testovi.labassay.sekcija) {
                                    this.rucni.push(rcntest) // Provjera ukoliko ima MANUAL test na čiji se rezultat čeka... 
                                  }
                                }
  
                              }
                            })
                          })
                        }  
                      })  
                    }
                    if ((rezultat.dilucija === 'MULTI') && (rezultat.sn === '36148BG')) {
                      res.data.multidata.forEach(multi2 => {
                        if (multi2.labassay._id === element.testovi.labassay._id) {
                          multi2.rezultat.forEach(rezu2 => {
  
                            if (rezu2.rezultat.length > 1) {
                              this.viseMulti = true
                            }
                            rezu2.rezultat.forEach(ana2 => {
                              if (ana2.rezultat_f === "") {
                                test.realizovan = false
                              }
                            })
                          })
                        }  
                      })  
                    }
  
                    if (this.viseMulti) {
                      test.visemulti = true
                    } else {
                      test.visemulti = false
                    }
                    // console.log(this.rucniIma)
                    test.jedinica = rezultat.jedinice_f
                    test.multidata = element.testovi.labassay.multi
                    test.refSet = element.testovi.grupa
                    test.dRef = element.testovi.refd
                    test.gRef = element.testovi.refg
                    
                  }
                  // Uslov za proracun ROMA testa
                  if ((test.ime.toUpperCase() === 'HE4') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovRoma = false
                  }
                  if ((test.ime.toUpperCase() === 'CA-125') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovRoma = false
                  }
                  if (test.ime.includes('ROMA') && !isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.romaRezultat = test.rezultat
                  }
                  if ((test.rezultat === '' || test.rezultat === 'Unesi')) {
                    this.sviRealizovaniR = false
                  }
                  // Uslov za proracun Kl-Krea testa
                  if ((test.ime.toUpperCase() === 'KREA') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovKl = false
                  }
                  if ((test.ime.toUpperCase() === 'KREA-U') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovKl = false
                  }
                  if ((test.ime.toUpperCase() === 'V-U24') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovKl = false
                  }
                  if (test.ime.includes('Kl-Krea') && !isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.klRezultat = test.rezultat
                  }
                  if ((test.rezultat === '' || test.rezultat === 'Unesi')) {
                    this.sviRealizovaniK = false
                  }
                  this.nedostaju.forEach(element => {
                    if (element.naziv.includes('Krea')) {
                      this.sviRealizovaniK = false
                      this.uslovKl = false
                    }
                  })
                })
                this.rezultati.push(test) // Svi aktivni rezultati  
                if (this.$route.params.sekcija === test.sekcija) {
                  this.rezultatiSekcija.push(test)
                }
              })
              if (this.retestirati.length < 1) {
                this.retestFlag = false
              }
            }
          }
        }).then(() => {
          if (this.rucni.length < 1) {
            this.rucniIma = false
          }
          this.rezultati.forEach(element => { // Dali su svi rezultati odobreni         
            if (this.$route.params.sekcija === element.sekcija) {
              if (element.odobren === 'NE') {
                this.uslovOdobriSve = false
  
              }
            }
          });
          this.rezultatiSekcija.forEach(element => { // Dali su svi rezultati odobreni   
            if (element.odobren === 'NE') {
              this.uslovOdobriSveSekcija = false
            }
          })
        })
  
      this.$on('update', function(edited, method, rezultat, ide, odobren, ime, dref, gref) { // Poziva se prilikom izmjene rezultata
        if (rezultat.trim() != "" && rezultat.toUpperCase() != 'UNESI') {
          if (((ime === "V-U24") || (ime === "THbWB") || (ime === "HbA1cWB")) && (isNaN(rezultat.replace("<", "").replace(">", "")))) {
            this.toastText = 'Vrijednost rezultata nije validna!'
            this.toastIcon = 'fa-warning'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-warning'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.refreshRezultata(ide) // Refresh cijele stranice
  
          } else
          if (dref === "0" && gref === "0" && odobren === 'NE') {
            if (rezultat === "") {
              rezultat = "Unesi"
            }
  
            if (method === "blur") {
              http.post('/rezultati/edit/' + edited, { // Upis nove vrijednosti rezultata
                  rezultat: rezultat.trim(),
                  site: this.$store.state.site,
                  token: this.$store.state.token
                })
                .then(res => {
                  this.toastText = 'Izmjena uspješno obavljena!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                  this.refreshRezultata(ide) // Refresh cijele stranice   
                })
            }
  
          } else {
  
            if (odobren === 'DA') {
  
              this.toastText = 'Odobreni rezultati se ne mogu mijenjati!'
              this.toastIcon = 'fa-warning'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-warning'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
              this.refreshRezultata(ide) // Refresh cijele stranice
            } else if (((isNaN(rezultat.replace("<", "").replace(">", ""))) || (rezultat.trim() === ''))) {
              this.toastText = 'Vrijednost rezultata nije validna!'
              this.toastIcon = 'fa-warning'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-warning'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
              this.refreshRezultata(ide) // Refresh cijele stranice
            } else {
              if (method === "blur") {
                http.post('/rezultati/edit/' + edited, { // Upis nove vrijednosti rezultata
                    rezultat: rezultat.trim(),
                    site: this.$store.state.site,
                    token: this.$store.state.token
                  })
                  .then(res => {
                    this.refreshRezultata(ide) // Refresh cijele stranice 
  
                  })
              }
            }  
          }
  
        } else {
          this.refreshRezultata(ide) // Refresh cijele stranice 
        }
  
      })
  
      this.$on('updateAnalit', function(edited, method, analit, rezultat, id, labID, odobren, dref, gref, naziv, test) { // Poziva se prilikom izmjene rezultata
  
  
        if (odobren === 'DA') {
          this.toastText = 'Odobreni rezultati se ne mogu mijenjati!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
  
          this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
          this.refreshRezultata(id) // Refresh cijele stranice
  
        } else
        if (test.includes('Panel') && (isNaN(rezultat.replace("<", "").replace(">", "")))) {
          this.toastText = 'Vrijednost rezultata nije validna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
          this.refreshRezultata(id) // Refresh cijele stranice               
  
  
        } else
  
        if (rezultat.trim() != "" && rezultat.toUpperCase() != 'UNESI') {
          if (dref === "0" && gref === "0" && odobren === 'NE') {
            if (rezultat === "") {
              rezultat = "Unesi"
            }
  
            if (method === "blur") {
  
              http.post('/rezultati/edit/analit/' + edited, { // Upis nove vrijednosti rezultata
                  rezultat: rezultat.trim(),
                  analit: analit,
                  labassay: labID,
                  sid: id,
                  site: this.$store.state.site,
                  token: this.$store.state.token
                })
                .then(res => {
                  this.toastText = 'Izmjena uspješno obavljena!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                  this.refreshRezultata(id) // Refresh cijele stranice 
                })
            }
          } else if (test.includes('Panel') && (rezultat === "0")) {
            this.toastText = 'Vrijednost rezultata nije validna!'
            this.toastIcon = 'fa-warning'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-warning'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
            this.refreshRezultata(id) // Refresh cijele stranice  
  
          } else if ((labID === '5b335ac798d61c0bb0b053d8') && ((rezultat != "1") && (rezultat != "2") && (rezultat != "3"))) {
            this.toastText = 'Vrijednost rezultata nije validna!'
            this.toastIcon = 'fa-warning'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-warning'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
            this.refreshRezultata(id) // Refresh cijele stranice               
  
          } else if (((isNaN(rezultat.replace("<", "").replace(">", ""))) || (rezultat.trim() === ''))) {
            this.toastText = 'Vrijednost rezultata nije validna!'
            this.toastIcon = 'fa-warning'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-warning'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
            this.refreshRezultata(id) // Refresh cijele stranice
  
          } else {
  
            if (method === "blur") {
  
              http.post('/rezultati/edit/analit/' + edited, { // Upis nove vrijednosti rezultata
                  rezultat: rezultat.trim(),
                  analit: analit,
                  labassay: labID,
                  sid: id,
                  site: this.$store.state.site,
                  token: this.$store.state.token
                })
                .then(res => {
                  this.toastText = 'Izmjena uspješno obavljena!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                  this.refreshRezultata(id) // Refresh cijele stranice
                })
            }
          }
  
        } else {
          this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
          this.refreshRezultata(id) // Refresh cijele stranice  
        }
      })
    },
  
    beforeDestroy() {
      this.$off('update')
    },
  
    mounted() {
      this.timestamp = new Date().getTime().toString()
    },
  
    methods: {
      NazadKG: function() {
        this.report_pdf = false
        this.prikaziAnalit = true
      },
      KrvnaGrupa() {
        var d = new Date(Date.now())
        var mjesec = d.getMonth() + 1
        if (mjesec < 10) {
          mjesec = '0' + mjesec
        }
        var dan = d.getUTCDate()
        if (dan < 10) {
          dan = '0' + dan
        }
        var god = d.getFullYear()
        var sat = d.getHours()
        if (sat < 10) {
          sat = '0' + sat
        }
        var min = d.getMinutes()
        if (min < 10) {
          min = '0' + min
        }
        var sec = d.getSeconds()
        if (sec < 10) {
          sec = '0' + sec
        }
        var datum = dan + "." + mjesec + "." + god
        var vrijeme = sat + ":" + min + ":" + sec
        var godiste = this.jmbg.substring(4, 7)
        switch (godiste[0]) {
          case '9':
            godiste = '1' + godiste + '.'
            break;
          case '0':
            godiste = '2' + godiste + '.'
            break;
          default:
            godiste = 'NEPOZNATO'
            break;
        }
        http.post('nalazi/krgupa/?token=' + this.$store.state.token, {
            site: this.$store.state.site,
            user: this.$store.state.userId,
            timestamp: this.timestamp,
            pacijent: this.imeIprezime,
            spol: this.spol,
            jmbg: this.jmbg,
            email: this.email,
            datum: datum,
            vrijeme: vrijeme,
            godiste: godiste,
            krvna_grupa: this.analiti[0].rezultat,
            rh_faktor: this.analiti[1].rezultat
          })
          .then(res => {
            if (res.data.success) {
              this.report_pdf = true
              this.prikaziAnalit = false
              document.getElementById("pdf").style.visibility = "visible"
              document.getElementById("pdf").src = server + "krvne_grupe/" + this.timestamp + ".pdf"
            } else {
              this.report_pdf = false
              this.prikaziAnalit = true
            }
            http.post('nalazi/krgupa/email/?token=' + this.$store.state.token, {
                site: this.$store.state.site,
                user: this.$store.state.userId,
                timestamp: new Date().getTime().toString(),
                pacijent: this.imeIprezime,
                spol: this.spol,
                jmbg: this.jmbg,
                email: this.email,
                datum: datum,
                vrijeme: vrijeme,
                godiste: godiste,
                krvna_grupa: this.analiti[0].rezultat,
                rh_faktor: this.analiti[1].rezultat
              })
              .then(res => {
  
              })
          })
      },
      sendMail(mail) {
        if (this.email === "") {
          this.toastText = 'Email adresa nije definisana!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: 2500,
            fullWidth: this.false,
            className: this.className,
          })
        } else if (!this.validateEmail(mail)) {
          this.toastText = 'Email adresa nije validna!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: 2500,
            fullWidth: this.false,
            className: this.className,
          })
        } else {
          var d = new Date(Date.now())
          var mjesec = d.getMonth() + 1
          if (mjesec < 10) {
            mjesec = '0' + mjesec
          }
          var dan = d.getUTCDate()
          if (dan < 10) {
            dan = '0' + dan
          }
          var god = d.getFullYear()
          var sat = d.getHours()
          if (sat < 10) {
            sat = '0' + sat
          }
          var min = d.getMinutes()
          if (min < 10) {
            min = '0' + min
          }
          var sec = d.getSeconds()
          if (sec < 10) {
            sec = '0' + sec
          }
          var datum = dan + "." + mjesec + "." + god
          var vrijeme = sat + ":" + min + ":" + sec
          var godiste = this.jmbg.substring(4, 7)
          switch (godiste[0]) {
            case '9':
              godiste = '1' + godiste + '.'
              break;
            case '0':
              godiste = '2' + godiste + '.'
              break;
            default:
              godiste = 'NEPOZNATO'
              break;
          }
          this.$dialog.confirm('Slanje nalaza | <span style="color: #4ae387;">' + this.email + '</span>', {
              type: 'hard',
              html: true,
              verification: 'Da'
            })
            .then(() => {
              if (this.validateEmail(mail)) {
                http.post('nalazi/krgupa/email', {
                    token: this.$store.state.token,
                    site: this.$store.state.site,
                    user: this.$store.state.userId,
                    timestamp: this.timestamp,
                    pacijent: this.imeIprezime,
                    spol: this.spol,
                    jmbg: this.jmbg,
                    email: this.email,
                    datum: datum,
                    vrijeme: vrijeme,
                    godiste: godiste,
                    krvna_grupa: this.analiti[0].rezultat,
                    rh_faktor: this.analiti[1].rezultat
                  })
                  .then(res => {
                    // console.log(res.data)
                    if (res.data.success) {
                      this.toastText = 'Nalaz uspješno poslan!'
                      this.toastIcon = 'fa-check'
                      this.toastPosition = 'top-right'
                      this.className = 'vuestic-toast-primary'
  
                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: 2500,
                        fullWidth: this.false,
                        className: this.className,
                      })
                    } else {
                      this.toastText = 'Greška prilikom slanja nalaza!'
                      this.toastIcon = 'fa-remove'
                      this.toastPosition = 'top-right'
                      this.className = 'vuestic-toast-danger'
  
                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: 2500,
                        fullWidth: this.false,
                        className: this.className,
                      })
                    }
                  })
                if (this.mailChanged) {
                  http.post('pacijenti/detalji/update/' + this.idP, {
                      email: this.email.trim(),
                      token: this.$store.state.token,
                      site: this.$store.state.site
                    })
                    .then(res => {
  
                    })
                }
              }
            })
            .catch(function() {})
        }
      },
      validateEmail: function(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
          return (true)
        } else {
          return (false)
        }
      },
      testBezAnalita: function(test, rezultat, jedinica, dRef, gRef, site) {
        // console.log(ispisAnalitNe(test, rezultat, jedinica, dRef, gRef))
        return ispisAnalitNe(test, rezultat, jedinica, dRef, gRef, site)
      },
      testSaAnalitima: function(izbor, test, rezultat, jedinica, dRef, gRef, site) {
        // console.log(ispisAnalitDa(izbor, test, rezultat, jedinica, dRef, gRef))
        return ispisAnalitDa(izbor, test, rezultat, jedinica, dRef, gRef, site)
      },
      goToSekcija(event) {
        router.push('/rezultati/verifikacija/' + event.target.id + '/' + this.$route.params.id)
        this.toastText = event.target.id
        this.toastIcon = 'fa-flask'
        this.toastPosition = 'top-right'
        this.className = 'vuestic-toast-warning'
  
        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className,
        })
      },
      rezultatiAnalitaMulti: function(data, time, izbor) {
        this.rezAn = data
        this.rezTime = time
        this.rezIzbor = izbor
        this.$refs.mediumModal.open()
      },
      prikazAnalita: function(event, naziv, analit, rezultat, ide, odobren) {
  
        this.viseAnaliti = false
  
        this.tempEvent = event
        this.tempNaziv = naziv
        this.tempAnalit = analit
        this.tempRezultat = rezultat
        this.tempIDE = ide
  
        this.multiHeader = 'Verifikacija rezultata testa: ' + naziv + ' (' + analit + ')'
        this.analiti = []
        var single = {}
        // console.log('ide ' + ide)
        this.analitiprikaz.forEach(element => {
  
          single = {}
          if (event.target.id === element.labassay._id) {
            element.rezultat.forEach(analit => {
  
              var opcije = null
              // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
              // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
              // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
  
              switch (this.$store.state.site) {
                case '5b6caf696a0f4166f4da989b':
                  opcije = c_izbornik.data
                  break;
                case '5bc71402bf21a379083d6e07':
                  opcije = m_izbornik.data
                  break;
                case '5bd40c16020d6d21bbaf610c':
                  opcije = p_izbornik.data
                  break;
                default:
                  opcije = {}
                  break;
              }
              // console.log(analit.rezultat[0].module_sn)
              single.nazivTesta = naziv
              single.kod = analit.rezultat[0].module_sn
              single.select_options = (eval("opcije." + analit.rezultat[0].module_sn.replace('%', '_').replace('/', '_').replace(' ', '_').replace('-', '_')))
              single.refd = analit.refd
              single.refg = analit.refg
              single.grupa = analit.grupa
              single.naziv = analit.rezultat[0].sn
              single.opis = analit.rezultat[0].dilucija
              single.jedinica = analit.rezultat[0].jedinice_f
              single.labID = event.target.id
              single.rezultat = analit.rezultat[0].rezultat_f
              single.flag = analit.rezultat[0].rezultat_i
              single.manual = element.labassay.manual
              single.edit = false
              single.analit = analit.rezultat[0].anaassay
              single.odobren = odobren
              single.izbor = this.tempAnalit
              this.analiti.push(single)
              single = {}
            })
          }
        })
        this.prikaziAnalit = true
        this.glavniScreen = false
      },
      vratiPregled2: function() {
        this.refreshRezultata(this.ide)
        this.glavniScreen = true
        this.prikaziAnalit = false
      },
      aboReport: function() {
        this.KrvnaGrupa()
      },
      isNaNa: function(data, d, g) {
        if (g === '0' && d === '0') {
          return true
        } else {
          return false
        }
  
      },
      disableIspis: function(event, id, ide, ispis) {
        var rezultat_i = ""
  
        if (ispis === true) {
          rezultat_i = "off"
        } else if (ispis === false) {
          rezultat_i = ""
        }
  
        http.post('/rezultati/edit/ispis/' + id, { // Upis nove vrijednosti rezultata
            rezultat: rezultat_i,
            site: this.$store.state.site,
            token: this.$store.state.token
          })
          .then(res => {
            if (ispis === true) {
              this.toastText = 'Akcija uspješno izvršena!'
  
            } else {
              this.toastText = 'Akcija uspješno izvršena!'
            }
  
            this.toastIcon = 'fa-check'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-primary'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.refreshRezultata(ide) // Refresh cijele stranice   
          })
      },
      dateDiff(date) { // Takes one string parameter -- date in YYYY-MM-DD 
        date = date.split('-');
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var yy = parseInt(date[0]);
        var mm = parseInt(date[1]);
        var dd = parseInt(date[2]);
        var years, months, days;
        // months
        months = month - mm;
        if (day < dd) {
          months = months - 1;
        }
        // years
        years = year - yy;
        if (month * 100 + day < mm * 100 + dd) {
          years = years - 1;
          months = months + 12;
        }
        // days
        days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));
        //
        return {
          years: years,
          months: months,
          days: days
        };
      },
      dodajRezultat: function(event, ide) { // Izbor aktivnog rezultata, nakon kojega treba pozvati Refresh cijele stranice

        if (this.tempTestOdobren === 'DA') {
          // console.log('Rezultat za izabrani test je odobren')
          this.toastText = 'Odobreni rezultati se ne mogu mijenjati!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
        } else {
          http.post('rezultati/append/' + event.target.id, { // U pozadini se radi sortiranje rezultata 
              id_u: this.$route.params.id,
              id_t: event.target.getAttribute('name'),
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              this.toastText = 'Rezultat uspješno izabran!'
              this.toastIcon = 'fa-check'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-primary'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
              // this.refreshRezultata(ide) // Refresh cijele stranice
            }).then(res => {
              this.refreshRezultata(ide)
            })
        }
      },
      refreshRezultata: function(ide) {
  
        var topcije = null
        // Čarovac Lab, $store.state.site: 5b6caf696a0f4166f4da989b
        // Med Lab, $store.state.site: 5bc71402bf21a379083d6e07
        // PZU Muminović, $store.state.site: 5bd40c16020d6d21bbaf610c
  
        switch (this.$store.state.site) {
          case '5b6caf696a0f4166f4da989b':
            topcije = c_izbornik.rez
            break;
          case '5bc71402bf21a379083d6e07':
            topcije = m_izbornik.rez
            break;
          case '5bd40c16020d6d21bbaf610c':
            topcije = p_izbornik.rez
            break;
          default:
            topcije = {}
            break;
        }
  
        this.uslovRoma = true
        this.uslovKl = true
        this.sviRealizovaniR = true
        this.sviRealizovaniK = true
  
        // console.log('Refresh pozvan nakon izmjene CALC') 
        this.prikaziBezuslovno = false
  
        http.get('rezultati/show/' + ide + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
          })
          .then(res => {
            if (res.data.nodata != undefined) {
              this.rezultati = []
              this.rezultatiSekcija = []
              this.nedostaju = []
  
              // console.log(res.data)
  
              this.imeIprezime = res.data.ime + ' ' + res.data.prezime
              this.spol = res.data.spol
              this.jmbg = res.data.jmbg
              this.email = res.data.email
              this.oldMail = res.data.email
  
              if (!this.validateEmail(res.data.email.trim())) {
                this.email = ''
                this.oldMail = ''
              }
              this.idP = res.data.id
  
              res.data.nodata.forEach(test => {
                if (!this.sekcije.filter(sekc => sekc === test.sekcija).length > 0) {
                  this.sekcije.push(test.sekcija)
                }
                if (this.$route.params.sekcija === test.sekcija) {
                  this.nedostaju.push(test)
                }
              })
  
              var test = {}
              var rtst = {}
              var rcntest = {}
              this.retestirati = []
              this.rucni = []
  
              if (res.data.data.length) {
                this.testovi = res.data.data
                this.rezultat = true
                this.analitiprikaz = res.data.multidata
  
                res.data.data.forEach(element => {
  
  
                  if (element.testovi.retest == true) {
                    rtst = {}
                    rtst.ime = element.testovi.labassay.naziv
                    rtst.analit = element.testovi.labassay.analit
                    if (this.$route.params.sekcija === element.testovi.labassay.sekcija) {
                      this.retestFlag = true
                      this.retestirati.push(rtst)
                    }  
                  }
  
                  test = {}
                  rcntest = {}
                  // this.rucniIma = false
                  test.ime = element.testovi.labassay.naziv // Kratki naziv testa
                  test.test = element.testovi.labassay.sifra // 2-01-01-00-0160
                  test.analit = element.testovi.labassay.analit // Opis analita
                  test.edit = false
                  test.IDE = element.testovi._id // 5acbb58e0b083107dc8f5573
                  test.calculated = element.testovi.labassay.calculated
                  test.laIDE = element.testovi.labassay._id
                  test.realizovan = true
                  test.select_options = (eval("topcije." + element.testovi.labassay.naziv.replace('%', '_').replace('/', '_').replace(' ', '_').replace('-', '_')))

                  var i = 0
                  element.testovi.rezultat.forEach(rezultat => {
                    i++
  
                    test.sekcija = rezultat.anaassay.sekcija
  
                    if (element.testovi.rezultat.length > 1) { // Dali test ima više rezultata
                      test.vise = true
                    } else {
                      test.vise = false
                    }
  
                    if (element.testovi.rezultat.length === i) {
  
                      test.rezultat = rezultat.rezultat_f
                      // console.log(rezultat.rezultat_i)
                      if (rezultat.rezultat_i != "off" || rezultat.rezultat_i === undefined) {
                        test.ispis = true
                      } else {
                        // console.log(rezultat.rezultat_i)
                        test.ispis = false
                      }
  
                      test.jedinica = rezultat.jedinice_f
                      test.unit = rezultat.jedinice_f
                      test.id = rezultat._id
  
                      if (rezultat.odobren) {
                        test.odobren = "DA"
                      } else {
                        test.odobren = "NE"
                      }
  
                      if (rezultat.sn === 'MANUAL') {
                        test.manual = true
                        // console.log(rezultat)
                      } else {
                        test.manual = false
                      }
                      if ((rezultat.dilucija != 'MULTI') && (rezultat.sn === 'MANUAL') && ((rezultat.rezultat_f === "") || (rezultat.rezultat_f === "Unesi"))) {
  
                        rcntest.ime = element.testovi.labassay.naziv
                        rcntest.analit = element.testovi.labassay.analit
                        if (this.$route.params.sekcija === element.testovi.labassay.sekcija) {
                          this.rucniIma = true
                          this.rucni.push(rcntest) // Provjera ukoliko ima MANUAL test na čiji se rezultat čeka... 
                        }
                      }
                      if ((rezultat.dilucija === 'MULTI') && (rezultat.sn === 'MANUAL')) {
                        this.rucniIma = true
  
                        res.data.multidata.forEach(multi => {
                          if (multi.labassay._id === element.testovi.labassay._id) {
                            // console.log(element.testovi.labassay.naziv)
                            multi.rezultat.forEach(rezu => {
                              rezu.rezultat.forEach(ana => {
                                if (ana.rezultat_f === "") {
                                  test.realizovan = false
                                  rcntest.ime = element.testovi.labassay.naziv
                                  rcntest.analit = element.testovi.labassay.analit
                                  if (this.rucni.indexOf(rcntest) === -1) {
                                    if (this.$route.params.sekcija === element.testovi.labassay.sekcija) {
                                      this.rucni.push(rcntest) // Provjera ukoliko ima MANUAL test na čiji se rezultat čeka... 
                                    }
                                  }
                                }
                              })
                            })
                          }
                        })
                      }
                      if ((rezultat.dilucija === 'MULTI') && (rezultat.sn === '36148BG')) {
                        res.data.multidata.forEach(multi2 => {
                          if (multi2.labassay._id === element.testovi.labassay._id) {
                            multi2.rezultat.forEach(rezu2 => {
                              if (rezu2.rezultat.length > 1) {
                                this.viseMulti = true
                              }
                              rezu2.rezultat.forEach(ana2 => {
                                if (ana2.rezultat_f === "") {
                                  test.realizovan = false
                                }
                              })
                            })
                          }
                        })
                      }
  
                      if (this.viseMulti) {
                        test.visemulti = true
                      } else {
                        test.visemulti = false
                      }
  
                      test.jedinica = rezultat.jedinice_f
                      test.refSet = element.testovi.grupa
                      test.dRef = element.testovi.refd
                      test.gRef = element.testovi.refg
                      test.multidata = element.testovi.labassay.multi
                    }
                  })
  
                  // Uslov za proracun ROMA testa
                  if ((test.ime.toUpperCase() === 'HE4') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovRoma = false
                  }
                  if ((test.ime.toUpperCase() === 'CA-125') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovRoma = false
                  }
                  if (test.ime.includes('ROMA') && !isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.romaRezultat = test.rezultat
                  }
                  if ((test.rezultat === '' || test.rezultat === 'Unesi')) {
                    this.sviRealizovaniR = false
                  }
                  // Uslov za proracun Kl-Krea testa
                  if ((test.ime.toUpperCase() === 'KREA') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovKl = false
                  }
                  if ((test.ime.toUpperCase() === 'KREA-U') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovKl = false
                  }
                  if ((test.ime.toUpperCase() === 'V-U24') && isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.uslovKl = false
                  }
                  if (test.ime.includes('Kl-Krea') && !isNaN(test.rezultat.replace("<", "").replace(">", ""))) {
                    this.klRezultat = test.rezultat
                  }
                  if ((test.rezultat === '' || test.rezultat === 'Unesi')) {
                    this.sviRealizovaniK = false
                  }
                  this.nedostaju.forEach(element => {
                    if (element.naziv.includes('Krea')) {
                      this.sviRealizovaniK = false
                      this.uslovKl = false
                    }
                  });
                  this.rezultati.push(test) // Svi aktivni rezultati
                  if (this.$route.params.sekcija === test.sekcija) {
                    this.rezultatiSekcija.push(test)
                  }
                });
                if (this.retestirati.length < 1) {
                  this.retestFlag = false
                }
              }
            }
          }).then(() => {
            if (this.vise === true) {
              this.viseRezultata(this.idvise, this.tempTestIDE, this.o, this.d, this.g, this.r) // Dali je aktivan prikaz za više rezultata
            }
          }).then(() => { // Dali su svi rezultati odobreni
            var s = 0
            var k = 0
  
            if (this.rucni.length < 1) {
              this.rucniIma = false
            }
            this.rezultati.forEach(element => {
              if (this.$route.params.sekcija === element.sekcija) {
                if (element.odobren === 'NE') {
                  this.uslovOdobriSve = false
                  s += 1
                }
              }
            })
  
            this.rezultatiSekcija.forEach(element => {
              if (element.odobren === 'NE') {
                this.uslovOdobriSveSekcija = false
                k += 1
              }
            })
            if (s === 0) {
              this.uslovOdobriSve = true
            }
            if (k === 0) {
              this.uslovOdobriSveSekcija = true
            }
          })
      },
      testIsDanger: function(data, d, g, ime) { // Dodjeljivanje klase na red tabele
  
        if (ime != undefined && ime.trim() === "PSA-ratio") {
  
          if (isNaN(data.replace("<", "").replace(">", ""))) {
            return false
          } else {
            if (g === "0" && d === "0") {
              return false
            } else
            if (data === '') {
              return false
            } else {
              if (g < 0) {
                if ((Number(data) > Number(Math.abs(g)))) {
                  return false
                }
                return true
  
              } else {
                if ((Number(data) < Number(d)) || (Number(data) > Number(g))) {
                  return true
                }
                return false
              }
            }
          }
  
        } else
        if (g === "0" && d === "0") {
          return false
        } else
        if (data === '') {
          return false
        } else {
          if (g < 0) {
            if ((Number(data) > Number(Math.abs(g)))) {
              return true
            }
            return false
  
          } else {
            if ((Number(data) < Number(d)) || (Number(data) > Number(g))) {
              return true
            }
            return false
          }
        }
      },
      jelIzabran: function(id) { // Dodjeljivanje klase na izabrani rezultat  
  
        if (id === this.aktivniRez) {
          return true
        }
        return false
      },
      testIsSuccess: function(data, d, g, ime) { // Dodjeljivanje klase na red tabele
        if (ime != undefined && ime.trim() === "PSA-ratio") {
  
          if (isNaN(data.replace("<", "").replace(">", ""))) {
            return false
          } else {
            if (g === "0" && d === "0") {
              return false
            } else
            if (data === '') {
              return false
            } else {
              if (g < 0) {
                if ((Number(data) < Number(Math.abs(d)))) {
                  return false
                }
                return true
              } else {
                if ((Number(data) > Number(d)) && (Number(data) < Number(g))) {
                  return true
                }
                return false
              }
            }
          }
  
        } else
        if (g === "0" && d === "0") {
          return false
        } else
        if (data === '') {
          return false
        } else {
          if (g < 0) {
            if ((Number(data) < Number(Math.abs(d)))) {
              return true
            }
            return false
          } else {
            if ((Number(data) > Number(d)) && (Number(data) < Number(g))) {
              return true
            }
            return false
          }
        }
      },
      testIsWarning: function(data, d, g) { // Dodjeljivanje klase na red tabele
        if (g === "0" && d === "0") {
          return false
        } else
        if (data === '') {
          return false
        } else {
          if (g < 0) {
            if ((Number(Math.abs(d)) <= Number(data)) && (Number(Math.abs(g)) >= Number(data))) {
              return true
            }
            return false
          } else {
            if ((Number(data) === Number(d)) || (Number(data) === Number(g))) {
              return true
            }
            return false
          }
        }
      },
      testIsInfo: function(data, d, g) {
        if (data.trim() === '' || data.toUpperCase() === 'UNESI') {
          return true
        } else {
          return false
        }
      },
      vratiPregled: function() {
        router.push('/rezultati/verifikacija/' + '?sekcija=' + this.$route.params.sekcija)
      },
      closeResults: function() {
        if (this.vise = true) {
          this.vise = false
        }
      },
      viseRezultata: function(event, testID, odobren, dRef, gRef, refSet, analit) { // Prikaz svih rezultata, za odabrani test
  
        this.o = odobren
        this.d = dRef
        this.g = gRef
        this.r = refSet
        this.tempTestOdobren = 'NE'
        this.tempTestIDE = testID
        this.idvise = event
        this.vise = false
  
        this.vrezultati = []
        var test = {}
  
        this.testovi.forEach(element => {
  
          if (element.testovi.labassay.sifra === event.target.id) {
            this.tid = 'Rezultati za test: ' + element.testovi.labassay.naziv
  
            http.post('/postavke/aptest/show/' + event.target.id, {
                id_u: this.$route.params.id,
                testID: testID,
                site: this.$store.state.site,
                token: this.$store.state.token
              })
              .then(res => {
                // console.log(res.data)   
                this.vrezultati = []
  
                res.data.element.rezultat.forEach(element => {
                  // console.log(element)
                  test = {}
                  test.aparat = element.anaassay.aparat.ime
                  test.rezultat = element.rezultat_f
                  test.vrijeme = element.vrijeme_prijenosa
                  test.analit = analit
                  test.odobren = element.odobren
                  if (test.odobren) { // Ako postoji odobren barem jedan od rezultata
                    this.tempTestOdobren = 'DA'
                  }
                  test._id = element._id
                  test.IDE = testID
                  var godina = test.vrijeme.substring(0, 4)
                  var mjesec = test.vrijeme.substring(4, 6)
                  var dan = test.vrijeme.substring(6, 8)
                  var sat = test.vrijeme.substring(8, 10)
                  var min = test.vrijeme.substring(10, 12)
                  var sec = test.vrijeme.substring(12, 14)
                  test.vrijeme = dan + '.' + mjesec + '.' + godina + ' | ' + sat + ':' + min + ':' + sec
                  test.jedinica = element.jedinice_f
  
                  test.status = element.status
                  test.refSet = refSet // element.anaassay.grupa
                  test.dRef = dRef // element.anaassay.reference[0].refd
                  test.gRef = gRef // element.anaassay.reference[0].refg                  
                  this.vrezultati.push(test)
                });
                // console.log(this.vrezultati[this.vrezultati.length-1]._id) // Zadnji element niza rezultata i on je uvijek aktivan
                this.aktivniRez = this.vrezultati[this.vrezultati.length - 1]._id
                // console.log('this.rezultati')
                // console.log(this.rezultati)
              }).then(res => {
                this.vise = !this.vise
              })
          }
        })
      },
      odobriRezultat: function(event, rez, ide, dref, gref, ime) { // Odobravanje rezultata sa osnovnom kontrolom  
        // console.log(ime)
        if ((dref === "0" && gref === "0" && !(rez.toLowerCase() === 'unesi') && !(rez.toLowerCase() === '')) || ((ime === "PSA-ratio") && rez === "-----")) {
  
          http.post('/rezultati/odobri/' + event.target.id, {
              id: this.$route.params.id,
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              this.refreshRezultata(ide) // Refresh cijele stranice  
              this.refreshRezultata(ide)
            })
  
        } else {
  
          if ((isNaN(rez.replace("<", "").replace(">", ""))) && (rez.toLowerCase() === 'unesi')) {
            this.toastText = 'Vrijednost rezultata nije definisana!'
            this.toastIcon = 'fa-warning'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-warning'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.refreshRezultata(ide) // Refresh cijele stranice
          } else
  
          if (((isNaN(rez.replace("<", "").replace(">", ""))) || (rez.trim() === ''))) {
            this.toastText = 'Vrijednost rezultata nije validna!'
            this.toastIcon = 'fa-warning'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-warning'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
            this.refreshRezultata(ide) // Refresh cijele stranice
          } else {
            http.post('/rezultati/odobri/' + event.target.id, {
                id: this.$route.params.id,
                site: this.$store.state.site,
                token: this.$store.state.token
              })
              .then(res => {
                this.refreshRezultata(ide) // Refresh cijele stranice  
                this.refreshRezultata(ide)
              })
          }
        }
      },
      showBasicDialogUkloni(event, rez, ide, dref, gref) {
        this.$dialog.confirm('Jeste li sigurni da želite ukloniti odobrenje, za izabrani rezultat?')
          .then(() => {
            this.ukloniOdobrenje(event, rez, ide, dref, gref)
          })
          .catch(() => {})
      },
      disableIspisDialog(event, id, ide, ispis) {
        var textTmp = ""
        if (ispis === true) {
          textTmp = 'Jeste li sigurni da želite ukloniti test sa nalaza?'
        } else if (ispis === false) {
          textTmp = 'Jeste li sigurni da želite dodati test na nalaz?'
        }
  
        this.$dialog.confirm(textTmp)
          .then(() => {
            this.disableIspis(event, id, ide, ispis)
          })
          .catch(() => {})
      },
      showBasicDialogIzaberi(event, ide) {
        this.$dialog.confirm('Jeste li sigurni da želite izabrani rezultat?')
          .then(() => {
            this.dodajRezultat(event, ide)
          })
          .catch(() => {})
      },
      ukloniOdobrenje: function(event, rez, ide, dref, gref) {
        if (dref === "0" && gref === "0") {
          http.post('/rezultati/ukloni/' + event.target.id, {
              id: this.$route.params.id,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sekcija: this.$route.params.sekcija,
            })
            .then(res => {
              this.refreshRezultata(ide) // Refresh cijele stranice
              this.refreshRezultata(ide)
            })
  
        } else {
  
          http.post('/rezultati/ukloni/' + event.target.id, {
              id: this.$route.params.id,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sekcija: this.$route.params.sekcija,
              nodata: this.nedostaju
            })
            .then(res => {
              this.refreshRezultata(ide) // Refresh cijele stranice
              this.refreshRezultata(ide)
            })
        }
      },
      showBasicDialog(event, ide) {
        this.$dialog.confirm('Jeste li sigurni da želite odobriti sve rezultate?')
          .then(() => {
            this.odobriSve(event, ide) // Odobravanje svih rezultata
          })
          .catch(() => {
  
          })
      },
      showBasicDialogSekcija(event, ide) {
        this.$dialog.confirm('Jeste li sigurni da želite odobriti sve rezultate?')
          .then(() => {
            this.odobriSveSekcija(event, ide)
            // console.log('Odobravanje svih rezultata, za trenutnu sekciju...')
          })
          .catch(() => {
  
          })
      },
      showBasicBezuslovno(event, ide) {
        this.$dialog.confirm('<strong style="color: #E34A4A;">Rezultati nisu kompletirani!</strong><br>Jeste li sigurni da želite izvršiti odobrenje?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
  
          .then(() => {
            this.odobriSveBezuslovno(event, ide) // Odobravanje svih rezultata
          })
          .catch(() => {
  
          })
      },
      showBasicBezuslovnoSekcija(event, ide) {
        this.$dialog.confirm('<strong style="color: #E34A4A;">Rezultati nisu kompletirani!</strong><br>Jeste li sigurni da želite izvršiti odobrenje?', {
            type: 'hard',
            html: true,
            verification: 'Da'
          })
  
          .then(() => {
            this.odobriSveBezuslovnoSekcija(event, ide) // Odobravanje svih rezultata
          })
          .catch(() => {
  
          })
      },
      showBasicDialogAnaliti(event, ide) {
        this.$dialog.confirm('Jeste li sigurni da želite odobriti sve rezultate?')
          .then(() => {
            this.odobriSveAnalite(event, ide) // Odobravanje svih rezultata
          })
          .catch(() => {
  
          })
      },
  
      odobriSve: function(event, ide) { // Odobravanje svih rezultata
  
        var uslovRez = false
        var i = 0
  
        this.rezultati.forEach(element => {
          i++
          // console.log(element.rezultat)
          if (element.dRef === "0" && element.gRef === "0" && ((element.rezultat.toLowerCase() === 'unesi') || (element.rezultat.toLowerCase() === ''))) {
  
            uslovRez = true
          } else if (element.multidata && !element.realizovan) {
            uslovRez = true
          } else if ((isNaN(element.rezultat.replace("<", "").replace(">", ""))) && element.dRef != "0" && element.gRef != "0" && element.ime != "PSA-ratio") {
            uslovRez = true
            // console.log(uslovRez)
          }
  
        })
  
        if ((i == this.rezultati.length) && (uslovRez == true)) {  
  
          this.toastText = 'Vrijednost rezultata nije definisana!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.refreshRezultata(ide) // Refresh cijele stranice
  
        } else if (this.nedostaju.length > 0) {
  
          this.toastText = 'Akcija nije dozvoljena!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.refreshRezultata(ide) // Refresh cijele stranice
  
        } else if ((i == this.rezultati.length) && (uslovRez == false)) {
  
          http.post('/rezultati/odobri/sve/' + this.$route.params.id, {
              testovi: this.rezultati,
              site: this.$store.state.site,
              token: this.$store.state.token
            })
            .then(res => {
              // console.log(res.data)
              this.uslovOdobriSve = true
              this.refreshRezultata(ide) // Refresh cijele stranice
              this.toastText = 'Svi rezultati su odobreni!'
              this.toastIcon = 'fa-check'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-primary'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
            })
        }
      },
      odobriSveBezuslovno: function(event, ide) {
  
        http.post('/rezultati/odobri/bezuslovno/' + this.$route.params.id, {
            testovi: this.rezultati,
            email: this.$store.state.userId,
            site: this.$store.state.site,
            token: this.$store.state.token
          })
          .then(res => {
            // console.log(res.data)
            this.uslovOdobriSve = true
            this.refreshRezultata(ide) // Refresh cijele stranice
  
            this.toastText = 'Svi rezultati su odobreni!'
            this.toastIcon = 'fa-check'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-primary'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
          })
      },
      odobriSveBezuslovnoSekcija: function(event, ide) {
  
        http.post('/rezultati/odobri/sekcija/bezuslovno/' + this.$route.params.id, {
            testovi: this.rezultati,
            email: this.$store.state.userId,
            token: this.$store.state.token,
            sekcija: this.$route.params.sekcija,
            site: this.$store.state.site,
            nodata: this.nedostaju
          })
          .then(res => {
            // console.log(res.data)
            this.uslovOdobriSveSekcija = true
            this.refreshRezultata(ide) // Refresh cijele stranice
  
            this.toastText = 'Svi rezultati su odobreni!'
            this.toastIcon = 'fa-check'
            this.toastPosition = 'top-right'
            this.className = 'vuestic-toast-primary'
  
            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            })
          })
      },
      showBasicDialogKalkulisani(event, ide, id, ime, edited) {
        
        if (this.vise = true) {
          this.vise = false
        }
        if (!ime.includes("ROMA") && !ime.includes("Kl-Krea")) {
          this.$dialog.confirm('Jeste li sigurni da želite ponovno izračunati rezultat kalkuliranog testa?')
            .then(() => {
              http.post('/rezultati/calculate/' + ide, { // Upis nove vrijednosti rezultata
                  _id: id,
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                  ime: ime
                })
                .then(res => {
                  this.toastText = 'Izmjena uspješno obavljena!'
                  this.toastIcon = 'fa-check'
                  this.toastPosition = 'top-right'
                  this.className = 'vuestic-toast-primary'
  
                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  })
                  this.refreshRezultata(ide) // Refresh cijele stranice 
                })
            })
            .catch(() => {})
  
        } else if (ime.includes("ROMA")) {
  
          if (this.uslovRoma) {
            this.$dialog.confirm('Jeste li sigurni da želite izračunati ROMA index?')
              .then(() => {
  
                // console.log(ide)
                http.post('/rezultati/calculate/' + ide, { // Upis nove vrijednosti rezultata
                    _id: id,
                    token: this.$store.state.token,
                    site: this.$store.state.site,
                    ime: ime
                  })
                  .then(res => {
                    this.toastText = 'Akcija uspješno izvršena!'
                    this.toastIcon = 'fa-check'
                    this.toastPosition = 'top-right'
                    this.className = 'vuestic-toast-primary'
  
                    this.showToast(this.toastText, {
                      icon: this.toastIcon,
                      position: this.toastPosition,
                      duration: this.toastDuration,
                      fullWidth: this.isToastFullWidth,
                      className: this.className,
                    })
                    this.refreshRezultata(ide) // Refresh cijele stranice  
                  })
  
              }).then(() => {
                this.refreshRezultata(ide)
  
                if (this.sviRealizovaniR) {
                  http.post('/rezultati/edit/' + edited, { // Upis nove vrijednosti rezultata
                      rezultat: this.romaRezultat.trim(),
                      site: this.$store.state.site,
                      token: this.$store.state.token
                    })
                    .then(res => {
                      this.refreshRezultata(this.ide) // Refresh cijele stranice   
                    })
                }
              })
              .catch(() => {})
  
          } else {
            this.$dialog.alert('ROMA index nije moguće izračunati. Rezultati svih neophodnih testova nisu pristigli.')
          }
        } else if (ime.includes("Kl-Krea")) {
  
          if (this.uslovKl) {
            this.$dialog.confirm('Jeste li sigurni da želite izračunati Klirens kreatinina?')
              .then(() => {
                http.post('/rezultati/calculate/' + ide, { // Upis nove vrijednosti rezultata
                    _id: id,
                    site: this.$store.state.site,
                    token: this.$store.state.token,
                    ime: ime
                  })
                  .then(res => {
                    this.toastText = 'Akcija uspješno izvršena!'
                    this.toastIcon = 'fa-check'
                    this.toastPosition = 'top-right'
                    this.className = 'vuestic-toast-primary'
  
                    this.showToast(this.toastText, {
                      icon: this.toastIcon,
                      position: this.toastPosition,
                      duration: this.toastDuration,
                      fullWidth: this.isToastFullWidth,
                      className: this.className,
                    })
                    this.refreshRezultata(ide) // Refresh cijele stranice 
                  })
              }).then(() => {
                this.refreshRezultata(ide)
  
                if (this.sviRealizovaniK) {
                  http.post('/rezultati/edit/' + edited, { // Upis nove vrijednosti rezultata
                      rezultat: this.klRezultat.trim(),
                      site: this.$store.state.site,
                      token: this.$store.state.token
                    })
                    .then(res => {
                      this.refreshRezultata(this.ide) // Refresh cijele stranice   
                    })
                }
              })
              .catch(() => {})
  
          } else {
            this.$dialog.alert('Klirens kreatinina nije moguće izračunati. Rezultati svih neophodnih testova nisu pristigli.')
          }
        }
  
  
      },
      kClass0: function(data, d, g) {
        if ((data < 0.35) && (0 < data)) {
          return true
        } else {
          return false
        }
      },      
      kClass1: function(data, d, g) {
        if ((data >= 0.35) && (0.7 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass2: function(data, d, g) {
        if ((data >= 0.7) && (3.50 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass3: function(data, d, g) {
        if ((data >= 3.50) && (17.50 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass4: function(data, d, g) {
        if ((data >= 17.50) && (50 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass5: function(data, d, g) {
        if ((data >= 50) && (100 > data)) {
          return true
        } else {
          return false
        }
      },
      kClass6: function(data, d, g) {
        if ((data >= 100)) {
          return true
        } else {
          return false
        }
      },
      tinh1: function(data, d, g) {
        if ((data > 0) && (1 >= data)) {
          return true
        } else {
          return false
        }
      },
      tinh2: function(data, d, g) {
        if ((data > 1) && (2 >= data)) {
          return true
        } else {
          return false
        }
      },
      tinh3: function(data, d, g) {
        if ((data > 2) && (3 >= data)) {
          return true
        } else {
          return false
        }
      },
      closeResultsMulti: function() {
        this.viseAnaliti = false        
      },
      viseRezultataMulti: function(test, ime, analit, odobren) {
        this.privremenoTest = test
        this.privremenoIme = ime
        this.privremenoAnalit = analit
  
        this.viseAnaliti = !this.viseAnaliti
        this.analitid = 'Rezultati za test: ' + ime + ' (' + analit + ')'
        this.rezName = ime
        this.analitiIzbor = []
        var temp = []
  
        var test = {}
        var vrijeme = ''
        var izbor = ''
  
        // console.log(this.analitiprikaz)
        this.analitiprikaz.forEach(rez => {
  
          for (let i = 0; i < rez.rezultat[0].rezultat.length; i++) {
            test.vrijeme = rez.rezultat[0].rezultat[i].vrijeme_rezultata
  
            var godina = test.vrijeme.substring(0, 4)
            var mjesec = test.vrijeme.substring(4, 6)
            var dan = test.vrijeme.substring(6, 8)
            var sat = test.vrijeme.substring(8, 10)  
            var min = test.vrijeme.substring(10, 12)  
            var sec = test.vrijeme.substring(12, 14)
  
            vrijeme = dan + '.' + mjesec + '.' + godina + ' | ' + sat + ':' + min + ':' + sec
            // vrijeme = rez.rezultat[i].rezultat[0].vrijeme_rezultata
            // console.log(vrijeme)
            for (let index = 0; index < rez.rezultat.length; index++) {
              temp.push(rez.rezultat[index].rezultat[i].sn + ": " + rez.rezultat[index].rezultat[i].rezultat_f)
            }
            if (i === 0) {
              izbor = 'DA'
            } else {
              izbor = 'NE'
            }
            // console.log(temp)
            this.analitiIzbor.push({
              rezultat: temp,
              vrijeme: vrijeme,
              izbor: izbor,
              test: this.privremenoTest.laIDE
            })
            temp = []
          }
        })
      },
  
      izaberiRezultatMultiDialog(event, ide) {
  
        this.$dialog.confirm('Jeste li sigurni da želite izabrani rezultat?')
          .then(() => {
            this.izaberiRezultatMulti(event, ide) 
          })
          .catch(() => {})
      },
      izaberiRezultatMulti: function(event, test) {
  
        http.post('/rezultati/izaberimulti/' + this.$route.params.id, { // Upis nove vrijednosti rezultata
            izbor: event.target.id,
            test: test,
            site: this.$store.state.site,
            token: this.$store.state.token
          })
          .then(res => {
            if (res.data.success) {
              this.toastText = 'Akcija uspješno izvršena!'
              this.toastIcon = 'fa-check'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-primary'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
              this.vratiPregled2()
              this.refreshRezultata(this.ide)
              this.viseAnaliti = false
            }
          })
      },
      odobriSveSekcija: function(event, ide) { // Odobravanje svih rezultata
  
        var uslovRez = false
        var i = 0
  
        this.rezultatiSekcija.forEach(element => {
  
          i++
          // console.log(element.rezultat)
          if (element.dRef === "0" && element.gRef === "0" && ((element.rezultat.toLowerCase() === 'unesi') || (element.rezultat.toLowerCase() === ''))) {
  
            uslovRez = true
          } else if (element.multidata && !element.realizovan) {
            uslovRez = true
          } else if ((isNaN(element.rezultat.replace("<", "").replace(">", ""))) && element.dRef != "0" && element.gRef != "0" && element.ime != "PSA-ratio") {
            uslovRez = true
            // console.log(uslovRez)
          }
  
        })
  
        if ((i == this.rezultatiSekcija.length) && (uslovRez == true)) {  
  
          this.toastText = 'Vrijednost rezultata nije definisana!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.refreshRezultata(ide) // Refresh cijele stranice
  
        } else if (this.nedostaju.length > 0) {
  
          this.toastText = 'Akcija nije dozvoljena!'
          this.toastIcon = 'fa-warning'
          this.toastPosition = 'top-right'
          this.className = 'vuestic-toast-warning'
  
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          })
          this.refreshRezultata(ide) // Refresh cijele stranice
  
        } else if ((i == this.rezultatiSekcija.length) && (uslovRez == false)) {
  
          http.post('/rezultati/odobri/sekcija/' + this.$route.params.id, {
              testovi: this.rezultati,
              token: this.$store.state.token,
              site: this.$store.state.site,
              sekcija: this.$route.params.sekcija
            })
            .then(res => {
              // console.log(res.data)
              this.uslovOdobriSveSekcija = false
              this.refreshRezultata(ide) // Refresh cijele stranice
              this.toastText = 'Svi rezultati su odobreni!'
              this.toastIcon = 'fa-check'
              this.toastPosition = 'top-right'
              this.className = 'vuestic-toast-primary'
  
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              })
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import '../../../sass/_toasts.scss';
  
  .abc-checkbox,
  .abc-radio {
    margin-bottom: 2px;
    label {
      .abc-label-text {
        display: inline-block;
        position: relative;
        top: 2px;
        padding-left: 13px;
      }
    }
  }
  
  .stats-number,
  .stats-title {
    line-height: 1;
  }
  
  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    &.has-chart {
      justify-content: space-between;
    }
    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  
  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    margin-bottom: 0.5rem;
    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;
      &.icon-wide {
        left: -1.875rem;
      }
    }
  }
  
  .color-icon-label-table {
    td:first-child {
      width: 1rem;
    }
  }
  
  .brand-danger {
    background-color: $white;
    color: $white;
    box-shadow: $widget-box-shadow;
  }
  
  .brand-pale {
    background-color: $white;
    color: $white;
    box-shadow: $widget-box-shadow;
  }
  
  .info-widget {
    border-top: $info-widget-border;
    &.brand-info {
      border-top-color: $brand-info;
    }
    &.brand-danger {
      border-top-color: $brand-danger;
    }
    &.brand-warning {
      border-top-color: $brand-warning;
    }
    &.brand-pale {
      border-top-color: $gray;
    }
  }
  
  .square {
    text-align: left;
    display: inline-block;
  }
  
  .container {
    text-align: center;
    display: inline-block;
  }
  
  .testoviDiv {
    margin: 0 auto;
  }
</style>
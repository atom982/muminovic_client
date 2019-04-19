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
                <div class="btn btn-primary btn-with-icon btn-micro rounded-icon" title="Osvježi stranicu" @click='globalRefresh($event)'>
                  <div class="btn-with-icon-content">
                    <i class="fa fa-refresh"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive" id='printout'>
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>test</td>
                  <td>refSET</td>
                  <td>rezultat</td>
                  <td>jedinica</td>
                  <td>referentni interval</td>
                  <td>više rezultata</td>
                  <td>status</td>
                  <td>retest</td>
                  <td align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr v-if="$route.params.sekcija === test.sekcija || $route.params.sekcija ==='SVE'" v-for="test in rezultati" v-bind:class="{
                  'table-danger': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Red' && !test.multidata, 
                  'table-success': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Green' && !test.multidata, 
                  'table-warning': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Yellow' && !test.multidata, 
                  'table-info': testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[5] === 'Blue'  && !test.multidata
                }">
  
                  <!-- test: Bez analita -->
                  <td v-if="rezultat && !test.multidata" :title="test.analit">{{test.ime}}</td>
                  <!-- test: Sa analitima -->
                  <td v-if="test.multidata" :title="test.analit">{{test.ime}}</td>
                  <!-- refSET: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{test.refSet}}</td>
                  <!-- refSET: Sa analitima -->
                  <td v-if="test.multidata">{{test.refSet}}</td>
  
                  <!-- rezultat: Bez analita -->
                  <td v-if="rezultat && !test.manual && !test.multidata && !test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea')"><strong>{{test.rezultat}}</strong></td>
                  <td v-if="test.rezultat != 'Unesi' && (test.ime.includes('ROMA') || test.ime.includes('Kl-Krea'))"><strong>{{test.rezultat}}</strong></td>
                  <td v-if="test.rezultat === 'Unesi' && (test.ime.includes('ROMA') || test.ime.includes('Kl-Krea'))"><strong>{{"Čekam..."}}</strong></td>
  
                  <td v-if="rezultat && test.manual && !test.multidata && !test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea')">
                    <div v-show="test.edit == false">
                      <label @dblclick="test.edit = true">
                        <strong>{{ test.rezultat }}</strong> 
                      </label>
                    </div>
  
                    <select v-if="test.select_options != undefined" style="width:105px" v-show="test.edit == true" v-model="test.rezultat" v-on:change="test.edit=false; $emit('update', test.id, 'blur', test.rezultat, id, test.odobren, test.ime, test.dRef, test.gRef)">
                      <option v-for="option in test.select_options">
                        {{ option }}
                      </option>
                    </select>
  
                    <input v-if="test.select_options === undefined" v-show="test.edit == true" v-model="test.rezultat" style="width:100px" v-on:blur="test.edit=false; $emit('update', test.id, 'blur', test.rezultat, id, test.odobren, test.ime, test.dRef, test.gRef)">
                  </td>
                  <!-- rezultat: Sa analitima -->
                  <td v-if="test.multidata && !test.realizovan">
                    <button :id="test.laIDE" title='Rezultati nisu kompletirani' class="btn btn-danger btn-micro" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, id, test.odobren)"><span :id="test.laIDE" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, id, test.odobren)" class="glyphicon glyphicon-search"></span> Analiti</button>
                  </td>
                  <td v-if="test.multidata && test.realizovan">
                    <button :id="test.laIDE" title='Pregled rezultata za analite' class="btn btn-primary btn-micro" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, id, test.odobren)"><span :id="test.laIDE" @click.prevent="prikazAnalita($event, test.ime, test.analit, test.rezultat, id, test.odobren)" class="glyphicon glyphicon-search"></span> Analiti</button>
                  </td>
  
                  <!-- jedinica: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{test.unit}}</td>
                  <!-- jedinica: Sa analitima -->
                  <td v-if="rezultat && test.multidata">{{''}}</td>
  
                  <!-- referentni interval: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{testBezAnalita(test.analit, test.rezultat, test.unit, test.dRef, test.gRef, $store.state.site)[4]}}</td>

                  <!-- referentni interval: Sa analitima -->
                  <td v-if="rezultat && test.multidata">{{''}}</td>
  
                  <!-- više rezultata: Bez analita -->
                  <td v-if="rezultat && !test.multidata">
                    <button v-if="!test.vise && !test.calculated && !test.manual" title='Test ima samo jedan rezultat' @click.prevent="closeResults" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                    <button v-if="test.vise && !test.calculated && !test.manual" @click.prevent="viseRezultata($event,test.IDE, test.dRef, test.gRef, test.refSet, test.analit)" title='Pregled svih rezultata testa' :id='test.test' class='btn btn-primary btn-micro'><span :id='test.test' class='glyphicon glyphicon-ok-circle'></span> Da</button>
                    <button v-if="test.calculated" title='Kalkulirani test može imati samo jedan rezultat' @click.prevent="closeResults" :id='test.test' class='btn btn-warning btn-micro focus'><span :id='test.test' class='fa fa-calculator' ></span> ca</button>
                    <button v-if="!test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea') && test.manual" title='Ručni test može imati samo jedan rezultat' @click.prevent="closeResults" :id='test.test' class='btn btn-warning btn-micro focus'><span :id='test.test' class='fa fa-pencil-square-o' ></span> ma</button>
                  </td>

                  <!-- više rezultata: Sa analitima -->
                  <td v-if="test.multidata && test.manual">
                    <button title='Ručni test može imati samo jedan rezultat' class='btn btn-warning btn-micro focus'><span class='fa fa-pencil-square-o'></span> ma</button>
                  </td>
                  <td v-if="test.multidata && !test.manual">
                    <button v-if="test.visemulti" @click.prevent="viseRezultataMulti(test.ime, test.analit)" title='Pregled svih rezultata testa' :id='test.test' class='btn btn-primary btn-micro'><span :id='test.test' class='glyphicon glyphicon-ok-circle'></span> Da</button>
                    <button v-if="!test.visemulti && test.realizovan" title='Test ima samo jedan rezultat' @click.prevent="closeResultsMulti" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                    <button v-if="!test.visemulti && !test.realizovan" title='Rezultati nisu kompletirani' @click.prevent="closeResultsMulti" class='btn btn-pale btn-micro' focus><span class='glyphicon glyphicon-ban-circle'></span> Ne</button>
                  </td>
  
                  <!-- status: Bez analita -->
                  <td v-if="rezultat && !test.multidata">{{test.odobren}}</td>

                  <!-- status: Sa analitima -->
                  <td v-if="test.multidata">{{test.odobren}}</td>
  
                  <!-- retest: Bez analita -->
                  <td v-if="(test.odobren == 'NIJE ODOBREN') && !test.manual && !test.calculated && !test.multidata">
                    <button v-if="!test.retest && !test.manual && !test.calculated" title='Aktiviraj retest' :id='test.test' class="btn btn-primary btn-micro" @click.prevent="showBasicDialog($event, id)"><span :id='test.test' class="fa fa-refresh"></span></button>
                    <button v-if="test.retest && !test.manual && !test.calculated" title='Deaktiviraj retest' :id='test.test' class="btn btn-info btn-micro" @click.prevent="showBasicDialogcontra($event, id)"><span :id='test.test' class="glyphicon glyphicon-duplicate"></span></button>
                  </td>
                  <td v-if="(test.odobren == 'ODOBREN') && !test.manual && !test.calculated && !test.multidata">
                    <button title='Retest nije dozvoljen' class="btn btn-pale btn-micro" @click.prevent="showBasicDialogRetest()"><span class="glyphicon glyphicon-ban-circle"></span></button>
                  </td>
                  <td v-if="!test.ime.includes('ROMA') && !test.ime.includes('Kl-Krea') && test.manual && !test.multidata">
                    <button title='Retest nije dozvoljen za ručne testove' class="btn btn-warning btn-micro"><span class="glyphicon glyphicon-ban-circle"></span></button>
                  </td>
                  <td v-if="test.calculated && !test.multidata">
                    <button title='Retest nije dozvoljen za kalkulirane testove' class="btn btn-warning btn-micro"><span class="glyphicon glyphicon-ban-circle"></span></button>
                  </td>

                  <!-- retest: Sa analitima -->
                  <td v-if="test.multidata && test.manual">
                    <button title='Retest nije dozvoljen za ručne testove' class="btn btn-warning btn-micro"><span class="glyphicon glyphicon-ban-circle"></span></button>
                  </td>
                  <td v-if="(test.odobren == 'NIJE ODOBREN') && !test.manual && !test.calculated && test.multidata && test.realizovan">
                    <button v-if="!test.retest && !test.manual && !test.calculated" title='Aktiviraj retest' :id='test.test' class="btn btn-primary btn-micro" @click.prevent="showBasicDialog($event, id)"><span :id='test.test' class="fa fa-refresh"></span></button>
                    <button v-if="test.retest && !test.manual && !test.calculated" title='Deaktiviraj retest' :id='test.test' class="btn btn-info btn-micro" @click.prevent="showBasicDialogcontra($event, id)"><span :id='test.test' class="glyphicon glyphicon-duplicate"></span></button>
                  </td>
                  <td v-if="(test.odobren == 'ODOBREN') && !test.manual && !test.calculated && test.multidata && test.realizovan">
                    <button title='Retest nije dozvoljen' class="btn btn-pale btn-micro" @click.prevent="showBasicDialogRetest()"><span class="glyphicon glyphicon-ban-circle"></span></button>
                  </td>
                  <td v-if="!test.manual && !test.calculated && test.multidata && !test.realizovan">
                    <button title='Rezultati nisu kompletirani' class="btn btn-danger btn-micro"><span class="glyphicon glyphicon-ban-circle"></span></button>
                  </td>

                  <!-- <td align="middle"></td> -->
                  <td align="middle">
                    <i v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : testIsDanger(test.rezultat, test.dRef, test.gRef)}"></i>
                    <i v-bind:class="{'fa fa-check success-icon icon-right input-icon' : testIsSuccess(test.rezultat, test.dRef, test.gRef)}"></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="((!uslovOdobriSve) || nedostaju.length > 0)">
              <div v-if="nedostaju.length > 1" class="col-md-12"><span style="color: #E34A4A;"><strong>Čeka se na rezultate testova: </strong></span> <button v-for="test in nedostaju" :title="test.analit" class="btn btn-danger hover btn-micro">{{test.naziv}}</button></div>
              <div v-if="nedostaju.length > 0 && nedostaju.length < 2" class="col-md-12"><span style="color: #E34A4A;"><strong>Čeka se na rezultat testa: </strong></span> <button v-for="test in nedostaju" :title="test.analit" class="btn btn-danger hover btn-micro">{{test.naziv}}</button></div>
              <div v-if="(nedostaju.length < 1) && !rucniIma" class="col-md-12"><span style="color: #4AE387;"><strong>Svi testovi su realizovani!</strong></span></div>
            </div>
            <div v-if="rucniIma">
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
          <div>
            <hr>
          </div>
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="btn-container">
                <button class="btn btn-secondary wizard-back pull-left" @click.prevent="vratiPregled"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
              </div>
              <div class="btn-container">
              </div>
            </div>
          </div>
        </vuestic-widget>
        <!-- End of Rezultat za uzorak: U001C81114 -->

        <!-- Prikaz više rezultata za test: CRP -->
        <vuestic-widget v-if="vise" :headerText="tid">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>analizator</td>
                  <td>vrijeme</td>
                  <td>rezultat</td>
                  <td>jedinica</td>
                  <td>referentni interval</td>
                  <td>izbor</td>
                  <td align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="test in vrezultati" v-bind:class="{'table-danger': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Red', 'table-success': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Green', 'table-warning': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Yellow', 'table-info': testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[5] === 'Blue'}">
                  <td>{{test.aparat}}</td>
                  <td>{{test.vrijeme}}</td>
                  <td><strong>{{test.rezultat}}</strong></td>
                  <td>{{test.jedinica}}</td>
                  <td>{{testBezAnalita(test.analit, test.rezultat, test.jedinica, test.dRef, test.gRef, $store.state.site)[4]}}</td>
                  <td v-if="jelIzabran(test._id)">
                    <strong>DA</strong>
                  </td>
                  <td v-if="!jelIzabran(test._id)">
                    <strong>NE</strong>
                  </td>
                  <td align="middle">
                    <i v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : testIsDanger(test.rezultat, test.dRef, test.gRef)}"></i>
                    <i v-bind:class="{'fa fa-check success-icon icon-right input-icon' : testIsSuccess(test.rezultat, test.dRef, test.gRef)}"></i>
                  </td>
                </tr>
              </tbody>
            </table>
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
                  <td>izbor</td>
                  <td align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="test in analitiIzbor">
                  <td>{{test.vrijeme}}</td>
                  <td v-if="test.izbor === 'DA'"><button title='Pregled rezultata za analite' @click.prevent="rezultatiAnalitaMulti(test.rezultat, test.vrijeme, test.izbor)" class="btn btn-primary btn-micro"><span class="vuestic-icon vuestic-icon-files"></span> VIŠE</button> </td>
                  <td v-if="test.izbor === 'NE'"><button title='Pregled rezultata za analite' @click.prevent="rezultatiAnalitaMulti(test.rezultat, test.vrijeme, test.izbor)" class="btn btn-danger btn-micro"><span class="vuestic-icon vuestic-icon-files"></span> VIŠE</button> </td>
                  <td><strong>{{test.izbor}}</strong></td>
                  <td align="middle">
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
                    <div v-if="test.rezultat != '' && !test.manual" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i> {{test.rezultat}}
                    </div>
                    <div style="color:#e34a4a" v-if="test.rezultat === '' && !test.manual" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i> {{"Čekam..."}}
                    </div>
                    <div v-if="rezultat && test.manual" :id="test.analit" :title="test.opis" class="stats-number">
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
                    <div v-if="test.nazivTesta != 'TINH' && testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4] != 'n/a'" :title="test.grupa" class="stats-title">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4]}}</div>
                    <div v-if="test.nazivTesta != 'TINH' && testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4] === 'n/a'" :title="test.grupa" class="stats-title">&nbsp</div>
                    <!-- Jedinica -->
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica === 'n/a'" class="stats-title">&nbsp</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica != 'n/a'" class="stats-title">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[3]}}</div>
  
                    <td style="color:#4ae387" v-if="(test.nazivTesta === 'TINH') &&tinh1(test.rezultat, test.refd, test.refg)">{{'Dozvoljeno'}}</td>
                    <td style="color:#f7cc36" v-if="(test.nazivTesta === 'TINH') &&tinh2(test.rezultat, test.refd, test.refg)">{{'Nije preporučljivo'}}</td>
                    <td style="color:#e34a4a" v-if="(test.nazivTesta === 'TINH') &&tinh3(test.rezultat, test.refd, test.refg)">{{'Nije dozvoljeno'}}</td>
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
                    <div v-if="test.rezultat != '' && !test.manual" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i> {{test.rezultat}}
                    </div>
                    <div style="color:#e34a4a" v-if="test.rezultat === '' && !test.manual" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i> {{"Čekam..."}}
                    </div>
                    <div v-if="rezultat && test.manual" :id="test.analit" :title="test.opis" class="stats-number">
                      <i :id="test.analit" class="ion ion-arrow-up-c text-primary stats-icon"></i>
                      <div v-show="test.edit == false">
                        <label @dblclick="test.edit = true">
                          <strong v-if="test.rezultat != ''">{{ test.rezultat }}</strong>
                          <strong v-if="test.rezultat === ''">{{ 'Unesi'}}</strong> 
                        </label>
                      </div>
                      <input style="width:100px" type="number" min="1" max="3" step="1" v-show="test.edit == true" v-model="test.rezultat" v-on:blur="test.edit=false; $emit('updateAnalit', test.analit, 'blur', test.analit, test.rezultat, id, test.labID, test.odobren, test.refd, test.refg, test.naziv, test.nazivTesta)">
                    </div>
                    <div v-if="test.nazivTesta != 'TINH' && test.refg != '0'" :title="test.grupa" class="stats-title">{{Math.abs(test.refd)}} - {{Math.abs(test.refg)}}</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.refg === '0'" :title="test.grupa" class="stats-title">&nbsp</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica === 'n/a'" class="stats-title">&nbsp</div>
                    <div v-if="test.nazivTesta != 'TINH' && test.jedinica != 'n/a'" class="stats-title">{{test.jedinica}}</div>
                    <td style="color:#4ae387" v-if="(test.nazivTesta === 'TINH') &&tinh1(test.rezultat, test.refd, test.refg)">{{'Dozvoljeno'}}</td>
                    <td style="color:#f7cc36" v-if="(test.nazivTesta === 'TINH') &&tinh2(test.rezultat, test.refd, test.refg)">{{'Nije preporučljivo'}}</td>
                    <td style="color:#e34a4a" v-if="(test.nazivTesta === 'TINH') &&tinh3(test.rezultat, test.refd, test.refg)">{{'Nije dozvoljeno'}}</td>
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
              <button class="btn btn-secondary" @click.prevent="vratiPregled2"><span class="fa fa-backward"></span>{{ ' POVRATAK'}}</button>
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
                      <td v-if="test.rezultat != '' && !test.manual" :id="test.analit">{{test.rezultat}}</td>
                      <td style="color:#e34a4a" v-if="test.rezultat === '' && !test.manual" :id="test.analit">{{"Čekam..."}}</td>
                      <td v-if="rezultat && test.manual" :id="test.analit">
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
                      <td v-if="test.jedinica != 'n/a'" class="stats-title">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[3]}}</td>
                      <td v-if="testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4] != 'n/a'" :title="test.grupa">{{testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4]}}</td>
                      <td v-if="testSaAnalitima(test.izbor, test.opis, test.rezultat, test.jedinica, test.refd, test.refg, $store.state.site)[4] === 'n/a'" :title="test.grupa">&nbsp</td>
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
            </div>
          </div>
        </vuestic-widget>
      </div>
    </div>
  </div>
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
  import printJS from 'print-js'
  import {ispisAnalitNe} from '../../funkcije/shared/references.js'
  import {ispisAnalitDa} from '../../funkcije/shared/references.js'
  
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
        sekcije: [],
        tempEvent: '',
        tempNaziv: '',
        tempAnalit: '',
        tempRezultat: '',
        tempIDE: '',
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
        rezultat: false,
        prikaziAnalit: false,
        glavniScreen: true,
        rezultati: [],
        refSet: 'DEFAULT',
        refSetovi: [],
        nedostaju: [],
        multiHeader: '',
        vise: false,
        viseAnaliti: false,
        analitid: '',
        viseMulti: false,
        vrezultati: [],
        tid: '',
        hid: '',
        salkouslov: false,
        uslovRetest: true,
        aktivniRez: '',
        uslovOdobriSve: true,
        uslovOdobriSvePrint: true,
        retestFlag: false,
        retestirati: [],
        rucni: [],
        rucniIma: false,
        patient_id: '',
        analitiprikaz: [],
        analiti: [],
        analitiIzbor: [],
        card_view: false,
  
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
  
      this.hid = 'Rezultat za uzorak: ' + this.$route.params.id
      this.id = this.$route.params.id
  
      http.get('rezultati/show/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
        })
        .then(res => {
          if (res.data.nodata != undefined) {
            this.sekcije = []
            this.imeIprezime = res.data.ime + ' ' + res.data.prezime
            this.spol = res.data.spol
            this.jmbg = res.data.jmbg
            this.patient_id = res.data.id
            this.nedostaju = [] // Testovi čiji rezultat nije pristigao, a rade se na aparatu
  
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
                if (element.testovi.retest == true) { // Privremeni niz testova koji imaju flag za retestiranje (true)
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
                test.ime = element.testovi.labassay.naziv
                test.test = element.testovi.labassay.sifra
                test.analit = element.testovi.labassay.analit
                test.IDE = element.testovi._id
                test.laIDE = element.testovi.labassay._id
                test.calculated = element.testovi.labassay.calculated
                test.edit = false
                test.realizovan = true
                test.select_options = (eval("topcije." + element.testovi.labassay.naziv.replace('%', '_').replace('/', '_').replace(' ', '_').replace('-', '_')))
  
                var i = 0
  
                element.testovi.rezultat.forEach(rezultat => { // Provjeravamo dali test ima više rezultata
                  i++
                  if (!this.sekcije.filter(test => test === rezultat.anaassay.sekcija).length > 0) {
                    this.sekcije.push(rezultat.anaassay.sekcija)
                  }
                  test.sekcija = rezultat.anaassay.sekcija
                  if (element.testovi.rezultat.length > 1) {
                    test.vise = true
                  } else {
                    test.vise = false
                  }
                  if (element.testovi.rezultat.length === i) { // Nakon što završi provjera, dali test ima više rezultata...
                    test.rezultat = rezultat.rezultat_f
                    test.unit = rezultat.jedinice_f
                    if (rezultat.odobren) {
                      test.odobren = "ODOBREN"
                    } else {
                      test.odobren = "NIJE ODOBREN"
                    }
                    if (rezultat.sn === 'MANUAL') {
                      test.manual = true // Dali je test MANUAL  
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
                            });
                          });
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
                    test.id = rezultat._id
                    test.multidata = element.testovi.labassay.multi
                    test.refSet = element.testovi.grupa
                    test.dRef = element.testovi.refd
                    test.gRef = element.testovi.refg
                    test.retest = element.testovi.retest
                  }
                })
                this.rezultati.push(test)
              });
              if (this.retestirati.length < 1) { // Ukoliko ima testova za RETEST   
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
              if (element.odobren === 'NIJE ODOBREN') {
                this.uslovOdobriSve = false
              }
            }
          })
          if ((this.nedostaju.length < 1) && this.uslovOdobriSve) {
            this.uslovOdobriSvePrint = false
          }
        })
  
      this.$on('update', function(edited, method, rezultat, ide, odobren, ime, dref, gref) { // Poziva se prilikom izmjene rezultata  
        if (rezultat.trim() != "" && rezultat.toUpperCase() != 'UNESI') {
          if ((ime === "V-U24") && isNaN(rezultat.replace("<", "").replace(">", ""))) {
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
            this.globalRefresh(ide) // Refresh cijele stranice             
          } else
          if (dref === "0" && gref === "0" && odobren === 'NIJE ODOBREN') {
            if (rezultat === "") {
              rezultat = "Unesi"
            }
            if (method === "blur") {
              http.post('/rezultati/edit/' + edited, { // Upis nove vrijednosti rezultata
                  rezultat: rezultat.trim(),
                  token: this.$store.state.token,
                  site: this.$store.state.site
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
                  this.globalRefresh(ide)
                })
            }
          } else {
            if (odobren === 'ODOBREN') {
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
              this.globalRefresh(ide) // Refresh cijele stranice
            } else if ((isNaN(rezultat.replace("<", "").replace(">", ""))) || (rezultat.trim() === '')) {
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
              this.globalRefresh(ide) // Refresh cijele stranice
            } else {
              if (method === "blur") {
                http.post('/rezultati/edit/' + edited, { // Upis nove vrijednosti rezultata
                    rezultat: rezultat.trim(),
                    token: this.$store.state.token,
                    site: this.$store.state.site
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
                    this.globalRefresh(ide) // Refresh cijele stranice
                  })
              }
            }
          }
        } else {
          this.globalRefresh(ide) // Refresh cijele stranice 
        }
      })
  
      this.$on('updateAnalit', function(edited, method, analit, rezultat, id, labID, odobren, dref, gref, naziv, test) { // Poziva se prilikom izmjene rezultata      
        if (odobren === 'ODOBREN') {
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
          this.globalRefresh(id) // Refresh cijele stranice
  
        } else
        if (test.includes('Panel') && isNaN(rezultat.replace("<", "").replace(">", ""))) {
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
          this.globalRefresh(id) // Refresh cijele stranice    
        } else
  
        if (rezultat.trim() != "" && rezultat.toUpperCase() != 'UNESI') {
          if (dref === "0" && gref === "0" && odobren === 'NIJE ODOBREN') {
            if (rezultat === "") {
              rezultat = "Unesi"
            }
            if (method === "blur") {
              http.post('/rezultati/edit/analit/' + edited, { // Upis nove vrijednosti rezultata
                  rezultat: rezultat.trim(),
                  analit: analit,
                  labassay: labID,
                  sid: id,
                  token: this.$store.state.token,
                  site: this.$store.state.site
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
                  this.globalRefresh(id) // Refresh cijele stranice  
                })
            }
          } else {
            if (test.includes('Panel') && (rezultat === "0")) {
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
              this.globalRefresh(id) // Refresh cijele stranice      
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
              this.globalRefresh(id) // Refresh cijele stranice     
            } else if ((isNaN(rezultat.replace("<", "").replace(">", ""))) || (rezultat.trim() === '')) {
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
              this.globalRefresh(id) // Refresh cijele stranice  
            } else {
              if (method === "blur") {
                http.post('/rezultati/edit/analit/' + edited, { // Upis nove vrijednosti rezultata
                    rezultat: rezultat.trim(),
                    analit: analit,
                    labassay: labID,
                    sid: id,
                    token: this.$store.state.token,
                    site: this.$store.state.site
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
                    this.globalRefresh(id) // Refresh cijele stranice
                  })
              }
            }
          }
  
        } else {
          this.prikazAnalita(this.tempEvent, this.tempNaziv, this.tempAnalit, this.tempRezultat, this.tempIDE, odobren)
          this.globalRefresh(id) // Refresh cijele stranice  
        }
      })
    },
  
    mounted() {
  
    },
  
    methods: {
      testBezAnalita: function(test, rezultat, jedinica, dRef, gRef, site) {        
        return ispisAnalitNe(test, rezultat, jedinica, dRef, gRef, site)
      },
      testSaAnalitima: function(izbor, test, rezultat, jedinica, dRef, gRef, site) {        
        return ispisAnalitDa(izbor, test, rezultat, jedinica, dRef, gRef, site)
      },
      goToSekcija(event) {
        router.push('/rezultati/pregled/' + event.target.id + '/' + this.$route.params.id)
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
      prikazAnalita: function(event, naziv, analit, rezultat, ide, odobren) {
        this.viseAnaliti = false
        this.tempEvent = event
        this.tempNaziv = naziv
        this.tempAnalit = analit
        this.tempRezultat = rezultat
        this.tempIDE = ide
  
        this.multiHeader = 'Rezultati testa: ' + naziv + ' (' + analit + ')'
        this.analiti = []
        var single = {}
        this.analitiprikaz.forEach(element => {
          single = {}
  
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
  
          if (event.target.id === element.labassay._id) {
            element.rezultat.forEach(analit => {
              single.kod = analit.rezultat[0].module_sn
              single.select_options = (eval("opcije." + analit.rezultat[0].module_sn.replace('%', '_').replace('/', '_').replace(' ', '_').replace('-', '_')))
              single.refd = analit.refd
              single.labID = event.target.id
              single.refg = analit.refg
              single.nazivTesta = naziv
              single.grupa = analit.grupa
              single.naziv = analit.rezultat[0].sn
              single.opis = analit.rezultat[0].dilucija
              single.jedinica = analit.rezultat[0].jedinice_f
              single.rezultat = analit.rezultat[0].rezultat_f
              single.flag = analit.rezultat[0].rezultat_i
              single.manual = element.labassay.manual
              single.odobren = odobren
              single.edit = false
              single.analit = analit.rezultat[0].anaassay
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
        this.glavniScreen = true
        this.prikaziAnalit = false
      },
      toNalazi: function() {
        router.push('/nalazi/verifikacija/' + this.patient_id + '?token=' + this.$store.state.token)
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
  
        months = month - mm;
        if (day < dd) {
          months = months - 1;
        }
        years = year - yy;
        if (month * 100 + day < mm * 100 + dd) {
          years = years - 1;
          months = months + 12;
        }
        days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000))
        return {
          years: years,
          months: months,
          days: days
        }
      },
      jelIzabran: function(id) {
        if (id === this.aktivniRez) {
          return true
        }
        return false
      },
      globalRefresh: function(event) {
                 
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
  
        this.rezultati = []
        http.get('rezultati/show/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
          })
          .then(res => {
            if (res.data.nodata != undefined) {
              this.nedostaju = []
              this.rucniIma = false
              this.imeIprezime = res.data.ime + ' ' + res.data.prezime
              this.spol = res.data.spol
              this.jmbg = res.data.jmbg
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
                  test.ime = element.testovi.labassay.naziv
                  test.test = element.testovi.labassay.sifra
                  test.analit = element.testovi.labassay.analit
                  test.IDE = element.testovi._id
                  test.laIDE = element.testovi.labassay._id
                  test.calculated = element.testovi.labassay.calculated
                  test.edit = false
                  test.realizovan = true
                  test.select_options = (eval("topcije." + element.testovi.labassay.naziv.replace('%', '_').replace('/', '_').replace(' ', '_').replace('-', '_')))
  
                  var i = 0
  
                  element.testovi.rezultat.forEach(rezultat => {
                    i++
                    test.sekcija = rezultat.anaassay.sekcija
                    if (element.testovi.rezultat.length > 1) {
                      test.vise = true
                    } else {
                      test.vise = false
                    }
                    if (element.testovi.rezultat.length === i) {
                      test.rezultat = rezultat.rezultat_f
                      test.unit = rezultat.jedinice_f
                      if (rezultat.odobren) {
                        test.odobren = "ODOBREN"
                      } else {
                        test.odobren = "NIJE ODOBREN"
                      }
                      if (rezultat.sn === 'MANUAL') {
                        test.manual = true
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
                                  // console.log(element.testovi.labassay.sekcija)
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
                      test.id = rezultat._id
                      test.multidata = element.testovi.labassay.multi
                      test.refSet = element.testovi.grupa
                      test.dRef = element.testovi.refd
                      test.gRef = element.testovi.refg
                      test.retest = element.testovi.retest
                    }
                  })
                  this.rezultati.push(test)
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
                if (element.odobren === 'NIJE ODOBREN') {
                  this.uslovOdobriSve = false
                }
              }
            })
            if ((this.nedostaju.length < 1) && this.uslovOdobriSve) {
              this.uslovOdobriSvePrint = false
            }
          })
      },
      retested: function() {
        this.retestirati = []
        http.get('rezultati/show/' + this.$route.params.id + '?token=' + this.$store.state.token + '&site=' + this.$store.state.site, {
  
          })
          .then(res => {
            if (res.data.data.length) {
              var rtst = {}
  
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
              })
            }
          }).then(res => {
            if (this.retestirati.length < 1) {
              this.retestFlag = false
            }
          })
      },
      refreshAll: function(event) {
        http.post('rezultati/retest/show/', {
            id_u: this.$route.params.id,
            id_t: event.target.id,
            site: this.$store.state.site,
            token: this.$store.state.token
          })
          .then(() => {
            this.rezultati.forEach(element => {
              if (element.test === event.target.id) {
                element.retest = true
              }
            });
          }).then(() => {
            this.retested()
          })
      },
      refreshNo: function(event) {
        http.post('rezultati/retest/no/', {
            id_u: this.$route.params.id,
            id_t: event.target.id,
            site: this.$store.state.site,
            token: this.$store.state.token
          })
          .then(res => {
  
          }).then(() => {
            this.rezultati.forEach(element => {
              if (element.test === event.target.id) {
                element.retest = false
              }
            })
          }).then(() => {
            this.retested()
          })
      },
      testIsDanger: function(data, d, g, ime) {
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
        } else if (g === "0" && d === "0") {
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
      testIsSuccess: function(data, d, g, ime) {
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
      testIsWarning: function(data, d, g) {
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
      isNaNa: function(data, d, g) {
        if ((g === '0') && (d === '0')) {
          return true
        } else {
          return false
        }
      },
      vratiPregled: function() {
        router.push('/rezultati/pregled/' + '?sekcija=' + this.$route.params.sekcija)
      },
      closeResults: function() {
        if (this.vise = true) {
          this.vise = false
        }
      },
      viseRezultata: function(event, testID, dRef, gRef, refSet, analit) {
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
                this.vrezultati = []
                res.data.element.rezultat.forEach(clan => {
                  test = {}
                  test.aparat = clan.anaassay.aparat.ime
                  test.rezultat = clan.rezultat_f
                  test.vrijeme = clan.vrijeme_prijenosa
                  test._id = clan._id
                  test.IDE = testID
                  test.analit = analit
                  var godina = test.vrijeme.substring(0, 4)
                  var mjesec = test.vrijeme.substring(4, 6)
                  var dan = test.vrijeme.substring(6, 8)
                  var sat = test.vrijeme.substring(8, 10)
                  var min = test.vrijeme.substring(10, 12)
                  var sec = test.vrijeme.substring(12, 14)
                  test.vrijeme = dan + '.' + mjesec + '.' + godina + ' | ' + sat + ':' + min + ':' + sec
                  test.jedinica = clan.jedinice_f
                  test.status = element.status
                  test.refSet = refSet
                  test.dRef = dRef
                  test.gRef = gRef
                  this.vrezultati.push(test)
                })
                this.aktivniRez = this.vrezultati[this.vrezultati.length - 1]._id
              }).then(res => {
                this.vise = !this.vise
              })
          }
        })
      },
      showBasicDialog(event) {
        this.$dialog.confirm('Jeste li sigurni da želite retestirati?')
          .then(() => {
            this.refreshAll(event)
          })
          .catch(() => {
  
          })
      },
      showBasicDialogcontra(event) {
        this.$dialog.confirm('Jeste li sigurni da želite odustati od retestiranja?')
          .then(() => {
            this.refreshNo(event)
          })
          .catch(() => {
  
          })
      },
      showBasicDialogRetest() {
        
        this.toastText = 'Odobreni testovi se ne mogu ponovno testirati!'
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
      },
      printajNalaz: function() {
        router.push('/nalazi/pregled/' + this.patient_id + '?token=' + this.$store.state.token)
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
      rezultatiAnalitaMulti: function(data, time, izbor) {
        this.rezAn = data
        this.rezTime = time
        this.rezIzbor = izbor
        this.$refs.mediumModal.open()
      },
      viseRezultataMulti: function(ime, analit) {
        this.viseAnaliti = !this.viseAnaliti
        this.analitid = 'Rezultati za test: ' + ime + ' (' + analit + ')'
        this.rezName = ime
        this.analitiIzbor = []
        var temp = []
        var test = {}
        var vrijeme = ''
        var izbor = ''
  
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
  
            for (let index = 0; index < rez.rezultat.length; index++) {
              temp.push(rez.rezultat[index].rezultat[i].sn + ": " + rez.rezultat[index].rezultat[i].rezultat_f)
            }
            if (i === 0) {
              izbor = 'DA'
            } else {
              izbor = 'NE'
            }
  
            this.analitiIzbor.push({
              rezultat: temp,
              vrijeme: vrijeme,
              izbor: izbor
            })
            temp = []
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import '../../../sass/_toasts.scss';
  
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

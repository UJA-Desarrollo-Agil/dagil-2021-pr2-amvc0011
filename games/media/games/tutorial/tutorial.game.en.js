// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
    start: new undum.SimpleSituation(
        "<h1>EN TU HABITACIÓN</h1>\
        <p>Estás en tu habitación haciendo una fascinante práctica de la universidad de la asignatura Desarrollo Ágil.\
        De repente, tu teléfono vibra. Y, aunque estás bastante entretenido programando, decides echar un vistazo a la notificación.\
        ¡Increíble! Acabas de recibir un match en Tinder.</p><p> No utilizas esa app para nada, solo la instalaste porque pensabas que podrías\
         encontrarte a alguna de las chicas de la Isla de la Tentaciones (tal y como decía el anuncio de Tele 5).</p> \
         <p>Por desgracia, la que te ha dado el match no es ninguna de las de la Isla, pero al menos hace el apaño.\
          Un par de mensajes y consigues una <strong>cita con ella a las 7pm de esa misma tarde</strong>. Parece que la tía tiene \
          más prisa que Hazard yendo a por la oferta del Burger King. Y tú tan contento, vaya.</p> <p>Son casi las 6pm, así\
           que tienes el tiempo justo para acicalarte. O eso creías. Tu madre entra en la habitación: </p>\
           <p class='dialogo'><strong>-Oye, voy a hacerte unas torrijas. Deja eso y acércate al supermercado a comprarme algunos ingredientes que me faltan.</strong> </p>\
         <p>Las torrijas de tu madre te gustan tanto o más que las mujeres. Pero volver a conseguir una cita con una chica es menos probable que un Málaga en Champions.\
          Así que tienes dos opciones: decirle a tu madre que deje las novelas turcas un rato y que <a href='castigo'> vaya ella a comprar</a> u obedecerle e <a href='./educado'>ir al supermercado tú.</a> \
          Después de todo, puedes darte prisa y no tardar demasiado en hacer la compra.</p>",
          {
              actions:{
                  "educado":function(character,system,action){
                    system.setQuality("ingrediente1",true);
                    system.setQuality("ingrediente2",true);
                    system.setQuality("ingrediente3",true);
                    system.setQuality("ingrediente4",true);
                    system.doLink("educado");
                  } 
              }
          }
    ),
    castigo: new undum.SimpleSituation(
        "<h1>FIN MALO :(</h1>\
        <p>¿En serio? ¿De verdad se te ocurre decirle eso a tu madre? \
        Tu mala cabeza te ha llevado a recibir un buen rascapolvo (con razón)\
        . Y ahí te ves en tu habitación: solo, sin torrijas y sin la única oportunidad\
        de estar con una chica en años. Y encima te has ganado tal hostia que te van a\
        tener que dar el betadine con rodillo. Así que aquí termina tu historia. Continúa\
        estudiando para conseguir un buen trabajo y pagarte las torrijas en el futuro porque\
        las de tu madre no las volverás a oler. </p>\
        <p>Puedes <a href='start'>intentarlo de nuevo</p>",
        {
           
        }
    ),
    
   
    educado:new undum.SimpleSituation(
        "<h1>Preparandose para ir a comprar</h1>\
        <p>Eres el hijo que toda madre desearía tener y decides hacerle el favor a la tuya. \
        Sin embargo, tu madre te ha dado la lista de la compra pero no el dinero. Puedes <a href='./dinero-mama'>pedírselo</a>\
         o, como las torrijas te las vas a comer tú, pagar los ingredientes con <a href='./dinero-hucha'>tu propio dinero</a>.\
        </p>",
        
        {
            actions: {
                "dinero-hucha": function(character, system, action) {
                    system.setQuality("dinero", character.qualities.dinero+10);
                    system.setQuality("buenachon",true);
                    
                    
                    system.doLink("salidacasa");
                    
                
                },   
                 "dinero-mama": function(character,system,action){
                    system.setQuality("dinero", character.qualities.dinero+10);
                    
                    
                    system.doLink("salidacasa");
                }
                }
            }
        
    ),
    salidacasa:new undum.SimpleSituation(
        "<h1>Saliendo de casa</h1>\
        <p>Sales de casa. Tienes justo una hora para hacer la compra y poder llegar a tiempo a la cita.\
        El supermercado más cercano es definitivamente el Canglefúl y tienes dos opciones para ir: </p>\
        <p><a href='./coche'>Coger tu Hyundai Coupe amarillo limón</a>, ponerte a escuchar la Tusa con el subwoofer al máximo y\
        motivarte un poco a ti y, de paso, a todo el barrio.</p>\
         <p>También puedes <a href='./andando'>ir andando</a> porque aún sigues manteniendo tus instintos de runner.</p>",
        {
            actions:{
                "andando": function(character,system,action){
                    if((character.qualities.minutos+10) >59){
                        
                        system.setQuality("minutos",character.qualities.minutos+10-60);
                        system.setQuality("hora",character.qualities.hora+1);
                        system.doLink("andando");
                    }else{
                        
                        system.setQuality("minutos",character.qualities.minutos+10);
                        system.doLink("andando");
                    }
                },
                "coche": function(character,system,action){
                    if((character.qualities.minutos+20) >59){
                        
                        system.setQuality("minutos",character.qualities.minutos+20-60);
                        system.setQuality("hora",character.qualities.hora+1);
                        system.doLink("coche");
                    }else{
                        
                        system.setQuality("minutos",character.qualities.minutos+20);
                        system.doLink("coche");
                    }
                }
            }
        }
    ),
    coche:new undum.SimpleSituation(
        "<h1>Saliendo de casa</h1>\
        <p>Se suponía que el coche era la opción más rápida. Claro que sí. Pero no se te pasó ni un momento por la cabeza que a las 6pm es\
        hora punta en los días laborales: administrativos saliendo de las oficinas, niños yendo y viniendo de las actividades extraescolares,\
        padres con coches en doble, y si cabe, triple fila. El tráfico fluido, lo que se dice fluido, no lo es para nada. En fin, te toca perder\
        un poco de tiempo en el atasco.</p>\
        <p>Por fin llegas al parking del supermercado. Ahora toca buscar un aparcamiento (ojalá esta vez haya más suerte).\
        El parking esta dividido en tres calles, por lo que debes de elegir a cual meterte:\
        <ul>\
            <li><a class ='once' href='./callei'>Calle de la izquierda</a></li>\
            <li><a class ='once' href='./callem'>Calle de en medio</a></li>\
            <li><a class ='once' href='./called'>Calle de la derecha</a></li></ul></p>",
        {
            actions:{
                "callei": function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);
                        
                        system.setCharacterText("<p>Despues de un rato buscando aparcamiento en esa calle no encuentras nada.Por lo tanto vuelves atras para buscar en otra calle</p>");
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        system.setCharacterText("<p>Despues de un rato buscando aparcamiento en esa calle no encuentras nada.Por lo tanto vuelves atras para buscar en otra calle</p>");
                        
                    }
                },
                "callem": function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);
                        system.setCharacterText("<p>Vaya, que suerte! Justamente habia un coche saliendo de un aparcamiento</p>");
                        system.write("<p>Tras aparcar, decides entrar al super para realizar la compra.</p>")
                        system.doLink("supermercado");
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        system.setCharacterText("<p>Vaya, que suerte! Justamente habia un coche saliendo de un aparcamiento</p>");
                        system.write("<p>Tras aparcar, decides entrar al super para realizar la compra.</p>")
                        system.doLink("supermercado");
                    }
                },
                    "called": function(character,system,action){
                        if((character.qualities.minutos+5) >59){
                            system.setQuality("minutos",character.qualities.minutos+5-60);
                            system.setQuality("hora",character.qualities.hora+1);
                            system.setCharacterText("<p>Despues de un rato buscando aparcamiento en esa calle no encuentras nada.Por lo tanto vuelves atras para buscar en otra calle</p>");
                           
                            
                        }else{
                            system.setQuality("minutos",character.qualities.minutos+5);
                            system.setCharacterText("<p>Despues de un rato buscando aparcamiento en esa calle no encuentras nada.Por lo tanto vuelves atras para buscar en otra calle</p>");
                            
                            
                        }
                    }
                }
            }
        

    ),
    
    andando:new undum.SimpleSituation(
        "<h1>Paseando direccion al supermercado.</h1>\
        <p>Te alegras mucho de haber ido andando. Hace un día primaveral magnífico\
        y un poco de deporte de vez en cuando no le viene mal a nadie. Casi estás\
        llegando al supermercado pero… te encuentras con Doña Paquita, una mujer\
        un poco repelente pero íntima amiga de tu madre. Como va cargada con bolsas\
        y vive en un cuarto piso sin ascensor, te pide que la ayudes a subir todo.\
        Como quieres llegar puntual a tu cita, puedes decirle que <a href='./escabullirse'>tienes prisa</a> o,\
        en cambio puedes aceptar y <a href='./ayudar'>ayudarla.</a></p>\
    ",
    {
        actions: {
        //Aqui añadiremos la funcionalidad de la hora.
        "ayudar":function(character,system,action){
            if((character.qualities.minutos+10) >59){
                system.setQuality("minutos",character.qualities.minutos+10-60);
                system.setQuality("hora",character.qualities.hora+1);
                system.setQuality("ingrediente2",false);
                system.setQuality("amabilidad",true);
                system.doLink("casaamiga");
            }else{
                system.setQuality("minutos",character.qualities.minutos+10);
                system.setQuality("ingrediente2",false);
                system.setQuality("amabilidad",true);
                system.doLink("casaamiga");
            }
        },
        "escabullirse":function(character,system,action){
            if((character.qualities.minutos+5) >59){
                system.setQuality("minutos",character.qualities.minutos+5-60);
                system.setQuality("hora",character.qualities.hora+1);
                system.write("<p>Le dices que lo sientes pero que tienes prisa. No soportas para nada a esa señora como para encima tener que ceder a ayudarla.  </p>")
               
                system.doLink("supermercado");
            }else{
                system.setQuality("minutos",character.qualities.minutos+5);
                system.write("<p>Le dices que lo sientes pero que tienes prisa. No soportas para nada a esa señora como para encima tener que ceder a ayudarla.  </p>")
                
                system.doLink("supermercado");
            }
        }
        }
    }
    
    ),
    casaamiga: new undum.SimpleSituation(
        "<h1>Ayudando a Doña Paquita</h1>\
        <p>Has perdido tiempo, es verdad. Pero Doña Paquita a veces tiene\
        lo mismo de repelente que de agradecida y hoy parece que la has pillado\
        de buen humor. Así que te regala media docena de huevos de sus gallinas\
        para tu madre. ¡Qué bien! Te ahorras de tener que comprar uno de los artículos de la lista.</p>\
        <p>Sin embargo, aun te quedan cosas por comprar, por lo que decides salir de la casa e <a href='./ir-super'>ir al supermercado </a> </p>",
        {
        actions:{
            "ir-super":function(character,system,action){
                
                
                system.doLink("supermercado")
            }
            
        }
    }
    ),
    supermercado: new undum.SimpleSituation(
        "<h1>Supermercado</h1>\
        <p>Por fin accedes al supermercado pero descubres que han cambiado la distribución de los productos.</p> \
        <p>¡Cómo odias esas estrategias de marketing! Te has visto muchos videos en Youtube sobre el tema y sabes\
        que su objetivo es afectar a las decisiones racionales e irracionales de compra del cliente.</p> <p>Esta vez \
        vas a tener que pasar por los distintos pasillos a ciegas para poder encontrar los ingredientes de la lista:\
        <ul>\
        <li><a class='once' href='./pasillo1'>Pasillo 1</a></li>\
        <li><a class='once' href='./pasillo2'>Pasillo 2</a></li>\
        <li><a class='once' href='./pasillo3'>Pasillo 3</a></li>\
        <li><a class='once' href='./pasillo4'>Pasillo 4</a></li>\
        <li><a class='once' href='./caja'>Pasar por caja</a></li>\
        </ul>\
        </p>",
        {
            actions:{
                "pasillo1":function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);
                       
                        system.doLink("pasillo1");
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        
                        system.doLink("pasillo1");
                    }
                },
                "pasillo2":function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);

                       
                        system.doLink("pasillo2");
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        
                        system.doLink("pasillo2");
                    }
                },
                "pasillo3":function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);
                       
                        system.doLink("pasillo3");
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        
                        system.doLink("pasillo3");
                    }
                },
                "pasillo4":function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);
                        system.doLink("pasillo4");
                        
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        system.doLink("pasillo4");
                        
                    }
                },
                "caja":function(character,system,action){
                    if((character.qualities.minutos+5) >59){
                        system.setQuality("minutos",character.qualities.minutos+5-60);
                        system.setQuality("hora",character.qualities.hora+1);
                        system.doLink("caja");
                        
                    }else{
                        system.setQuality("minutos",character.qualities.minutos+5);
                        system.doLink("caja");
                        
                    }
                }
                }
            }
        
    ),
    pasillo1: new undum.SimpleSituation(
        "<h1>Pasillo 1</h1>\
        <p>En este pasillo puedes encontrar:<a class='once' href='./leche'> leche(2 euros)</a>, <a class='once' href='./harina'>harina(3 euros)</a>, <a class='once' href='./levadura'>levadura(4 euros)</a> y <a href='./azucar'>azúcar(3 euros)</a>. Pero…un momento,\
         ¿qué es eso? Unos chicles. Teniendo en cuenta que vas bastante justo de tiempo y que \
         probablemente no puedas pasar por la ducha antes de tu cita, unos <a class='once' href='./chicles'>chicles(2 euros)</a> podrían ayudarte ante posibles problemas de halitosis.\
         Tambien puedes volver al <a href='supermercado'>pasillo pricipal</a>\
        </p>",{
            actions:{
                "leche":function(character,system,action){
                    system.setQuality("ingrediente1",false);
                    system.setQuality("total",character.qualities.total+2);
                    
                },
                "harina":function(character,system,action){
                   // system.setQuality("ingrediente1",false);
                  system.setCharacterText("<p>Un paquete de harina, podria ser util si no fuesen torrijas lo que me va a hacer mi madre</p>");
                    
                },
                "levadura":function(character,system,action){
                    //system.setQuality("ingrediente1",false);
                    system.setCharacterText("<p>Texto 2</p>");
                  
                    
                },
                "azucar":function(character,system,action){
                    system.setQuality("ingrediente4",false);
                    system.setCharacterText("<p>Uno de los ingredientes que necesitaba, voy a tacharlo de la lista.</p>");
                    system.setQuality("total",character.qualities.total+3);
                    
                },
                "chicles":function(character,system,action){
                    system.setQuality("ingrediente5",false);
                    system.setCharacterText("<p>Me resultara util, voy a meterlo en la cesta.</p>");
                    system.setQuality("total",character.qualities.total+2);
                    
                }

            }
        }
        

        
    ),
    pasillo2: new undum.SimpleSituation(
        "<h1>Pasillo 2</h1>\
        <p>En este pasillo puedes encontrar:<a class='once' href='./nata'> nata(2 euros)</a>, <a class='once' href='./jamon'>jamon de bellota(80 euros)</a>, <a class='once' href='./pan'>pan(1 euros)</a> y\
         <a href='./aceite'>aceite de oliva virgen extra(7 euros)</a> y las <a class='once' href='./bebida'>bebidas isotonicas(3 euros)</a>\
         Tambien puedes volver al <a href='supermercado'>pasillo pricipal</a></p>",{
            actions:{
                "nata":function(character,system,action){
                    system.setQuality("ingrediente1",false);
                  
                    
                },
                "jamon":function(character,system,action){
                   // system.setQuality("ingrediente1",false);
                  system.setCharacterText("<p>Un paquete de harina, podria ser util si no fuesen torrijas lo que me va a hacer mi madre</p>");
                    
                },
                "pan":function(character,system,action){
                    //system.setQuality("ingrediente1",false);
                    system.setCharacterText("<p>Texto 2</p>");
                  
                    
                },
                "aceite":function(character,system,action){
                    system.setQuality("ingrediente4",false);
                    system.setCharacterText("<p>Uno de los ingredientes que necesitaba, voy a tacharlo de la lista.</p>");
                    
                },
                "bebida":function(character,system,action){
                    system.setQuality("ingrediente5",false);
                    system.setCharacterText("<p>Me resultara util, voy a meterlo en la cesta.</p>");
                    system.setQuality("total",character.qualities.total+3);
                    
                }

            }
        }
    ),
    pasillo3: new undum.SimpleSituation(
        "<h1>Pasillo 3</h1>\
        <p> El pasillo de las bebidas alcohólicas: JB, Negrita, Vodka, Champin… ¡Cómo echas de menos los botellones con los colegas! \
        ¡Qué pena que tu madre no necesite nada de esto para su receta!\
        Tambien puedes volver al <a href='supermercado'>pasillo pricipal</a></p>",
        {
           
        }
    ),
    pasillo4: new undum.SimpleSituation(
        "<h1>Pasillo 4</h1>\
        <p> En este pasillo puedes encontrar el papel higiénico (tan poco demandado durante la cuarentena),\
         la <a class='once' href='./vainilla'>vainilla(3 euros) </a> y la <a class='once' href='./huevos'>huevos(2 euros)</a> en rama.\
         Tambien puedes volver al <a href='supermercado'>pasillo pricipal</a></p>",{
            actions:{
                "huevos":function(character,system,action){
                    system.setQuality("ingrediente2",false);
                    system.setQuality("total",character.qualities.total+2);
                    
                },
                "vainilla":function(character,system,action){
                    system.setQuality("ingrediente3",false);
                  system.setCharacterText("<p>Un paquete de harina, podria ser util si no fuesen torrijas lo que me va a hacer mi madre</p>");
                   
                }

            }
        }
    ),
    caja: new undum.SimpleSituation(
        "<h1><h1>\
        ",{
            enter:function(character,system,from){
                if((character.qualities.dinero-character.qualities.total) > 0){
                   
                    system.write("<h1>PAGANDO</h1><p>Ya has terminado de hacer la compra y sales del super más derecho que un torero. Te <a href='vuelta'>diriges a casa</a> rápidamente\
                     para darle los ingredientes a tu madre y prepararte para ir a tu cita.</p>");
                }else{
                   
                    system.write("<h1>PAGANDO</h1> <p>Vaya, resulta que no tienes suficiente dinero para pagar todo lo que llevas. Te das cuenta de que la cola de la caja es más larga\
                    que la cochera de un tren y perderías mucho tiempo devolviendo los productos a su sitio y después volver a hacer la cola. Así que decides esconderte\
                    algunos de los ingredientes en el bolsillo y pasar sin pagarlos. \
                    Desgraciadamente, el chico de seguridad te ve realizar unos actos algo sospechosos, por lo que se acerca a ti y te empieza a interrogar y cachear.\
                    Vaya, te han pillado in fraganti en tu fechoría. Parece ser que te van a retener un buen rato y te acabarán poniendo una multa que te vas a acordar toda tu vida.\
                    </p> <p>Además, tienes que volver a casa y no solo decirle a tu madre que no podrá hacer las torrijas, sino que encima tendrá que pagar una multa por tu mala cabeza.\
                    Ni que decir tiene que por orden expresa del Boletín Oficial de la República Independiente de tu casa, pasarás como mínimo diecisiete cuarentenas seguidas en tu habitación.\
                    Olvídate de la cita, de la chica, del Tinder y de la Isla de las Tentaciones. Si es que robar no está bien, ya te lo decían en tus clases de catequesis. </p>");
                }
            }

        }
    ),
    vuelta: new undum.SimpleSituation(
        "<h1></h1>\
        ",{
            enter:function(character,system,from){
                if((character.qualities.minutos+10) >59){
                    system.setQuality("minutos",character.qualities.minutos+10-60);
                    system.setQuality("hora",character.qualities.hora+1);
                    
                    
                }else{
                    system.setQuality("minutos",character.qualities.minutos+10);
                  
                    
                }
                if(character.qualities.ingrediente1==false &&character.qualities.ingrediente2==false&&character.qualities.ingrediente3==false&&character.qualities.ingrediente4==false ){
                   
                    system.write("<h1>Llegada a casa</h1><p>Llegas a casa, le das a tu madre la bolsa de la compra y observa que están todos los ingredientes. \
                    Como has cumplido, te deja que salgas a donde quieras.</p> <p>Así que te pones una camisa animal print y te peinas al estilo Fermín Trujillo. Vas \
                    hecho todo un conquistador a tu <a href='cita'> cita</a>. ¡Date prisa porque vas con la hora justa!. Ya has hecho a una mujer feliz hoy, veremos a ver si consigues\
                    el doblete con la chica.</p>")
                }else{
                    system.write("<h1>Llegada a casa</h1><p>Llegas a casa, le das a tu madre la bolsa de la compra y observa que faltan algunos de los ingredientes que\
                     te pidió. Por culpa de tu irresponsabilidad no podrá preparar las torrijas, así que te castiga sin salir </p>.\
                    <p>Finalmente, te quedas encerrado en tu habitación, sin torrijas, dando plantón a la chica y perdiendo probablemente\
                     la única oportunidad de encontrar al amor de tu vida</p>.\
                    </p>")
                }
            }
        }
        
    ),
    cita:new undum.SimpleSituation(
        "<h1></h1>\
        ",{
            enter:function(character,system,from){
                if(character.qualities.hora >= 19 && character.qualities.minutos >0){
                    system.write("<h1>HAS LLEGADO TARDE</h1><p>Patético. Quedas con una chica por primera vez y lo más destacable es tu impuntualidad. ¿Te pensabas que alguien que conoces\
                    por una app te iba a esperar indefinidamente hasta que a ti te diera la gana de aparecer? Pues no, amigo. Seguro que ya te ha sustituido por otro de sus treinta match.\
                    Menos mal que Tinder no es el TripAdvisor del amor, sino te habrías llevado una mala recomendación (y las visitas a tu corazón ya de por sí brillan por su ausencia).\
                    Seguro que esta noche no llegas tarde a la partida de Fortnite con los colegas…</p>");
                }else{
                    system.write("<h1>Cita</h1><p>  Llegas a la cafetería donde habíais quedado. Buscas en tu móvil el perfil de la chica en Tinder para verificar la foto y no meter la pata. \
                    Quieres que todo salga perfecto. Ahí está. Tiene una rubia y sedosa melena como la de Letizia Sabater y una mirada profunda como la de Rossy de Palma. Te encanta.\
                    Y si no llevara la mascarilla puesta te encantaría más. Te presentas y te sientas. No quieres que los nervios lo estropeen todo, pero es verdad que estás temblando más que un perro chico.\
                    Te pides un cortado (que si por ti fuera te pedirías ya la primera cerveza de la tarde, pero quieres causarle una buena impresión). Ella se pide un descafeinado.\
                    La gente que se pide descafeinados no son de fiar (eso salía en una película). Pero hoy se lo admites todo. Es perfecta. </p>\
                    <p>La cita se te pasa volando y notas que  teneis buenas vibras por lo que decides que pedirle una <a href='./segundacita'>segunda cita</a> sería una buena idea.</p></h1>")
            }
            },
            actions:{
                "segundacita":function(character,system,action){
                    if( character.qualities.buenachon == true && character.qualities.amabilidad == true){
                        system.write("<h1>FINAL FELIZ!!</h1><p>Vaya, parece que tambien le has gustado, se nota que no se ha podido resistir a ese look y esa personalidad.</p>")
                    }else{
                        system.write("<h1>SIN AMOR PERO CON EL ESTOMAGO LLENO!</h1><p>Oh dios, parece ser que no ha sido reciproco y no quiere seguir quedando contigo. Bueno, te volveras sin amor, pero al menos te esperan unas torrijas que ya quisiera mas de \
                        uno probarlas.</p>")
                    }
                }
            }
        }
    ),
    
    // NB: The 'hub' situation which is the main list of topics, is
    // defined wholly in the HTML file, and doesn't have an entry in
    // the game.situations dictionary in this file.

    // For variety, here we define a situation using the top-level
    // Situation type. This is a neat approach to generate text by
    // looking it up in the HTML document. For static text that makes
    // more sense than writing it longhand.
    situations: new undum.Situation({
        enter: function(character, system, from) {
            system.write($("#s_situations").html());
        },
        tags: ["topic"],
        optionText: "What Undum Games are Made Of",
        displayOrder: 1
    }),
    
    
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {
    
    dinero: new undum.IntegerQuality(
        "Dinero", {priority:"0001", group:'stats'}
    ),
    
    buenachon: new undum.OnOffQuality(
        "Buenachon", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    ),
    amabilidad: new undum.OnOffQuality(
        "Amabilidad", {priority:"0002", group:'progress', onDisplay:"&#10003;"}
    ),
    
    hora: new undum.IntegerQuality(
        "Hora", {priority:"0001", group:'reloj'}
    ),
    minutos: new undum.IntegerQuality(
        "Minutos", {priority:"0001", group:'reloj'}
    ),
    total:new undum.IntegerQualityB(
        "Coste Total:",{priority:"0001",group:'listacompra'}
    ),
    ingrediente1: new undum.OnOffQuality(
        "Leche", {priority:"0002", group:'listacompra'}
    ),
    ingrediente2: new undum.OnOffQuality(
        "Huevos", {priority:"0002", group:'listacompra'}
    ),
    ingrediente3: new undum.OnOffQuality(
        "Vainilla", {priority:"0002", group:'listacompra'}
    ),
    ingrediente4: new undum.OnOffQuality(
        "Azúcar", {priority:"0002", group:'listacompra'}
    ),
    


};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
    stats: new undum.QualityGroup(null, {priority:"0001"}),
    progress: new undum.QualityGroup('Habilidades Secretas', {priority:"0002"}),
    reloj:new undum.QualityGroup('Reloj',{priority:"0003"}),
    listacompra:new undum.QualityGroup('Lista de la Compra',{priority:'0001'})
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
   
    character.qualities.dinero = 0;
    character.qualities.total = 0;
    system.setQuality("buenachon",false);
    system.setQuality("amabilidad",false);
  
    character.qualities.hora= 18;
    character.qualities.minutos= 00;

    
    system.setQuality("ingrediente1",false);
    system.setQuality("ingrediente2",false);
    system.setQuality("ingrediente3",false);
    system.setQuality("ingrediente4",false);
    


    
    
};


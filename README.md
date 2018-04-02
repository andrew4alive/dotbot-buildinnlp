<h1>
This is a auto reply bot for facebook messager
</h1>

<h3>
Features
</h3>
  <ol>
     <li>auto reply match text</li>
     <li>auto reply using wit(facebook ai that extract entities)</li>
     <li>
     fulfillment function which will ask continues question , when all info fullfil , bot will complested the fulfillment
     </li>
     <li>
       postback function and map into entities
     </li>
     <li>when human(page owner) reply will disable bot for 5 minutes</li>
 </ol>
<h6>
  *emoji not supported
</h6>
<h3>
  Setup
</h3>
<h5>
require enviroment variable
</h5>

<ol>
<li>mongourl=</li>
<li>fbmsgurl=</li>
<li>VERIFYTOKEN=</li>
</ol>

<h5>
  mongourl is the mongourl url to connect to ur mongo server
  ,this needed to keep data for operation

</h5>

<h5>
  fbmsgurl is the url end point for 
  to api 
  normally end with page access token  
  page acces token is under token generation at your facebook app mesanger platform setting
  select your page for the messager and will generate page access token
  for you, url normally as below, please refer to facebook offical docuement
   https://graph.facebook.com/v2.6/me/messages?access_toke={page access toekn}
</h5>
<h5>
  VERIFYTOKEN is the token use for webhook
</h5>

<h5>
    after setup all the enviroment variable,<b>Built-In NLP</b> site select page for this bot .
    then copy the wit server <b>Server Access Token</b> to the wit token , model you have to choose <b>custom</b>
</h5>

<h1>
  core concept
</h1>
<p>
this bot pirioty to using wit ai, if cannot match any repsond from <b>wit entities</b> 
  this bot will search for <b>text respond</b> list 
  if did not match any text responselist , repond will always be <b>defaultres</b>
</p>

<h3>
 Wit ai  entities match setup({app location}/reslist/witlist.*js)
</h3>
<h4>find response</h4>
  <p>
     this directory containe  and export a <b>res</b> array,
     the <b>res</b> containt all the object to match
     each object must contains <b>entities keys</b>
     and a <b>stext</b>or <b>fulfill</b> keys.
     
  </p>
  <p>
    too ad a new file to wit list, add the line below:<br/>
    add.addp('order');<br/>
    to<b> reslist/witreslist.js </b>file, the order file is the file in       <b>reslist/witlist</b>reslist/witlist
  </p>
  <p>
   wit ai will send bot the entities , each entitiy contain array of possible value with confidence      level,
   if the <b>confidence level is higher than 0.5</b>,
   bot will select highest confidence to match entity from 
   <b>witreslist</b>
  </p>
  <p>
    the bot match entities with the highest match.
    example if wit ai have send bot 2 entity,grettings and order:coffee, both have one value.
    it will search find entities with highest confidence,
    and find the <b>witreslist</b> for the possible match
    that have both <b>grettings</b> and <b>order:coffee</b> entity with the same value.
  </p>
  <p>
    if the entities value u want to match is equal to any value,
    just make the value equal to ['*']
  </p>
  
 
  <h4>
     response(stext)
  </h4>
  <p>
  once an entities match it will use the <b>stext</b>
  the <b>stext</b> can have two data type
  <ul>
  <li>string</li>
  <li>object</li>
  </ul>
  </p> 
  <p>
   if the <b>stext </b> is a <b>string</b>,
   this bot will use <b>stext</b> value to reply.
   you can also use the <b>entity value</b> 
   inside the stext reply. 
   <ul>
     <li>
        if you have entity of drink , youn want to lnclude the entity value in your respond
        the in ur stext use '{{drink}}'.
      </li>
      <li>
        example, <b>stext</b> value is 'you order {drink}}',
        and entities drink value is latte, <b>stext</b> reply will be
        'you order latte'
      </li>
   </ul>
  </p>
  <p>
    if <b>stext</b> is an object, 
    bot will reply using that object.
    cannot support include entity value in reply.
  </p>

  <h3>
  fulfillment({app location}/fulfillment/trsetup.js)
  </h3>
  <p>
    fulfillment is a function to as continues question.
    To use fulfillment function, use the <b>fulfill</b> instead of
    <b>stext</b>.if both are use ,<b> stext </b>will be ignore.
  </p>

  <h4>setup setup.js</h4>
  <p>
    this file is must have <b>keepinmid</b> and <b>trigger</b>.
  </p>
  <p>
    <b>keepinmind</b> is the entity to remember before hand.
    this is array data type.<br/>
    all the elements in a array must be a string.
    if the entities match any string in <b>keepinmind</b>
    that entities will be remember.
  </p>
  <p>
    <b>trigger</b> is a object data type.
    it contains the name of fulfill name to be trigger.
    on match, it will ask continues question to get the require entity value.
    <br/>
    and trigger name will contain a object,those object are entity need to fulfill to task.
    <br/>
    two special key in <b>trigger</b>,
    that is :
    <ul>
      <li>
        <b>_f</b> is the response once continuesz questions is fulfill
      </li>
      <li>
        <b>_c</b> is the response when cancel. u need to train the wit ai with cancel entities 
        to cancel a fulfillment.
      </li>
    <li>
    other than this teo special key , is the entities need to fulfill a fulfillment.
    </li>
    </ul>
 </p>
 
 
 <h3>
 Text match setup({app location}/reslist/textres.js)
 </h3>
 
 <p>
   <b>text match</b> file will export a <b>res</b> object is a array      data type.
 </p>
 <p>
   all text match res array contain object that have two object:
   <ul>
     <li>
     <b>rtext</b> (string data type), is the text that match the            conversation reply by user, 
     if any reply text match rtext then it will use the second 
     object as reply that <b>stext</b>
     </li>
     <li>
     <b>stext</b>(data type is object or string), 
     refer to stext in wit ai, it contain same function.(include      
     entitity in stext not supported since no entities match)
     </li>
   </ul>
 </p>
 
 
 
 <h3>
   postback({app location}/handlepostback/mapentity.js)
 </h3>
 <p>
    For handle postback response , this bot will will convert the postback to entity that defined by user.    
 </p>
 <p>
   example:
 </p>
 <p>
   if postback.payload equal to postback_drink
   u can creaet one entity match postback_drink and give the suitable response
   At file location handlepostback/mapentities.js<br/>
   var map={<br/>
     &nbsp  postsback_drink:{<br/>
      &nbsp     drink:{value:'latte'}
       }<br/>
   }<br/>
    now entity list will have entity of drink 
    at file location relist/witrelist.js<br/>
    var re=[<br/>
    //other response list
      {<br/>
     &nbsp   entities:{
            drink:{value:'latte'}
        }
        ,<br/>
       &nbsp stext:'drink are latte'
      }<br/>
    //other response list
    ]<br/>
    <br/>
    this will match response in witreslist, reply <b>'drink are latte'</b>
 </p>
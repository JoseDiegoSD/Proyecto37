class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
      question.hide();
    //escribe aquí el código para cambiar el color de fondo 
      background("yellow");
    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
      textSize(26);
      fill("red")
      text("resultado del cuestionario",340,50);
    //llama aquí a getContestantInfo( )
      Contestant.getPlayerInfo();

    //escribe la condición para comprobar si contestantInfor no está indefinido 
      if(allContestants!==undefined){
        var display_answer=230
        fill("blue");
        textSize(20);
        text("nota el concursante que respondio correctamente, esta resaltado en color verde",130,230);
        for(var plr in allContestants){
          var respuesta="2"
          if(respuesta==allContestants[plr].answer){
            fill("green")
          }else{
            fill("red")
          }
          display_answer+=30;
          text(allContestants[plr].name+": "+allContestants[plr].answer,250,display_answer)
        }
      }
 
    
  }

}

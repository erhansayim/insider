(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            right: 0,
            top: 150
        },
        score1css: {
            position: 'absolute',
            background: 'green',
            padding: 10,
            left: '45%',
            top: 0,
            color : '#fff'
        },
        score2css: {
            position: 'absolute',
            background: 'green',
            padding: 10,
            left: '52%',
            top: 0,
            color : '#fff'
        }
    };

    var random = 2;
    var CONSTS = {
    	gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 20,
        rand_count : random
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'score1'}).css(CSS.score1css).appendTo('body');
        $('#score1').html(CONSTS.score1);
        $('<div/>', {id: 'score2'}).css(CSS.score2css).appendTo('body');
        $('#score2').html(CONSTS.score2);
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick)).appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick)).appendTo('#pong-game');
    }

    function setEvents() {
        $(document).on('keydown', function (e) {
        	var px_change_stick1 = $('#stick-1').css('top').replace("px", ""); 
        	var px_change_stick2 = $('#stick-2').css('top').replace("px", ""); 
            if (e.keyCode == 87) {
            	if(px_change_stick1 > 0){
            		CONSTS.stick1Speed = -3;
            	}else{
            		CONSTS.stick1Speed = 0;
            	}
            }
            if (e.keyCode == 83) {
            	if(px_change_stick1 < 515){
            		CONSTS.stick1Speed = +3;
            	}else{
            		CONSTS.stick1Speed = 0;
            	}
            }

            if (e.keyCode == 38) {
            	if(px_change_stick2 > 0){
            		CONSTS.stick2Speed = -3;
            	}else{
            		CONSTS.stick2Speed = 0;
            	}
            }

            if (e.keyCode == 40) {
            	if(px_change_stick2 < 515){
            		CONSTS.stick2Speed = +3;
            	}else{
            		CONSTS.stick2Speed = 0;
            	}
            }

        });

        $(document).on('keyup', function (e) {
            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 83) {
            	CONSTS.stick1Speed = 0;
            }
            if (e.keyCode == 38) {
            	CONSTS.stick2Speed = 0;
            }
            if (e.keyCode == 40) {
            	CONSTS.stick2Speed = 0;
            }
        });
    }

    function loop() {
        window.pongLoop = setInterval(function () {
            

            CSS.stick1.top += CONSTS.stick1Speed;
            CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-1').css('top', CSS.stick1.top);
            $('#stick-2').css('top', CSS.stick2.top);


            CSS.ball.top += CONSTS.ballTopSpeed;

            if(CONSTS.rand_count == 1){
            	CSS.ball.left += 2;
            }else{
            	CSS.ball.left -= 2;
            }
            

            

            if (CSS.ball.top <= 0 || CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;

            }

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

            if (CSS.ball.left <= CSS.stick.width) {

            	CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || roll();
            }

            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                roll();

            }

        }, CONSTS.gameSpeed);
    }

    function roll() {



    	CSS.ball.top = 250;
    	CSS.ball.left = 350;

    	if($('#pong-ball').css('left').replace("px", "") <= 15){
    		CONSTS.rand_count = 1;
    		CSS.ball.left = 15;
    		CSS.ball.top = $('#pong-ball').css('top').replace("px", "");



	    	var solKaleUst =  parseInt($('#stick-1').css('top').replace("px", ""));
	    	var solKaleAlt =  parseInt($('#stick-1').css('top').replace("px", "")) + 100;
	    	var ball_konum = parseInt($('#pong-ball').css('top').replace("px", ""));

	    	if(ball_konum > solKaleUst  && ball_konum < solKaleAlt ){

	    	}else{

	    		CONSTS.score2 += 1;
	    		$('#score2').html(CONSTS.score2);
	    		CSS.ball.left = 350;
	    	}


    	}else if($('#pong-ball').css('left').replace("px", "") > 870){
    		CONSTS.rand_count = 2;
    		CSS.ball.left = 874;
    		CSS.ball.top = $('#pong-ball').css('top').replace("px", "");

    		var sagKaleUst =  parseInt($('#stick-2').css('top').replace("px", ""));
	    	var sagKaleAlt =  parseInt($('#stick-2').css('top').replace("px", "")) + 100;
	    	var ball_konum = parseInt($('#pong-ball').css('top').replace("px", ""));

	    	if(ball_konum > sagKaleUst  && ball_konum < sagKaleAlt ){
	    		
	    		
	    	}else{
	    		
	    		CONSTS.score1 += 1;
	    		$('#score1').html(CONSTS.score1);
	    		CSS.ball.left = 350;

	    		CSS.ball.left = 350;
	    	}

    	}

    	if(CONSTS.score1 == 5 || CONSTS.score2 == 5){
    		alert('Oyun Bitti ! Scorlar: '+CONSTS.score1+ ' - '+CONSTS.score2);
    	}

    	CSS.ball.top -= -10;


        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }
        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }
    start();
})();
#BEGIN_PROPERTIES#
{
    "version": "1.0",
    "commandsIntroduced":
        ["object.passableFor",
         "map.validateExactlyXManyObjects"],
    "music": "conspiracy"
}
#END_PROPERTIES#
/********************************
 *      batattack.js		*
 ********************************
 *
 * As you proceed into the cave
 * you notice some creatures hiding in the darkness.
 * They seem to be asleep, proceed with care though,
 * it might be better if they remain asleep...
 * You can be sneaky or loud, its your choice!
 *
 */
 

function startLevel(map) {
#START_OF_START_LEVEL#

    function wakeandhunt(obj, type) {
		var direction;
        var target = obj.findNearest(type);
        var leftDist = obj.getX() - target.x;
        var upDist = obj.getY() - target.y;
		
		if (Math.abs(upDist) < 4 && Math.abs(leftDist) < 8) {			
			if (upDist == 0 && leftDist == 0) {
				return;
			} if (upDist > 0 && upDist >= leftDist) {
				direction = 'up';
			} else if (upDist < 0 && upDist < leftDist) {
				direction = 'down';
			} else if (leftDist > 0 && leftDist >= upDist) {
				direction = 'left';
			} else {
				direction = 'right';
			}
			obj.move(direction);
		}
    }
	
    map.defineObject('bat', {
        'type': 'dynamic',
		'symbol': String.fromCharCode(0x03E1),
        'color': 'purple',
        'onCollision': function (player) {
            player.killedBy('a bat');
        },
        'behavior': function (me) {
            wakeandhunt(me, 'player');
		}
    });

	map.defineObject('boulder', {
		'color' : '#5C1F00',
		'symbol': String.fromCharCode(0x2617),
		'impassable': true,
        'passableFor': ['bat']
	});
	
	map.createFromGrid(
	['##################################################',
	'####################################    E#########',
	'#############     ##############         #########',
	'############       ############          #########',
	'##########     #    #########     ################',
	'#########     #B#    ###BBB###    ################',
	'#######      #BBB#    #########    ###############',
	'########    #######    ###BBB###    ##############',
	'#######    #########    #########    #############',
	'########    #######    #########    ##############',
	'#######    ###BBB###    ###BBB###    #############',
	'###BBB##    #######    #########    ##############',
	'#######    #########    #########    #############',
	'########    ##BBB##    #########    ##############',
	'#######    #########    ##BBB####    #############',
	'##BBB###    #######    #########    ##############',
	'#######    #########    ########    ##############',
	'########    #######    #######    ################',
	'#######    ###BBB###    #BBB#    #################',
	'########    #######      #B#    ##################',
	'#######    ##########     #    ###################',
	'####         #########        ####################',
	'####        ###########      #####################',
	'#### @     #######################################',
	'##################################################'],
		{
			'@': 'player',
			'E': 'exit',
			'#': 'boulder',
			'B': 'bat',
		}, 0, 0);	
	
#BEGIN_EDITABLE#




#END_EDITABLE#
	
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}


#BEGIN_PROPERTIES#
{
    "version": "0.0",
	"mapProperties": {
        "refreshRate": 50
    },
}
#END_PROPERTIES#
/*******************
 *      TheGuardian.js     * '░'
 *******************
 *
 * As I walk through the valley of the
 * shadow of the collosi, I shall fear
 * no evil for a man once told me
 * it would be dangerous out there
 * and gave me things to go alone.
 * But what he didn't understand was 
 * my greatest gift was the courage
 * and my will to protect those I
 * cared about.
 * 
 * Every traveller knows that the
 * adventures never truly end.
 */
 
 function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function startLevel(map) {
#START_OF_START_LEVEL#

firing = true

function wakeandhunt(obj, type) {
		var direction;
        var target = obj.findNearest(type);
        var leftDist = obj.getX() - target.x;
        var upDist = obj.getY() - target.y;
		
		if (Math.abs(upDist) < 12 && Math.abs(leftDist) < 16) {			
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
	
map.defineObject('boulder', {
		'color' : '#5C1F00',
		'symbol': String.fromCharCode(0x2617),
		'impassable': true,
	});
	
map.defineObject('boss', {
        'type': 'dynamic',
        'symbol': String.fromCharCode(0x298),
        'color': 'red',
        'onCollision': function (player) {
            player.killedBy('the boss');
        },
        'behavior': function (me) {
        	wakeandhunt(me, 'player');
        },    
	});
	
map.defineObject('flamer', {
        'type': 'dynamic',
        'symbol': '⊙',
        'color': 'red',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('the boss');
        },
        'behavior': function (me) {
			if (Math.random() < 0.3) {
				map.placeObject(me.getX(), me.getY() + 2, 'bullet');
			}
        },
    });
	
map.defineObject('fireSprout', {
        'type': 'dynamic',
        'symbol': '.',
        'color': 'red',
        'interval': 100,
        'projectile': true,
        'behavior': function (me) {
            me.move('left');
        }
    });
	
map.defineObject('plate', {
        'type': 'static',
        'symbol': String.fromCharCode(0x095),
        'color': 'black',
        'onCollision': function (firing) {
            map.writeStatus('You just heard a clicking sound...');
			firing = true;
        },   
	});
	
    map.createFromGrid(
['###########                                      ',
'#                                                 ',
'#          F                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          F                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          #                                      ',
'#          F                                      ',
'#          #                         B            ',
'#          #                                      ',
'#PPPPPPPPPP#                               E      ',
'#####@     #                                      '],
    {
        '@': 'player',
        'E': 'exit',
        '#': 'boulder',
		'B': 'boss',
		'P': 'plate',
		'F': 'flamer',
    }, 0, 0);
	
#BEGIN_EDITABLE#

map.placeObject(11, 3, 'boulder');

#END_EDITABLE#

#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

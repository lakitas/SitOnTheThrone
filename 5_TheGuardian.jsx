#BEGIN_PROPERTIES#
{
    "version": "1.0",
}
#END_PROPERTIES#
/*******************
 *      TheGuardian.js     * '░'
 *******************
 *
 * The treasure must be precious...
 * truly.
 * 
 * No man has entered thus far in this
 * hellish dungeon and so there is 
 * none to say what you will find.
 * 
 * So go on, use your thought as
 * as a shield to guard you against
 * the dangers that lurk up ahead.
 *
 * Every traveller knows that the
 * adventures never truly end.
 */
 
 function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function startLevel(map) {
#START_OF_START_LEVEL#

firing = false

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
	
map.defineObject('fireboulder', {
        'type': 'dynamic',
        'symbol': '⊙',
        'color': 'red',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('a fireboulder');
        },
        'behavior': function (me) {
            map.placeObject(me.getX(), me.getY(), 'firesprout');
        },
    });	

    map.defineObject('firesprout', {
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
['#################################################',
'#                                                #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#           #                                    #',
'#          #                                     #',
'#          #                                     #',
'#          #                         B           #',
'#          #                                     #',
'#          #                               E     #',
'#####@     #######################################'],
    {
        '@': 'player',
        'E': 'exit',
        '#': 'boulder',
		'B': 'boss',
    }, 0, 0);
	
	map.placeObject(11, 2, 'fireboulder');
	map.placeObject(11, 4, 'fireboulder');
	map.placeObject(11, 6, 'fireboulder');
	map.placeObject(11, 8, 'fireboulder');
	map.placeObject(11, 10, 'fireboulder');
	map.placeObject(11, 12, 'fireboulder');
	map.placeObject(11, 14, 'fireboulder');
	map.placeObject(11, 16, 'fireboulder');
	map.placeObject(11, 18, 'fireboulder');
	
#BEGIN_EDITABLE#


#END_EDITABLE#

#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

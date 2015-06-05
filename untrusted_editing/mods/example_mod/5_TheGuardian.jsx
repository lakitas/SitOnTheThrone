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

function wakeAndHunt(obj, type) {
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
        	wakeAndHunt(me, 'player');
        },    
	});
	
map.defineObject('fireBoulder', {
        'type': 'dynamic',
        'symbol': '⊙',
        'color': 'red',
        'interval': 200,
        'onCollision': function (player) {
            player.killedBy('a fireBoulder');
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
        'type': 'dynamic',
        'symbol': 'O',
        'color': 'black',
        'behavior': function (me) {
            map.writeStatus('You heard a clicking sound...')
			map.placeObject(10, 2, 'fireSprout');
			map.placeObject(10, 4, 'fireSprout');
			map.placeObject(10, 6, 'fireSprout');
			map.placeObject(10, 8, 'fireSprout');
			map.placeObject(10, 10, 'fireSprout');
			map.placeObject(10, 12, 'fireSprout');
			map.placeObject(10, 14, 'fireSprout');
			map.placeObject(10, 16, 'fireSprout');
			map.placeObject(10, 18, 'fireSprout');
        }
    });
	
    map.createFromGrid(
['#################################################',
'#                                                #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#           #                                    #',
'#OOOOOOOOOO#                                     #',
'#          #                                     #',
'#          #                         B           #',
'#          #                                     #',
'#OOOOOOOOOO#                               E     #',
'#####@     #######################################'],
    {
        '@': 'player',
        'E': 'exit',
        '#': 'boulder',
		'O': 'plate',
		'B': 'boss',
    }, 0, 0);
	
	map.placeObject(11, 2, 'fireBoulder');
	map.placeObject(11, 4, 'fireBoulder');
	map.placeObject(11, 6, 'fireBoulder');
	map.placeObject(11, 8, 'fireBoulder');
	map.placeObject(11, 10, 'fireBoulder');
	map.placeObject(11, 12, 'fireBoulder');
	map.placeObject(11, 14, 'fireBoulder');
	map.placeObject(11, 16, 'fireBoulder');
	map.placeObject(11, 18, 'fireBoulder');
	
#BEGIN_EDITABLE#


#END_EDITABLE#

#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}

/* eslint-disable quotes */
var playerViews;
var context;

for (var i = 0; i < playerViews.length; i++) {
    if (playerViews[i].playerId === context.playerId) {
        playerViews[i].view = {
            type: 'Card',
            data: JSON.stringify(context),
        };
    }
}

JSON.stringify({ playerViews: playerViews });

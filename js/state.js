'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var barWidth = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = 'red';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 110, 30);
  ctx.fillText('Список результатов:', 110, 45);
  var maxTime = getMaxElement(times);
  var SPACE = (CLOUD_WIDTH - TEXT_WIDTH * players.length) / (players.length + 1);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + SPACE + (SPACE + TEXT_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 4 - (barWidth * times[i]) / maxTime - 2 * GAP);
    ctx.fillText(players[i], CLOUD_X + SPACE + (SPACE + TEXT_WIDTH) * i, CLOUD_HEIGHT - GAP * 2);
    ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + SPACE + (SPACE + TEXT_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP * 4, BAR_WIDTH, -(barWidth * times[i]) / maxTime);
  }
};

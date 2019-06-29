'use strict';
(function () {
  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');
  var dragged;
  var startCoords;

  var onClickPreventDefault = function (event) {
    event.preventDefault();
    event.target.removeEventListener('click', onClickPreventDefault);
  };

  var onMouseMove = function (moveEvt, target) {
    if (!target) {
      target = event.target;
    }
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    target.style.top = (target.offsetTop - shift.y) + 'px';
    target.style.left = (target.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt, target) {
    if (!target) {
      target = event.target;
    }
    upEvt.preventDefault();
    if (dragged) {
      target.addEventListener('click', onClickPreventDefault);
    }
    dragged = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mousemove', onMouseMoveDialog);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseMoveDialog = function (evt) {
    return onMouseMove(evt, setupDialogElement);
  };

  function initEvents(evt, target) {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    dragged = false;
    document.addEventListener('mouseup', onMouseUp);
    if (target === setupDialogElement) {
      return document.addEventListener('mousemove', onMouseMoveDialog);
    }
    return document.addEventListener('mousemove', onMouseMove);
  }

  // - - - - - - - - - - - - - обработчик нажатия/сдвига dialog - - - - - - - - - - - - - - - - - - -
  dialogHandler.addEventListener('mousedown', function (evt) {
    initEvents(evt, setupDialogElement);
  });

  // - - - - - - - - - - - - - обработчик нажатия/сдвига инвентаря  - - - - - - - - - - - - - - - - - - -

  var artifactsShopImg = document.querySelector('.setup-artifacts-cell img');

  artifactsShopImg.addEventListener('mousedown', function (evt) {
    artifactsShopImg.style.zIndex = '100';
    artifactsShopImg.style.position = 'absolute';
    initEvents(evt);
  });
})();

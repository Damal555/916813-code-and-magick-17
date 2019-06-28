'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupCoords;

var setupCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');
var setupName = setup.querySelector('.setup-user-name');


var i = 0;
var flag = false;

var onPopupEscPress = function (evt) {
  if (!flag && evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};
var addFlagChangerOnFocus = function () {
  setupName.addEventListener('focus', function () {
    flag = true;
  });
};

var addFlagChangerOnBlur = function () {
  setupName.addEventListener('blur', function () {
    flag = false;
  });
};

addFlagChangerOnFocus();
addFlagChangerOnBlur();

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupCoords = {
   x: setup.style.left,
   y: setup.style.top
 };

};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setup.style.left = setupCoords.x;
  setup.style.top = setupCoords.y;
};

var addingListenersOnSetupOpen = function () {
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });
};

var removingListenersOnSetupClose = function () {
  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
};
addingListenersOnSetupOpen();
removingListenersOnSetupClose();
var similarListElement = setup.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var amount = 4;
var wizards = [];

var getRandomValueInArr = function (parameter) {
  return parameter[Math.floor(Math.random() * parameter.length)];
};

var createRandomData = function () {

  for (i = 0; i < amount; i++) {
    var wizardName = getRandomValueInArr(WIZARD_NAMES);
    var wizardLastname = getRandomValueInArr(WIZARD_LASTNAMES);
    var wizardCoatColor = getRandomValueInArr(WIZARD_COATCOLOR);
    var wizardEyesColor = getRandomValueInArr(WIZARD_EYESCOLORS);

    var similarWizard = {
      name: wizardName + ' ' + wizardLastname,
      coat: wizardCoatColor,
      eyes: wizardEyesColor
    };
    wizards[i] = similarWizard;
  }
  return wizards;
};

wizards = createRandomData();

var createDOMElements = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coat;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyes;
  return wizardElement;
};

var insertFragment = function () {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < amount; i++) {
    fragment.appendChild(createDOMElements(i));
  }
  similarListElement.appendChild(fragment);
};
insertFragment();

var showSimilarMages = function () {
  setup.querySelector('.setup-similar').classList.remove('hidden');
};
showSimilarMages();
i = 0;

var changeColor = function (arr) {
  i++;
  if (i === arr.length) {
    i = 0;
  }
  return arr[i];
};
var changingWizard = function () {
  setupCoat.addEventListener('click', function () {
    setupCoat.style.fill = changeColor(WIZARD_COATCOLOR);
  });
  setupEyes.addEventListener('click', function () {
    setupEyes.style.fill = changeColor(WIZARD_EYESCOLORS);
  });
  setupFireball.addEventListener('click', function () {
    changeColor(WIZARD_FIREBALL, setupFireball);
    setupFireball.style.background = changeColor(WIZARD_FIREBALL);
  });
};
changingWizard();

(function () {

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandler = setupDialogElement.querySelector('.upload');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
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

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();


(function () {

  var artifactsShopImg = document.querySelector('.setup-artifacts-cell img');

  artifactsShopImg.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    artifactsShopImg.style.zIndex = '100';
    artifactsShopImg.style.position = 'absolute';
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
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

      artifactsShopImg.style.top = (artifactsShopImg.offsetTop - shift.y) + 'px';
      artifactsShopImg.style.left = (artifactsShopImg.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvent) {
          clickEvent.preventDefault();
          artifactsShopImg.removeEventListener('click', onClickPreventDefault);
        };
        artifactsShopImg.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

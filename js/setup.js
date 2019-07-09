'use strict';

(function () {
  window.setupGlobal = {
    setup: (document.querySelector('.setup')),
    WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    WIZARD_LASTNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    WIZARD_COATCOLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYESCOLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    WIZARD_FIREBALL: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var setupCoat = window.setupGlobal.setup.querySelector('.setup-wizard .wizard-coat');
  var setupEyes = window.setupGlobal.setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = window.setupGlobal.setup.querySelector('.setup-fireball-wrap');
  var setupName = window.setupGlobal.setup.querySelector('.setup-user-name');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setupGlobal.setup.querySelector('.setup-close');
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
    window.setupGlobal.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupCoords = {
      x: window.setupGlobal.setup.style.left,
      y: window.setupGlobal.setup.style.top
    };

  };

  var closePopup = function () {
    window.setupGlobal.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.setupGlobal.setup.style.left = setupCoords.x;
    window.setupGlobal.setup.style.top = setupCoords.y;
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

  var setupCoords;
  var i = 0;
  var changeColor = function (arr) {
    i++;
    if (i === arr.length) {
      i = 0;
    }
    return arr[i];
  };

  var changingWizard = function () {
    setupCoat.addEventListener('click', function () {
      var setupCoatColor = changeColor(window.setupGlobal.WIZARD_COATCOLOR);
      setupCoat.style.fill = setupCoatColor;
      document.querySelector('input[name=coat-color]').value = setupCoatColor;
    });

    setupEyes.addEventListener('click', function () {
      var setupEyesColor = changeColor(window.setupGlobal.WIZARD_EYESCOLORS);
      setupEyes.style.fill = setupEyesColor;
      document.querySelector('input[name=eyes-color]').value = setupEyesColor;
    });

    setupFireball.addEventListener('click', function () {
      var setupFireballColor = changeColor(window.setupGlobal.WIZARD_FIREBALL);
      setupFireball.style.background = setupFireballColor;
      document.querySelector('input[name=fireball-color]').value = setupFireballColor;
    });
  };
  changingWizard();
})();

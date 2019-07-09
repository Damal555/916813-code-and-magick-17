'use strict';
(function () {


  var similarListElement = window.setupGlobal.setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var amount = 4;
  var wizards = [];

  var getRandomValueInArr = function (parameter) {
    return parameter[Math.floor(Math.random() * parameter.length)];
  };

  var createRandomData = function () {

    for (var i = 0; i < amount; i++) {
      var wizardName = getRandomValueInArr(window.setupGlobal.WIZARD_NAMES);
      var wizardLastname = getRandomValueInArr(window.setupGlobal.WIZARD_LASTNAMES);
      var wizardCoatColor = getRandomValueInArr(window.setupGlobal.WIZARD_COATCOLOR);
      var wizardEyesColor = getRandomValueInArr(window.setupGlobal.WIZARD_EYESCOLORS);

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

  var createDOMElements = function (i) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyes;
    return wizardElement;
  };

  var insertFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < amount; i++) {
      fragment.appendChild(createDOMElements(i));
    }
    similarListElement.appendChild(fragment);
  };
  insertFragment();

  var showSimilarMages = function () {
    window.setupGlobal.setup.querySelector('.setup-similar').classList.remove('hidden');
  };
  showSimilarMages();

})();

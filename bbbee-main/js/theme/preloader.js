'use strict';

import utils from './Utils';

/*-----------------------------------------------
|   Pre-loader
-----------------------------------------------*/
$.holdReady(true);

$($('main section')[0]).imagesLoaded({ background: '.bg-holder' }, () => {
  $.holdReady(false);
});

utils.$document.ready(() => {
  const $preloader = $('#preloader');
  $preloader.addClass('loaded');
  setTimeout(() => {
    $preloader.remove();
  }, 800);
});
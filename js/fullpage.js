/*!
 * fullPage 3.1.2
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license GPLv3 for open source use only
 * or Fullpage Commercial License for commercial use
 * http://alvarotrigo.com/fullPage/pricing/
 *
 * Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
 */
(function(root,window,document,factory,undefined){if(typeof define==='function'&&define.amd){define(function(){root.fullpage=factory(window,document);return root.fullpage})}else if(typeof exports==='object'){module.exports=factory(window,document)}else{window.fullpage=factory(window,document)}}(this,window,document,function(window,document){'use strict';var WRAPPER='fullpage-wrapper';var WRAPPER_SEL='.'+WRAPPER;var SCROLLABLE='fp-scrollable';var SCROLLABLE_SEL='.'+SCROLLABLE;var RESPONSIVE='fp-responsive';var NO_TRANSITION='fp-notransition';var DESTROYED='fp-destroyed';var ENABLED='fp-enabled';var VIEWING_PREFIX='fp-viewing';var ACTIVE='active';var ACTIVE_SEL='.'+ACTIVE;var COMPLETELY='fp-completely';var COMPLETELY_SEL='.'+COMPLETELY;var SECTION_DEFAULT_SEL='.section';var SECTION='fp-section';var SECTION_SEL='.'+SECTION;var SECTION_ACTIVE_SEL=SECTION_SEL+ACTIVE_SEL;var TABLE_CELL='fp-tableCell';var TABLE_CELL_SEL='.'+TABLE_CELL;var AUTO_HEIGHT='fp-auto-height';var AUTO_HEIGHT_SEL='.'+AUTO_HEIGHT;var AUTO_HEIGHT_RESPONSIVE='fp-auto-height-responsive';var AUTO_HEIGHT_RESPONSIVE_SEL='.'+AUTO_HEIGHT_RESPONSIVE;var NORMAL_SCROLL='fp-normal-scroll';var NORMAL_SCROLL_SEL='.'+NORMAL_SCROLL;var SECTION_NAV='fp-nav';var SECTION_NAV_SEL='#'+SECTION_NAV;var SECTION_NAV_TOOLTIP='fp-tooltip';var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;var SHOW_ACTIVE_TOOLTIP='fp-show-active';var SLIDE_DEFAULT_SEL='.slide';var SLIDE='fp-slide';var SLIDE_SEL='.'+SLIDE;var SLIDE_ACTIVE_SEL=SLIDE_SEL+ACTIVE_SEL;var SLIDES_WRAPPER='fp-slides';var SLIDES_WRAPPER_SEL='.'+SLIDES_WRAPPER;var SLIDES_CONTAINER='fp-slidesContainer';var SLIDES_CONTAINER_SEL='.'+SLIDES_CONTAINER;var TABLE='fp-table';var SLIDES_NAV='fp-slidesNav';var SLIDES_NAV_SEL='.'+SLIDES_NAV;var SLIDES_NAV_LINK_SEL=SLIDES_NAV_SEL+' a';var SLIDES_ARROW='fp-controlArrow';var SLIDES_ARROW_SEL='.'+SLIDES_ARROW;var SLIDES_PREV='fp-prev';var SLIDES_PREV_SEL='.'+SLIDES_PREV;var SLIDES_ARROW_PREV=SLIDES_ARROW+' '+SLIDES_PREV;var SLIDES_ARROW_PREV_SEL=SLIDES_ARROW_SEL+SLIDES_PREV_SEL;var SLIDES_NEXT='fp-next';var SLIDES_NEXT_SEL='.'+SLIDES_NEXT;var SLIDES_ARROW_NEXT=SLIDES_ARROW+' '+SLIDES_NEXT;var SLIDES_ARROW_NEXT_SEL=SLIDES_ARROW_SEL+SLIDES_NEXT_SEL;function initialise(containerSelector,options){var isOK=options&&new RegExp('([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$').test(options['li'+'cen'+'seK'+'e'+'y'])||document.domain.indexOf('al'+'varotri'+'go'+'.'+'com')>-1;var $htmlBody=$('html, body');var $html=$('html')[0];var $body=$('body')[0];if(hasClass($html,ENABLED)){displayWarnings();return}
var FP={};options=deepExtend({menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:'right',navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:'bottom',scrollBar:!1,hybrid:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1000,easing:'easeInOutCubic',easingcss3:'ease',loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!1,scrollOverflowReset:!1,scrollOverflowHandler:window.fp_scrolloverflow?window.fp_scrolloverflow.iscrollHandler:null,scrollOverflowOptions:null,touchSensitivity:5,touchWrapper:typeof containerSelector==='string'?$(containerSelector)[0]:containerSelector,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:'#fff',verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:'reveal',percentage:62,property:'translate'},cards:!1,cardsOptions:{perspective:100,fadeContent:!0,fadeBackground:!0},sectionSelector:SECTION_DEFAULT_SEL,slideSelector:SLIDE_DEFAULT_SEL,v2compatible:!1,afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,lazyLoading:!0},options);var slideMoving=!1;var isTouchDevice=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);var isTouch=(('ontouchstart' in window)||(navigator.msMaxTouchPoints>0)||(navigator.maxTouchPoints));var container=typeof containerSelector==='string'?$(containerSelector)[0]:containerSelector;var windowsHeight=getWindowHeight();var windowsWidth=getWindowWidth();var isResizing=!1;var isWindowFocused=!0;var lastScrolledDestiny;var lastScrolledSlide;var canScroll=!0;var scrollings=[];var controlPressed;var startingSection;var isScrollAllowed={};isScrollAllowed.m={'up':!0,'down':!0,'left':!0,'right':!0};isScrollAllowed.k=deepExtend({},isScrollAllowed.m);var MSPointer=getMSPointer();var events={touchmove:'ontouchmove' in window?'touchmove':MSPointer.move,touchstart:'ontouchstart' in window?'touchstart':MSPointer.down};var scrollBarHandler;var focusableElementsString='a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';var g_supportsPassive=!1;try{var opts=Object.defineProperty({},'passive',{get:function(){g_supportsPassive=!0}});window.addEventListener("testPassive",null,opts);window.removeEventListener("testPassive",null,opts)}catch(e){}
var resizeId;var resizeHandlerId;var afterSectionLoadsId;var afterSlideLoadsId;var scrollId;var scrollId2;var keydownId;var g_doubleCheckHeightId;var originals=deepExtend({},options);var activeAnimation;var g_initialAnchorsInDom=!1;var g_canFireMouseEnterNormalScroll=!0;var g_mediaLoadedId;var g_transitionLapseId;var extensions=['parallax','scrollOverflowReset','dragAndMove','offsetSections','fadingEffect','responsiveSlides','continuousHorizontal','interlockedSlides','scrollHorizontally','resetSliders','cards','dropEffect','waterEffect'];displayWarnings();window.fp_easings=deepExtend(window.fp_easings,{easeInOutCubic:function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b}});function setAutoScrolling(value,type){if(!value){silentScroll(0)}
setVariableState('autoScrolling',value,type);var element=$(SECTION_ACTIVE_SEL)[0];if(options.autoScrolling&&!options.scrollBar){css($htmlBody,{'overflow':'hidden','height':'100%'});setRecordHistory(originals.recordHistory,'internal');css(container,{'-ms-touch-action':'none','touch-action':'none'});if(element!=null){silentScroll(element.offsetTop)}}else{css($htmlBody,{'overflow':'visible','height':'initial'});var recordHistory=!options.autoScrolling?!1:originals.recordHistory;setRecordHistory(recordHistory,'internal');css(container,{'-ms-touch-action':'','touch-action':''});if(element!=null){var scrollSettings=getScrollSettings(element.offsetTop);scrollSettings.element.scrollTo(0,scrollSettings.options)}}}
function setRecordHistory(value,type){setVariableState('recordHistory',value,type)}
function setScrollingSpeed(value,type){setVariableState('scrollingSpeed',value,type)}
function setFitToSection(value,type){setVariableState('fitToSection',value,type)}
function setLockAnchors(value){options.lockAnchors=value}
function setMouseWheelScrolling(value){if(value){addMouseWheelHandler();addMiddleWheelHandler()}else{removeMouseWheelHandler();removeMiddleWheelHandler()}}
function setAllowScrolling(value,directions){if(typeof directions!=='undefined'){directions=directions.replace(/ /g,'').split(',');directions.forEach(function(direction){setIsScrollAllowed(value,direction,'m')})}else{setIsScrollAllowed(value,'all','m')}}
function setMouseHijack(value){if(value){setMouseWheelScrolling(!0);addTouchHandler()}else{setMouseWheelScrolling(!1);removeTouchHandler()}}
function setKeyboardScrolling(value,directions){if(typeof directions!=='undefined'){directions=directions.replace(/ /g,'').split(',');directions.forEach(function(direction){setIsScrollAllowed(value,direction,'k')})}else{setIsScrollAllowed(value,'all','k');options.keyboardScrolling=value}}
function moveSectionUp(){var prev=prevUntil($(SECTION_ACTIVE_SEL)[0],SECTION_SEL);if(!prev&&(options.loopTop||options.continuousVertical)){prev=last($(SECTION_SEL))}
if(prev!=null){scrollPage(prev,null,!0)}}
function moveSectionDown(){var next=nextUntil($(SECTION_ACTIVE_SEL)[0],SECTION_SEL);if(!next&&(options.loopBottom||options.continuousVertical)){next=$(SECTION_SEL)[0]}
if(next!=null){scrollPage(next,null,!1)}}
function silentMoveTo(sectionAnchor,slideAnchor){setScrollingSpeed(0,'internal');moveTo(sectionAnchor,slideAnchor);setScrollingSpeed(originals.scrollingSpeed,'internal')}
function moveTo(sectionAnchor,slideAnchor){var destiny=getSectionByAnchor(sectionAnchor);if(typeof slideAnchor!=='undefined'){scrollPageAndSlide(sectionAnchor,slideAnchor)}else if(destiny!=null){scrollPage(destiny)}}
function moveSlideRight(section){moveSlide('right',section)}
function moveSlideLeft(section){moveSlide('left',section)}
function reBuild(resizing){if(hasClass(container,DESTROYED)){return}
isResizing=!0;windowsHeight=getWindowHeight();windowsWidth=getWindowWidth();var sections=$(SECTION_SEL);for(var i=0;i<sections.length;++i){var section=sections[i];var slidesWrap=$(SLIDES_WRAPPER_SEL,section)[0];var slides=$(SLIDE_SEL,section);if(options.verticalCentered){css($(TABLE_CELL_SEL,section),{'height':getTableHeight(section)+'px'})}
css(section,{'height':windowsHeight+'px'});if(slides.length>1){landscapeScroll(slidesWrap,$(SLIDE_ACTIVE_SEL,slidesWrap)[0])}}
if(options.scrollOverflow){scrollBarHandler.createScrollBarForAll()}
var activeSection=$(SECTION_ACTIVE_SEL)[0];var sectionIndex=index(activeSection,SECTION_SEL);if(sectionIndex){silentMoveTo(sectionIndex+1)}
isResizing=!1;if(isFunction(options.afterResize)&&resizing){options.afterResize.call(container,window.innerWidth,window.innerHeight)}
if(isFunction(options.afterReBuild)&&!resizing){options.afterReBuild.call(container)}}
function isResponsiveMode(){return hasClass($body,RESPONSIVE)}
function setResponsive(active){var isResponsive=isResponsiveMode();if(active){if(!isResponsive){setAutoScrolling(!1,'internal');setFitToSection(!1,'internal');hide($(SECTION_NAV_SEL));addClass($body,RESPONSIVE);if(isFunction(options.afterResponsive)){options.afterResponsive.call(container,active)}
if(options.scrollOverflow){scrollBarHandler.createScrollBarForAll()}}}else if(isResponsive){setAutoScrolling(originals.autoScrolling,'internal');setFitToSection(originals.autoScrolling,'internal');show($(SECTION_NAV_SEL));removeClass($body,RESPONSIVE);if(isFunction(options.afterResponsive)){options.afterResponsive.call(container,active)}}}
if(container){FP.version='3.1.1';FP.setAutoScrolling=setAutoScrolling;FP.setRecordHistory=setRecordHistory;FP.setScrollingSpeed=setScrollingSpeed;FP.setFitToSection=setFitToSection;FP.setLockAnchors=setLockAnchors;FP.setMouseWheelScrolling=setMouseWheelScrolling;FP.setAllowScrolling=setAllowScrolling;FP.setKeyboardScrolling=setKeyboardScrolling;FP.moveSectionUp=moveSectionUp;FP.moveSectionDown=moveSectionDown;FP.silentMoveTo=silentMoveTo;FP.moveTo=moveTo;FP.moveSlideRight=moveSlideRight;FP.moveSlideLeft=moveSlideLeft;FP.fitToSection=fitToSection;FP.reBuild=reBuild;FP.setResponsive=setResponsive;FP.getFullpageData=function(){return options};FP.destroy=destroy;FP.getActiveSection=getActiveSection;FP.getActiveSlide=getActiveSlide;FP.test={top:'0px',translate3d:'translate3d(0px, 0px, 0px)',translate3dH:(function(){var a=[];for(var i=0;i<$(options.sectionSelector,container).length;i++){a.push('translate3d(0px, 0px, 0px)')}
return a})(),left:(function(){var a=[];for(var i=0;i<$(options.sectionSelector,container).length;i++){a.push(0)}
return a})(),options:options,setAutoScrolling:setAutoScrolling};FP.shared={afterRenderActions:afterRenderActions,isNormalScrollElement:!1};window.fullpage_api=FP;if(options.$){Object.keys(FP).forEach(function(key){options.$.fn.fullpage[key]=FP[key]})}
init();bindEvents()}
function init(){if(options.css3){options.css3=support3d()}
options.scrollBar=options.scrollBar||options.hybrid;setOptionsFromDOM();prepareDom();setAllowScrolling(!0);setMouseHijack(!0);setAutoScrolling(options.autoScrolling,'internal');responsive();setBodyClass();if(document.readyState==='complete'){scrollToAnchor()}
window.addEventListener('load',scrollToAnchor);if(!options.scrollOverflow){afterRenderActions()}
doubleCheckHeight()}
function bindEvents(){window.addEventListener('scroll',scrollHandler);window.addEventListener('hashchange',hashChangeHandler);window.addEventListener('focus',focusHandler);window.addEventListener('blur',blurHandler);window.addEventListener('resize',resizeHandler);document.addEventListener('keydown',keydownHandler);document.addEventListener('keyup',keyUpHandler);['click','touchstart'].forEach(function(eventName){document.addEventListener(eventName,delegatedEvents)});if(options.normalScrollElements){['mouseenter','touchstart'].forEach(function(eventName){forMouseLeaveOrTouch(eventName,!1)});['mouseleave','touchend'].forEach(function(eventName){forMouseLeaveOrTouch(eventName,!0)})}}
function delegatedEvents(e){var target=e.target;if(target&&closest(target,SECTION_NAV_SEL+' a')){sectionBulletHandler.call(target,e)}else if(matches(target,SECTION_NAV_TOOLTIP_SEL)){tooltipTextHandler.call(target)}else if(matches(target,SLIDES_ARROW_SEL)){slideArrowHandler.call(target,e)}else if(matches(target,SLIDES_NAV_LINK_SEL)||closest(target,SLIDES_NAV_LINK_SEL)!=null){slideBulletHandler.call(target,e)}else if(closest(target,options.menu+' [data-menuanchor]')){menuItemsHandler.call(target,e)}}
function forMouseLeaveOrTouch(eventName,allowScrolling){document['fp_'+eventName]=allowScrolling;document.addEventListener(eventName,onMouseEnterOrLeave,!0)}
function onMouseEnterOrLeave(e){var type=e.type;var isInsideOneNormalScroll=!1;var isUsingScrollOverflow=options.scrollOverflow;var target=type==='mouseleave'?e.toElement||e.relatedTarget:e.target;if(target==document||!target){setMouseHijack(!0);if(isUsingScrollOverflow){options.scrollOverflowHandler.setIscroll(target,!0)}
return}
if(type==='touchend'){g_canFireMouseEnterNormalScroll=!1;setTimeout(function(){g_canFireMouseEnterNormalScroll=!0},800)}
if(type==='mouseenter'&&!g_canFireMouseEnterNormalScroll){return}
var normalSelectors=options.normalScrollElements.split(',');normalSelectors.forEach(function(normalSelector){if(!isInsideOneNormalScroll){var isNormalScrollTarget=matches(target,normalSelector);var isNormalScrollChildFocused=closest(target,normalSelector);if(isNormalScrollTarget|| isNormalScrollChildFocused){if(!FP.shared.isNormalScrollElement){setMouseHijack(!1);if(isUsingScrollOverflow){options.scrollOverflowHandler.setIscroll(target,!1)}}
FP.shared.isNormalScrollElement=!0;isInsideOneNormalScroll=!0}}});if(!isInsideOneNormalScroll&&FP.shared.isNormalScrollElement){setMouseHijack(!0);if(isUsingScrollOverflow){options.scrollOverflowHandler.setIscroll(target,!0)}
FP.shared.isNormalScrollElement=!1}}
function doubleCheckHeight(){for(var i=1;i<4;i++){g_doubleCheckHeightId=setTimeout(adjustToNewViewport,350*i)}}
function adjustToNewViewport(){var newWindowHeight=getWindowHeight();var newWindowWidth=getWindowWidth();if(windowsHeight!==newWindowHeight||windowsWidth!==newWindowWidth){windowsHeight=newWindowHeight;windowsWidth=newWindowWidth;reBuild(!0)}}
function setOptionsFromDOM(){if(!options.anchors.length){var anchorsAttribute='[data-anchor]';var anchors=$(options.sectionSelector.split(',').join(anchorsAttribute+',')+anchorsAttribute,container);if(anchors.length&&anchors.length===$(options.sectionSelector,container).length){g_initialAnchorsInDom=!0;anchors.forEach(function(item){options.anchors.push(item.getAttribute('data-anchor').toString())})}}
if(!options.navigationTooltips.length){var tooltipsAttribute='[data-tooltip]';var tooltips=$(options.sectionSelector.split(',').join(tooltipsAttribute+',')+tooltipsAttribute,container);if(tooltips.length){tooltips.forEach(function(item){options.navigationTooltips.push(item.getAttribute('data-tooltip').toString())})}}}
function prepareDom(){css(container,{'height':'100%','position':'relative'});addClass(container,WRAPPER);addClass($html,ENABLED);windowsHeight=getWindowHeight();removeClass(container,DESTROYED);addInternalSelectors();var sections=$(SECTION_SEL);for(var i=0;i<sections.length;i++){var sectionIndex=i;var section=sections[i];var slides=$(SLIDE_SEL,section);var numSlides=slides.length;section.setAttribute('data-fp-styles',section.getAttribute('style'));styleSection(section,sectionIndex);styleMenu(section,sectionIndex);if(numSlides>0){styleSlides(section,slides,numSlides)}else{if(options.verticalCentered){addTableClass(section)}}}
if(options.fixedElements&&options.css3){$(options.fixedElements).forEach(function(item){$body.appendChild(item)})}
if(options.navigation){addVerticalNavigation()}
enableYoutubeAPI();if(options.scrollOverflow){scrollBarHandler=options.scrollOverflowHandler.init(options)}}
function styleSlides(section,slides,numSlides){var sliderWidth=numSlides*100;var slideWidth=100/numSlides;var slidesWrapper=document.createElement('div');slidesWrapper.className=SLIDES_WRAPPER;wrapAll(slides,slidesWrapper);var slidesContainer=document.createElement('div');slidesContainer.className=SLIDES_CONTAINER;wrapAll(slides,slidesContainer);css($(SLIDES_CONTAINER_SEL,section),{'width':sliderWidth+'%'});if(numSlides>1){if(options.controlArrows){createSlideArrows(section)}
if(options.slidesNavigation){addSlidesNavigation(section,numSlides)}}
slides.forEach(function(slide){css(slide,{'width':slideWidth+'%'});if(options.verticalCentered){addTableClass(slide)}});var startingSlide=$(SLIDE_ACTIVE_SEL,section)[0];if(startingSlide!=null&&(index($(SECTION_ACTIVE_SEL),SECTION_SEL)!==0||(index($(SECTION_ACTIVE_SEL),SECTION_SEL)===0&&index(startingSlide)!==0))){silentLandscapeScroll(startingSlide,'internal')}else{addClass(slides[0],ACTIVE)}}
function styleSection(section,index){if(!index&&$(SECTION_ACTIVE_SEL)[0]==null){addClass(section,ACTIVE)}
startingSection=$(SECTION_ACTIVE_SEL)[0];css(section,{'height':windowsHeight+'px'});if(options.paddingTop){css(section,{'padding-top':options.paddingTop})}
if(options.paddingBottom){css(section,{'padding-bottom':options.paddingBottom})}
if(typeof options.sectionsColor[index]!=='undefined'){css(section,{'background-color':options.sectionsColor[index]})}
if(typeof options.anchors[index]!=='undefined'){section.setAttribute('data-anchor',options.anchors[index])}}
function styleMenu(section,index){if(typeof options.anchors[index]!=='undefined'){if(hasClass(section,ACTIVE)){activateMenuAndNav(options.anchors[index],index)}}
if(options.menu&&options.css3&&closest($(options.menu)[0],WRAPPER_SEL)!=null){$(options.menu).forEach(function(menu){$body.appendChild(menu)})}}
function addInternalSelectors(){addClass($(options.sectionSelector,container),SECTION);addClass($(options.slideSelector,container),SLIDE)}
function createSlideArrows(section){var arrows=[createElementFromHTML('<div class="'+SLIDES_ARROW_PREV+'"></div>'),createElementFromHTML('<div class="'+SLIDES_ARROW_NEXT+'"></div>')];after($(SLIDES_WRAPPER_SEL,section)[0],arrows);if(options.controlArrowColor!=='#fff'){css($(SLIDES_ARROW_NEXT_SEL,section),{'border-color':'transparent transparent transparent '+options.controlArrowColor});css($(SLIDES_ARROW_PREV_SEL,section),{'border-color':'transparent '+options.controlArrowColor+' transparent transparent'})}
if(!options.loopHorizontal){hide($(SLIDES_ARROW_PREV_SEL,section))}}
function addVerticalNavigation(){var navigation=document.createElement('div');navigation.setAttribute('id',SECTION_NAV);var divUl=document.createElement('ul');navigation.appendChild(divUl);appendTo(navigation,$body);var nav=$(SECTION_NAV_SEL)[0];addClass(nav,'fp-'+options.navigationPosition);if(options.showActiveTooltip){addClass(nav,SHOW_ACTIVE_TOOLTIP)}
var li='';for(var i=0;i<$(SECTION_SEL).length;i++){var link='';if(options.anchors.length){link=options.anchors[i]}
li+='<li><a href="#'+link+'"><span class="fp-sr-only">'+getBulletLinkName(i,'Section')+'</span><span></span></a>';var tooltip=options.navigationTooltips[i];if(typeof tooltip!=='undefined'&&tooltip!==''){li+='<div class="'+SECTION_NAV_TOOLTIP+' fp-'+options.navigationPosition+'">'+tooltip+'</div>'}
li+='</li>'}
$('ul',nav)[0].innerHTML=li;var bullet=$('li',$(SECTION_NAV_SEL)[0])[index($(SECTION_ACTIVE_SEL)[0],SECTION_SEL)];addClass($('a',bullet),ACTIVE)}
function getBulletLinkName(i,defaultName,item){var anchor=defaultName==='Section'?options.anchors[i]:item.getAttribute('data-anchor');return options.navigationTooltips[i]||anchor||defaultName+' '+(i+1)}
function enableYoutubeAPI(){$('iframe[src*="youtube.com/embed/"]',container).forEach(function(item){addURLParam(item,'enablejsapi=1')})}
function addURLParam(element,newParam){var originalSrc=element.getAttribute('src');element.setAttribute('src',originalSrc+getUrlParamSign(originalSrc)+newParam)}
function getUrlParamSign(url){return(!/\?/.test(url))?'?':'&'}
function afterRenderActions(){var section=$(SECTION_ACTIVE_SEL)[0];addClass(section,COMPLETELY);lazyLoad(section);lazyLoadOthers();playMedia(section);if(options.scrollOverflow){options.scrollOverflowHandler.afterLoad()}
if(isDestinyTheStartingSection()&&isFunction(options.afterLoad)){fireCallback('afterLoad',{activeSection:section,element:section,direction:null,anchorLink:section.getAttribute('data-anchor'),sectionIndex:index(section,SECTION_SEL)})}
if(isFunction(options.afterRender)){fireCallback('afterRender')}}
function isDestinyTheStartingSection(){var anchor=getAnchorsURL();var destinationSection=getSectionByAnchor(anchor.section);return!anchor.section||!destinationSection||typeof destinationSection!=='undefined'&&index(destinationSection)===index(startingSection)}
var isScrolling=!1;var lastScroll=0;function scrollHandler(){var currentSection;if(isResizing){return}
if(!options.autoScrolling||options.scrollBar){var currentScroll=getScrollTop();var scrollDirection=getScrollDirection(currentScroll);var visibleSectionIndex=0;var screen_mid=currentScroll+(getWindowHeight()/2.0);var isAtBottom=$body.offsetHeight-getWindowHeight()===currentScroll;var sections=$(SECTION_SEL);if(isAtBottom){visibleSectionIndex=sections.length-1}else if(!currentScroll){visibleSectionIndex=0}else{for(var i=0;i<sections.length;++i){var section=sections[i];if(section.offsetTop<=screen_mid){visibleSectionIndex=i}}}
if(isCompletelyInViewPort(scrollDirection)){if(!hasClass($(SECTION_ACTIVE_SEL)[0],COMPLETELY)){addClass($(SECTION_ACTIVE_SEL)[0],COMPLETELY);removeClass(siblings($(SECTION_ACTIVE_SEL)[0]),COMPLETELY)}}
currentSection=sections[visibleSectionIndex];if(!hasClass(currentSection,ACTIVE)){isScrolling=!0;var leavingSection=$(SECTION_ACTIVE_SEL)[0];var leavingSectionIndex=index(leavingSection,SECTION_SEL)+1;var yMovement=getYmovement(currentSection);var anchorLink=currentSection.getAttribute('data-anchor');var sectionIndex=index(currentSection,SECTION_SEL)+1;var activeSlide=$(SLIDE_ACTIVE_SEL,currentSection)[0];var slideIndex;var slideAnchorLink;var callbacksParams={activeSection:leavingSection,sectionIndex:sectionIndex-1,anchorLink:anchorLink,element:currentSection,leavingSection:leavingSectionIndex,direction:yMovement};if(activeSlide){slideAnchorLink=activeSlide.getAttribute('data-anchor');slideIndex=index(activeSlide)}
if(canScroll){addClass(currentSection,ACTIVE);removeClass(siblings(currentSection),ACTIVE);if(isFunction(options.onLeave)){fireCallback('onLeave',callbacksParams)}
if(isFunction(options.afterLoad)){fireCallback('afterLoad',callbacksParams)}
stopMedia(leavingSection);lazyLoad(currentSection);playMedia(currentSection);activateMenuAndNav(anchorLink,sectionIndex-1);if(options.anchors.length){lastScrolledDestiny=anchorLink}
setState(slideIndex,slideAnchorLink,anchorLink,sectionIndex)}
clearTimeout(scrollId);scrollId=setTimeout(function(){isScrolling=!1},100)}
if(options.fitToSection){clearTimeout(scrollId2);scrollId2=setTimeout(function(){if(options.fitToSection&&$(SECTION_ACTIVE_SEL)[0].offsetHeight<=windowsHeight){fitToSection()}},options.fitToSectionDelay)}}}
function fitToSection(){if(canScroll){isResizing=!0;scrollPage($(SECTION_ACTIVE_SEL)[0]);isResizing=!1}}
function isCompletelyInViewPort(movement){var top=$(SECTION_ACTIVE_SEL)[0].offsetTop;var bottom=top+getWindowHeight();if(movement=='up'){return bottom>=(getScrollTop()+getWindowHeight())}
return top<=getScrollTop()}
function isSectionInViewport(el){var rect=el.getBoundingClientRect();var top=rect.top;var bottom=rect.bottom;var pixelOffset=2;var isTopInView=top+pixelOffset<windowsHeight&&top>0;var isBottomInView=bottom>pixelOffset&&bottom<windowsHeight;return isTopInView||isBottomInView}
function getScrollDirection(currentScroll){var direction=currentScroll>lastScroll?'down':'up';lastScroll=currentScroll;previousDestTop=currentScroll;return direction}
function scrolling(type){if(!isScrollAllowed.m[type]){return}
var scrollSection=(type==='down')?moveSectionDown:moveSectionUp;if(options.scrollOverflow){var scrollable=options.scrollOverflowHandler.scrollable($(SECTION_ACTIVE_SEL)[0]);var check=(type==='down')?'bottom':'top';if(scrollable!=null){if(options.scrollOverflowHandler.isScrolled(check,scrollable)){scrollSection()}else{return!0}}else{scrollSection()}}else{scrollSection()}}
function preventBouncing(e){if(options.autoScrolling&&isReallyTouch(e)&&isScrollAllowed.m.up){preventDefault(e)}}
var touchStartY=0;var touchStartX=0;var touchEndY=0;var touchEndX=0;function touchMoveHandler(e){var activeSection=closest(e.target,SECTION_SEL)|| $(SECTION_ACTIVE_SEL)[0];if(isReallyTouch(e)){if(options.autoScrolling){preventDefault(e)}
var touchEvents=getEventsPage(e);touchEndY=touchEvents.y;touchEndX=touchEvents.x;if($(SLIDES_WRAPPER_SEL,activeSection).length&&Math.abs(touchStartX-touchEndX)>(Math.abs(touchStartY-touchEndY))){if(!slideMoving&&Math.abs(touchStartX-touchEndX)>(getWindowWidth()/100*options.touchSensitivity)){if(touchStartX>touchEndX){if(isScrollAllowed.m.right){moveSlideRight(activeSection)}}else{if(isScrollAllowed.m.left){moveSlideLeft(activeSection)}}}}else if(options.autoScrolling&&canScroll){if(Math.abs(touchStartY-touchEndY)>(window.innerHeight/100*options.touchSensitivity)){if(touchStartY>touchEndY){scrolling('down')}else if(touchEndY>touchStartY){scrolling('up')}}}}}
function isReallyTouch(e){return typeof e.pointerType==='undefined'||e.pointerType!='mouse'}
function touchStartHandler(e){if(options.fitToSection){activeAnimation=!1}
if(isReallyTouch(e)){var touchEvents=getEventsPage(e);touchStartY=touchEvents.y;touchStartX=touchEvents.x}}
function getAverage(elements,number){var sum=0;var lastElements=elements.slice(Math.max(elements.length-number,1));for(var i=0;i<lastElements.length;i++){sum=sum+lastElements[i]}
return Math.ceil(sum/number)}
var prevTime=new Date().getTime();function MouseWheelHandler(e){var curTime=new Date().getTime();var isNormalScroll=hasClass($(COMPLETELY_SEL)[0],NORMAL_SCROLL);if(!isScrollAllowed.m.down&&!isScrollAllowed.m.up){preventDefault(e);return!1}
if(options.autoScrolling&&!controlPressed&&!isNormalScroll){e=e||window.event;var value=e.wheelDelta||-e.deltaY||-e.detail;var delta=Math.max(-1,Math.min(1,value));var horizontalDetection=typeof e.wheelDeltaX!=='undefined'||typeof e.deltaX!=='undefined';var isScrollingVertically=(Math.abs(e.wheelDeltaX)<Math.abs(e.wheelDelta))||(Math.abs(e.deltaX)<Math.abs(e.deltaY)||!horizontalDetection);if(scrollings.length>149){scrollings.shift()}
scrollings.push(Math.abs(value));if(options.scrollBar){preventDefault(e)}
var timeDiff=curTime-prevTime;prevTime=curTime;if(timeDiff>200){scrollings=[]}
if(canScroll){var averageEnd=getAverage(scrollings,10);var averageMiddle=getAverage(scrollings,70);var isAccelerating=averageEnd>=averageMiddle;if(isAccelerating&&isScrollingVertically){if(delta<0){scrolling('down')}else{scrolling('up')}}}
return!1}
if(options.fitToSection){activeAnimation=!1}}
function moveSlide(direction,section){var activeSection=section==null?$(SECTION_ACTIVE_SEL)[0]:section;var slides=$(SLIDES_WRAPPER_SEL,activeSection)[0];if(slides==null||slideMoving||$(SLIDE_SEL,slides).length<2){return}
var currentSlide=$(SLIDE_ACTIVE_SEL,slides)[0];var destiny=null;if(direction==='left'){destiny=prevUntil(currentSlide,SLIDE_SEL)}else{destiny=nextUntil(currentSlide,SLIDE_SEL)}
if(destiny==null){if(!options.loopHorizontal)return;var slideSiblings=siblings(currentSlide);if(direction==='left'){destiny=slideSiblings[slideSiblings.length-1]}else{destiny=slideSiblings[0]}}
slideMoving=!0&&!FP.test.isTesting;landscapeScroll(slides,destiny,direction)}
function keepSlidesPosition(){var activeSlides=$(SLIDE_ACTIVE_SEL);for(var i=0;i<activeSlides.length;i++){silentLandscapeScroll(activeSlides[i],'internal')}}
var previousDestTop=0;function getDestinationPosition(element){var elementHeight=element.offsetHeight;var elementTop=element.offsetTop;var position=elementTop;var isScrollingDown=elementTop>previousDestTop;var sectionBottom=position-windowsHeight+elementHeight;var bigSectionsDestination=options.bigSectionsDestination;if(elementHeight>windowsHeight){if(!isScrollingDown&&!bigSectionsDestination||bigSectionsDestination==='bottom'){position=sectionBottom}}else if(isScrollingDown||(isResizing&&next(element)==null)){position=sectionBottom}
previousDestTop=position;return position}
function scrollPage(element,callback,isMovementUp){if(element==null){return}
var dtop=getDestinationPosition(element);var slideAnchorLink;var slideIndex;var v={element:element,callback:callback,isMovementUp:isMovementUp,dtop:dtop,yMovement:getYmovement(element),anchorLink:element.getAttribute('data-anchor'),sectionIndex:index(element,SECTION_SEL),activeSlide:$(SLIDE_ACTIVE_SEL,element)[0],activeSection:$(SECTION_ACTIVE_SEL)[0],leavingSection:index($(SECTION_ACTIVE_SEL),SECTION_SEL)+1,localIsResizing:isResizing};if((v.activeSection==element&&!isResizing)||(options.scrollBar&&getScrollTop()===v.dtop&&!hasClass(element,AUTO_HEIGHT))){return}
if(v.activeSlide!=null){slideAnchorLink=v.activeSlide.getAttribute('data-anchor');slideIndex=index(v.activeSlide)}
if(!v.localIsResizing){var direction=v.yMovement;if(typeof isMovementUp!=='undefined'){direction=isMovementUp?'up':'down'}
v.direction=direction;if(isFunction(options.onLeave)){if(fireCallback('onLeave',v)===!1){return}}}
if(options.autoScrolling&&options.continuousVertical&&typeof(v.isMovementUp)!=="undefined"&&((!v.isMovementUp&&v.yMovement=='up')||(v.isMovementUp&&v.yMovement=='down'))){v=createInfiniteSections(v)}
if(!v.localIsResizing){stopMedia(v.activeSection)}
if(options.scrollOverflow){options.scrollOverflowHandler.beforeLeave()}
addClass(element,ACTIVE);removeClass(siblings(element),ACTIVE);lazyLoad(element);if(options.scrollOverflow){options.scrollOverflowHandler.onLeave()}
canScroll=!1||FP.test.isTesting;setState(slideIndex,slideAnchorLink,v.anchorLink,v.sectionIndex);performMovement(v);lastScrolledDestiny=v.anchorLink;activateMenuAndNav(v.anchorLink,v.sectionIndex)}
function fireCallback(eventName,v){var eventData=getEventData(eventName,v);if(!options.v2compatible){trigger(container,eventName,eventData);if(options[eventName].apply(eventData[Object.keys(eventData)[0]],toArray(eventData))===!1){return!1}}else{if(options[eventName].apply(eventData[0],eventData.slice(1))===!1){return!1}}
return!0}
function nullOrSection(el){return el?new Section(el):null}
function nullOrSlide(el){return el?new Slide(el):null}
function getEventData(eventName,v){var paramsPerEvent;if(!options.v2compatible){paramsPerEvent={afterRender:function(){return{section:nullOrSection($(SECTION_ACTIVE_SEL)[0]),slide:nullOrSlide($(SLIDE_ACTIVE_SEL,$(SECTION_ACTIVE_SEL)[0])[0])}},onLeave:function(){return{origin:nullOrSection(v.activeSection),destination:nullOrSection(v.element),direction:v.direction}},afterLoad:function(){return paramsPerEvent.onLeave()},afterSlideLoad:function(){return{section:nullOrSection(v.section),origin:nullOrSlide(v.prevSlide),destination:nullOrSlide(v.destiny),direction:v.direction}},onSlideLeave:function(){return paramsPerEvent.afterSlideLoad()}}}else{paramsPerEvent={afterRender:function(){return[container]},onLeave:function(){return[v.activeSection,v.leavingSection,(v.sectionIndex+1),v.direction]},afterLoad:function(){return[v.element,v.anchorLink,(v.sectionIndex+1)]},afterSlideLoad:function(){return[v.destiny,v.anchorLink,(v.sectionIndex+1),v.slideAnchor,v.slideIndex]},onSlideLeave:function(){return[v.prevSlide,v.anchorLink,(v.sectionIndex+1),v.prevSlideIndex,v.direction,v.slideIndex]},}}
return paramsPerEvent[eventName]()}
function performMovement(v){var isFastSpeed=options.scrollingSpeed<700;var transitionLapse=isFastSpeed?700:options.scrollingSpeed;if(options.css3&&options.autoScrolling&&!options.scrollBar){var translate3d='translate3d(0px, -'+Math.round(v.dtop)+'px, 0px)';transformContainer(translate3d,!0);if(options.scrollingSpeed){clearTimeout(afterSectionLoadsId);afterSectionLoadsId=setTimeout(function(){afterSectionLoads(v);canScroll=!isFastSpeed},options.scrollingSpeed)}else{afterSectionLoads(v)}}else{var scrollSettings=getScrollSettings(v.dtop);FP.test.top=-v.dtop+'px';css($htmlBody,{'scroll-behavior':'unset'});scrollTo(scrollSettings.element,scrollSettings.options,options.scrollingSpeed,function(){if(options.scrollBar){setTimeout(function(){afterSectionLoads(v)},30)}else{afterSectionLoads(v);canScroll=!isFastSpeed}})}
if(isFastSpeed){clearTimeout(g_transitionLapseId);g_transitionLapseId=setTimeout(function(){canScroll=!0},transitionLapse)}}
function getScrollSettings(top){var scroll={};if(options.autoScrolling&&!options.scrollBar){scroll.options=-top;scroll.element=$(WRAPPER_SEL)[0]}else{scroll.options=top;scroll.element=window}
return scroll}
function createInfiniteSections(v){if(!v.isMovementUp){after($(SECTION_ACTIVE_SEL)[0],prevAll(v.activeSection,SECTION_SEL).reverse())}else{before($(SECTION_ACTIVE_SEL)[0],nextAll(v.activeSection,SECTION_SEL))}
silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);keepSlidesPosition();v.wrapAroundElements=v.activeSection;v.dtop=v.element.offsetTop;v.yMovement=getYmovement(v.element);return v}
function continuousVerticalFixSectionOrder(v){if(v.wrapAroundElements==null){return}
if(v.isMovementUp){before($(SECTION_SEL)[0],v.wrapAroundElements)}else{after($(SECTION_SEL)[$(SECTION_SEL).length-1],v.wrapAroundElements)}
silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);keepSlidesPosition()}
function afterSectionLoads(v){continuousVerticalFixSectionOrder(v);if(isFunction(options.afterLoad)&&!v.localIsResizing){fireCallback('afterLoad',v)}
if(options.scrollOverflow){options.scrollOverflowHandler.afterLoad()}
if(!v.localIsResizing){playMedia(v.element)}
addClass(v.element,COMPLETELY);removeClass(siblings(v.element),COMPLETELY);lazyLoadOthers();canScroll=!0;if(isFunction(v.callback)){v.callback()}}
function setSrc(element,attribute){element.setAttribute(attribute,element.getAttribute('data-'+attribute));element.removeAttribute('data-'+attribute)}
function lazyLoadOthers(){var hasAutoHeightSections=$(AUTO_HEIGHT_SEL)[0]||isResponsiveMode()&&$(AUTO_HEIGHT_RESPONSIVE_SEL)[0];if(!options.lazyLoading||!hasAutoHeightSections){return}
$(SECTION_SEL+':not('+ACTIVE_SEL+')').forEach(function(section){if(isSectionInViewport(section)){lazyLoad(section)}})}
function lazyLoad(destiny){if(!options.lazyLoading){return}
var panel=getSlideOrSection(destiny);$('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]',panel).forEach(function(element){['src','srcset'].forEach(function(type){var attribute=element.getAttribute('data-'+type);if(attribute!=null&&attribute){setSrc(element,type);element.addEventListener('load',function(){onMediaLoad(destiny)})}});if(matches(element,'source')){var elementToPlay=closest(element,'video, audio');if(elementToPlay){elementToPlay.load();elementToPlay.onloadeddata=function(){onMediaLoad(destiny)}}}})}
function onMediaLoad(section){if(options.scrollOverflow){clearTimeout(g_mediaLoadedId);g_mediaLoadedId=setTimeout(function(){if(!hasClass($body,RESPONSIVE)){scrollBarHandler.createScrollBar(section)}},200)}}
function playMedia(destiny){var panel=getSlideOrSection(destiny);$('video, audio',panel).forEach(function(element){if(element.hasAttribute('data-autoplay')&&typeof element.play==='function'){element.play()}});$('iframe[src*="youtube.com/embed/"]',panel).forEach(function(element){if(element.hasAttribute('data-autoplay')){playYoutube(element)}
element.onload=function(){if(element.hasAttribute('data-autoplay')){playYoutube(element)}}})}
function playYoutube(element){element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}','*')}
function stopMedia(destiny){var panel=getSlideOrSection(destiny);$('video, audio',panel).forEach(function(element){if(!element.hasAttribute('data-keepplaying')&&typeof element.pause==='function'){element.pause()}});$('iframe[src*="youtube.com/embed/"]',panel).forEach(function(element){if(/youtube\.com\/embed\//.test(element.getAttribute('src'))&&!element.hasAttribute('data-keepplaying')){element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*')}})}
function getSlideOrSection(destiny){var slide=$(SLIDE_ACTIVE_SEL,destiny);if(slide.length){destiny=slide[0]}
return destiny}
function scrollToAnchor(){var anchors=getAnchorsURL();var sectionAnchor=anchors.section;var slideAnchor=anchors.slide;if(sectionAnchor){if(options.animateAnchor){scrollPageAndSlide(sectionAnchor,slideAnchor)}else{silentMoveTo(sectionAnchor,slideAnchor)}}}
function hashChangeHandler(){if(!isScrolling&&!options.lockAnchors){var anchors=getAnchorsURL();var sectionAnchor=anchors.section;var slideAnchor=anchors.slide;var isFirstSlideMove=(typeof lastScrolledDestiny==='undefined');var isFirstScrollMove=(typeof lastScrolledDestiny==='undefined'&&typeof slideAnchor==='undefined'&&!slideMoving);if(sectionAnchor&&sectionAnchor.length){if((sectionAnchor&&sectionAnchor!==lastScrolledDestiny)&&!isFirstSlideMove||isFirstScrollMove||(!slideMoving&&lastScrolledSlide!=slideAnchor)){scrollPageAndSlide(sectionAnchor,slideAnchor)}}}}
function getAnchorsURL(){var section;var slide;var hash=window.location.hash;if(hash.length){var anchorsParts=hash.replace('#','').split('/');var isFunkyAnchor=hash.indexOf('#/')>-1;section=isFunkyAnchor?'/'+anchorsParts[1]:decodeURIComponent(anchorsParts[0]);var slideAnchor=isFunkyAnchor?anchorsParts[2]:anchorsParts[1];if(slideAnchor&&slideAnchor.length){slide=decodeURIComponent(slideAnchor)}}
return{section:section,slide:slide}}
function keydownHandler(e){clearTimeout(keydownId);var activeElement=document.activeElement;var keyCode=e.keyCode;if(keyCode===9){onTab(e)}else if(!matches(activeElement,'textarea')&&!matches(activeElement,'input')&&!matches(activeElement,'select')&&activeElement.getAttribute('contentEditable')!=="true"&&activeElement.getAttribute('contentEditable')!==''&&options.keyboardScrolling&&options.autoScrolling){var keyControls=[40,38,32,33,34];if(keyControls.indexOf(keyCode)>-1){preventDefault(e)}
controlPressed=e.ctrlKey;keydownId=setTimeout(function(){onkeydown(e)},150)}}
function tooltipTextHandler(){trigger(prev(this),'click')}
function keyUpHandler(e){if(isWindowFocused){controlPressed=e.ctrlKey}}
function mouseDownHandler(e){if(e.which==2){oldPageY=e.pageY;container.addEventListener('mousemove',mouseMoveHandler)}}
function mouseUpHandler(e){if(e.which==2){container.removeEventListener('mousemove',mouseMoveHandler)}}
function onTab(e){var isShiftPressed=e.shiftKey;var activeElement=document.activeElement;var focusableElements=getFocusables(getSlideOrSection($(SECTION_ACTIVE_SEL)[0]));function preventAndFocusFirst(e){preventDefault(e);return focusableElements[0]?focusableElements[0].focus():null}
if(isFocusOutside(e)){return}
if(activeElement){if(closest(activeElement,SECTION_ACTIVE_SEL+','+SECTION_ACTIVE_SEL+' '+SLIDE_ACTIVE_SEL)==null){activeElement=preventAndFocusFirst(e)}}else{preventAndFocusFirst(e)}
if(!isShiftPressed&&activeElement==focusableElements[focusableElements.length-1]||isShiftPressed&&activeElement==focusableElements[0]){preventDefault(e)}}
function getFocusables(el){return[].slice.call($(focusableElementsString,el)).filter(function(item){return item.getAttribute('tabindex')!=='-1'&&item.offsetParent!==null})}
function isFocusOutside(e){var allFocusables=getFocusables(document);var currentFocusIndex=allFocusables.indexOf(document.activeElement);var focusDestinationIndex=e.shiftKey?currentFocusIndex-1:currentFocusIndex+1;var focusDestination=allFocusables[focusDestinationIndex];var destinationItemSlide=nullOrSlide(closest(focusDestination,SLIDE_SEL));var destinationItemSection=nullOrSection(closest(focusDestination,SECTION_SEL));return!destinationItemSlide&&!destinationItemSection}
function slideArrowHandler(){var section=closest(this,SECTION_SEL);if(hasClass(this,SLIDES_PREV)){if(isScrollAllowed.m.left){moveSlideLeft(section)}}else{if(isScrollAllowed.m.right){moveSlideRight(section)}}}
function focusHandler(){isWindowFocused=!0}
function blurHandler(){isWindowFocused=!1;controlPressed=!1}
function sectionBulletHandler(e){preventDefault(e);var indexBullet=index(closest(this,SECTION_NAV_SEL+' li'));scrollPage($(SECTION_SEL)[indexBullet])}
function slideBulletHandler(e){preventDefault(e);var slides=$(SLIDES_WRAPPER_SEL,closest(this,SECTION_SEL))[0];var destiny=$(SLIDE_SEL,slides)[index(closest(this,'li'))];landscapeScroll(slides,destiny)}
function menuItemsHandler(e){if($(options.menu)[0]&&(options.lockAnchors||!options.anchors.length)){preventDefault(e);moveTo(this.getAttribute('data-menuanchor'))}}
function onkeydown(e){var shiftPressed=e.shiftKey;var activeElement=document.activeElement;var isMediaFocused=matches(activeElement,'video')||matches(activeElement,'audio');if(!canScroll&&[37,39].indexOf(e.keyCode)<0){return}
switch(e.keyCode){case 38:case 33:if(isScrollAllowed.k.up){moveSectionUp()}
break;case 32:if(shiftPressed&&isScrollAllowed.k.up&&!isMediaFocused){moveSectionUp();break}
case 40:case 34:if(isScrollAllowed.k.down){if(e.keyCode!==32||!isMediaFocused){moveSectionDown()}}
break;case 36:if(isScrollAllowed.k.up){moveTo(1)}
break;case 35:if(isScrollAllowed.k.down){moveTo($(SECTION_SEL).length)}
break;case 37:if(isScrollAllowed.k.left){moveSlideLeft()}
break;case 39:if(isScrollAllowed.k.right){moveSlideRight()}
break;default:return}}
var oldPageY=0;function mouseMoveHandler(e){if(!options.autoScrolling){return}
if(canScroll){if(e.pageY<oldPageY&&isScrollAllowed.m.up){moveSectionUp()}else if(e.pageY>oldPageY&&isScrollAllowed.m.down){moveSectionDown()}}
oldPageY=e.pageY}
function landscapeScroll(slides,destiny,direction){var section=closest(slides,SECTION_SEL);var v={slides:slides,destiny:destiny,direction:direction,destinyPos:{left:destiny.offsetLeft},slideIndex:index(destiny),section:section,sectionIndex:index(section,SECTION_SEL),anchorLink:section.getAttribute('data-anchor'),slidesNav:$(SLIDES_NAV_SEL,section)[0],slideAnchor:getAnchor(destiny),prevSlide:$(SLIDE_ACTIVE_SEL,section)[0],prevSlideIndex:index($(SLIDE_ACTIVE_SEL,section)[0]),localIsResizing:isResizing};v.xMovement=getXmovement(v.prevSlideIndex,v.slideIndex);v.direction=v.direction?v.direction:v.xMovement;if(!v.localIsResizing){canScroll=!1}
if(options.onSlideLeave){if(!v.localIsResizing&&v.xMovement!=='none'){if(isFunction(options.onSlideLeave)){if(fireCallback('onSlideLeave',v)===!1){slideMoving=!1;return}}}}
addClass(destiny,ACTIVE);removeClass(siblings(destiny),ACTIVE);if(!v.localIsResizing){stopMedia(v.prevSlide);lazyLoad(destiny)}
if(!options.loopHorizontal&&options.controlArrows){toggle($(SLIDES_ARROW_PREV_SEL,section),v.slideIndex!==0);toggle($(SLIDES_ARROW_NEXT_SEL,section),next(destiny)!=null)}
if(hasClass(section,ACTIVE)&&!v.localIsResizing){setState(v.slideIndex,v.slideAnchor,v.anchorLink,v.sectionIndex)}
performHorizontalMove(slides,v,!0)}
function afterSlideLoads(v){activeSlidesNavigation(v.slidesNav,v.slideIndex);if(!v.localIsResizing){if(isFunction(options.afterSlideLoad)){fireCallback('afterSlideLoad',v)}
canScroll=!0;playMedia(v.destiny)}
slideMoving=!1}
function performHorizontalMove(slides,v,fireCallback){var destinyPos=v.destinyPos;if(options.css3){var translate3d='translate3d(-'+Math.round(destinyPos.left)+'px, 0px, 0px)';FP.test.translate3dH[v.sectionIndex]=translate3d;css(addAnimation($(SLIDES_CONTAINER_SEL,slides)),getTransforms(translate3d));afterSlideLoadsId=setTimeout(function(){if(fireCallback){afterSlideLoads(v)}},options.scrollingSpeed)}else{FP.test.left[v.sectionIndex]=Math.round(destinyPos.left);scrollTo(slides,Math.round(destinyPos.left),options.scrollingSpeed,function(){if(fireCallback){afterSlideLoads(v)}})}}
function activeSlidesNavigation(slidesNav,slideIndex){if(options.slidesNavigation&&slidesNav!=null){removeClass($(ACTIVE_SEL,slidesNav),ACTIVE);addClass($('a',$('li',slidesNav)[slideIndex]),ACTIVE)}}
var previousHeight=windowsHeight;function resizeHandler(){clearTimeout(resizeId);resizeId=setTimeout(function(){for(var i=0;i<4;i++){resizeHandlerId=setTimeout(resizeActions,200*i)}},200)}
function resizeActions(){isResizing=!0;responsive();if(isTouchDevice){var activeElement=document.activeElement;if(!matches(activeElement,'textarea')&&!matches(activeElement,'input')&&!matches(activeElement,'select')){var currentHeight=getWindowHeight();if(Math.abs(currentHeight-previousHeight)>(20*Math.max(previousHeight,currentHeight)/100)){reBuild(!0);previousHeight=currentHeight}}}else{adjustToNewViewport()}
isResizing=!1}
function responsive(){var widthLimit=options.responsive||options.responsiveWidth;var heightLimit=options.responsiveHeight;var isBreakingPointWidth=widthLimit&&window.innerWidth<widthLimit;var isBreakingPointHeight=heightLimit&&window.innerHeight<heightLimit;if(widthLimit&&heightLimit){setResponsive(isBreakingPointWidth||isBreakingPointHeight)}else if(widthLimit){setResponsive(isBreakingPointWidth)}else if(heightLimit){setResponsive(isBreakingPointHeight)}}
function addAnimation(element){var transition='all '+options.scrollingSpeed+'ms '+options.easingcss3;removeClass(element,NO_TRANSITION);return css(element,{'-webkit-transition':transition,'transition':transition})}
function removeAnimation(element){return addClass(element,NO_TRANSITION)}
function activateNavDots(name,sectionIndex){if(options.navigation&&$(SECTION_NAV_SEL)[0]!=null){removeClass($(ACTIVE_SEL,$(SECTION_NAV_SEL)[0]),ACTIVE);if(name){addClass($('a[href="#'+name+'"]',$(SECTION_NAV_SEL)[0]),ACTIVE)}else{addClass($('a',$('li',$(SECTION_NAV_SEL)[0])[sectionIndex]),ACTIVE)}}}
function activateMenuElement(name){$(options.menu).forEach(function(menu){if(options.menu&&menu!=null){removeClass($(ACTIVE_SEL,menu),ACTIVE);addClass($('[data-menuanchor="'+name+'"]',menu),ACTIVE)}})}
function activateMenuAndNav(anchor,index){activateMenuElement(anchor);activateNavDots(anchor,index)}
function getYmovement(destiny){var fromIndex=index($(SECTION_ACTIVE_SEL)[0],SECTION_SEL);var toIndex=index(destiny,SECTION_SEL);if(fromIndex==toIndex){return'none'}
if(fromIndex>toIndex){return'up'}
return'down'}
function getXmovement(fromIndex,toIndex){if(fromIndex==toIndex){return'none'}
if(fromIndex>toIndex){return'left'}
return'right'}
function addTableClass(element){if(!hasClass(element,TABLE)){var wrapper=document.createElement('div');wrapper.className=TABLE_CELL;wrapper.style.height=getTableHeight(element)+'px';addClass(element,TABLE);wrapInner(element,wrapper)}}
function getTableHeight(element){var sectionHeight=windowsHeight;if(options.paddingTop||options.paddingBottom){var section=element;if(!hasClass(section,SECTION)){section=closest(element,SECTION_SEL)}
var paddings=parseInt(getComputedStyle(section)['padding-top'])+parseInt(getComputedStyle(section)['padding-bottom']);sectionHeight=(windowsHeight-paddings)}
return sectionHeight}
function transformContainer(translate3d,animated){if(animated){addAnimation(container)}else{removeAnimation(container)}
css(container,getTransforms(translate3d));FP.test.translate3d=translate3d;setTimeout(function(){removeClass(container,NO_TRANSITION)},10)}
function getSectionByAnchor(sectionAnchor){var section=$(SECTION_SEL+'[data-anchor="'+sectionAnchor+'"]',container)[0];if(!section){var sectionIndex=typeof sectionAnchor!=='undefined'?sectionAnchor-1:0;section=$(SECTION_SEL)[sectionIndex]}
return section}
function getSlideByAnchor(slideAnchor,section){var slide=$(SLIDE_SEL+'[data-anchor="'+slideAnchor+'"]',section)[0];if(slide==null){slideAnchor=typeof slideAnchor!=='undefined'?slideAnchor:0;slide=$(SLIDE_SEL,section)[slideAnchor]}
return slide}
function scrollPageAndSlide(sectionAnchor,slideAnchor){var section=getSectionByAnchor(sectionAnchor);if(section==null)return;var slide=getSlideByAnchor(slideAnchor,section);if(getAnchor(section)!==lastScrolledDestiny&&!hasClass(section,ACTIVE)){scrollPage(section,function(){scrollSlider(slide)})}else{scrollSlider(slide)}}
function scrollSlider(slide){if(slide!=null){landscapeScroll(closest(slide,SLIDES_WRAPPER_SEL),slide)}}
function addSlidesNavigation(section,numSlides){appendTo(createElementFromHTML('<div class="'+SLIDES_NAV+'"><ul></ul></div>'),section);var nav=$(SLIDES_NAV_SEL,section)[0];addClass(nav,'fp-'+options.slidesNavPosition);for(var i=0;i<numSlides;i++){var slide=$(SLIDE_SEL,section)[i];appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">'+getBulletLinkName(i,'Slide',slide)+'</span><span></span></a></li>'),$('ul',nav)[0])}
css(nav,{'margin-left':'-'+(nav.innerWidth/2)+'px'});addClass($('a',$('li',nav)[0]),ACTIVE)}
function setState(slideIndex,slideAnchor,anchorLink,sectionIndex){var sectionHash='';if(options.anchors.length&&!options.lockAnchors){if(slideIndex){if(anchorLink!=null){sectionHash=anchorLink}
if(slideAnchor==null){slideAnchor=slideIndex}
lastScrolledSlide=slideAnchor;setUrlHash(sectionHash+'/'+slideAnchor)}else if(slideIndex!=null){lastScrolledSlide=slideAnchor;setUrlHash(anchorLink)}else{setUrlHash(anchorLink)}}
setBodyClass()}
function setUrlHash(url){if(options.recordHistory){location.hash=url}else{if(isTouchDevice||isTouch){window.history.replaceState(undefined,undefined,'#'+url)}else{var baseUrl=window.location.href.split('#')[0];window.location.replace(baseUrl+'#'+url)}}}
function getAnchor(element){if(!element){return null}
var anchor=element.getAttribute('data-anchor');var elementIndex=index(element);if(anchor==null){anchor=elementIndex}
return anchor}
function setBodyClass(){var section=$(SECTION_ACTIVE_SEL)[0];var slide=$(SLIDE_ACTIVE_SEL,section)[0];var sectionAnchor=getAnchor(section);var slideAnchor=getAnchor(slide);var text=String(sectionAnchor);if(slide){text=text+'-'+slideAnchor}
text=text.replace('/','-').replace('#','');var classRe=new RegExp('\\b\\s?'+VIEWING_PREFIX+'-[^\\s]+\\b',"g");$body.className=$body.className.replace(classRe,'');addClass($body,VIEWING_PREFIX+'-'+text)}
function support3d(){var el=document.createElement('p'),has3d,transforms={'webkitTransform':'-webkit-transform','OTransform':'-o-transform','msTransform':'-ms-transform','MozTransform':'-moz-transform','transform':'transform'};el.style.display='block';document.body.insertBefore(el,null);for(var t in transforms){if(el.style[t]!==undefined){el.style[t]='translate3d(1px,1px,1px)';has3d=window.getComputedStyle(el).getPropertyValue(transforms[t])}}
document.body.removeChild(el);return(has3d!==undefined&&has3d.length>0&&has3d!=='none')}
function removeMouseWheelHandler(){if(document.addEventListener){document.removeEventListener('mousewheel',MouseWheelHandler,!1);document.removeEventListener('wheel',MouseWheelHandler,!1);document.removeEventListener('MozMousePixelScroll',MouseWheelHandler,!1)}else{document.detachEvent('onmousewheel',MouseWheelHandler)}}
function addMouseWheelHandler(){var prefix='';var _addEventListener;if(window.addEventListener){_addEventListener="addEventListener"}else{_addEventListener="attachEvent";prefix='on'}
var support='onwheel' in document.createElement('div')?'wheel':document.onmousewheel!==undefined?'mousewheel':'DOMMouseScroll';var passiveEvent=g_supportsPassive?{passive:!1}:!1;if(support=='DOMMouseScroll'){document[_addEventListener](prefix+'MozMousePixelScroll',MouseWheelHandler,passiveEvent)}else{document[_addEventListener](prefix+support,MouseWheelHandler,passiveEvent)}}
function addMiddleWheelHandler(){container.addEventListener('mousedown',mouseDownHandler);container.addEventListener('mouseup',mouseUpHandler)}
function removeMiddleWheelHandler(){container.removeEventListener('mousedown',mouseDownHandler);container.removeEventListener('mouseup',mouseUpHandler)}
function addTouchHandler(){if(isTouchDevice||isTouch){if(options.autoScrolling){$body.removeEventListener(events.touchmove,preventBouncing,{passive:!1});$body.addEventListener(events.touchmove,preventBouncing,{passive:!1})}
var touchWrapper=options.touchWrapper;touchWrapper.removeEventListener(events.touchstart,touchStartHandler);touchWrapper.removeEventListener(events.touchmove,touchMoveHandler,{passive:!1});touchWrapper.addEventListener(events.touchstart,touchStartHandler);touchWrapper.addEventListener(events.touchmove,touchMoveHandler,{passive:!1})}}
function removeTouchHandler(){if(isTouchDevice||isTouch){if(options.autoScrolling){$body.removeEventListener(events.touchmove,touchMoveHandler,{passive:!1});$body.removeEventListener(events.touchmove,preventBouncing,{passive:!1})}
var touchWrapper=options.touchWrapper;touchWrapper.removeEventListener(events.touchstart,touchStartHandler);touchWrapper.removeEventListener(events.touchmove,touchMoveHandler,{passive:!1})}}
function getMSPointer(){var pointer;if(window.PointerEvent){pointer={down:'pointerdown',move:'pointermove'}}else{pointer={down:'MSPointerDown',move:'MSPointerMove'}}
return pointer}
function getEventsPage(e){var events=[];events.y=(typeof e.pageY!=='undefined'&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY);events.x=(typeof e.pageX!=='undefined'&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX);if(isTouch&&isReallyTouch(e)&&options.scrollBar&&typeof e.touches!=='undefined'){events.y=e.touches[0].pageY;events.x=e.touches[0].pageX}
return events}
function silentLandscapeScroll(activeSlide,noCallbacks){setScrollingSpeed(0,'internal');if(typeof noCallbacks!=='undefined'){isResizing=!0}
landscapeScroll(closest(activeSlide,SLIDES_WRAPPER_SEL),activeSlide);if(typeof noCallbacks!=='undefined'){isResizing=!1}
setScrollingSpeed(originals.scrollingSpeed,'internal')}
function silentScroll(top){var roundedTop=Math.round(top);if(options.css3&&options.autoScrolling&&!options.scrollBar){var translate3d='translate3d(0px, -'+roundedTop+'px, 0px)';transformContainer(translate3d,!1)}else if(options.autoScrolling&&!options.scrollBar){css(container,{'top':-roundedTop+'px'});FP.test.top=-roundedTop+'px'}else{var scrollSettings=getScrollSettings(roundedTop);setScrolling(scrollSettings.element,scrollSettings.options)}}
function getTransforms(translate3d){return{'-webkit-transform':translate3d,'-moz-transform':translate3d,'-ms-transform':translate3d,'transform':translate3d}}
function setIsScrollAllowed(value,direction,type){if(direction!=='all'){isScrollAllowed[type][direction]=value}else{Object.keys(isScrollAllowed[type]).forEach(function(key){isScrollAllowed[type][key]=value})}}
function destroy(all){setAutoScrolling(!1,'internal');setAllowScrolling(!0);setMouseHijack(!1);setKeyboardScrolling(!1);addClass(container,DESTROYED);[afterSlideLoadsId,afterSectionLoadsId,resizeId,scrollId,scrollId2,g_doubleCheckHeightId,resizeHandlerId,g_transitionLapseId].forEach(function(timeoutId){clearTimeout(timeoutId)});window.removeEventListener('scroll',scrollHandler);window.removeEventListener('hashchange',hashChangeHandler);window.removeEventListener('resize',resizeHandler);document.removeEventListener('keydown',keydownHandler);document.removeEventListener('keyup',keyUpHandler);['click','touchstart'].forEach(function(eventName){document.removeEventListener(eventName,delegatedEvents)});['mouseenter','touchstart','mouseleave','touchend'].forEach(function(eventName){document.removeEventListener(eventName,onMouseEnterOrLeave,!0)});if(all){destroyStructure()}}
function destroyStructure(){silentScroll(0);$('img[data-src], source[data-src], audio[data-src], iframe[data-src]',container).forEach(function(item){setSrc(item,'src')});$('img[data-srcset]').forEach(function(item){setSrc(item,'srcset')});remove($(SECTION_NAV_SEL+', '+SLIDES_NAV_SEL+', '+SLIDES_ARROW_SEL));css($(SECTION_SEL),{'height':'','background-color':'','padding':''});css($(SLIDE_SEL),{'width':''});css(container,{'height':'','position':'','-ms-touch-action':'','touch-action':''});css($htmlBody,{'overflow':'','height':''});removeClass($html,ENABLED);removeClass($body,RESPONSIVE);$body.className.split(/\s+/).forEach(function(className){if(className.indexOf(VIEWING_PREFIX)===0){removeClass($body,className)}});$(SECTION_SEL+', '+SLIDE_SEL).forEach(function(item){if(options.scrollOverflowHandler&&options.scrollOverflow){options.scrollOverflowHandler.remove(item)}
removeClass(item,TABLE+' '+ACTIVE+' '+COMPLETELY);var previousStyles=item.getAttribute('data-fp-styles');if(previousStyles){item.setAttribute('style',item.getAttribute('data-fp-styles'))}
if(hasClass(item,SECTION)&&!g_initialAnchorsInDom){item.removeAttribute('data-anchor')}});removeAnimation(container);[TABLE_CELL_SEL,SLIDES_CONTAINER_SEL,SLIDES_WRAPPER_SEL].forEach(function(selector){$(selector,container).forEach(function(item){unwrap(item)})});css(container,{'-webkit-transition':'none','transition':'none'});window.scrollTo(0,0);var usedSelectors=[SECTION,SLIDE,SLIDES_CONTAINER];usedSelectors.forEach(function(item){removeClass($('.'+item),item)})}
function setVariableState(variable,value,type){options[variable]=value;if(type!=='internal'){originals[variable]=value}}
function displayWarnings(){var l=options['li'+'c'+'enseK'+'e'+'y'];var msgStyle='font-size: 15px;background:yellow;';if(!isOK){showError('error','Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:');showError('error','https://github.com/alvarotrigo/fullPage.js#options')}else if(l&&l.length<20){console.warn('%c This website was made using fullPage.js slider. More info on the following website:',msgStyle);console.warn('%c https://alvarotrigo.com/fullPage/',msgStyle)}
if(hasClass($html,ENABLED)){showError('error','Fullpage.js can only be initialized once and you are doing it multiple times!');return}
if(options.continuousVertical&&(options.loopTop||options.loopBottom)){options.continuousVertical=!1;showError('warn','Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled')}
if(options.scrollOverflow&&(options.scrollBar||!options.autoScrolling)){showError('warn','Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox')}
if(options.continuousVertical&&(options.scrollBar||!options.autoScrolling)){options.continuousVertical=!1;showError('warn','Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled')}
if(options.scrollOverflow&&options.scrollOverflowHandler==null){options.scrollOverflow=!1;showError('error','The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.')}
extensions.forEach(function(extension){if(options[extension]){showError('warn','fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: '+extension)}});options.anchors.forEach(function(name){var nameAttr=[].slice.call($('[name]')).filter(function(item){return item.getAttribute('name')&&item.getAttribute('name').toLowerCase()==name.toLowerCase()});var idAttr=[].slice.call($('[id]')).filter(function(item){return item.getAttribute('id')&&item.getAttribute('id').toLowerCase()==name.toLowerCase()});if(idAttr.length||nameAttr.length){showError('error','data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');var propertyName=idAttr.length?'id':'name';if(idAttr.length||nameAttr.length){showError('error','"'+name+'" is is being used by another element `'+propertyName+'` property')}}})}
function getScrolledPosition(element){var position;if(element.self!=window&&hasClass(element,SLIDES_WRAPPER)){position=element.scrollLeft}else if(!options.autoScrolling||options.scrollBar){position=getScrollTop()}else{position=element.offsetTop}
return position}
function scrollTo(element,to,duration,callback){var start=getScrolledPosition(element);var change=to-start;var currentTime=0;var increment=20;activeAnimation=!0;var animateScroll=function(){if(activeAnimation){var val=to;currentTime+=increment;if(duration){val=window.fp_easings[options.easing](currentTime,start,change,duration)}
setScrolling(element,val);if(currentTime<duration){setTimeout(animateScroll,increment)}else if(typeof callback!=='undefined'){callback()}}else if(currentTime<duration){callback()}};animateScroll()}
function setScrolling(element,val){if(!options.autoScrolling||options.scrollBar||(element.self!=window&&hasClass(element,SLIDES_WRAPPER))){if(element.self!=window&&hasClass(element,SLIDES_WRAPPER)){element.scrollLeft=val}else{element.scrollTo(0,val)}}else{element.style.top=val+'px'}}
function getActiveSlide(){var activeSlide=$(SLIDE_ACTIVE_SEL,$(SECTION_ACTIVE_SEL)[0])[0];return nullOrSlide(activeSlide)}
function getActiveSection(){return new Section($(SECTION_ACTIVE_SEL)[0])}
function Item(el,selector){this.anchor=el.getAttribute('data-anchor');this.item=el;this.index=index(el,selector);this.isLast=this.index===el.parentElement.querySelectorAll(selector).length-1;this.isFirst=!this.index}
function Section(el){Item.call(this,el,SECTION_SEL)}
function Slide(el){Item.call(this,el,SLIDE_SEL)}
return FP}
function showError(type,text){window.console&&window.console[type]&&window.console[type]('fullPage: '+text)}
function $(selector,context){context=arguments.length>1?context:document;return context?context.querySelectorAll(selector):null}
function deepExtend(out){out=out||{};for(var i=1,len=arguments.length;i<len;++i){var obj=arguments[i];if(!obj){continue}
for(var key in obj){if(!obj.hasOwnProperty(key)){continue}
if(Object.prototype.toString.call(obj[key])==='[object Object]'){out[key]=deepExtend(out[key],obj[key]);continue}
out[key]=obj[key]}}
return out}
function hasClass(el,className){if(el==null){return!1}
if(el.classList){return el.classList.contains(className)}
return new RegExp('(^| )'+className+'( |$)','gi').test(el.className)}
function getWindowHeight(){return'innerHeight' in window?window.innerHeight:document.documentElement.offsetHeight}
function getWindowWidth(){return window.innerWidth}
function css(items,props){items=getList(items);var key;for(key in props){if(props.hasOwnProperty(key)){if(key!==null){for(var i=0;i<items.length;i++){var item=items[i];item.style[key]=props[key]}}}}
return items}
function until(item,selector,fn){var sibling=item[fn];while(sibling&&!matches(sibling,selector)){sibling=sibling[fn]}
return sibling}
function prevUntil(item,selector){return until(item,selector,'previousElementSibling')}
function nextUntil(item,selector){return until(item,selector,'nextElementSibling')}
function prev(item){return item.previousElementSibling}
function next(item){return item.nextElementSibling}
function last(item){return item[item.length-1]}
function index(item,selector){item=isArrayOrList(item)?item[0]:item;var children=selector!=null?$(selector,item.parentNode):item.parentNode.childNodes;var num=0;for(var i=0;i<children.length;i++){if(children[i]==item)return num;if(children[i].nodeType==1)num++}
return-1}
function getList(item){return!isArrayOrList(item)?[item]:item}
function hide(el){el=getList(el);for(var i=0;i<el.length;i++){el[i].style.display='none'}
return el}
function show(el){el=getList(el);for(var i=0;i<el.length;i++){el[i].style.display='block'}
return el}
function isArrayOrList(el){return Object.prototype.toString.call(el)==='[object Array]'||Object.prototype.toString.call(el)==='[object NodeList]'}
function addClass(el,className){el=getList(el);for(var i=0;i<el.length;i++){var item=el[i];if(item.classList){item.classList.add(className)}else{item.className+=' '+className}}
return el}
function removeClass(el,className){el=getList(el);var classNames=className.split(' ');for(var a=0;a<classNames.length;a++){className=classNames[a];for(var i=0;i<el.length;i++){var item=el[i];if(item.classList){item.classList.remove(className)}else{item.className=item.className.replace(new RegExp('(^|\\b)'+className.split(' ').join('|')+'(\\b|$)','gi'),' ')}}}
return el}
function appendTo(el,parent){parent.appendChild(el)}
function wrap(toWrap,wrapper,isWrapAll){var newParent;wrapper=wrapper||document.createElement('div');for(var i=0;i<toWrap.length;i++){var item=toWrap[i];if(isWrapAll&&!i||!isWrapAll){newParent=wrapper.cloneNode(!0);item.parentNode.insertBefore(newParent,item)}
newParent.appendChild(item)}
return toWrap}
function wrapAll(toWrap,wrapper){wrap(toWrap,wrapper,!0)}
function wrapInner(parent,wrapper){if(typeof wrapper==="string"){wrapper=createElementFromHTML(wrapper)}
parent.appendChild(wrapper);while(parent.firstChild!==wrapper){wrapper.appendChild(parent.firstChild)}}
function unwrap(wrapper){var wrapperContent=document.createDocumentFragment();while(wrapper.firstChild){wrapperContent.appendChild(wrapper.firstChild)}
wrapper.parentNode.replaceChild(wrapperContent,wrapper)}
function closest(el,selector){if(el&&el.nodeType===1){if(matches(el,selector)){return el}
return closest(el.parentNode,selector)}
return null}
function after(reference,el){insertBefore(reference,reference.nextSibling,el)}
function before(reference,el){insertBefore(reference,reference,el)}
function insertBefore(reference,beforeElement,el){if(!isArrayOrList(el)){if(typeof el=='string'){el=createElementFromHTML(el)}
el=[el]}
for(var i=0;i<el.length;i++){reference.parentNode.insertBefore(el[i],beforeElement)}}
function getScrollTop(){var doc=document.documentElement;return(window.pageYOffset||doc.scrollTop)-(doc.clientTop||0)}
function siblings(el){return Array.prototype.filter.call(el.parentNode.children,function(child){return child!==el})}
function preventDefault(event){if(event.preventDefault){event.preventDefault()}else{event.returnValue=!1}}
function isFunction(item){if(typeof item==='function'){return!0}
var type=Object.prototype.toString(item);return type==='[object Function]'||type==='[object GeneratorFunction]'}
function trigger(el,eventName,data){var event;data=typeof data==='undefined'?{}:data;if(typeof window.CustomEvent==="function"){event=new CustomEvent(eventName,{detail:data})}else{event=document.createEvent('CustomEvent');event.initCustomEvent(eventName,!0,!0,data)}
el.dispatchEvent(event)}
function matches(el,selector){return(el.matches||el.matchesSelector||el.msMatchesSelector||el.mozMatchesSelector||el.webkitMatchesSelector||el.oMatchesSelector).call(el,selector)}
function toggle(el,value){if(typeof value==="boolean"){for(var i=0;i<el.length;i++){el[i].style.display=value?'block':'none'}}
return el}
function createElementFromHTML(htmlString){var div=document.createElement('div');div.innerHTML=htmlString.trim();return div.firstChild}
function remove(items){items=getList(items);for(var i=0;i<items.length;i++){var item=items[i];if(item&&item.parentElement){item.parentNode.removeChild(item)}}}
function filter(el,filterFn){Array.prototype.filter.call(el,filterFn)}
function untilAll(item,selector,fn){var sibling=item[fn];var siblings=[];while(sibling){if(matches(sibling,selector)||selector==null){siblings.push(sibling)}
sibling=sibling[fn]}
return siblings}
function nextAll(item,selector){return untilAll(item,selector,'nextElementSibling')}
function prevAll(item,selector){return untilAll(item,selector,'previousElementSibling')}
function toArray(objectData){return Object.keys(objectData).map(function(key){return objectData[key]})}
if(window.NodeList&&!NodeList.prototype.forEach){NodeList.prototype.forEach=function(callback,thisArg){thisArg=thisArg||window;for(var i=0;i<this.length;i++){callback.call(thisArg,this[i],i,this)}}}
window.fp_utils={$:$,deepExtend:deepExtend,hasClass:hasClass,getWindowHeight:getWindowHeight,css:css,until:until,prevUntil:prevUntil,nextUntil:nextUntil,prev:prev,next:next,last:last,index:index,getList:getList,hide:hide,show:show,isArrayOrList:isArrayOrList,addClass:addClass,removeClass:removeClass,appendTo:appendTo,wrap:wrap,wrapAll:wrapAll,wrapInner:wrapInner,unwrap:unwrap,closest:closest,after:after,before:before,insertBefore:insertBefore,getScrollTop:getScrollTop,siblings:siblings,preventDefault:preventDefault,isFunction:isFunction,trigger:trigger,matches:matches,toggle:toggle,createElementFromHTML:createElementFromHTML,remove:remove,filter:filter,untilAll:untilAll,nextAll:nextAll,prevAll:prevAll,showError:showError};return initialise}));if(window.jQuery&&window.fullpage){(function($,fullpage){'use strict';if(!$||!fullpage){window.fp_utils.showError('error','jQuery is required to use the jQuery fullpage adapter!');return}
$.fn.fullpage=function(options){options=$.extend({},options,{'$':$});var instance=new fullpage(this[0],options)}})(window.jQuery,window.fullpage)}
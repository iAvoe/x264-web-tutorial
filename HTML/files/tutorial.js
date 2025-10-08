/*jshint esversion: 6 */
/*jslint devel: true */
/*eslint no-extend-native: ["error", { "exceptions": ["Object"] }]*/
var document; // Rectifying 'document not defined'
var window; // Rectifying 'window not defined'
var mainPara;
if (document !== "undefined") {
    // Code that relies on the document object
    document.cookie = 'CookieName=NULL; SameSite=Strict';
}
let widthOffset = 18;
let resizeTimeout; // Debouncing value

/**
 * LaTex formula conversion support
 */
window.MathJax = {
    tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
    svg: { fontCache: 'global' }
};

// Scroll position maintainer variables
let scrollPosition = { x: 0, y: 0 };
let isResizing = false;

/**
 * Store current scroll position
 */
function storeScrollPosition() {
    scrollPosition.x =
        window.pageXOffset || document.documentElement.scrollLeft;
    scrollPosition.y =
        window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Restore scroll position with optional offset adjustment
 * @param {number} [offsetY=0] Additional Y offset in pixels
 * @param {number} [offsetX=0] Additional X offset in pixels
 */
function restoreScrollPosition(offsetY=0, offsetX=0) {
    // Using requestAnimationFrame to wait for scroll completion
    requestAnimationFrame(() => {
        window.scrollTo(
            scrollPosition.x+offsetX, scrollPosition.y+offsetY
        );
    });
}

/**
 * Detection of mobile platform
 * Increase line height in Desktop
 * Change main container class on the fly (window Width > window Height)
 * This only changes style, not class, otherwise it would break class detection on image click re-formating
 * The internal variable "rootDiv" is reserved for multiple content div (container-mobile/desktop rounded-9 border-main) layout, but unused so far
 * @param {number} widthOffset The width offset for window width <= height check, decides whether change to mobile (taller) or desktop (wider) styling
 * @returns New class configuration for the content div which contains main content
 */
function switchPlatform(widthOffset=0) {
    if (isNaN(widthOffset)) {
        console.error(
            "switchPlatform(): width offset parameter is not a number"
        );
    }
    
    // Store scroll position before making changes
    if (isResizing) {
        storeScrollPosition();
    }
    
    if (window.innerWidth+widthOffset <= window.innerHeight) { // Mobile / Vertical Layout
        // Set class for the main container div for Mobile only
        let rootDivs = document.querySelectorAll(
            'div.container-desktop.rounded-9.border-main'
        );
        for (let i=0; i<rootDivs.length; i++) {
            rootDivs[i].setAttribute(
                "class", "container-mobile rounded-9 border-main"
            );
        }
        // Decrease mobile font size
        document.body.style.fontSize = "0.8rem";
        // Decrease PPM table's font size for Mobile, because it's massive size
        if (
            document.getElementsByClassName(
                "table-fit-container align-items-center text-smaller").length > 0
        ) {
            document.getElementsByClassName(
                    "table-fit-container align-items-center text-smaller"
                )[0].setAttribute(
                    "class", "table-fit-container align-items-center text-xs"
                );
        }
        // Decrease preset parameter's font size for Mobile, because of it's massive size
        if (
            document.getElementsByClassName(
                "table-fit-container text-smaller").length > 0
        ) {
            document.getElementsByClassName(
                    "table-fit-container text-smaller"
                )[0].setAttribute(
                    "class", "table-fit-container text-xs"
                );
        }
    }
    else { // Desktop / Horizontal Layout
        document.body.style.fontSize = "1rem";
        // Set class for the main container div for Desktop only
        let rootDivs = document.querySelectorAll(
            'div.container-mobile.rounded-9.border-main'
        );
        for (let i=0; i<rootDivs.length; i++) {
            rootDivs[i].setAttribute(
                "class", "container-desktop rounded-9 border-main"
            );
        }
        // Increase line height for Desktop
        mainParagraph =
            document.querySelectorAll('p:not([class])');
        for (let i=0; i<mainParagraph.length; i++) {
            mainParagraph[i].style.lineHeight = "2.5rem";
        }
        // Increase PPM table's font size for Desktop, because it's massive size
        if (
            document.getElementsByClassName(
                "table-fit-container align-items-center text-xs").length > 0
        ) {
            document.getElementsByClassName(
                "table-fit-container align-items-center text-xs"
            )[0].setAttribute(
                "class", "table-fit-container align-items-center text-smaller"
            );
        }
        // Increase preset parameter's font size for Desktop, because of it's massive size
        if (
            document.getElementsByClassName(
                "table-fit-container text-xs").length > 0
        ) {
            document.getElementsByClassName(
                "table-fit-container text-xs"
            )[0].setAttribute(
                "class", "table-fit-container text-smaller"
            );
        }
    }
    
    // Restore scroll position after making changes
    if (isResizing) {
        restoreScrollPosition();
    }
}

window.addEventListener('resize', () => {
    isResizing = true;
    
    // Clear existing timeout
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    
    // Store scroll position immediately
    storeScrollPosition();
    
    // Debounce
    resizeTimeout = setTimeout(() => {
        switchPlatform(widthOffset);
        isResizing = false;
    }, 100);
}, false);

// Store initial scroll position on load
window.addEventListener('load', () => {
    storeScrollPosition();
}, false);

// Update scroll position on scroll (when user scrolls between resize events)
let scrollTimeout; // Debouncing value
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        if (!isResizing) {
            storeScrollPosition();
        }
    }, 50); // 50ms delay for scroll updates
}, { passive: true });

window.switchPlatform(widthOffset); // Call this function during load as well

/**
 * Click image to enlarge && copy 'alt' attribute to 'title' so I don't have to manual write everything painstakingly
 * The 'Click image to enlarge' has many edge cases as left-right to top-down layout changes with edge cases are considered because all image should support it
 */
const imgs = document.querySelectorAll('img');
for (let i=0; i<imgs.length; i++) {
    let LR_UD_ID = 0;
    imgs[i].addEventListener('click', ()=>{ 
        // Store scroll position before image size change
        storeScrollPosition();

        switch(imgs[i].getAttribute('class')) {
            case 'img-medium':
                imgs[i].setAttribute("class", "");
                break;
            case '':
                imgs[i].setAttribute("class", "img-small");
                break;
            case 'img-small':
                imgs[i].setAttribute("class", "img-medium");
                break;
            case 'mt-1 img-medium':
                imgs[i].setAttribute("class", "mt-1");
                break;
            case 'mt-1':
                imgs[i].setAttribute("class", "mt-1 img-small");
                break;
            case 'mt-1 img-small':
                imgs[i].setAttribute("class", "mt-1 img-medium");
                break;
            // Images under row column grid system
            case 'img-medium img-right col-4': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2': // Rotation 3 - Smal to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;
            // Edge case - Images under row column grid system and auto margin bottom
            case 'img-medium img-right col-4 mb-auto': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto mb-auto': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2 mb-auto': // Rotation 3 - Smal to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;
            // Edge case - iamges with margin top
            case 'img-medium img-right col-4 mt-3': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto mt-3");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto mt-3': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2 mt-3");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2 mt-3': // Rotation 3 - Small to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4 mt-3");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-"+(LR_UD_ID-1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;   
            // Edge case - iamges with margin top and auto margin bottom
            case 'img-medium img-right col-4 mt-3 mb-auto': // Rotation 1 - Medium to Large
                imgs[i].setAttribute("class", "img-right col-auto mt-3 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-auto");
                break;
            case 'img-right col-auto mt-3 mb-auto': // Rotation 2 - Large to Small
                imgs[i].setAttribute("class", "img-small img-right col-2 mt-3 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-10");
                break;
            case 'img-small img-right col-2 mt-3 mb-auto': // Rotation 3 - Small to Medium
                imgs[i].setAttribute("class", "img-medium img-right col-4 mt-3 mb-auto");
                // i.e., Image element id: LR-UD-2, then the same column text block element id: LR-UD-1
                LR_UD_ID = parseInt(imgs[i].id.substring(6, [imgs[i].id.length]));
                document.getElementById("LR-UD-" + (LR_UD_ID - 1).toString().padStart(3, '0')).setAttribute("class", "col-8");
                break;    
            default:
                console.log("Click image event switch failed: calculated id "+LR_UD_ID);
                break;
        }
        // Restore scroll position after image size change
        setTimeout(() => {
            restoreScrollPosition();
        }, 10);
    }, false);
    // Set title attribute with alt attribute
    imgs[i].setAttribute('title', imgs[i].getAttribute('alt'));
}

/**
 * Change all anchor behavior to open external page
 * Modified to used class name detection, so it is more html compliant
 */
anchors = document.querySelectorAll('a');
for (let i=0; i<anchors.length; i++) {
    if (anchors[i].classList.contains('toSelf')) {
        anchors[i].setAttribute("target", "_self");
        anchors[i].classList.remove('toSelf');
    }
    else {
        anchors[i].setAttribute("target", "_blank");
    }
} 

/* Accordion collapse support */
var collapseBtns =
    document.getElementsByClassName('collapsible');
/* Register collapse event to all buttons */
for (let i=0; i<collapseBtns.length; i++) {
    collapseBtns[i].addEventListener("click", function() {
        this.classList.toggle("active"); // Change button text from "-" to "+"
        var collContent = this.nextElementSibling;
        collContent.style.display === "block"
            ? collContent.style.display = "none"
            : collContent.style.display = "block";
    });
}

/**
 * Printing support 1-2 - Collapse & Un-collapse all collapsed contents
 * @returns All collapsed content are expanded
 */
function toggleCollapseAll() {
    "use strict";

    // Store scroll position before toggling
    storeScrollPosition();

    for (let i=0; i<collapseBtns.length; i++) {
        if (collapseBtns[i].classList.contains("collapsible")) {
            collapseBtns[i].click();
            // Syncronize all collapsing/expanding content, in case some collapsed content are expanded and some are not
            if (collapseBtns[0].classList.length
                !== collapseBtns[i].classList.length) {
                collapseBtns[i].click();
            }
        }
    }
    // Restore scroll position after all toggles
    setTimeout(() => {
        restoreScrollPosition();
    }, 50);
}

let printT =
    document.querySelector('div.container-title');
let printC =
    document.querySelector(
        'div.container-desktop.rounded-9.border-main'
    )
    || document.querySelector(
        'div.container-mobile.rounded-9.border-main'
    );
/**
 * Printing support 3 - Remove main div class and background
 * @param {object} title The title div which was captured earlier
 * @param {object} content The content div which was captured earlier
 * @returns New class configuration for the title & content div which contains main content
 */
function printMode(title, content) {
    if (title.tagName!='div' || content.tagName!='div') { 
        console.error("printMode(): missing title or/and container divs");
        return;
    }
    // Change background to white on print
    document.body.style.backgroundColor = '#fff';
    // Store scroll position before entering print mode
    storeScrollPosition();

    title.setAttribute("class", "");
    content.setAttribute("class", "");

   // Restore scroll position after entering print mode
    setTimeout(() => {
        restoreScrollPosition();
    }, 100);
}

/**
 * Printing support 4 - Restore original page
 * Deactivate printing mode by restoring class atttributes of title and main div
 * @param {object} title The title div which was captured earlier
 * @param {object} content The content div which was captured earlier
 * @param {number} widthOffset The width offset for window width <= height check, decides whether change to mobile (taller) or desktop (wider) styling
 * @returns New class configuration for the title & content div which contains main content
 */
function printModeOff(title, content, widthOffset) {
    if (title.tagName != 'DIV' || content.tagName != 'DIV') { 
        console.error(
            "printModeOff(): parameter must be title and container divs"
        );
        return;
    }
    document.body.style.backgroundColor = '#dee2e6';
    // Store scroll position before entering print mode
    storeScrollPosition();

    title.setAttribute("class", "container-title");
    window.innerWidth+widthOffset <= window.innerHeight // Mobile / Vertical Layout
        ? content.setAttribute(
            "class", "container-mobile rounded-9 border-main"
        )
        : content.setAttribute(
            "class", "container-desktop rounded-9 border-main"
        );

    // Restore scroll position after entering print mode
    setTimeout(() => {
        restoreScrollPosition();
    }, 100);
}

/**
 * Manually store current scroll position (useful for custom scenarios)
 * @returns {Object} Current scroll position {x, y}
 */
function manualStoreScrollPosition() {
    storeScrollPosition();
    return { ...scrollPosition };
}

/**
 * Manually restore scroll position (useful for custom scenarios)
 * @param {number} [offsetY=0] Additional Y offset
 * @param {number} [offsetX=0] Additional X offset
 */
function manualRestoreScrollPosition(offsetY = 0, offsetX = 0) {
    restoreScrollPosition(offsetY, offsetX);
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//variables
const fileName = figma.root.name;
var pageNodes = [];
var pageNames = [];
for (var page of figma.root.children) {
    pageNodes.push(page.id);
    pageNames.push(page.name);
}
importFonts()
    .then(() => {
    var frame = setFrame();
    for (var i = 1; i < pageNodes.length; i++) {
        var text = addPageInfo(pageNodes[i], pageNames[i]);
        frame.appendChild(text);
    }
    //place the frame in focus
    figma.viewport.scrollAndZoomIntoView(frame.children);
    figma.closePlugin("Table of Contents has been added 🚀");
})
    .catch(error => {
    console.log(error);
});
//list font family and all its versions here
//import the fonts for use
function importFonts() {
    return __awaiter(this, void 0, void 0, function* () {
        let promNoto = yield figma.loadFontAsync({ family: "Noto Sans", style: "Regular" });
        let promRoboto = yield figma.loadFontAsync({ family: "Roboto", style: "Regular" });
    });
}
function setFrame() {
    var frame = figma.createFrame();
    frame.layoutMode = "VERTICAL";
    frame.counterAxisSizingMode = "AUTO";
    frame.paddingBottom = 24;
    frame.paddingTop = 24;
    frame.paddingRight = 24;
    frame.paddingLeft = 24;
    frame.itemSpacing = 12;
    frame.name = "Table of Contents";
    var title = figma.createText();
    textStyling(title, 19, { r: 0, g: 0, b: 0 }, "Table of Contents");
    frame.appendChild(title);
    var description = figma.createText();
    textStyling(description, 14, { r: 0.3686274588108063, g: 0.3686274588108063, b: 0.3686274588108063 }, "Click on the name to jump to the corresponding page");
    frame.appendChild(description);
    return frame;
}
function addPageInfo(id, name) {
    var text = figma.createText();
    var isTitle = name.includes("--");
    if (!isTitle) {
        //configure the link
        textStyling(text, 14, { r: 0.0784313753247261, g: 0.45098039507865906, b: 0.9019607901573181 }, name);
        text.hyperlink = { type: "NODE", value: id };
        text.textDecoration = "NONE";
    }
    else {
        textStyling(text, 14, { r: 0, g: 0, b: 0 }, name);
    }
    return text;
}
function clone(val) {
    return JSON.parse(JSON.stringify(val));
}
function textStyling(text, size, color, content) {
    text.characters = content;
    text.fontName = { family: "Noto Sans", style: "Regular" };
    text.fontSize = size;
    const fills = clone(text.fills);
    fills[0].color = color;
    text.fills = fills;
}

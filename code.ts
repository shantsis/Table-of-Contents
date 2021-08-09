//variables
const fileName = figma.root.name
var pageNodes = []
var pageNames= []

//gather all the page names and IDs
for (var page of figma.root.children){
  pageNodes.push(page.id)
  pageNames.push(page.name)
}

//import the fonts first to create the page
importFonts()
    .then(()=>{ 

      //create a frame to place the content
      var frame = setFrame()

      //add each page
      for (var i = 1; i < pageNodes.length; i++){
        var text = addPageInfo(pageNodes[i], pageNames[i])
        frame.appendChild(text)
      }
      
      //place the frame in focus
      figma.viewport.scrollAndZoomIntoView(frame.children)

      //close the plugin
      figma.currentPage.setRelaunchData({ open: '' })
      figma.closePlugin("Table of Contents has been added 🚀")
    })
    .catch(error => {
      console.log(error)
    })

//list font family and all its versions here
//import the fonts for use
async function importFonts(){
  let promNoto = await figma.loadFontAsync({family: "Noto Sans", style: "Regular"})
  let promRoboto = await figma.loadFontAsync({family: "Roboto", style: "Regular"})
}

//define how the table of the contents should appear
function setFrame(){
  var frame = figma.createFrame()
  frame.layoutMode = "VERTICAL"
  frame.counterAxisSizingMode = "AUTO"
  frame.paddingBottom = 24
  frame.paddingTop = 24
  frame.paddingRight = 24
  frame.paddingLeft = 24
  frame.itemSpacing = 12
  frame.name = "Table of Contents"

  //create the title
  var title = figma.createText()
  textStyling(title, 19, {r: 0, g: 0, b: 0}, "Table of Contents")
  frame.appendChild(title)

  //add a description to guide viewers on how to use it
  var description = figma.createText()
  textStyling(description, 14, {r: 0.3686274588108063, g: 0.3686274588108063, b: 0.3686274588108063}, "Click on the name to jump to the corresponding page")
  frame.appendChild(description)

  return frame
}

//text item per page
function addPageInfo(id, name){
  var text = figma.createText()
  
  //divider pages do not have link styles on them to help separate the pages
  var isTitle = name.includes("--")

  if (!isTitle) {
    //configure the link
    textStyling(text, 14, {r: 0.0784313753247261, g: 0.45098039507865906, b: 0.9019607901573181}, name)
    text.hyperlink = {type: "NODE", value: id}
    text.textDecoration = "NONE"
  }
  else{
    textStyling(text, 14, {r: 0, g: 0, b: 0}, name)
  }

  return text
  
}

//see https://www.figma.com/plugin-docs/editing-properties/
function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

//define the text styling for the page links
function textStyling(text, size, color, content){
  text.characters = content
  text.fontName = {family: "Noto Sans", style: "Regular"}
  text.fontSize = size
  const fills = clone(text.fills)
  fills[0].color = color
  text.fills = fills
}

